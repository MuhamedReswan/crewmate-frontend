import { getServiceBoyVerificationRequests } from '@/api/admin/admin';
import ServiceBoyVerificationTable from '@/components/adminComponents/verificartionTable/ServiceBoyVerificationTable';
import ErrorMessage from '@/components/common/Message/Error.message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Messages } from '@/types/enum.type';
import { ServiceBoy } from '@/types/users.type';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const ServiceBoyVerfication = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationData, setVerificationData] = useState<ServiceBoy[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  useEffect(() => {
    const fetchPendingVerification = async () => {
      try {
        const result = await getServiceBoyVerificationRequests();
        if (result && result.data) {
 setVerificationData(result.data.filter((x): x is ServiceBoy => Boolean(x)));
        }
      } catch (error) {
        toast({
          description: <ErrorMessage message={getApiErrorMessage(error, Messages.FAILED_TO_FETCH_VERIFICATION_SERVICE_BOY)} />,
        })
      }
    };

    fetchPendingVerification();
  }, []);

  const handleRemove = useCallback((id: string) => {
    setVerificationData((prev) => prev.filter((item) => item._id !== id));
  }, []);

const filteredData = useMemo(() => {
  return verificationData.filter((item): item is ServiceBoy => {
    if (!item) return false;               
    return (
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mobile?.includes(searchTerm)
    );
  });
}, [verificationData, searchTerm]);


  const totalPages = useMemo(() => {
    return Math.ceil(filteredData.length / itemsPerPage);
  }, [filteredData.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredData.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredData, currentPage, itemsPerPage]);



  return (
    <div className="bg-[#12132D] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Service Boy Verifications</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1F2037] border-[#8B5CF6]/20 text-white placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <ServiceBoyVerificationTable
        filteredData={paginatedData}
        currentPage={currentPage}
        limit={itemsPerPage}
        onRemove={handleRemove}
      />

     <div className="flex justify-center mt-6 gap-2">
  <Button
    variant="ghost"
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(prev => prev - 1)}
  >
    Prev
  </Button>

  {Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(page =>
      page >= Math.max(1, currentPage - 1) &&
      page <= Math.min(totalPages, currentPage + 1)
    )
    .map(page => (
      <Button
        key={page}
        variant={currentPage === page ? 'default' : 'ghost'}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Button>
    ))}

  <Button
    variant="ghost"
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(prev => prev + 1)}
  >
    Next
  </Button>
</div>



    </div >

  )
}

export default ServiceBoyVerfication
