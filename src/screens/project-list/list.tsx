import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

// interface ListProps {
//   list: Project[];
//   users: User[];
// }
// 以下这种修改方式可以一劳永逸的解决往list组件中传参数的问题。不这样的话每次增加都要手动的修改interface等内容
interface ListProps extends TableProps<Project> {
  users: User[];
}

// export const List = ({ list, users }: ListProps) => {
// typeof PropsType = Omit<ListProps,'users'>
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      // dataSource={list}
      {...props}
    />
  );
  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/* 这个?很关键.直接find很容易出现undefined 如果undefined.name则会报错
  //               而如果有? 则直接返回的时undefined
  //           */}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               '未知'}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // )
};
