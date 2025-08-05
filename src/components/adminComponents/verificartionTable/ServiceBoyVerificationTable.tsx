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
import { ServiceBoy } from '@/types/users.type';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { verifyServiceBoyByAdmin } from '@/api/admin/admin';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { toast } from '@/hooks/use-toast';
import ErrorMessage from '@/components/common/Message/Error.message';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';

type VerificationData = Partial<ServiceBoy>;

interface VerificationTableProps {
    filteredData: VerificationData[];
    onRemove: (id: string) => void;
    currentPage: number
    limit: number

}

const ServiceBoyVerificationTable: React.FC<VerificationTableProps> = ({ filteredData, currentPage, limit, onRemove }) => {

    const handleVerification = async (id: string, status: VerificationStatus) => {
        try {
            const result = await verifyServiceBoyByAdmin(id, status);

            if (result && result.statusCode == 200) {
                onRemove(id);
                toast({
                    description: <SuccessMessage message={result.message} className="" />,
                });
            }
        } catch (error) {
            toast({
                description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} />,
            })
        }
    };



    return (

        < div className="rounded-lg border border-[#8B5CF6]/20 overflow-hidden " >
            <Table>
                <TableHeader>
                    <TableRow className="border-b border-[#8B5CF6]/20 hover:bg-[#1F2037]/50">
                        <TableHead className="text-gray-300 font-semibold">S.no</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Name</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Mobile</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Email</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Age</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Location</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Qualification</TableHead>
                        <TableHead className="text-gray-300 font-semibold">Approved</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredData.map((item, index) => {
                        return (
                            <TableRow
                                key={item._id}
                                className="border-b border-[#8B5CF6]/10 hover:bg-[#1F2037]/30 transition-colors"
                            >
                                <TableCell className="text-white font-medium">{limit * (currentPage - 1) + index + 1}</TableCell>
                                <TableCell className="text-white">{item.name}</TableCell>
                                <TableCell className="text-[#8B5CF6]">{item.mobile}</TableCell>
                                <TableCell className="text-gray-300">{item.email}</TableCell>
                                <TableCell className="text-white">{item.age}</TableCell>
                                <TableCell className="text-white">{item.location?.address}</TableCell>
                                <TableCell className="text-white">{item.qualification}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleVerification(item._id!, VerificationStatus.Verified)}
                                            className="bg-[#22C55E] hover:bg-[#22C55E]/90 text-white px-3 py-1 text-xs"
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => handleVerification(item._id!, VerificationStatus.Rejected)}
                                            className="bg-[#EF4444] hover:bg-[#EF4444]/90 text-white px-3 py-1 text-xs"
                                        >
                                            Decline
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div >
    );
};

export default React.memo(ServiceBoyVerificationTable);
