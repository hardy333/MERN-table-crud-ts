import tablesAPI from "@/api/tablesAPI";
import { Table } from "@/App";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import generateTableColumDefs from "@/lib/generateTableColumDefs";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TablePage = () => {
  const { tableName } = useParams();
  const { toast } = useToast();

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

  const handleDeleteTable = async () => {
    const data = await tablesAPI.delete("/" + tableName);
    return data;
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeleteTable,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast({
        title: "Table Was deleted successfully !!",
        description: "Congratulations ",
      });
      navigate("/");
    },
    onError: () => {
      toast({
        title: "Table Was deleted successfully !!",
        description: "Congratulations ",
        variant: "destructive",
      });
    },
  });

  const { mutate: tableUpdateMutate, isPending: updateIsPending } = useMutation(
    {
      mutationFn: async () => {
        const res = await tablesAPI.post("/" + tableName, {
          tableName: "Hello 123",
        });
        return res;
      },
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries({ queryKey: ["tables"] });
        // navigate("/");
      },
      onError: () => {},
    }
  );

  return (
    <div>
      <Toaster />

      <div className="flex mb-4 items-center text-sm">
        <Link className=" hover:text-purple-600" to="/">
          Go Back
        </Link>
        <h1 className="mx-auto text-xl font-bold">{table?.name}</h1>
      </div>
      <div className="py-4 flex justify-end">
        <Button
          onClick={() => tableUpdateMutate()}
          variant="default"
          className="me-2"
          size="sm"
        >
          Udpate Table
        </Button>
        <Button onClick={() => mutate()} variant="destructive" size="sm">
          {isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              deleting table...
            </>
          ) : (
            <>delete table</>
          )}
        </Button>
      </div>
      <DataTable data={table?.data || []} columns={colDefs} />
    </div>
  );
};

export default TablePage;
