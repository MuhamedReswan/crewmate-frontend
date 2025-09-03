import { GetServiceBoysParams, getVendors, updateServiceBoyBlockStatus } from '@/api/admin/admin';
import { Pagination } from '@/components/adminComponents/Pagination/Paginatio';
import { UserManagementTable } from '@/components/adminComponents/userManagement/UserManagementTable';
import ErrorMessage from '@/components/common/Message/Error.message';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import useDebounce from '@/hooks/useDebounce';
import { Vendor } from '@/types/users.type';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { Ellipsis } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const VendorManagement = () => {
  const [Vendors, setVendors] = useState<Vendor[] | []>([]);
  const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 3000);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotaltPage] = useState(1);
  const limit = 3;
  const [filterBlockedStatus, setFilterBlockedStatus] = useState<'all' | 'blocked' | 'unblocked'>('all');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

    useEffect(() => {
    if (!search) return; 

    const idleTimer = setTimeout(() => {
      console.log("Idle fetch triggered after 3s");
      fetchVendors(1); 
      setCurrentPage(1);
    }, 3000);

    return () => clearTimeout(idleTimer);
  }, [search]);
  
  const fetchVendors = async (page: number) => {
      setLoading(true);
    try {
      const params: GetServiceBoysParams = {
        page: page ? page : 1,
        limit: limit,
        search: debouncedSearch,
        isBlocked: true || false,
        sort: "name",   // optional
      };

      if (filterBlockedStatus == 'blocked') {
        params.isBlocked = true
      } else if (filterBlockedStatus == "unblocked") {
        params.isBlocked = false
      } else {
        delete params.isBlocked;
      }

      console.log("fetching with params:", params); 


      const result = await getVendors(params);
      if (result) {
        console.log("serviceBoy data in fornt end", result?.data)
        if (result?.data) {

          setVendors(result?.data.data);
          setCurrentPage(result?.data.pagination.page);
          setTotaltPage(result?.data.pagination.totalPages);
        }


        toast({
          description: <SuccessMessage message={result.message} className="" />,
        })
      }

    } catch (error) {
      toast({
        description: (
          <ErrorMessage message={getApiErrorMessage(error, "failed the paginated fetch")} />

        ),
      });
    }
     finally {
    setLoading(false); 
     }
  };

  const handleBlockToggle = async (id: string, action: string) => {
    try {
      const newStatus = action == "block";

      await updateServiceBoyBlockStatus(id, action);

      setVendors((prev) =>
        prev.map((sb) =>
          sb._id === id ? { ...sb, isBlocked: newStatus } : sb
        )
      );

      toast({
        description: <SuccessMessage message={`User has been ${newStatus ? "blocked" : "unblocked"}.`} className="" />,
      })

      // Optional: refresh the list if needed
      // await fetchServiceBoys(); // or your data reload function
    } catch (error) {
      console.error("Error updating block status:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Failed to update block status.",
      });
    }
  };

  const handleSingleUserPage = async (VendorDetail: Vendor) => {
    try {
      navigate(`/admin/vendors/${VendorDetail._id}`, { state: VendorDetail })

    } catch (error) {
      throw error
    }
  }


 useEffect(() => {
    fetchVendors(currentPage);
  }, [currentPage, filterBlockedStatus, debouncedSearch]);



  const columns = useMemo(() => [
    { key: 'name', label: 'Name' },
    { key: 'mobile', label: 'Mobile', render: (row: Vendor) => <span className="text-[#8B5CF6]">{row.mobile}</span> },
    { key: 'email', label: 'Email', render: (row: Vendor) => <span className="text-gray-300">{row.email}</span> },
    { key: 'estd', label: 'Estd' },
    { key: 'location', label: 'Location', render: (row: Vendor) => row.location?.address },
    {
      key: 'action',
      label: 'Action',
      render: (row: Vendor) => (
        <Button
          size="sm"
          variant={row.isBlocked ? 'constructive' : 'destructive'}
          onClick={() => handleBlockToggle(row._id, row.isBlocked ? 'unblock' : 'block')}
        >
          {row.isBlocked ? 'Unblock' : 'Block'}
        </Button>
      ),
    },
    {
      key: 'seeMore',
      label: 'See More',
      render: (row: Vendor) => (
        <Ellipsis
          className="cursor-pointer"
          onClick={() => handleSingleUserPage(row)}
        />
      ),
    },
  ], [handleBlockToggle]);

  console.log("Vendors form usm", Vendors)
  return (
    <div className="bg-surface rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">VendorManagement</h2>

        {/* Right Section: Search + Filter */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-3 pr-3 py-2 rounded-md bg-primary/10 border border-primary/20 placeholder:text-muted-foreground outline-none"
          />

          {/* Filter Dropdown */}
          <select
            value={filterBlockedStatus}
            onChange={(e) =>
              setFilterBlockedStatus(e.target.value as 'all' | 'blocked' | 'unblocked')
            }
            className="pl-3 pr-6 py-2 rounded-md bg-primary/10 border border-primary/20 text-foreground outline-none appearance-none relative"
          >
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="unblocked">Unblocked</option>
          </select>
        </div>
      </div>

    {/* Table or Loader */}
    {loading ? (
      <div className="flex justify-center items-center py-20">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-foreground">Loading service boys...</span>
      </div>
    ) : (
      <UserManagementTable
        data={Vendors}
        columns={columns}
        serialStart={limit * (currentPage - 1) + 1}
      />
    )}


      {/* Pagination (show only if not loading and has data) */}
{!loading && Vendors.length > 0 && (
  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => fetchVendors(page)}
  />
)}

  </div>
);
}


export default VendorManagement