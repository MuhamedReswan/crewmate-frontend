import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CreateEventModal } from '@/components/vendorComponent/Modals/EventCreateModal';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    
      const handleEventSubmit = (data: any) => {
        console.log('Event created:', data);
        // Here you would typically send the data to your API
      };

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
      date: '25/04/2040'
    },
    {
      slNo: 3,
      clientName: 'Jabir',
      eventType: 'Birthday',
      location: 'Calicut',
      reportingTime: '28:00 AM',
      status: 'Up coming',
      date: '25/04/2020'
    },
    {
      slNo: 3,
      clientName: 'Jabir',
      eventType: 'sitting',
      location: 'Calicut',
      reportingTime: '28:00 AM',
      status: 'Up coming',
      date: '25/04/2020'
    },
    {
      slNo: 3,
      clientName: 'Jabir',
      eventType: 'sitting',
      location: 'Calicut',
      reportingTime: '28:00 AM',
      status: 'Up coming',
      date: '25/04/2020'
    },
    {
      slNo: 3,
      clientName: 'Jabir',
      eventType: 'sitting',
      location: 'Calicut',
      reportingTime: '28:00 AM',
      status: 'Up coming',
      date: '25/04/2020'
    },
    {
      slNo: 235,
      clientName: 'Car insurance',
      eventType: 'Business type 2',
      location: 'Jesse Thomas',
      reportingTime: '$1200',
      status: 'Active',
      date: '25/04/2020'
    },
    {
      slNo: 235,
      clientName: 'Car insurance',
      eventType: 'Business type 2',
      location: 'Jesse Thomas',
      reportingTime: '$1200',
      status: 'Active',
      date: '25/04/2020'
    },
    {
      slNo: 235,
      clientName: 'Car insurance',
      eventType: 'Business type 2',
      location: 'Jesse Thomas',
      reportingTime: '$1200',
      status: 'In progress',
      date: '25/04/2020'
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses] || 'bg-muted text-muted-foreground'}`}>
        {status}
      </span>
    );
  };

  const filteredData = data.filter(item =>
    item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-background min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">All Works</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search now"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 px-4 py-2 border border-border rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button className="bg-primary hover:bg-primary-hover text-primary-foreground"
          onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Work
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-table-header text-table-header-foreground">
                <th className="px-6 py-4 text-left text-sm font-medium">Sl No</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Client name</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Event type</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Reporting time</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
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
         <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
      />

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-table-border bg-card">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
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
                    className={`h-8 w-8 p-0 ${
                      currentPage === pageNum 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-accent'
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(9)}
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    9
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(10)}
                    className="h-8 w-8 p-0 hover:bg-accent"
                  >
                    10
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;