import { useState } from "react";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};
// 不想每次都抛出异常来进行trycatch，所以抛出异常是可选的
const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initalConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initalConfig };
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState, //用户传入的state优先级比默认的高，放后面，覆盖前面的
  });
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  // run用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      //没传promise或者传的不是promise
      throw new Error("请传入promise类型数据");
    }
    setState({ ...state, stat: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        // return error;
        // catch会消化异常，如果不主动抛出，外面就接收不到异常
        if (config.throwOnError) return Promise.reject(error);
        else return error;
      });
  };
  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
