const AdminHome2 = () => {
  const revenueData = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 30 },
    { month: "Apr", value: 70 },
    { month: "May", value: 50 },
    { month: "Jun", value: 90 },
    { month: "Jul", value: 60 },
    { month: "Aug", value: 80 },
    { month: "Sep", value: 70 },
    { month: "Oct", value: 90 },
    { month: "Nov", value: 85 },
    { month: "Dec", value: 95 },
  ];

  const vendorData = [{ value: 15254 }, { value: 5548 }, { value: 2478 }];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: "Total Revenue", value: "$50.8K", trend: "+12%" },
          { label: "Total Users", value: "2300", trend: "+8%" },
          { label: "Active Users", value: "756", trend: "+5%" },
          { label: "Conversion Rate", value: "2.3K", trend: "+10%" },
        ].map((stat, index) => (
          <div key={index} className="bg-card  text-foreground p-6 rounded-xl border">
            <p className="text-muted mb-2">{stat.label}</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="bg-accent text-accent-foreground text-sm px-1">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-surface text-foreground p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Total revenue</h2>
            <p className="text-muted">Daily</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$240.8K</span>
            <span className="text-accent-foreground">+18%</span>
          </div>
        </div>
        <div className="relative h-64 flex items-end justify-between">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted">
            <span>100k</span>
            <span>80k</span>
            <span>60k</span>
            <span>40k</span>
            <span>20k</span>
            <span>0</span>
          </div>
          {/* Chart bars */}
          <div className="flex-1 flex items-end justify-between pl-12">
            {revenueData.map((item, i) => (
              <div key={i} className="relative w-12 group">
                <div
                  className="w-full bg-gradient-to-t from-secondary/20 to-transparent rounded-t-lg"
                  style={{ height: `${item.value}%` }}
                >
                  <div className="w-full h-1 bg-primary rounded-full absolute bottom-0" />
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Event Details */}
        <div className="bg-surface text-foreground p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-6">Event Details</h3>
          <div className="relative flex justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle cx="96" cy="96" r="88" className="stroke-primary-foreground fill-none" strokeWidth="12" />
              <circle
                cx="96"
                cy="96"
                r="88"
                className="stroke-primary fill-none"
                strokeWidth="12"
                strokeDasharray="553"
                strokeDashoffset="138"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-3xl font-bold">23,648</span>
              <div className="mt-1 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Completed</span>
                  <span className="ml-auto">15,254</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-muted-foreground">Pending</span>
                  <span className="ml-auto">5,548</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">Cancelled</span>
                  <span className="ml-auto">2,478</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor and Keys */}
        <div className="bg-surface text-foreground p-6 rounded-xl">
          <h3 className="text-lg font-bold mb-6">Vendor and Keys</h3>
          <div className="h-48 flex items-end justify-between px-4">
            {vendorData.map((item, i) => (
              <div
                key={i}
                className="w-12 bg-gradient-to-t from-blue-500/20 to-transparent rounded-t-lg relative group text-muted"
                style={{ height: `${(item.value / 15254) * 100}%` }}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                  {item.value.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome2;
