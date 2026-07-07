'use client';

import { useMemo, useState } from 'react';
import { Avatar, AvatarGroup } from '@/partials/common/avatar-group';
import { Rating } from '@/partials/common/rating';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface IData {
  id: number;
  policyNo: string;
  customer: string;
  product: string;
  insurer: string;
  premium: string;
  status: "Active" | "Expired" | "Pending";
  renewal: string;
}

const data: IData[] = [
  {
    id:1,
    policyNo:"POL-10001",
    customer:"John Doe",
    product:"Motor Insurance",
    insurer:"Leadway",
    premium:"₦250,000",
    status:"Active",
    renewal:"15 Jul 2026"
  },
  {
    id:2,
    policyNo:"POL-10002",
    customer:"Sarah James",
    product:"Health Insurance",
    insurer:"AXA Mansard",
    premium:"₦180,000",
    status:"Pending",
    renewal:"22 Jul 2026"
  },
  {
    id:3,
    policyNo:"POL-10003",
    customer:"ACME Ltd",
    product:"Fire Insurance",
    insurer:"AIICO",
    premium:"₦1,250,000",
    status:"Expired",
    renewal:"03 Jul 2026"
  }
];

const PoliciesTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'updated_at', desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter(
      (item) =>
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
item.product.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

 const columns = useMemo<ColumnDef<IData>[]>(
  () => [
    {
      accessorKey: "id",
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />,
      enableSorting: false,
      size: 50,
    },

    {
      accessorKey: "policyNo",
      header: ({ column }) => (
        <DataGridColumnHeader title="Policy No." column={column} />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.policyNo}
        </span>
      ),
    },

    {
      accessorKey: "customer",
      header: ({ column }) => (
        <DataGridColumnHeader title="Customer" column={column} />
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">
            {row.original.customer}
          </div>

          <div className="text-xs text-muted-foreground">
            {row.original.product}
          </div>
        </div>
      ),
    },

    {
  accessorKey: "insurer",
  header: ({ column }) => (
    <DataGridColumnHeader
      title="Insurer"
      column={column}
    />
  ),
},

    {
      accessorKey: "premium",
      header: ({ column }) => (
        <DataGridColumnHeader title="Premium" column={column} />
      ),
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium
            ${
              status === "Paid"
                ? "bg-green-100 text-green-700"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </span>
        );
      },
    },

    {
      accessorKey: "dueDate",
      header: ({ column }) => (
        <DataGridColumnHeader title="Renewal" column={column} />
      ),
    },

    
  ],
  [],
);

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className="py-3.5">
          <CardTitle>Policies</CardTitle>
          <CardToolbar className="relative">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-9 w-40"
            />
            {searchQuery.length > 0 && (
              <Button
                mode="icon"
                variant="ghost"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X />
              </Button>
            )}
          </CardToolbar>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

export { PoliciesTable };
