import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// 在一个函数里，改变传入的对象本身是不好的
// export const cleanObject = (object: object) => { object表示的范围包括函数 正则等等  如果解构一个函数 那么是无意义的  所以ts会返回一个空{}
// 下面这种写法可以很明确的表示需要的就是一个键值对的对象
export const cleanObject = (object: { [key: string]: unknown }) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
//防抖函数，避免在input框中每次输入都引起param的变换而导致网络请求被频繁发送
// 使用泛型来绑定函数参数与返回值的类型 使之保持一致
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // React 会在执行当前 effect 之前对上一个 effect 进行清除
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
export const useArray = <V>(param: V[]) => {
  const [value, setValue] = useState(param);
  return {
    value,
    setValue,
    add: (item: V) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copu = [...value];
      copu.slice(index, 1);
      setValue(copu);
    },
  };
};
