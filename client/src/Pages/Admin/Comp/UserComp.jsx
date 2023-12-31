import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

const UserComp = ({
  id,
  firstName,
  lastName,
  email,
  phoneNumber,
  handleShowModalUser,
  handleDeleteUser,
}) => {
  return (
    <Box textAlign={"center"} mb="20px" border={"2px solid #50555e"} p={3}>
      <SimpleGrid columns={[1, 2, 2, 3, 3]} spacing={10}>
        <Text fontSize="lg">Họ và tên: {firstName + " " + lastName} </Text>
        <Text fontSize="lg">Email: {email} </Text>
        <Text fontSize="lg">SĐT: {phoneNumber} </Text>

        <Button
          colorScheme={"blue"}
          onClick={() => handleShowModalUser(id, "Detail")}
        >
          Chi tiết
        </Button>

        <Button
          colorScheme={"blue"}
          onClick={() => handleShowModalUser(id, "Update")}
        >
          Cập nhật
        </Button>

        <Button colorScheme={"blue"} onClick={() => handleDeleteUser(id)}>
          {" "}
          Xóa{" "}
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default UserComp;
