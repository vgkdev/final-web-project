// import {
//   Box,
//   TableContainer,
//   Table,
//   TableCaption,
//   Thead,
//   Tr,
//   Th,
//   Tbody,
//   Td,
//   Tfoot,
//   Text,
//   IconButton,
// } from "@chakra-ui/react";
// import React from "react";
// import { useState } from "react";
// import { convertPrice } from "../../../Utils/convertData";
// import moment from "moment";
// import { FaTrash, FaEdit } from "react-icons/fa";

// const RevenueComp = ({ dailyRevenue }) => {
//   // console.log("check props: ", orders);
//   return (
//     <Box textAlign={"center"} mb="20px" border={"1px solid #50555e"}>
//       <TableContainer>
//         <Table variant="striped" colorScheme="teal">
//           <TableCaption>Doanh thu</TableCaption>
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Ngày</Th>
//               <Th>Số đơn đặt hàng</Th>
//               <Th>Tổng doanh thu theo ngày</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {dailyRevenue.map((data, index) => (
//               <Tr key={data.date}>
//                 <Td>{index + 1}</Td>
//                 <Td>{data.date}</Td>
//                 <Td>{data.totalOrders}</Td>
//                 <Td>{convertPrice(data.totalRevenue)}</Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default RevenueComp;

import React from "react";
import { Bar } from "react-chartjs-2";
import { convertPrice } from "../../../Utils/convertData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ dailyRevenue }) => {
  const labels = dailyRevenue.map((data) => data.date);
  const totalOrders = dailyRevenue.map((data) => data.totalOrders);
  const totalRevenue = dailyRevenue.map((data) => data.totalRevenue);

  console.log(">>>check total order: ", totalOrders);
  console.log(">>>check total revenue: ", totalRevenue);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số đơn đặt hàng",
        data: totalOrders,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Doanh thu",
        data: totalRevenue,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ doanh thu",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default RevenueChart;
