import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}


interface UserManagementTableProps<T> {
  data: T[];
  columns: Column<T>[];
  serialStart?: number; 
  showSerialNo?: boolean;
}

export function UserManagementTable<T extends { _id: string; isBlocked: boolean}>({
  data,
  columns,
  serialStart = 1,
  showSerialNo = true,
}: UserManagementTableProps<T>) {
    console.log("usermanagement Table",data)
  return (
    <div className="rounded-lg border border-[#8B5CF6]/20 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#8B5CF6]/20 hover:bg-[#1F2037]/50">
            {showSerialNo && (
              <TableHead className="text-gray-300 font-semibold">S.no</TableHead>
            )}
            {columns.map((col) => (
              <TableHead key={col.key} className="text-gray-300 font-semibold">
                {col.label}
              </TableHead>
            ))}
         
          </TableRow>
        </TableHeader>
              <TableBody>
          {data.length === 0 ? (
            <TableRow
            className="border-b border-[#8B5CF6]/10 hover:bg-[#1F2037]/30 transition-colors">
             <TableCell
                colSpan={columns.length + (showSerialNo ? 1 : 0)}
                className="text-center text-gray-400 py-8"
              >
                   <span className="text-lg md:text-xl font-semibold tracking-wide">
         No users found
      </span>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow
                key={item._id || index}
                className="border-b border-[#8B5CF6]/10 hover:bg-[#1F2037]/30 transition-colors"
              >
                {showSerialNo && (
                  <TableCell className="text-white font-medium">
                    {serialStart + index}
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} className="text-white">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
