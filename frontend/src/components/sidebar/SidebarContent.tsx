import { Table } from "@/App";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import tablesAPI from "@/api/tablesAPI";

const SidebarContent = () => {
  const { tableName } = useParams();
  const { data: tables } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: async () => {
      const data = await tablesAPI.get("/");
      return data.data;
    },
  });

  return (
    <div className="h-full ">
      <ul>
        {tables?.map((table) => {
          return (
            <li key={table._id}>
              <Link
                className={classNames({
                  "text-purple-600": table._id === tableName,
                })}
                to={"/table/" + table._id}
              >
                {table.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarContent;
