// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';
// import { useTheme } from '../../context/ThemeContext';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const LineChart = () => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           color: isDark ? '#cbd5e1' : '#64748b',
//           boxWidth: 10,
//           padding: 20,
//         },
//       },
//       tooltip: {
//         backgroundColor: isDark ? '#1e293b' : '#ffffff',
//         titleColor: isDark ? '#fff' : '#1e293b',
//         bodyColor: isDark ? '#cbd5e1' : '#64748b',
//         borderColor: isDark ? '#334155' : '#e2e8f0',
//         borderWidth: 1,
//         padding: 10,
//         boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: isDark ? '#1e293b' : '#f1f5f9',
//           drawBorder: false,
//         },
//         ticks: {
//           color: isDark ? '#64748b' : '#64748b',
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//         ticks: {
//           color: isDark ? '#64748b' : '#64748b',
//         },
//       },
//     },
//   };

//   const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'This Week',
//         data: [12, 19, 3, 5, 2, 3, 9],
//         borderColor: '#7e22ce',
//         backgroundColor: '#7e22ce',
//       },
//       {
//         label: 'Last Week',
//         data: [8, 12, 6, 7, 3, 2, 4],
//         borderColor: '#3b82f6',
//         backgroundColor: '#3b82f6',
//       },
//     ],
//   };

//   return <Line options={options} data={data} />;
// };
