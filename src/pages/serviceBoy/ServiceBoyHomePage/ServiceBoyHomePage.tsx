// original
import { useDispatch, useSelector } from 'react-redux';
import StatCard from '@/components/common/StatCard/StatCard';
import { RootState } from '@/redux/store/store';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Messages, VerificationStatus } from '@/types/enum.type';
import { RetryVerficationRequestServiceBoy } from '@/api/serviceBoy/serviceBoy';
import SuccessMessage from '@/components/common/Message/SuccessMessage';
import { toast } from '@/hooks/use-toast';
import { getApiErrorMessage } from '@/utils/apiErrorHanldler';
import ErrorMessage from '@/components/common/Message/Error.message';
import { updateServiceBoyData } from '@/redux/slice/serviceBoyAuth.slice';


function ServiceBoyHomePage() {

  const dispatch = useDispatch()
  const serviceBoy = useSelector((state: RootState) => state.serviceBoy.serviceBoyData);

  const handleRetryVerification = async () => {
    try {
      if (!serviceBoy?._id) return;

      if (!serviceBoy || !serviceBoy._id) return;
      const result = await RetryVerficationRequestServiceBoy(serviceBoy._id);
      console.log("handleRetryVerification", result)
      if (result && result.statusCode === 200) {
        dispatch(updateServiceBoyData({ isVerified: VerificationStatus.Pending }));
        toast({ description: <SuccessMessage message={result.message} /> });
      } else {
        toast({
          description: <ErrorMessage message={Messages.VERIFCATION_STATUS_CHANGE_FAILED} />,
        })
      }
    } catch (error) {
      toast({
        description: <ErrorMessage message={getApiErrorMessage(error, Messages.VERIFCATION_STATUS_CHANGE_FAILED)} />,
      })
    }

  }

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome {serviceBoy?.name}</h1>

          {serviceBoy?.isVerified === VerificationStatus.Rejected ? (
            <div className="flex flex-col gap-2">
    <p className="text-sm text-red-500 font-medium">
      Your request has been rejected.
    </p>
    <Button
      variant="ghost"
      size="sm"
      className="bg-[#4B49AC]/20"
      onClick={handleRetryVerification}
    >
      Re submit
    </Button>
  </div>
          ) : (
            <Link to="/service-boy/profile" className="text-sm text-gray-600 ">
              Please update your profile for admin verification.
            </Link>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>Today (10 Jan 2021)</span>
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

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
        <div className="grid-rows-2  lg:col-span-2 grid grid-cols-2 gap-4 ">
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