import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';
import { CreateEventModal } from './Modals/EventCreateModal';

export function EventCreationDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventSubmit = (data: any) => {
    console.log('Event created:', data);
    // Here you would typically send the data to your API
  };

  return (
    <div className="p-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Event Management</h2>
        <p className="text-muted-foreground">Create and manage events with location selection</p>
        
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Event
        </Button>
      </div>

      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEventSubmit}
      />
    </div>
  );
}