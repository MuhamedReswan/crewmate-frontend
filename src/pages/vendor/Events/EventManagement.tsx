import { ChangeBookingStatus, UpdateEvent } from "@/api/vendor/vendor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import EventDetails from "@/components/vendorComponent/EventDetails";
import { useToast } from "@/hooks/use-toast";
import { BookingStatus } from "@/types/enum.type";
import { EventUpdateFormValues } from "@/types/form.type";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const EventManagementPage = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { id } = useParams();
  const eventData = location.state;
  console.log("eventData", eventData);
  const [updating, setUpdating] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const handleCancel = () => {
    toast({
      title: "Cancel Event",
      description: "Event cancellation initiated",
    });
    // Add your cancel event logic here
  };

  const handleUpdate = async (changedValues: Partial<EventUpdateFormValues>) => {
    try {
      console.log("Updated fields:", changedValues);
      setUpdating(true);

      const response = await UpdateEvent(eventData._id, changedValues); // your API function
      console.log("response of event update", response);
      toast({
        title: "Success",
        description: "Event updated successfully",
      });
    } catch (error) {
      console.error("Error on updating event:", error);
    } finally {
      setUpdating(false);
    }
  };

  // const handleCloseBooking = () => {
  //   toast({
  //     title: "Close Booking",
  //     description: "Booking closure initiated",
  //   });
  //   // Add your close booking logic here
  // };

  const handleBack = () => {
    // Add your navigation logic here
    window.history.back();
  };

  const handleCloseBooking = () => {
    setConfirmCloseOpen(true);
  };

  const confirmCloseBooking = async () => {
    try {
      setUpdating(true);
      let bookingStatus =
        eventData.bookingStatus == BookingStatus.Stopped
          ? BookingStatus.Active
          : BookingStatus.Stopped;

      let result = await ChangeBookingStatus(eventData._id, bookingStatus);
      console.log("rsult of confir close book", result);

      toast({
        title: `Booking status changed `,
        description: `The booking has been ${bookingStatus} successfully.`,
      });
    } catch (error) {
      console.error("Close booking failed:", error);
      toast({
        title: "Error",
        description: "Failed to close booking.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
      setConfirmCloseOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background ">
      <EventDetails
        event={eventData}
        onCancel={handleCancel}
        onUpdate={handleUpdate}
        onCloseBooking={handleCloseBooking}
        onBack={handleBack}
        isUpdating={updating}
      />

      <AlertDialog open={confirmCloseOpen} onOpenChange={setConfirmCloseOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm{" "}
              {eventData.bookingStatus == BookingStatus.Stopped
                ? "Restart Booking"
                : "Close Booking"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to{" "}
              {eventData.bookingStatus == BookingStatus.Stopped
                ? "Restart Booking"
                : "Close Booking"}{" "}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmCloseBooking}
              disabled={updating}
              className="bg-primary hover:bg-primary/90"
            >
              {updating ? "Changing" : "Yes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventManagementPage;
