import { useCallback, useEffect, useMemo, useState } from 'react';
import { getVendorVerificationRequests, verifyVendorByAdmin } from '@/api/admin/admin';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { Vendor } from '@/types/users.type';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import ErrorMessage from '@/components/common/Message/Error.message';
import { toast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { VerificationTable } from '@/components/adminComponents/verificartionTable/VerificationTable';

export default function VendorVerfication() {
  const [allData, setAllData] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

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

  

  return (
    <div className="bg-[#12132D] rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Vendor Verifications</h2>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            placeholder="Search..."
            value={search}
            onChange={e => { setCurrentPage(1); setSearch(e.target.value); }}
            className="pl-3 pr-3 py-2 rounded-md bg-[#1F2037] border border-[#8B5CF6]/20 text-white placeholder:text-gray-400 outline-none"
          />
        </div>
      </div>

      <VerificationTable<Vendor>
        data={paginated}
        columns={columns}
        currentPage={currentPage}
        limit={limit}
        onVerify={onVerify}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="px-3 py-1 rounded-md border border-[#8B5CF6]/30 text-white disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p >= Math.max(1, currentPage - 1) && p <= Math.min(totalPages, currentPage + 1))
          .map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-3 py-1 rounded-md ${
                p === currentPage ? 'bg-[#8B5CF6] text-white' : 'border border-[#8B5CF6]/30 text-white'
              }`}
            >
              {p}
            </button>
          ))}

        <button
          className="px-3 py-1 rounded-md border border-[#8B5CF6]/30 text-white disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
