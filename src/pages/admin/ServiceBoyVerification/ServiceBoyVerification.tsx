import { verifyServiceBoyByAdmin, getServiceBoyVerificationRequests } from '@/api/admin/admin';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { ServiceBoy } from '@/types/users.type';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import ErrorMessage from '@/components/common/Message/Error.message';
import { toast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { VerificationTable } from '@/components/adminComponents/verificartionTable/VerificationTable';
import { Pagination } from '@/components/adminComponents/Pagination/Paginatio';
import { useNavigate } from 'react-router-dom';


export default function ServiceBoyVerfication() {
  const navigate = useNavigate();
  const [data, setData] = useState<ServiceBoy[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;



  useEffect(() => {
    (async () => {
      try {
        const result = await getServiceBoyVerificationRequests();
        if(result){

        if (result?.data) setData(result.data.filter((x: ServiceBoy | undefined): x is ServiceBoy => Boolean(x)));
        }
      } catch (error) {
        toast({ description: <ErrorMessage message={getApiErrorMessage(error, Messages.FAILED_TO_FETCH_VERIFICATION_SERVICE_BOY)} /> });
      }
    })();
  }, []);

      const columns = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'mobile', label: 'Mobile', render:( row:ServiceBoy) => <span className="text-primary">{row.mobile}</span> },
    { key: 'email', label: 'Email', render: ( row:ServiceBoy) => <span className="text-muted">{row.email}</span> },
    { key: 'age', label: 'Age' },
    { key: 'location', label: 'Location', render: ( row:ServiceBoy) => row.location?.address },
    { key: 'qualification', label: 'Qualification' },
  ], []);

   const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return data.filter(v =>
      v?.name?.toLowerCase().includes(q) ||
      v?.email?.toLowerCase().includes(q) ||
      v?.mobile?.includes(search)
    );
  }, [data, search]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / limit)),
    [filtered.length, limit]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, currentPage, limit]);

  const handleVerify = useCallback(async (id: string, status: VerificationStatus) => {
    try {
      const result = await verifyServiceBoyByAdmin(id, status);
      if (result?.statusCode === 200) {
        setData(prev => prev.filter(item => item._id !== id));
        toast({ description: <SuccessMessage message={result.message} /> });
      }
    } catch (error) {
      toast({ description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} /> });
    }
  }, []);


  const handleServiceBoyDocumentPage = async (serviceBoyData: ServiceBoy) => {
    try {
      console.log("single verification page button clicked---",serviceBoyData)
      navigate(`/admin/service-boys/verify/${serviceBoyData._id}?isVerified=${serviceBoyData.isVerified}`, { state: serviceBoyData })

    } catch (error) {
      throw error
    }
  }



  return (
 <div className="bg-surface rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 text-foreground">
        <h2 className="text-xl font-bold ">Service Boy Verifications</h2>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            placeholder="Search..."
            value={search}
            onChange={e => { setCurrentPage(1); setSearch(e.target.value); }}
            className="pl-3 pr-3 py-2 rounded-md bg-primary/10 border border-primary/20 placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

        <VerificationTable
      data={paginated}
      columns={columns}
      currentPage={currentPage}
      limit={limit}
      onVerify={handleVerify}
      onRowClick={handleServiceBoyDocumentPage}
      
    />

      {/* Pagination */}
         <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(Math.max(1, Math.min(totalPages, page)))}
      />
    </div>
  );
}
