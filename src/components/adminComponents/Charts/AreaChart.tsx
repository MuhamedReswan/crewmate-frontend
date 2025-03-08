// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
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
//   Filler,
//   Legend
// );

// export const AreaChart = () => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         backgroundColor: isDark ? '#1e293b' : '#ffffff',
//         titleColor: isDark ? '#fff' : '#1e293b',
//         bodyColor: isDark ? '#cbd5e1' : '#64748b',
//         borderColor: isDark ? '#334155' : '#e2e8f0',
//         borderWidth: 1,
//         padding: 10,
//         displayColors: false,
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
//     elements: {
//       line: {
//         tension: 0.4,
//       },
//       point: {
//         radius: 0,
//         hitRadius: 10,
//         hoverRadius: 4,
//       },
//     },
//   };

//   const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   const data = {
//     labels,
//     datasets: [
//       {
//         fill: true,
//         label: 'Revenue',
//         data: [65, 59, 80, 81, 56, 55, 72, 60, 85, 95, 91, 84],
//         borderColor: '#7e22ce',
//         backgroundColor: 'rgba(126, 34, 206, 0.2)',
//       },
//     ],
//   };

//   return <Line options={options} data={data} />;
// };