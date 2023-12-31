import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import axios from "axios";
import OrderComp from "./Comp/OrderComp";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { convertPrice } from "../../Utils/convertData";
import moment from "moment";

/* import { AuthContext } from '../../context/AppContext' */

const Reports = ({ orders, handleDeleteOrder, handleShowModalOrder }) => {
  console.log("check order data: ", orders);
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (orders, fileName) => {
    const csvData = orders.map((order) => ({
      ID: order.id,
      "Tên người đặt": order.User.firstName + " " + order.User.lastName,
      email: order.User.email,
      "Địa chỉ": order.User.address,
      "Sản phẩm": order.OrderDetails.map(
        (item) => `${item.Product.productName} x ${item.quantity}`
      ).join(", "),
      "Trạng thái": order.status,
      "Tổng tiền": convertPrice(order.totalPrice),
      "Ngày đặt hàng": moment.utc(order.createdAt).local().format("DD-MM-YYYY"),
    }));

    console.log("check data export: ", csvData);
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <>
      {/* {orders && orders.map((el, i) => <OrderComp key={i} {...el} />)}
       */}
      <Text fontSize="xl">Tất cả đơn đặt hàng</Text>
      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      <Button
        mb={5}
        colorScheme="yellow"
        onClick={(e) => exportToCSV(orders, "order-list")}
      >
        Xuất ra file excel
      </Button>
      {orders && (
        <OrderComp
          orders={orders}
          handleDeleteOrder={handleDeleteOrder}
          handleShowModalOrder={handleShowModalOrder}
        />
      )}
    </>
  );
};

export default Reports;
