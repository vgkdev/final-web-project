import { Stack, VStack, Input, Divider, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../reducers/user";
import { toast } from "react-toastify";

const UpdateUserInfo = () => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    navigate("/login");
  }
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);

  const handleEditUser = async () => {
    if (!firstName || !lastName || !email || !address || !phoneNumber) {
      toast.error("Nhập thiếu thông tin !");
    } else {
      const payload = {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
        email: user.email,
        newEmail: email,
        address: address,
        phoneNumber: phoneNumber,
      };

      dispatch(updateUser(payload, toast, navigate));
    }
  };

  return (
    <Stack my={10}>
      <VStack spacing={5}>
        <div className="input_div_main">
          <div>
            <div className="input_heading">THÔNG TIN CÁ NHÂN</div>
            <form>
              <div className="name_div">
                <div className="name">
                  <label>
                    First Name<span> *</span>
                  </label>
                  <br />
                  <Input
                    type="text"
                    style={{ paddingLeft: "10px" }}
                    value={firstName}
                    name="name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="name">
                  <label>
                    Last Name<span> *</span>
                  </label>
                  <br />
                  <Input
                    type="text"
                    value={lastName}
                    style={{ paddingLeft: "10px" }}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input_details">
                <label>
                  Email<span> *</span>
                </label>
                <br />
                <Input
                  type="email"
                  value={email}
                  style={{ paddingLeft: "10px" }}
                  name="name"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input_details">
                <label>
                  Address<span> *</span>
                </label>
                <br />
                <Input
                  type="text"
                  value={address}
                  style={{ paddingLeft: "10px" }}
                  name="number"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="input_details">
                <label>
                  Phone<span> *</span>
                </label>
                <br />
                <Input
                  type="number"
                  value={phoneNumber}
                  style={{ paddingLeft: "10px" }}
                  name="password"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <Divider borderColor={"silver"} my={5} />
              <Button
                isLoading={loading}
                colorScheme="whatsapp"
                onClick={handleEditUser}
              >
                Cập nhật thông tin cá nhân
              </Button>
            </form>
          </div>
        </div>
      </VStack>
    </Stack>
  );
};

export default UpdateUserInfo;
