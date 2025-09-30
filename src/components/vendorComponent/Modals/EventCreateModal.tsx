import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue}
import { Calendar, MapPin, X } from 'lucide-react';
// import MapPreview from '@/components/common/MapPreview/MapPreview';
import MapPicker from '@/components/common/MapPicker/MapPicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateEventModalProps, EventFormData, LocationData } from '@/types/form.type';
import { eventSchema } from '@/validation/validationSchema';



export function CreateEventModal({ isOpen, onClose, onSubmit }: CreateEventModalProps) {
  const [location, setLocation] = useState<LocationData | undefined>(undefined);
  const [mapVisible, setMapVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventLocation: undefined
    }
  });

    const formValues = watch();
  console.log("formValues from event creation", formValues)

  const handleLocationSelect = (selectedLocation: LocationData ) => {
    console.log("selectedLocation",selectedLocation)
    setLocation(selectedLocation);
   setValue('eventLocation', {
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
    address: selectedLocation.address,
  }, { shouldValidate: true });
    setMapVisible(false);
  };

  const onFormSubmit = (data: EventFormData) => {
    onSubmit(data);
    reset();
    setLocation(undefined);
    setMapVisible(false);
    onClose();
  };

  const handleClose = () => {
    reset();
    setLocation(undefined);
    setMapVisible(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] bg-background border-border overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <DialogTitle className="text-lg font-semibold text-foreground">
            Create New Event
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
          >
            {/* <X className="h-4 w-4" /> */}
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Customer Name */}
          <div className="space-y-1">
            <Label htmlFor="customerName" className="text-sm text-muted-foreground">
              Customer Name
            </Label>
            <Input
              id="customerName"
              placeholder="Name of customer"
              className="bg-accent/10 border-border text-foreground placeholder:text-muted-foreground"
              {...register('customerName')}
            />
            {errors.customerName && (
              <p className="text-destructive text-xs mt-1">
                {errors.customerName.message}
              </p>
            )}
          </div>

          {/* Type of Service */}
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Type of Service</Label>
            <Select onValueChange={(value:string) => setValue('typeOfService', value)}>
              <SelectTrigger className="bg-accent/10 border-border text-foreground">
                <SelectValue placeholder="Your First Name" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="islamicBuffet">Islamic Buffet</SelectItem>
                <SelectItem value="buffet">Buffet</SelectItem>
                <SelectItem value="sitting">Sitting</SelectItem>
              </SelectContent>
            </Select>
            {errors.typeOfService && (
              <p className="text-destructive text-xs mt-1">
                {errors.typeOfService.message}
              </p>
            )}
          </div>

          {/* Type of Work */}
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Type of Work</Label>
            <Select onValueChange={(value:string) => setValue('typeOfWork', value)}>
              <SelectTrigger className="bg-accent/10 border-border text-foreground">
                <SelectValue placeholder="Your First Name" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="reception">Reception</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            {errors.typeOfWork && (
              <p className="text-destructive text-xs mt-1">
                {errors.typeOfWork.message}
              </p>
            )}
          </div>

          {/* No of Pax */}
          <div className="space-y-1">
            <Label htmlFor="noOfPax" className="text-sm text-muted-foreground">
              No of Pax
            </Label>
            <Input
              id="noOfPax"
              placeholder="Your First Name"
             type="number"
              className="bg-accent/10 border-border text-foreground placeholder:text-muted-foreground"
              {...register('noOfPax')}
            />
            {errors.noOfPax && (
              <p className="text-destructive text-xs mt-1">
                {errors.noOfPax.message}
              </p>
            )}
          </div>

          {/* Reporting Time */}
          <div className="space-y-1">
            <Label htmlFor="reportingTime" className="text-sm text-muted-foreground">
              Reporting time
            </Label>
            <Input
              id="reportingTime"
              type="time"
              className="bg-accent/10 border-border text-foreground"
              {...register('reportingTime')}
            />
            {errors.reportingTime && (
              <p className="text-destructive text-xs mt-1">
                {errors.reportingTime.message}
              </p>
            )}
          </div>

          {/* Number of Boys */}
          <div className="space-y-1">
            <Label htmlFor="numberOfBoys" className="text-sm text-muted-foreground">
              Number of Boys
            </Label>
            <Input
              id="numberOfBoys"
              placeholder="Your First Name"
              type="number"
              className="bg-accent/10 border-border text-foreground placeholder:text-muted-foreground"
              {...register('serviceBoys')}
            />
            {errors.serviceBoys && (
              <p className="text-destructive text-xs mt-1">
                {errors.serviceBoys.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">Location</Label>
            <div 
              className="relative flex items-center bg-accent/10 border border-border rounded-md px-3 py-2 cursor-pointer hover:bg-accent/20 transition-colors"
              onClick={() => setMapVisible(true)}
            >
              <MapPin className="h-5 w-5 text-primary mr-3" />
              <p className="flex-1 text-foreground overflow-hidden whitespace-nowrap">
                {location?.address || 'Choose location'}
              </p>
            </div>
            {errors.eventLocation && (
              <p className="text-destructive text-xs mt-1">
                {errors.eventLocation.message}
              </p>
            )}
          </div>

          {/* Location Preview */}
          {/* {location && !mapVisible && (
            <div className="w-full text-center space-y-2">
              <Label className="block text-sm text-muted-foreground">
                Your Location
              </Label>
              <MapPreview location={location} />
            </div>
          )} */}

          {/* Map Picker */}
          {mapVisible && (
            <MapPicker 
              onClose={() => setMapVisible(false)} 
              onSelectLocation={handleLocationSelect}
            />
          )}

          {/* Date */}
          <div className="space-y-1">
            <Label htmlFor="date" className="text-sm text-muted-foreground">
              Date
            </Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                className="bg-accent/10 border-border text-foreground pr-10"
                {...register('date')}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
            </div>
            {errors.date && (
              <p className="text-destructive text-xs mt-1">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 bg-muted/20 border-border text-muted-foreground hover:bg-muted/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Confirm
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}