import { useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { Typography } from "antd";
/**
 *  npm start 时 从.env.development读取URL 
    npm run build时，从.env读取
    用法：const apiUrl = process.env.REACT_APP_API_URL
 */
// const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000);
  /**
   * 用useProjects和useUsers来封装了获取信息的操作
   * 在这两个hook的内部又用useAsync封装了异步操作来保持登陆状态的操作
   */
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
