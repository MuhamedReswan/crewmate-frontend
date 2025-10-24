import { useDispatch, useSelector } from 'react-redux';
import StatCard from '@/components/common/StatCard/StatCard';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { GetServiceBoyById, RetryVerficationRequestServiceBoy } from '@/api/serviceBoy/serviceBoy';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { toast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import ErrorMessage from '@/components/common/Message/Error.message';
import { updateServiceBoyData } from '@/redux/slice/serviceBoyAuth.slice';
import { useVerificationSync } from '@/hooks/useVerificationSync';
import { AlertCircle, RefreshCw } from 'lucide-react';

function ServiceBoyHomePage() {
  const dispatch = useDispatch();
  const serviceBoy = useSelector((state: RootState) => state.serviceBoy.serviceBoyData);
  const date = new Date(Date.now());
const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${date.toLocaleString('default', { month: 'short' })}-${date.getFullYear()}`;

  useVerificationSync({
    user: serviceBoy,
    fetchById: GetServiceBoyById,
    updateAction: updateServiceBoyData,
  });

  const handleRetryVerification = async () => {
    try {
      if (!serviceBoy?._id) return;

      if (!serviceBoy || !serviceBoy._id) return;
      const result = await RetryVerficationRequestServiceBoy(serviceBoy._id);
      console.log("handleRetryVerification", result);
      if (result && result.statusCode === 200) {
        dispatch(updateServiceBoyData({ isVerified: VerificationStatus.Pending }));
        toast({ description: <SuccessMessage message={result.message} /> });
      } else {
        toast({
          description: <ErrorMessage message={Messages.VERIFCATION_STATUS_CHANGE_FAILED} />,
        });
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} />,
      });
    }
  };

  console.log("serviceBoy ====",serviceBoy)
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
    

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome {serviceBoy?.name}</h1>
          {serviceBoy?.isVerified === VerificationStatus.Pending && (
            <Link to="/service-boy/profile" className="text-sm text-gray-600 hover:text-gray-800">
              Please update your profile for admin verification and Wait for verification.
            </Link>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          
          <span>Today ( {formattedDate} )</span>
        </div>
      </div>
        {/* Rejection Alert Banner */}
      {serviceBoy?.isVerified === VerificationStatus.Rejected && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-sm">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-1">
                Verification Request Rejected
              </h3>
              <p className="text-sm text-red-700 mb-4">
                Your verification request has been rejected by the admin.due to {serviceBoy.rejectionReason}. Please review your profile information and submit a new verification request.
              </p>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleRetryVerification}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  size="sm"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resubmit Verification
                </Button>
                <Link to="/service-boy/profile">
                  <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                    Update Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section - Illustration */}
        <div className="lg:col-span-2 bg-[#6C7DAC]/20 rounded-lg p-6 flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Family hiking illustration"
            className="max-h-64"
          />
        </div>

        {/* Right Section - Stats */}
        <div className="grid-rows-2 lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Total Works Allocated */}
          <StatCard
            title="Total Works Allocated"
            value="0"
            percentage="10.00%"
            days="30"
            bgColor="bg-[#4B49AC]"
          />

          {/* Total Points Earned */}
          <StatCard
            title="Total Points Earned"
            value="0"
            percentage="22.00%"
            days="30"
            bgColor="bg-[#4B49AC]"
          />

          {/* Total Wage earned */}
          <StatCard
            title="Total Wage earned"
            value="34040"
            percentage="2.00%"
            days="30"
            bgColor="bg-[#4B49AC]"
          />

          {/* Number of Works Booked */}
          <StatCard
            title="Number of Works Booked"
            value="3"
            percentage="0.22%"
            days="30"
            bgColor="bg-red-400"
          />
        </div>
      </div>
    </main>
  );
}

export default ServiceBoyHomePage;

