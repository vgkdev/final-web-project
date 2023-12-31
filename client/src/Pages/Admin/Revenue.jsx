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

import OrderComp from "./Comp/OrderComp";
import moment from "moment";
import RevenueComp from "./Comp/RevenueComp";

/* import { AuthContext } from '../../context/AppContext' */

const Revenue = ({ orders }) => {
  const dailyRevenue = orders.reduce((acc, order) => {
    const orderDate = moment.utc(order.createdAt).local().format("DD-MM-YYYY");
    const index = acc.findIndex((data) => data.date === orderDate);
    if (index >= 0) {
      acc[index].totalOrders += 1;
      acc[index].totalRevenue += order.totalPrice;
    } else {
      acc.push({
        date: orderDate,
        totalOrders: 1,
        totalRevenue: order.totalPrice,
      });
    }
    return acc;
  }, []);

  //   console.log("check revenue data: ", dailyRevenue);

  return (
    <>
      {/* {orders && orders.map((el, i) => <OrderComp key={i} {...el} />)}
       */}
      <Text fontSize="xl">Doanh thu</Text>
      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />

      {orders && <RevenueComp dailyRevenue={dailyRevenue} />}
    </>
  );
};

export default Revenue;
