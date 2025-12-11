// import { ArrowLeft, MapPin } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';

// interface EventLocation {
//   lat: number;
//   lng: number;
//   address: string;
// }

// interface Vendor {
//   _id: string;
//   name: string;
//   email: string;
//   mobile: string;
// }

// interface EventData {
//   _id: string;
//   customerName: string;
//   eventLocation: EventLocation;
//   noOfPax: number;
//   overTime: number;
//   reportingDateTime: string;
//   serviceBoys: number;
//   status: string;
//   totalBill: number;
//   travelExpense: number;
//   typeOfService: string;
//   typeOfWork: string;
//   vendor: Vendor;
//   bonus?: number;
//   createdAt: string;
//   updatedAt: string;
// }

// interface EventDetailsProps {
//   event: EventData;
//   onCancel?: () => void;
//   onUpdate?: () => void;
//   onCloseBooking?: () => void;
//   onBack?: () => void;
// }

// const EventDetails = ({ 
//   event, 
//   onCancel, 
//   onUpdate, 
//   onCloseBooking,
//   onBack 
// }: EventDetailsProps) => {

//   const formatDateTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return {
//       date: date.toLocaleDateString('en-US', { 
//         year: 'numeric', 
//         month: '2-digit', 
//         day: '2-digit' 
//       }),
//       time: date.toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit',
//         hour12: true 
//       })
//     };
//   };

//   const { date, time } = formatDateTime(event.reportingDateTime);

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//         return 'bg-success text-success-foreground';
//       case 'created':
//         return 'bg-primary text-primary-foreground';
//       case 'cancelled':
//         return 'bg-destructive text-destructive-foreground';
//       default:
//         return 'bg-muted text-muted-foreground';
//     }
//   };

//   const getPaymentStatusColor = (totalBill: number) => {
//     return totalBill > 0 ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground';
//   };

//   const getPaymentStatusText = (totalBill: number) => {
//     return totalBill > 0 ? 'Paid' : 'Paid or Pending';
//   };

//   return (
//     <div className="max-h-screen mx-auto w-full h-full bg-surface shadow-sm p-8 pt-10 md:p-8">
//       {/* Header with Back Arrow */}
//       <div className="mb-6 flex items-center gap-4">
//         <button
//           onClick={onBack}
//           className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
//           aria-label="Go back"
//         >
//           <ArrowLeft className="w-5 h-5 text-primary" />
//         </button>
//         <h1 className="text-2xl font-semibold text-foreground">
//           {/* {event.status.charAt(0).toUpperCase() + event.status.slice(1)} Work Details */}
//           Event Details
//         </h1>
//       </div>

//       {/* Event Details Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Customer Name</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.customerName}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Date of Event</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {date}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Type of Work</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm capitalize">
//               {event.typeOfWork}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Reporting Time</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {time}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Location</label>
//             <div className="flex gap-2 w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
//               <p className="flex-1 text-muted-foreground">
//                 {event.eventLocation.address}
//               </p>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Type of Service</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm capitalize">
//               {event.typeOfService.replace(/([A-Z])/g, ' $1').trim()}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Number of Pax</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.noOfPax}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Wage Amount</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.totalBill}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Travel Expense Amount</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.travelExpense}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Over Time Amount</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.overTime}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Status</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               <Badge className={getStatusColor(event.status)}>
//                 {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
//               </Badge>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Payment Status</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               <Badge className={getPaymentStatusColor(event.totalBill)}>
//                 {getPaymentStatusText(event.totalBill)}
//               </Badge>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Service Boys</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.serviceBoys}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm text-muted-foreground mb-1.5">Bonus</label>
//             <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
//               {event.bonus || 0}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-8 ">
//         <Button
//           variant="destructive"
//           onClick={onCancel}
//           className="px-5 py-2 text-sm font-medium"
//         >
//           Cancel Event
//         </Button>
//         <Button
//           variant="default"
//           onClick={onCloseBooking}
//           className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
//         >
//           Close Booking
//         </Button>
//         <Button
//           variant="default"
//           onClick={onUpdate}
//           className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
//         >
//           Update
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;


import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calender';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { EventUpdateFormValues } from '@/types/form.type';
import { eventUpdateSchema } from '@/validation/validationSchema';
import { BookingStatus, EventStatus } from '@/types/enum.type';
import { Label } from '../ui/label';
import MapPicker from '../common/MapPicker/MapPicker';
import { useLocationSelector } from '@/hooks/useLocationSelector';
import { Event } from '@/types/type';



