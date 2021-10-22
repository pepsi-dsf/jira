import { useEffect } from "react";
import { Project } from "../screens/project-list/list";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

/**封装了下面这一堆东西
 * 
 * 
 * const { run, isLoading, error, data: list } = useAsync<Project[]>()
  // 当查询参数改变时,改变list的 展示数据
  useEffect(() => {
    run(client('projects', { data: cleanObject(debouncedParam) }))
    /**
     * 用use-async函数来代替操作
    setIsLoading(true)
     
     * client('projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]) //重置数组，清空页面
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
     */

// 用client来封装了fetch请求
// fetch(
//   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
// ).then(async (response) => {
//   if (response.ok) {
//     setList(await response.json());
//   }
// });
//eslint-disable-next-line react-hooks/exhaustive-deps
//}, [debouncedParam])
// 第二个参数为空数组,则只在页面渲染时触发一次
