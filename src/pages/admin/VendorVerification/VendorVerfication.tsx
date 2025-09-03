import { useCallback, useEffect, useMemo, useState } from 'react';
import { getVendorVerificationRequests, verifyVendorByAdmin } from '@/api/admin/admin';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { Vendor } from '@/types/users.type';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import ErrorMessage from '@/components/common/Message/Error.message';
import { toast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { VerificationTable } from '@/components/adminComponents/verificartionTable/VerificationTable';
import { Pagination } from '@/components/adminComponents/Pagination/Paginatio';
import { useNavigate } from 'react-router-dom';

export default function VendorVerfication() {
  const [allData, setAllData] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
    const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await getVendorVerificationRequests();
        if (result?.data) setAllData(result.data.filter((x: Vendor | undefined): x is Vendor => Boolean(x)));
      } catch (error) {
        toast({ description: <ErrorMessage message={getApiErrorMessage(error, Messages.FAILED_TO_FETCH_VERIFICATION_SERVICE_BOY)} /> });
      }
    })();
  }, []);

  const columns = useMemo(() => ([
    { key: 'name', label: 'Name' },
    { key: 'mobile', label: 'Mobile', render: (r: Vendor) => <span className="text-[#8B5CF6]">{r.mobile}</span> },
    { key: 'email', label: 'Email', render: (r: Vendor) => <span className="text-gray-300">{r.email}</span> },
    { key: 'estd', label: 'ESTD' },
    { key: 'location', label: 'Location', render: (r: Vendor) => r.location?.address },
    { key: 'licenceNumber', label: 'Licence Number' },
  ]), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return allData.filter(v =>
      v?.name?.toLowerCase().includes(q) ||
      v?.email?.toLowerCase().includes(q) ||
      v?.mobile?.includes(search)
    );
  }, [allData, search]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / limit)),
    [filtered.length, limit]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, currentPage, limit]);

  const onVerify = useCallback(async (id: string, status: VerificationStatus) => {
    try {
      const res = await verifyVendorByAdmin(id, status);
      if (res?.statusCode === 200) {
        setAllData(prev => prev.filter(x => x._id !== id));
        toast({ description: <SuccessMessage message={res.message} /> });
      }
    } catch (error) {
      toast({ description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} /> });
    }
  }, []);

  const handleVendorDocumentPage = async (VendprData: Vendor) => {
      try {
        console.log("single verification page button clicked---",VendprData)
        navigate(`/admin/vendors/verify/${VendprData._id}?isVerified=${VendprData.isVerified}`, { state: VendprData })
  
      } catch (error) {
        throw error
      }
    }

  return (
    <div className="bg-surface rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Vendor Verifications</h2>

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

      <VerificationTable<Vendor>
        data={paginated}
        columns={columns}
        currentPage={currentPage}
        limit={limit}
        onVerify={onVerify}
        onRowClick={handleVendorDocumentPage}
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
