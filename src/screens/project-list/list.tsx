import { Table } from "antd";
import { User } from "./search-panel";
interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      dataSource={list}
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
