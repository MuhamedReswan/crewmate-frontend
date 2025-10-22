
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Search, CalendarIcon, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calender';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/types/enum.type';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import useDebounce from '@/hooks/useDebounce';
import { getWorks } from '@/api/serviceBoy/serviceBoy';


const Works = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [customDateFrom, setCustomDateFrom] = useState<Date>();
  const [customDateTo, setCustomDateTo] = useState<Date>();
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [works, setWorks] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalItems: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const debouncedSearch = useDebounce(searchTerm, 3000);
  const serviceBoyData = useSelector((state: RootState) => state.serviceBoy.serviceBoyData);
  const { toast } = useToast();
  

   useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter]);
  
  const startIndex = (currentPage - 1) * pagination?.limit;
  const endIndex = startIndex + pagination?.limit;

 useEffect(() => {
          setCurrentPage(1);
        }, [searchTerm, statusFilter, dateFilter]);

  useEffect(() => {
    fetchWorks(currentPage)
  }, [debouncedSearch, statusFilter, dateFilter, customDateFrom, customDateTo, currentPage]);


  const fetchWorks = async (page: number) => {
    try {
      setLoading(true);
      const params: any = {
        search: debouncedSearch,
        status: statusFilter !== "all" ? statusFilter : undefined,
        page: page,

        limit: pagination.limit,
      };

      if (dateFilter === "custom" && customDateFrom && customDateTo) {
        params.from = customDateFrom.toISOString();
        params.to = customDateTo.toISOString();
      } else if (dateFilter === "last7days") {
        const to = new Date();
        const from = new Date();
        from.setDate(to.getDate() - 7);
        params.from = from.toISOString();
        params.to = to.toISOString();
      } else if (dateFilter === "lastMonth") {
        const to = new Date();
        const from = new Date();
        from.setMonth(to.getMonth() - 1);
        params.from = from.toISOString();
        params.to = to.toISOString();
      } else if (dateFilter === "lastYear") {
        const to = new Date();
        const from = new Date();
        from.setFullYear(to.getFullYear() - 1);
        params.from = from.toISOString();
        params.to = to.toISOString();
      }

       
        
        const startIndex = (currentPage - 1) * pagination?.limit;
        const endIndex = startIndex + pagination?.limit;

      if (serviceBoyData?._id) {
              const response = await getWorks(params, serviceBoyData._id);
      
              console.log('works response.data',response?.data);
              if (response?.statusCode === 200 && response.data) {
                const { data: workData, pagination } = response.data;
                setWorks(workData || []);
                setPagination(pagination || pagination);
                setCurrentPage(pagination.page);
                toast({ description: <SuccessMessage message={response.message || Messages.EVENTS_lOAD_SUCCESS} /> });
      
              }
              console.log("works",works)
            }

    } catch (error) {
      console.error("Failed to fetch works:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Debug works:", { works })
  return (
    <div className="w-full bg-surface min-h-screen p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4  pe-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">

          {/* Search Input */}
          <div className="relative w-52">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-input rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36 bg-white border-input">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="On going">On going</SelectItem>
              <SelectItem value="Up coming">Up coming</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In progress">In progress</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Filter */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-36 bg-white border-input">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="lastYear">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {/* Custom Date Range */}
          {dateFilter === 'custom' && (
            <Popover open={isCustomDateOpen} onOpenChange={setIsCustomDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-52 justify-start text-left font-normal bg-card border-input"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {customDateFrom && customDateTo
                    ? `${format(customDateFrom, 'MMM dd')} - ${format(customDateTo, 'MMM dd, yyyy')}`
                    : <span className="text-muted-foreground">Pick date range</span>
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="flex">
                  <div className="p-3">
                    <div className="text-sm font-medium mb-2">From</div>
                    <CalendarComponent
                      mode="single"
                      selected={customDateFrom}
                      onSelect={setCustomDateFrom}
                    />
                  </div>
                  <div className="p-3 border-l">
                    <div className="text-sm font-medium mb-2">To</div>
                    <CalendarComponent
                      mode="single"
                      selected={customDateTo}
                      onSelect={setCustomDateTo}
                    />
                  </div>
                </div>
                <div className="border-t p-3 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setCustomDateFrom(undefined);
                      setCustomDateTo(undefined);
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setIsCustomDateOpen(false)}
                    disabled={!customDateFrom || !customDateTo}
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}

        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="overflow-x-auto max-h-[450px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-primary/50 text-table-header-foreground">
                <th className="px-6 py-4 text-left text-sm font-semibold">Sl No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Event Team Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Event Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Service Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">vaccancy</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Reporting Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>

              {loading ? (
                <tr>
                  <td colSpan={10}>
                    <div className="flex justify-center items-center py-10 text-muted-foreground">
                      <Loader2 className="h-6 w-6 mr-2 animate-spin text-primary" />
                      Loading works...
                    </div>
                  </td>
                </tr>
              ) :
                works.length > 0 ? (
                  works.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-table-border ${index % 2 === 0 ? 'bg-table-row-even' : 'bg-table-row-odd'
                        } hover:bg-white transition-colors`}
                    >
                      <td className="px-6 py-4 text-sm text-card-foreground font-medium">
                        {(pagination.limit * (pagination.page - 1)) + index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-card-foreground font-medium">{item.vendor.name}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">{item.typeOfWork}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">{item.typeOfService}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">{item?.eventLocation?.address ?? "location"}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">{item.serviceBoys}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">
                        {item.reportingDateTime
                          ? `Reporting ${format(new Date(item.reportingDateTime), "hh:mm a")}`
                          : "No time"}
                      </td>
                      <td className="px-6 py-4 text-sm">{item.status}</td>
                      <td className="px-6 py-4 text-sm text-card-foreground">
                        {item.reportingDateTime
                          ? format(new Date(item.reportingDateTime), "dd-MM-yyyy")
                          : "No date"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-accent text-muted-foreground hover:text-foreground"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center py-6 text-sm font-medium bg-accent/40 text-accent-foreground rounded-md"
                    >

                      No works found.
                    </td>
                  </tr>
                )}
            </tbody>

          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-table-border bg-card">
          <div className="text-sm text-muted-foreground">

            Showing <span>{startIndex + 1}</span> to <span>{Math.min(endIndex, pagination.totalItems)}</span> of <span>{pagination.totalItems}</span> entries
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-9 w-9 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum;
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 p-0 ${currentPage === pageNum
                      ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                      : 'hover:bg-accent'
                      }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
              disabled={currentPage === pagination.totalPages}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;