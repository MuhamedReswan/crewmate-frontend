import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import ErrorMessage from "@/components/common/Message/Error.message";
import SuccessMessage from "@/components/common/Message/SuccessMessage";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        // TODO: Replace with your actual API call
        // const response = await getEventById(id);
        // const event = response.data;

        // Mock data for now
        const event = {
          _id: id,
          customerName: "Ajmal",
          typeOfWork: "Wedding",
          typeOfService: "Islamic Buffet",
          noOfPax: 1000,
          serviceBoys: 45,
          reportingDateTime: new Date("2025-10-24T10:54:00.000Z"),
          eventLocation: {
            lat: 10.911688645781085,
            lng: 76.37409411278787,
            address: "Kerala, India",
          },
          status: "created",
        };

        setEventData(event);
      } catch (error) {
        toast({
          description: <ErrorMessage message="Failed to load event details" />,
        });
        navigate("/events");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id, navigate, toast]);

  const handleStopBooking = async () => {
    if (!confirm("Are you sure you want to stop slot booking for this event?")) return;

    try {
      // TODO: Replace with your actual API call
      // await stopEventBooking(id);

      toast({
        description: <SuccessMessage message="Slot booking stopped successfully" />,
      });

      navigate("/events");
    } catch (error) {
      toast({
        description: <ErrorMessage message="Failed to stop booking" />,
      });
    }
  };

  const handleCancelWork = async () => {
    if (!confirm("Are you sure you want to cancel this work?")) return;

    try {
      // TODO: Replace with your actual API call
      // await cancelEvent(id);

      toast({
        description: <SuccessMessage message="Work cancelled successfully" />,
      });

      navigate("/events");
    } catch (error) {
      toast({
        description: <ErrorMessage message="Failed to cancel work" />,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading work details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-4 md:p-8 flex items-start justify-center ">
      <div className="max-w-4xl w-full bg-card rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Event Details</h1>
          <button
            onClick={() => navigate("/events")}
            className="px-5 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go Back
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Customer Name</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.customerName || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Type of Service</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.typeOfService || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Type of Work</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.typeOfWork || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">No of Pax</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.noOfPax || "N/A"}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-muted-foreground mb-2">Date</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.reportingDateTime
                  ? format(new Date(eventData.reportingDateTime), "dd-MM-yyyy")
                  : "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Reporting time</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.reportingDateTime
                  ? format(new Date(eventData.reportingDateTime), "hh:mm a")
                  : "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Number of Boys</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.serviceBoys || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted-foreground mb-2">Location</label>
              <div className="w-full px-4 py-3 bg-primary/10 rounded-lg text-sm text-foreground">
                {eventData?.eventLocation?.address || "Location name"}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleStopBooking}
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Stop Slot booking
          </button>
          <button
            onClick={handleCancelWork}
            className="px-6 py-3 text-sm font-medium text-white bg-primary/80 rounded-lg hover:bg-primary/70 transition-colors"
          >
            Cancel Work
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
