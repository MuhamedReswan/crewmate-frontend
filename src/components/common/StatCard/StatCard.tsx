interface StatCardProps {
    title: string;
    value: string;
    percentage: string;
    days: string;
    bgColor: string;
  }
  
  function StatCard({ title, value, percentage, days, bgColor }: StatCardProps) {
    return (
      <div className={`${bgColor} text-white rounded-lg p-4 flex flex-col justify-between`}>
        <div className="text-sm font-medium mb-2">{title}</div>
        <div className="text-3xl font-bold mb-2">{value}</div>
        <div className="text-xs">
          {percentage} ({days} days)
        </div>
      </div>
    );
  }

  export default StatCard;