import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject } from "../../utils";
import * as qs from "qs";
/**
 *  npm start 时 从.env.development读取URL 
    npm run build时，从.env读取
    用法：const apiUrl = process.env.REACT_APP_API_URL
 */
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  const [list, setList] = useState([]);
  // 当查询参数改变时,改变list的展示数据
  useEffect(() => {
    fetch(
      `http://localhost:3001/projects?${qs.stringify(cleanObject(param))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);
  // 第二个参数为空数组,则只在页面渲染时触发一次
  // 用于初始化users
  useEffect(() => {
    fetch(`http://localhost:3001/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
