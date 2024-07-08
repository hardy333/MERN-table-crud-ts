import tablesAPI from "@/api/tablesAPI";
import { Table } from "@/App";
import { DataTable } from "@/components/DataTable";
import generateTableColumDefs from "@/lib/generateTableColumDefs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const TablePage = () => {
  const { tableName } = useParams();

  const { data: tables } = useQuery<Table[]>({
    queryKey: ["tables"],
    queryFn: async () => {
      const data = await tablesAPI.get("/");
      return data.data;
    },
  });

  const table = tables?.find((t) => t._id === tableName);

  const colDefs = useMemo(() => {
    return generateTableColumDefs(table);
  }, [tables, tableName]);

  useEffect(() => {
    // generateTableColumDefs(table);

    console.log("mount");
  }, []);

  return (
    <div>
      <div className="flex mb-4 items-center text-sm">
        <Link className=" hover:text-purple-600" to="/">
          Go Back
        </Link>
        <h1 className="mx-auto text-xl font-bold">{table?.name}</h1>
      </div>
      <DataTable data={table?.data || []} columns={colDefs} />
    </div>
  );
};

export default TablePage;
