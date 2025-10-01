
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus, Search, Calendar, CalendarIcon } from 'lucide-react';

import { CreateEventModal } from '@/components/vendorComponent/Modals/EventCreateModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calender';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { CreateEvent, getEvents } from '@/api/vendor/vendor';
import ErrorMessage from '@/components/common/Message/Error.message';
import { useToast } from '@/hooks/use-toast';
import { Messages } from '@/types/enum.type';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';
import { Event } from '@/types/type';
import useDebounce from '@/hooks/useDebounce';

interface TableData {
  slNo: number;
  clientName: string;
  eventType: string;
  location: string;
  reportingTime: string;
  status: 'Completed' | 'On going' | 'Up coming' | 'Active' | 'In progress';
  date: string;
}

const Events = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [dateFilter, setDateFilter] = useState<string>('all');
  // const [customDateFrom, setCustomDateFrom] = useState<Date>();
  // const [customDateTo, setCustomDateTo] = useState<Date>();
  // const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [customDateFrom, setCustomDateFrom] = useState<Date>();
  const [customDateTo, setCustomDateTo] = useState<Date>();
  const [isCustomDateOpen, setIsCustomDateOpen] = useState(false);
  const [events, setEvents] = useState<Event[] >([]);
  const [loading, setLoading] = useState(false);
  // const [totalPages, setTotaltPage] = useState(1);
  const limit = 5;
  // let startIndex =1
  // let endIndex =5

  const debouncedSearch = useDebounce(searchTerm, 3000);
  const vendorData = useSelector((state: RootState) => state.vendor.vendorData);
  const { toast } = useToast();
  

   useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const handleEventSubmit = async (data: any) => {
    try {
      if (!vendorData?._id) {
      toast({
        description: <ErrorMessage message="Vendor not logged in!" />,
      });
      return;
    }

    const payload = {
      ...data,
      vendorId: vendorData._id,
    };
      
      const response = await CreateEvent(payload);
      if(!response?.data){
           toast({
              description: (
                <ErrorMessage message={Messages.FAILED_TO_CREATE_EVENT} />
              ),
            });
      }
      if( response && response?.statusCode === 201){
 toast({ description: <SuccessMessage message={response.message || Messages.EVENT_CREATION_SUCCESS} /> });
      }

    } catch (error) {
  toast({
          description: <ErrorMessage message={getApiErrorMessage(error, Messages.FAILED_TO_CREATE_EVENT)} />,
        });
    }

    console.log('Event created:', data);
    // Here you would typically send the data to your API
  };

  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter, dateFilter]);


  // Sample data matching the image
  const data: TableData[] = [
    {
      slNo: 1,
      clientName: 'Ajmal',
      eventType: 'Wedding',
      location: 'Kottakal',
      reportingTime: '2:00 PM',
      status: 'Completed',
      date: '25/04/2024'
    },
    {
      slNo: 2,
      clientName: 'Anas',
      eventType: 'Birthday',
      location: 'Ullur',
      reportingTime: '2:00 PM',
      status: 'On going',
      date: '25/04/2024'
    },
    {
      slNo: 3,
      clientName: 'Jabir',
      eventType: 'Birthday',
      location: 'Calicut',
      reportingTime: '10:00 AM',
      status: 'Up coming',
      date: '25/04/2024'
    },
    {
      slNo: 4,
      clientName: 'Ravi',
      eventType: 'Conference',
      location: 'Cochin',
      reportingTime: '9:00 AM',
      status: 'Active',
      date: '26/04/2024'
    },
    {
      slNo: 5,
      clientName: 'Priya',
      eventType: 'Corporate',
      location: 'Trivandrum',
      reportingTime: '11:00 AM',
      status: 'In progress',
      date: '27/04/2024'
    },
    {
      slNo: 6,
      clientName: 'Suresh',
      eventType: 'Wedding',
      location: 'Munnar',
      reportingTime: '3:00 PM',
      status: 'Up coming',
      date: '28/04/2024'
    },
    {
      slNo: 7,
      clientName: 'Maya',
      eventType: 'Anniversary',
      location: 'Alleppey',
      reportingTime: '5:00 PM',
      status: 'Completed',
      date: '29/04/2024'
    },
    {
      slNo: 8,
      clientName: 'Kiran',
      eventType: 'Birthday',
      location: 'Wayanad',
      reportingTime: '1:00 PM',
      status: 'On going',
      date: '30/04/2024'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Completed': 'bg-status-completed text-white',
      'On going': 'bg-status-ongoing text-white',
      'Up coming': 'bg-status-upcoming text-white',
      'Active': 'bg-status-active text-white',
      'In progress': 'bg-status-progress text-white'
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-muted text-muted-foreground'}`}>
        {status}
      </span>
    );
  };

  const getFilteredDataByDate = (data: TableData[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateFilter) {
      case 'last7days': {
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return data.filter(item => {
          const itemDate = new Date(item.date.split('/').reverse().join('-'));
          return itemDate >= sevenDaysAgo && itemDate <= today;
        });
      }
      case 'lastMonth': {
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return data.filter(item => {
          const itemDate = new Date(item.date.split('/').reverse().join('-'));
          return itemDate >= lastMonth && itemDate <= today;
        });
      }
      case 'lastYear': {
        const lastYear = new Date(today);
        lastYear.setFullYear(lastYear.getFullYear() - 1);
        return data.filter(item => {
          const itemDate = new Date(item.date.split('/').reverse().join('-'));
          return itemDate >= lastYear && itemDate <= today;
        });
      }
      case 'custom': {
        if (!customDateFrom || !customDateTo) return data;
        return data.filter(item => {
          const itemDate = new Date(item.date.split('/').reverse().join('-'));
          return itemDate >= customDateFrom && itemDate <= customDateTo;
        });
      }
      default:
        return data;
    }
  };

  const filteredData = getFilteredDataByDate(data)
  .filter(item =>
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .filter(item =>
    statusFilter === 'all' ? true : item.status === statusFilter
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);


  useEffect(() => {
fetchEvents(1)
    }, [debouncedSearch, statusFilter, dateFilter, customDateFrom, customDateTo, currentPage]);


  const fetchEvents = async (page: number) => {
    try {
      const params: any = {
        search: debouncedSearch,
        status: statusFilter !== "all" ? statusFilter : undefined,
        page: page,
        limit: limit,
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
if(vendorData?._id){
  const response = await getEvents(params,vendorData._id);
  console.log("api response on event fetc",response)
  if(response?.data){

    setEvents(response?.data);
  }
  // you can also store pagination info
  // setTotalPages(response.pagination.totalPages);
}
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };


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



  {/* Add Event Button */}
  <Button 
    className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium px-4 py-2.5 shadow-sm"
    onClick={() => setIsModalOpen(true)}
  >
    <Plus className="h-4 w-4 mr-2" />
    Add Event
  </Button>
</div>

</div>


      {/* Table */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="overflow-x-auto max-h-[350px] overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-primary/50 text-table-header-foreground">
                <th className="px-6 py-4 text-left text-sm font-semibold">Sl No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Client Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Event Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Reporting Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
               {/* {events && data.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-table-border ${
                    index % 2 === 0 ? 'bg-table-row-even' : 'bg-table-row-odd'
                  } hover:bg-white transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-card-foreground font-medium">{index+1}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground font-medium">{item.customerName}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.typeOfWork}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.typeOfService}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.eventLocation.address}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.reportingTime}</td>
                  <td className="px-6 py-4 text-sm">{item.status}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{format(new Date(item.date), "dd-MM-yyyy")}</td>
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
              ))} */}

              {currentData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-table-border ${
                    index % 2 === 0 ? 'bg-table-row-even' : 'bg-table-row-odd'
                  } hover:bg-accent/50 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.slNo}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.clientName}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.eventType}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.location}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.reportingTime}</td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-sm text-card-foreground">{item.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-accent"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-table-border bg-card">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{startIndex + 1}</span> to <span className="font-medium text-foreground">{Math.min(endIndex, events.length)}</span> of <span className="font-medium text-foreground">{events.length}</span> entries
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
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 p-0 ${
                      currentPage === pageNum 
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
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-9 w-9 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
      />
    </div>
  );
};

export default Events;