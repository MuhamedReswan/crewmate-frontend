import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Award, Briefcase, User, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ServiceBoy } from '@/types/users.type';
import { getServiceBoyById, updateServiceBoyBlockStatus } from '@/api/admin/admin';
import SuccessMessage from '@/components/common/Message/SuccessMessage';



const ServiceBoyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const initialUser = location.state as ServiceBoy | undefined;

  const [user, setUser] = useState<ServiceBoy | null>(
    location.state as ServiceBoy ?? null
  ); const [loading, setLoading] = useState<boolean>(!initialUser);

  useEffect(() => {
    const fetchUser = async () => {
      if (initialUser) return; // already set from location.state
      //   if (!id) return; // no id, nothing to fetch

      try {
        setLoading(true);
        const result = await getServiceBoyById(location.pathname);
        console.log("getServiceBoyById result", result);

        if (result?.data) {
          setUser(result.data as ServiceBoy);
          toast({
            description: <SuccessMessage message={result.message} />,
          });
        } else {
          setUser(null); // id was wrong, no user found
        }
      } catch (error) {
        console.error("Error fetching serviceboy profile in admin:", error);
        setUser(null);
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "Failed to fetch service boy profile.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [initialUser, toast]);





  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleBlockToggle = async () => {
    try {
      if (!user) return;
      const action = user.isBlocked ? 'unblock' : 'block';
      // Here you would call your API
      await updateServiceBoyBlockStatus(user._id, action);

      toast({
        description: <SuccessMessage message={`User has been ${!user.isBlocked ? "blocked" : "unblocked"}.`} className="" />,
      })

      // Update the user state (in real app, you'd refetch or update state)
      user.isBlocked = !user.isBlocked;
    } catch (error) {
      console.error("Error updating block status:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "Failed to update block status.",
      });
    }
  };


  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/admin/service-boys");
    }
  };

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-background">
          {/* Header */}
          <div className="bg-surface border-b border-primary/20 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBack()}
                    className="text-muted hover:bg-primary/10 hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Users
                  </Button>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">ServiceBoy Details</h3>
                  </div>
                </div>
                <Badge
                  className={`text-sm px-3 py-1 hover:bg-foreground/30 ${user.isBlocked 
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-accent text-accent-foreground'
                    }`}
                >
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column - Profile Overview */}
              <div className="lg:col-span-1">
                <div className="bg-surface border border-primary/20 rounded-xl p-6">
                  <div className="text-center pb-4">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4 ring-4 ring-primary/20">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="bg-primary text-foreground text-2xl font-bold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-2xl font-bold text-foreground mb-2">{user.name}</h2>
                      <p className="text-muted text-sm">ID: {user.servicerId}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Button
                      onClick={handleBlockToggle}
                      className={`w-full ${user.isBlocked
                          ? 'bg-[#22C55E] hover:bg-[#22C55E]/90 text-muted-foreground'
                          : 'bg-[#EF4444] hover:bg-[#EF4444]/90 text-muted-foreground'
                        }`}
                      size="lg"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {user.isBlocked ? 'Unblock User' : 'Block User'}
                    </Button>
                  </div>
                </div>

                {/* Quick Stats */}
                {(user.points !== undefined || user.totalWorkAttended !== undefined) && (
                  <div className="bg-surface border border-surface/20 rounded-xl p-6 mt-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Award className="h-5 w-5 mr-2 text-surface" />
                        Quick Stats
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {user.points !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted">Total Points</span>
                          <span className="bg-surface text-foreground px-3 py-1 rounded-md text-lg font-bold">
                            {user.points}
                          </span>
                        </div>
                      )}
                      {user.totalWorkAttended !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted">Work Attended</span>
                          <span className="border border-surface/30 text-foreground px-3 py-1 rounded-md text-lg font-bold">
                            {user.totalWorkAttended}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Detailed Information */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Contact Information */}
                  <div className="bg-[#12132D] border border-surface/20 rounded-xl p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-surface" />
                        Contact Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted" />
                        <div>
                          <p className="text-muted text-sm">Email</p>
                          <p className="text-foreground font-medium break-all">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted" />
                        <div>
                          <p className="text-muted text-sm">Mobile</p>
                          <p className="text-surface font-medium text-lg">{user.mobile}</p>
                        </div>
                      </div>
                      {user.location?.address && (
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-4 w-4 text-muted" />
                          <div>
                            <p className="text-muted text-sm">Location</p>
                            <p className="text-foreground font-medium">{user.location.address}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="bg-[#12132D] border border-surface/20 rounded-xl p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground flex items-center">
                        <User className="h-5 w-5 mr-2 text-surface" />
                        Personal Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      {user.age && (
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-muted" />
                          <div>
                            <p className="text-muted text-sm">Age</p>
                            <p className="text-foreground font-medium">{user.age} years old</p>
                          </div>
                        </div>
                      )}
                      {user.qualification && (
                        <div className="flex items-center space-x-3">
                          <Briefcase className="h-4 w-4 text-muted" />
                          <div>
                            <p className="text-muted text-sm">Qualification</p>
                            <p className="text-foreground font-medium">{user.qualification}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center space-x-3">
                        <Shield className="h-4 w-4 text-muted" />
                        <div>
                          <p className="text-muted text-sm">Account Status</p>
                          <span className={`mt-1 px-3 py-1 rounded-md text-sm ${user.isBlocked
                      ? 'bg-destructive text-destructive-foreground'
                      : 'bg-accent text-accent-foreground'
                            }`}>
                            {user.isBlocked ? 'Blocked Account' : 'Active Account'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Details Card */}
                  <div className="bg-[#12132D] border border-surface/20 rounded-xl p-6 md:col-span-2">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Complete Information</h3>
                    </div>
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <p className="text-muted text-sm">Full Name</p>
                          <p className="text-foreground font-medium">{user.name}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted text-sm">User ID</p>
                          <p className="text-foreground font-medium">{user._id}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted text-sm">Email Address</p>
                          <p className="text-foreground break-all font-medium">{user.email}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-muted text-sm">Phone Number</p>
                          <p className="text-surface font-medium">{user.mobile}</p>
                        </div>
                        {user.age && (
                          <div className="space-y-2">
                            <p className="text-muted text-sm">Age</p>
                            <p className="text-foreground font-medium">{user.age}</p>
                          </div>
                        )}
                        {user.location?.address && (
                          <div className="space-y-2">
                            <p className="text-muted text-sm">Location</p>
                            <p className="text-foreground font-medium">{user.location.address}</p>
                          </div>
                        )}
                        {user.qualification && (
                          <div className="space-y-2">
                            <p className="text-muted text-sm">Qualification</p>
                            <p className="text-foreground font-medium">{user.qualification}</p>
                          </div>
                        )}
                        {user.points !== undefined && (
                          <div className="space-y-2">
                            <p className="text-muted text-sm font-medium">Total Points</p>
                            <p className="text-foreground font-bold">{user.points}</p>
                          </div>
                        )}
                        {user.points !== undefined && (
                          <div className="space-y-2">
                            <p className="text-muted text-sm">Work Attended</p>
                            <p className="text-foreground font-bold">{user.totalWorkAttended ? user.totalWorkAttended :0}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ServiceBoyDetailsPage;