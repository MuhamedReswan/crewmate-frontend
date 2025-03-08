// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Doughnut } from 'react-chartjs-2';
// import { useTheme } from '../../context/ThemeContext';

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const DoughnutChart = () => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     cutout: '70%',
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
//         boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//       },
//     },
//   };

//   const data = {
//     labels: ['E-commerce', 'Retail', 'Partners'],
//     datasets: [
//       {
//         data: [65, 25, 10],
//         backgroundColor: [
//           '#7e22ce', // Primary
//           '#3b82f6', // Blue
//           '#10b981', // Green
//         ],
//         borderWidth: 0,
//       },
//     ],
//   };

//   return <Doughnut options={options} data={data} />;
// };
