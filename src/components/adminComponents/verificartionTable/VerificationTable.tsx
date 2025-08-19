import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VerificationStatus } from '@/types/enum.type';

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
}

export function VerificationTable<T extends { _id?: string }>({
  data,
  columns,
  currentPage,
  limit,
  onVerify,
}: VerificationTableProps<T>) {
  return (
    <div className="rounded-lg border border-[#8B5CF6]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#8B5CF6]/20 hover:bg-[#1F2037]/50">
            <TableHead className="text-gray-300 font-semibold">S.no</TableHead>
            {columns.map(col => (
              <TableHead key={col.key} className="text-gray-300 font-semibold">{col.label}</TableHead>
            ))}
            <TableHead className="text-gray-300 font-semibold">Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item._id}
              className="border-b border-[#8B5CF6]/10 hover:bg-[#1F2037]/30 transition-colors"
            >
              <TableCell className="text-white font-medium">{limit * (currentPage - 1) + index + 1}</TableCell>
              {columns.map(col => (
                <TableCell key={col.key} className="text-white">
                  {col.render ? col.render(item) : (item as any)[col.key]}
                </TableCell>
              ))}
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onVerify(item._id!, VerificationStatus.Verified)}
                    className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-3 py-1 text-xs"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onVerify(item._id!, VerificationStatus.Rejected)}
                    className="bg-[#EF4444] hover:bg-[#EF4444]/90 text-white px-3 py-1 text-xs"
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
