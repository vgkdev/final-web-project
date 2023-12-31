import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const FormUser = (props) => {
  const { user, type, handleEditUser, handleCreateUser } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    if (type !== "Create") {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setAdress(user.address);
      setPhoneNumber(user.phoneNumber);
    }
  }, [type, user]);

  const handleOnClickSubmit = () => {
    // console.log(firstName, lastName, email, address, phoneNumber);

    if (type === "Create") {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
      };
      handleCreateUser(data);
    } else {
      const data = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        newEmail: email,
        email: user.email,
        address: address,
        phoneNumber: phoneNumber,
      };
      handleEditUser(data);
    }
  };

  //   console.log("check data in form: ", user);
  return (
    <form>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel htmlFor="firstName">Họ</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            placeholder="Họ"
            disabled={type === "Detail"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="lastName">Tên</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            placeholder="Tên"
            disabled={type === "Detail"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            disabled={type === "Detail"}
          />
        </FormControl>
        <FormControl display={type === "Create" ? "" : "none"}>
          <FormLabel htmlFor="password">Mật khẩu</FormLabel>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mật khẩu"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="address">Địa chỉ</FormLabel>
          <Input
            type="text"
            name="address"
            value={address}
            onChange={(event) => setAdress(event.target.value)}
            placeholder="Địa chỉ"
            disabled={type === "Detail"}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="phone">SĐT</FormLabel>
          <Input
            type="text"
            name="phone"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            placeholder="Số điện thoại"
            disabled={type === "Detail"}
          />
        </FormControl>
        {type !== "Detail" && (
          <Button colorScheme="teal" onClick={handleOnClickSubmit}>
            Submit
          </Button>
        )}
      </Stack>
    </form>
  );
};

export default FormUser;
