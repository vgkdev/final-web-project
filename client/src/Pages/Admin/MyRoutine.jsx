import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import UserComp from "./Comp/UserComp";

const MyRoutine = ({ users = [], handleShowModalUser, handleDeleteUser }) => {
  return (
    <Box>
      <Text>Tất cả người dùng</Text>
      <Divider
        mt="3px"
        mb="3px"
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      <Button
        m={"20px auto"}
        colorScheme="whatsapp"
        onClick={() => handleShowModalUser(null, "Create")}
      >
        + Tạo người dùng mới
      </Button>
      {/* <hr color="black" size="50px" /> */}
      <Box>
        {users &&
          users.map((el, index) => (
            <UserComp
              key={index}
              {...el}
              handleShowModalUser={handleShowModalUser}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
      </Box>
    </Box>
  );
};

export default MyRoutine;
