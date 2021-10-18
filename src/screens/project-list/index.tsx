import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useMount, useDebounce } from "../../utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
/**
 *  npm start 时 从.env.development读取URL 
    npm run build时，从.env读取
    用法：const apiUrl = process.env.REACT_APP_API_URL
 */
// const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const client = useHttp();
  // 当查询参数改变时,改变list的展示数据
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // 用client来封装了fetch请求
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debouncedParam]);
  // 第二个参数为空数组,则只在页面渲染时触发一次
  // 用于初始化users
  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
