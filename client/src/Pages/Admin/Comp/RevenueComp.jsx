import {
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { convertPrice } from "../../../Utils/convertData";
import moment from "moment";
import { FaTrash, FaEdit } from "react-icons/fa";

const RevenueComp = ({ dailyRevenue }) => {
  // console.log("check props: ", orders);
  return (
    <Box textAlign={"center"} mb="20px" border={"1px solid #50555e"}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Doanh thu</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Ngày</Th>
              <Th>Số đơn đặt hàng</Th>
              <Th>Tổng doanh thu theo ngày</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dailyRevenue.map((data, index) => (
              <Tr key={data.date}>
                <Td>{index + 1}</Td>
                <Td>{data.date}</Td>
                <Td>{data.totalOrders}</Td>
                <Td>{convertPrice(data.totalRevenue)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RevenueComp;
