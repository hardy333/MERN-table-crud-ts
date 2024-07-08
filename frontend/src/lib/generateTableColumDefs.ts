import { Table } from "@/App";

const generateTableColumDefs = (table: Table | undefined) => {
  const res = [];

  res.push({
    header: "id",
    id: "ddd",
    enableColumnFilter: false,
    enableColumnFilters: false,
    enableFilters: false,
    // @ts-expect-error  ...
    accessorFn: (originalRow: unknown, index: number) => {
      return index;
    },
  });

  if (Array.isArray(table?.data)) {
    for (const [key] of Object.entries(table.data[0])) {
      res.push({
        accessorKey: key,
        header: key,
      });
    }
  }

  return res;
};

export default generateTableColumDefs;
