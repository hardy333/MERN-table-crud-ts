import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DebouncedInput from "./DebounceInput";
import ReactPaginate from "react-paginate";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  const handlePageClick = (event: { selected: number }) => {
    console.log(event);
    console.log(table.getState().pagination.pageIndex);
    table.setPageIndex(event.selected);
  };

  console.log(table.getAllColumns());
  return (
    <>
      {/* Global Filter */}
      <div className="mb-4 max-w-[200px]">
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search in table..."
        />
      </div>

      {/* Filters Column */}
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center py-4">
          <Input
            placeholder="Search by name..."
            value={
              (table.getColumn("first_name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("first_name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div> */}
      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="flex-1"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={`flex-1 w-[${
                        100 / table.getAllColumns().length
                      }%]  max-w-[${100 / table.getAllColumns().length}%]`}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination 2 */}
      <div className="flex  justify-center p-4">
        <ReactPaginate
          containerClassName="flex content-center "
          breakLabel={<PaginationEllipsis />}
          previousLabel={<PaginationPrevious isActive={false} />}
          nextLabel={<PaginationNext />}
          pageLabelBuilder={(num: number) => (
            <PaginationLink
              isActive={table.getState().pagination.pageIndex === num - 1}
              href="#"
            >
              {num}
            </PaginationLink>
          )}
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          pageCount={table.getPageCount()}
          renderOnZeroPageCount={null}
          activeClassName=""
          forcePage={table.getState().pagination.pageIndex}
        />
      </div>

      {/* Pagination */}
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div> */}
    </>
  );
}
