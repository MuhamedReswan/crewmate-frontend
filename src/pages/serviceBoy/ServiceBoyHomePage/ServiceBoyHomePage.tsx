import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import StatCard from '@/components/common/StatCard/StatCard';





function ServiceBoyHomePage() {
  const serviceBoy = useSelector((state: RootState) => state.serviceBoy.serviceBoyData);

  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome {serviceBoy?.name}</h1>
        <p className="text-gray-600 text-sm">Please update your profile for admin verification.</p>
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