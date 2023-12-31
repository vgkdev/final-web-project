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

const OrderComp = ({ orders, handleShowModalOrder, handleDeleteOrder }) => {
  // console.log("check props: ", orders);
  return (
    <Box textAlign={"center"} mb="20px" border={"1px solid #50555e"}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Thông tin đặt hàng</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên người đặt</Th>
              <Th>Email</Th>
              <Th>Địa chỉ</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Trạng thái</Th>
              <Th>Tổng tiền</Th>
              <Th>Ngày đặt hàng</Th>
              <Th>Quản lý</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.id}</Td>
                <Td>{order.User.firstName + " " + order.User.lastName}</Td>
                <Td>{order.User.email}</Td>
                <Td>{order.User.address}</Td>
                <Td>
                  {order.OrderDetails.map((item) => (
                    <Text key={item.id} mb={2}>
                      {item.Product.productName} x {item.quantity}
                    </Text>
                  ))}
                </Td>
                <Td textColor={"red"}>{order.status}</Td>
                <Td>{convertPrice(order.totalPrice)}</Td>
                <Td>
                  {moment.utc(order.createdAt).local().format("DD-MM-YYYY")}
                </Td>
                <Td>
                  <IconButton
                    bg={"none"}
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => handleShowModalOrder(order.id, "Update")}
                    mr="2"
                  />
                  <IconButton
                    bg={"none"}
                    aria-label="Delete"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteOrder(order.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderComp;
