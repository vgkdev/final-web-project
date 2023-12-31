import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";

const FormOrder = (props) => {
  const { order, handleEditOrder } = props;
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(order.status);
  }, [order]);

  const handleOnClickSubmit = () => {
    // console.log(firstName, lastName, email, address, phoneNumber);

    const data = {
      id: order.id,
      status: status,
    };
    handleEditOrder(data);
  };

  //   console.log("check data in form: ", user);
  return (
    <form>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Trạng thái</FormLabel>
          <Select
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value={""}>---Trạng thái---</option>
            <option>Chưa thanh toán</option>
            <option>Đang giao hàng</option>
            <option>Đã nhận hàng</option>
          </Select>
        </FormControl>

        <Button colorScheme="teal" onClick={handleOnClickSubmit}>
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default FormOrder;
