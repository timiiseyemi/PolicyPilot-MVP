'use client';

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

import {
  ScrollArea,
  ScrollBar,
} from '@/components/ui/scroll-area';

interface IData {
  id: string;
  policyNo: string;
  customer: string;
  product: string;
  insurer: string;
  premium: string;
  status: 'Active' | 'Pending' | 'Expired';
  renewal: string;
}

const PoliciesTable = () => {
  const [data, setData] = useState<IData[]>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const [sorting, setSorting] = useState<SortingState>([]);

  const [rowSelection, setRowSelection] =
    useState<RowSelectionState>({});

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadPolicies() {
      try {
        const res = await fetch('/api/policies');

        const policies = await res.json();

        setData(
          policies.map((policy: any) => ({
            id: policy.id,

            policyNo: policy.policyNumber,

            customer: policy.customer?.name ?? '-',

            product: policy.product,

            insurer: policy.insurer,

            premium: new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(policy.premium),

            status:
              policy.status === 'ACTIVE'
                ? 'Active'
                : policy.status === 'DRAFT'
                ? 'Pending'
                : 'Expired',

            renewal: new Date(
              policy.endDate
            ).toLocaleDateString(),
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }

    loadPolicies();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;

    return data.filter(
      (item) =>
        item.customer
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.policyNo
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.product
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.insurer
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <DataGridTableRowSelectAll />,
        cell: ({ row }) => (
          <DataGridTableRowSelect row={row} />
        ),
        enableSorting: false,
        size: 50,
      },

      {
        accessorKey: 'policyNo',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Policy No."
            column={column}
          />
        ),
      },

      {
        accessorKey: 'customer',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Customer"
            column={column}
          />
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
        accessorKey: 'insurer',

        header: ({ column }) => (
          <DataGridColumnHeader
            title="Insurer"
            column={column}
          />
        ),
      },

      {
        accessorKey: 'premium',

        header: ({ column }) => (
          <DataGridColumnHeader
            title="Premium"
            column={column}
          />
        ),
      },

      {
        accessorKey: 'status',

        header: ({ column }) => (
          <DataGridColumnHeader
            title="Status"
            column={column}
          />
        ),

        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === 'Active'
                  ? 'bg-green-100 text-green-700'
                  : status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status}
            </span>
          );
        },
      },

      {
        accessorKey: 'renewal',

        header: ({ column }) => (
          <DataGridColumnHeader
            title="Renewal"
            column={column}
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,

    columns,

    getRowId: (row) => row.id,

    pageCount: Math.ceil(
      filteredData.length / pagination.pageSize
    ),

    state: {
      pagination,
      sorting,
      rowSelection,
    },

    onPaginationChange: setPagination,

    onSortingChange: setSorting,

    onRowSelectionChange: setRowSelection,

    enableRowSelection: true,

    columnResizeMode: 'onChange',

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
          <CardTitle>Policies</CardTitle>

          <CardToolbar className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

            <Input
              className="ps-9 w-52"
              placeholder="Search policies..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
            />

            {searchQuery && (
              <Button
                mode="icon"
                variant="ghost"
                className="absolute end-1 top-1/2 h-6 w-6 -translate-y-1/2"
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