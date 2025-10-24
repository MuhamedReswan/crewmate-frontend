import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Phone, Mail, MapPin, Calendar, GraduationCap, Clock, CheckCircle, XCircle } from 'lucide-react';

import { ServiceBoy } from '@/types/users.type';
import { VerificationStatus } from '@/types/enum.type';
import { verifyServiceBoyByAdmin } from '@/api/admin/admin';
import { toast } from '@/hooks/use-toast';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import ErrorMessage from '@/components/common/Message/Error.message';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import { Messages } from '@/types/enum.type';
import { DocumentViewer } from '@/components/adminComponents/DocumentViewer/DocumentViewer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { fetchImages } from '@/utils/fetchImages';
import VerificationRejectionModal from '@/components/adminComponents/Modals/RejectionModal';

export default function ServiceBoyVerificationDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [frontAadharImage, setFrontAadharImage] = useState<string | undefined>(undefined);
  const [backAadharImage, setBackAadharImage] = useState<string | undefined>(undefined);

  const serviceBoyData = location.state as ServiceBoy;

  const handleVerify = useCallback(async (status: VerificationStatus, reason?: string) => {
    if (!id) return;

    setIsLoading(true);
    try {
      const result = await verifyServiceBoyByAdmin(id, status, reason);
      if (result?.statusCode === 200) {
        toast({ description: <SuccessMessage message={result.message} /> });
        navigate(-1);
      }
    } catch (error) {
      toast({ description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} /> });
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  const handleRejectWithReason = useCallback((reason: string) => {
    handleVerify(VerificationStatus.Rejected, reason);
    setIsRejectModalOpen(false);
  }, [handleVerify]);

  useEffect(() => {
    fetchImages(serviceBoyData, [
      ["profileImage", setProfileImage],
      ["aadharImageFront", setFrontAadharImage],
      ["aadharImageBack", setBackAadharImage],
    ]).catch((error) => {
      toast({
        description: (
          <ErrorMessage
            message={getApiErrorMessage(error, Messages.FAILED_TO_FETCH_IMAGES)}
          />
        ),
      });
    });
  }, [serviceBoyData]);


  if (!serviceBoyData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-surface border-border">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Service boy data not found</p>
            <Button
              onClick={() => navigate(-1)}
              className="mt-4 bg-primary hover:bg-primary/90"
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 bg-surface border-b border-primary/20 sticky top-0 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Verifications
          </Button>
          <div className="px-4 py-2">
            <h1 className="text-2xl font-bold text-foreground text-center">Service Boy Verification Details</h1>
            <p className="text-muted-foreground">Review and verify service boy application</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-surface-foreground flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Avatar className="w-32 h-32 ring-4 ring-primary/20">
                    <AvatarImage src={profileImage} alt={serviceBoyData.name} />
                    <AvatarFallback className="text-2xl font-bold">
                      {serviceBoyData.name?.split(' ').map(n => n[0]).join('') || 'SW'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-surface-foreground font-medium">{serviceBoyData.name || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <p className="text-surface-foreground">{serviceBoyData.email || 'N/A'}</p>
                  </div>

                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Mobile Number
                    </label>
                    <p className="text-primary font-medium">{serviceBoyData.mobile || 'N/A'}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Age
                    </label>
                    <p className="text-surface-foreground font-medium">{serviceBoyData.age || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Qualification
                    </label>
                    <p className="text-surface-foreground font-medium">{serviceBoyData.qualification || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </label>
                    <p className="text-surface-foreground">{serviceBoyData.location?.address || 'N/A'}</p>
                  </div>
                </div>
                <div className="space-y-4">

                </div>
              </CardContent>
            </Card>
            <DocumentViewer
              title="Aadhar Card"
              documents={[
                { label: "Front Side", url: frontAadharImage },
                { label: "Back Side", url: backAadharImage },
              ]}
            />

          </div>

          {/* Verification Actions */}
          <div className="space-y-6">
            <Card className="bg-surface border-border">
              <CardHeader>
                <CardTitle className="text-surface-foreground flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-3">
                  <Badge
                    // variant={serviceBoyData.isVerified ? "default" : "secondary"}
                    // className={
                    //   serviceBoyData.isVerified 
                    //     ? "bg-success text-success-foreground" 
                    //     : "bg-warning text-warning-foreground"
                    // }
                    className="bg-muted/70 text-backgound"
                  >
                    {serviceBoyData.isVerified}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">
                    Review the information and documents above, then choose an action:
                  </p>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleVerify(VerificationStatus.Verified)}
                      disabled={isLoading}
                      variant="constructive"
                      className="w-full"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Verification
                    </Button>

                    {/* <Button
                      onClick={() => handleVerify(VerificationStatus.Rejected)}
                      disabled={isLoading}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button> */}

                    <Button
                      onClick={() => setIsRejectModalOpen(true)}
                      disabled={isLoading}
                      variant="destructive"
                      className="w-full"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject Application
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
      <VerificationRejectionModal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        onSubmit={handleRejectWithReason}
      />
    </div>
  );
}