interface EventDetailsProps {
  event: Event;
  onCancel?: () => void;
  onUpdate?: (data:  Partial<EventUpdateFormValues>) => void;
  onCloseBooking?: () => void;
  onBack?: () => void;
  isUpdating ?: boolean;
}



const EventDetails = ({
  event,
  onCancel,
  onUpdate,
  onCloseBooking,
  onBack,
  isUpdating
}: EventDetailsProps) => {
  const [editMode, setEditMode] = useState(false);
  // const [isUpdating, setIsUpdating] = useState(false);
  const [completedEvent, setCompletedEvent] = useState(event?.status == EventStatus.Completed || false);
  const [mapVisible, setMapVisible] = useState(false);
  const initialEventRef = useRef<Event | null>(null);
  

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<EventUpdateFormValues>({
    mode: "onChange",
    resolver: zodResolver(eventUpdateSchema),
  });

  const { handleLocationSelect } = useLocationSelector(
  setValue,
  "eventLocation",
  undefined,
  setMapVisible
);


  // Initialize form with event data
  useEffect(() => {
    if (event) {
      initialEventRef.current = event;
      reset({
        customerName: event.customerName,
        typeOfWork: event.typeOfWork,
        typeOfService: event.typeOfService,
        noOfPax: event.noOfPax,
        serviceBoys: event.serviceBoys,
        reportingDateTime: new Date(event.reportingDateTime),
        eventLocation: event.eventLocation,
        status: event.status,
        totalBill: event.totalBill,
        bonus: event.bonus || 0,
        overTime: event.overTime,
        travelExpense: event.travelExpense,
      });
    }
  }, [event, reset]);

  const watchedDate = watch('reportingDateTime');
  const watchedLocation = watch('eventLocation');

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const { date, time } = formatDateTime(event.reportingDateTime);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'created':
        return 'bg-primary text-primary-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (totalBill: number) => {
    return totalBill > 0 ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground';
  };

  const getPaymentStatusText = (totalBill: number) => {
    return totalBill > 0 ? 'Paid' : 'Paid or Pending';
  };

  // const handleLocationSelect = (location: EventLocation) => {
  //   setValue('eventLocation', location);
  // };

  
  // const onSubmit = async (data: EventUpdateFormValues) => {
  //   setIsUpdating(true);
  //   try {
  //     if (onUpdate) {
  //       await onUpdate(data);
  //     }
  //     setEditMode(false);
  //   } catch (error) {
  //     console.error('Update failed:', error);
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const onSubmit = async (data: EventUpdateFormValues) => {
  const initial = initialEventRef.current;
  if (!initial) return;

  const changedValues: Partial<EventUpdateFormValues> = {};

  // 1️⃣ Compare customerName
  if (data.customerName !== initial.customerName) {
    changedValues.customerName = data.customerName;
  }

  // 2️⃣ Compare status
  if (data.status !== initial.status) {
    changedValues.status = data.status;
  }

  // 3️⃣ Compare typeOfWork
  if (data.typeOfWork !== initial.typeOfWork) {
    changedValues.typeOfWork = data.typeOfWork;
  }

  // 4️⃣ Compare typeOfService
  if (data.typeOfService !== initial.typeOfService) {
    changedValues.typeOfService = data.typeOfService;
  }

  // 5️⃣ Compare noOfPax
  if (data.noOfPax !== initial.noOfPax) {
    changedValues.noOfPax = data.noOfPax;
  }

  // 6️⃣ Compare serviceBoys
  if (data.serviceBoys !== initial.serviceBoys) {
    changedValues.serviceBoys = data.serviceBoys;
  }

  // 7️⃣ Compare reportingDateTime (as Date)
  const initialDate = new Date(initial.reportingDateTime);
  if (initialDate.getTime() !== data.reportingDateTime.getTime()) {
    changedValues.reportingDateTime = data.reportingDateTime;
  }

  // 8️⃣ Compare eventLocation (deep compare)
  if (JSON.stringify(data.eventLocation) !== JSON.stringify(initial.eventLocation)) {
    changedValues.eventLocation = data.eventLocation;
  }

  // 9️⃣ Compare bonus
  if (data.bonus !== initial.bonus) {
    changedValues.bonus = data.bonus;
  }

  // 🔟 Compare overTime
  if (data.overTime !== initial.overTime) {
    changedValues.overTime = data.overTime;
  }

  // 1️⃣1️⃣ Compare travelExpense
  if (data.travelExpense !== initial.travelExpense) {
    changedValues.travelExpense = data.travelExpense;
  }

  // 1️⃣2️⃣ Compare totalBill
  if (data.totalBill !== initial.totalBill) {
    changedValues.totalBill = data.totalBill;
  }

  console.log("Changed values:", changedValues);

  await onUpdate?.(changedValues);
};


  const handleCancel = () => {
    setEditMode(false);
    reset();
  };

  return (
    <div className="min+-h-screen mx-auto w-full bg-surface shadow-sm p-8 pt-10 md:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header with Back Arrow */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <h1 className="text-2xl font-semibold text-foreground">
              Event Details
            </h1>
          </div>

          {editMode && !completedEvent && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Event Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Customer Name</label>
              {editMode ? (
                <>
                  <input
                    type="text"
                    {...register('customerName')}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.customerName ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter customer name"
                  />
                  {errors.customerName && (
                    <p className="text-destructive text-xs mt-1">{errors.customerName.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.customerName}
                </div>
              )}
            </div>

            {/* <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Date of Event</label>
              {editMode ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background",
                          !watchedDate && "text-muted-foreground",
                          errors.reportingDateTime && "border-destructive"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {watchedDate ? format(watchedDate, "PPP p") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={watchedDate}
                        onSelect={(date) => setValue('reportingDateTime', date || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.reportingDateTime && (
                    <p className="text-destructive text-xs mt-1">{errors.reportingDateTime.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {date}
                </div>
              )}
            </div> */}

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Date of Event
              </label>

              {editMode && !completedEvent ? (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background",
                          !watchedDate && "text-muted-foreground",
                          errors.reportingDateTime && "border-destructive"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {watchedDate ? format(watchedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={watchedDate}
                        onSelect={(selectedDate) => {
                          if (!selectedDate) return;

                          // OLD TIME
                          const oldDateTime = watchedDate
                            ? new Date(watchedDate)
                            : new Date(event.reportingDateTime);

                          const hours = oldDateTime.getHours();
                          const minutes = oldDateTime.getMinutes();

                          // MERGE NEW DATE + OLD TIME
                          const updatedDate = new Date(selectedDate);
                          updatedDate.setHours(hours);
                          updatedDate.setMinutes(minutes);

                          setValue("reportingDateTime", updatedDate, {
                            shouldValidate: true,
                          });
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {errors.reportingDateTime && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.reportingDateTime.message}
                    </p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {date}
                </div>
              )}
            </div>


            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Type of Work</label>
              {editMode && !completedEvent ? (
                <>
                  <Select
                    value={watch('typeOfWork')}
                    onValueChange={(value) => setValue('typeOfWork', value)}
                  >
                    <SelectTrigger className={cn(
                      "w-full bg-background",
                      errors.typeOfWork && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="reception">Reception</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.typeOfWork && (
                    <p className="text-destructive text-xs mt-1">{errors.typeOfWork.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm capitalize">
                  {event.typeOfWork}
                </div>
              )}
            </div>

            {/* <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Reporting Time</label>
              <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                {time}
              </div>
            </div> */}

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                Reporting Time
              </label>

              {editMode && !completedEvent ? (
                <>
                  <input
                    type="time"
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      errors.reportingDateTime ? "border-destructive" : "border-primary/20"
                    )}
                    value={
                      watchedDate
                        ? format(watchedDate, "HH:mm")
                        : format(new Date(event.reportingDateTime), "HH:mm")
                    }
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(":").map(Number);

                      // get current date or event date
                      const updatedDate = watchedDate
                        ? new Date(watchedDate)
                        : new Date(event.reportingDateTime);

                      updatedDate.setHours(hours);
                      updatedDate.setMinutes(minutes);

                      // update form state
                      setValue("reportingDateTime", updatedDate, { shouldValidate: true });
                    }}
                  />

                  {errors.reportingDateTime && (
                    <p className="text-destructive text-xs mt-1">
                      {errors.reportingDateTime.message}
                    </p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {time}
                </div>
              )}
            </div>

                     {/* Location */}
                      <div className="space-y-1">
                        <Label className="text-sm text-muted-foreground">Location</Label>
                        <div 
                          className="flex w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm"
                          onClick={() => editMode && setMapVisible(true)}
                        >
                          <MapPin className="h-5 w-5 text-primary mr-3" />
                          <p className="flex-1 text-foreground overflow-hidden whitespace-nowrap">
                            {watchedLocation?.address || 'Choose location'}
                          </p>
                        </div>
                        {errors.eventLocation && (
                          <p className="text-destructive text-xs mt-1">
                            {errors.eventLocation.message}
                          </p>
                        )}
                      </div>
                        {/* Map Picker */}
          {mapVisible && editMode && !completedEvent  && (
            <MapPicker 
              onClose={() => setMapVisible(false)} 
              onSelectLocation={handleLocationSelect}
            />
          )}

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Type of Service</label>
              {editMode && !completedEvent ? (
                <>
                  <Select
                    value={watch('typeOfService')}
                    onValueChange={(value) => setValue('typeOfService', value)}
                  >
                    <SelectTrigger className={cn(
                      "w-full bg-background",
                      errors.typeOfService && "border-destructive"
                    )}>
                      <SelectValue placeholder="Select service type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="islamicBuffet">Islamic Buffet</SelectItem>
                      <SelectItem value="regularBuffet">Regular Buffet</SelectItem>
                      <SelectItem value="platedService">Plated Service</SelectItem>
                      <SelectItem value="cocktailService">Cocktail Service</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.typeOfService && (
                    <p className="text-destructive text-xs mt-1">{errors.typeOfService.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm capitalize">
                  {event.typeOfService.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Number of Pax</label>
              {editMode && !completedEvent ? (
                <>
                  <input
                    type="number"
                    {...register('noOfPax', { valueAsNumber: true })}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.noOfPax ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter number of guests"
                  />
                  {errors.noOfPax && (
                    <p className="text-destructive text-xs mt-1">{errors.noOfPax.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.noOfPax}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Wage per Boy</label>
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event?.wagePerBoy ?? 300}
                </div>
             
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Travel Expense Amount</label>
              {editMode ? (
                <>
                  <input
                    disabled
                    type="number"
                    {...register('travelExpense', { valueAsNumber: true })}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.travelExpense ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter travel expense"
                  />
                  {errors.travelExpense && (
                    <p className="text-destructive text-xs mt-1">{errors.travelExpense.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.travelExpense}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Over Time Amount</label>
              {editMode && completedEvent ? (
                <>
                  <input
                    type="number"
                    {...register('overTime', { valueAsNumber: true })}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.overTime ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter overtime amount"
                  />
                  {errors.overTime && (
                    <p className="text-destructive text-xs mt-1">{errors.overTime.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.overTime}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Status</label>
              {editMode ? (
                <Select
                  value={watch('status')}
                  onValueChange={(value) => setValue('status', value)}
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Created</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </Badge>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Payment Status</label>
              <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                <Badge className={getPaymentStatusColor(event.totalBill)}>
                  {getPaymentStatusText(event.totalBill)}
                </Badge>
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Service Boys</label>
              {editMode ? (
                <>
                  <input
                    type="number"
                    {...register('serviceBoys', { valueAsNumber: true })}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.serviceBoys ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter number of service boys"
                  />
                  {errors.serviceBoys && (
                    <p className="text-destructive text-xs mt-1">{errors.serviceBoys.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.serviceBoys}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Bonus</label>
              {editMode ? (
                <>
                  <input
                    type="number"
                    {...register('bonus', { valueAsNumber: true })}
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.bonus ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter bonus amount"
                  />
                  {errors.bonus && (
                    <p className="text-destructive text-xs mt-1">{errors.bonus.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.bonus || 0}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">Total Bill</label>
              {editMode ? (
                <>
                  <input
                    type="number"
                    {...register('totalBill', { valueAsNumber: true })}
                    disabled
                    className={cn(
                      "w-full px-4 py-2.5 bg-background border rounded-lg text-sm",
                      "focus:ring-1 focus:ring-primary focus:border-primary",
                      errors.totalBill ? "border-destructive" : "border-primary/20"
                    )}
                    placeholder="Enter wage amount"
                  />
                  {errors.totalBill && (
                    <p className="text-destructive text-xs mt-1">{errors.totalBill.message}</p>
                  )}
                </>
              ) : (
                <div className="w-full px-4 py-2.5 bg-background border border-primary/20 rounded-lg text-sm">
                  {event.totalBill}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-4 mt-8">
          {!editMode ? (
            <>
              <Button
                type="button"
                variant="destructive"
                onClick={onCancel}
                className="px-5 py-2 text-sm font-medium"
              >
                Cancel Event
              </Button>
              <Button
                type="button"
                disabled={event.bookingStatus === BookingStatus.Completed || event.bookingStatus === BookingStatus.Cancelled}
                variant="default"
                onClick={onCloseBooking}
                className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
              >
               {event.bookingStatus == BookingStatus.Stopped ? "Restart Booking" : "Close Booking" } 
              </Button>
              <Button

                type="button"
                variant="default"
                onClick={() => setEditMode(true)}
                className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
              >
                Update
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary/90"
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventDetails;


