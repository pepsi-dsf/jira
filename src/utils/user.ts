import { useEffect } from "react";
import { cleanObject } from ".";
import { User } from "../screens/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

//用于封装以下的操作
// // 用于初始化users
/// 用于初始化users
// useMount(() => {
//   client('users').then(setUsers)
//   // fetch(`${apiUrl}/users`).then(async (response) => {
//   //   if (response.ok) {
//   //     setUsers(await response.json());
//   //   }
//   // });
// })
