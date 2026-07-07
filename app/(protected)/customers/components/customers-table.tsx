'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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

interface IData {
  id: string;
  name: string;
  email: string;
  phone: string;
  policies: number;
  premium: string;
  status: "Active" | "Inactive";
}



export function CustomersTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
  async function loadCustomers() {
    try {
      const res = await fetch("/api/customers");
      const customers = await res.json();

      const mapped = customers.map((customer: any) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "-",
        policies: customer.policies.length,
        premium:
          "₦" +
          customer.payments
            .reduce(
              (sum: number, payment: any) =>
                sum + payment.amount,
              0
            )
            .toLocaleString(),
        status:
          customer.policies.length > 0
            ? "Active"
            : "Inactive",
      }));

      setData(mapped);
    } catch (err) {
      console.error(err);
    }
  }

  loadCustomers();
}, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery),
    );
  }, [searchQuery, data]);
  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => <DataGridTableRowSelect row={row} />,
        enableSorting: false,
        size: 50,
      },

      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataGridColumnHeader title="Customer" column={column} />
        ),
        cell: ({ row }) => (
          <Link
            href={`/customers/${row.original.id}`}
            className="font-semibold text-primary hover:underline"
          >
            {row.original.name}
          </Link>
        ),
      },

      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
      },

      {
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataGridColumnHeader title="Phone" column={column} />
        ),
      },

      {
        accessorKey: 'policies',
        header: ({ column }) => (
          <DataGridColumnHeader title="Policies" column={column} />
        ),
        cell: ({ row }) => (
          <span className="font-medium">
            {row.original.policies}
          </span>
        ),
      },

      {
        accessorKey: 'premium',
        header: ({ column }) => (
          <DataGridColumnHeader title="Total Premium" column={column} />
        ),
      },

      {
        accessorKey: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Status" column={column} />
        ),
        cell: ({ row }) => {
          const active = row.original.status === 'Active';

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {row.original.status}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil(filteredData.length / pagination.pageSize),

    getRowId: (row) => String(row.id),

    state: {
      pagination,
      sorting,
      rowSelection,
    },

    columnResizeMode: 'onChange',

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={filteredData.length}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        <CardHeader className="py-3.5">
          <CardTitle>Customers</CardTitle>

          <CardToolbar className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <Input
              placeholder="Search customers..."
              className="ps-9 w-60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
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
}