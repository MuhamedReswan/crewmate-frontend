import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VerificationStatus } from '@/types/enum.type';
import { ServiceBoy, Vendor } from '@/types/users.type';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface VerificationTableProps<T> {
  data: T[];
  columns: Column<T>[];
  currentPage: number;
  limit: number;
  onVerify: (id: string, status: VerificationStatus) => void;
  onRowClick: (data:T) => void;
}

export function VerificationTable<T extends { _id?: string }>({
  data,
  columns,
  currentPage,
  limit,
  onVerify,
  onRowClick
}: VerificationTableProps<T>) {
  return (
    <div className="rounded-lg border border-primary/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-primary/20 hover:bg-primary/20">
            <TableHead className="text-foreground font-semibold">S.no</TableHead>
            {columns.map(col => (
              <TableHead key={col.key} className="text-text-foreground  font-semibold">{col.label}</TableHead>
            ))}
            <TableHead className="text-foreground  font-semibold">Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item._id}
              className="border-b border-primary/20 hover:bg-primary/20 transition-colors"
              onClick={() => onRowClick(item)}
            >
              <TableCell className="text-muted font-medium">{limit * (currentPage - 1) + index + 1}</TableCell>
              {columns.map(col => (
                <TableCell key={col.key} className="text-muted">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onVerify(item._id!, VerificationStatus.Verified)}
                    className="bg-accent hover:bg-white/50 text-accent-foreground px-3 py-1 text-xs"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onVerify(item._id!, VerificationStatus.Rejected)}
                    className="bg-destructive hover:bg-[#EF4444]/90 text-destructive-foreground px-3 py-1 text-xs"
                  >
                    Decline
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
