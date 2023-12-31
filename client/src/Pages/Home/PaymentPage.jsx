import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Select,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { dataUrl } from "../../share";
import { Navigate, useNavigate } from "react-router-dom";
import CartSingleCard from "./CartSingleCard";
import "../../Components/SignUp/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartByUserIdService,
  getAllCartsByUserIdService,
} from "../../api/cartApi";
import { Buffer } from "buffer";
import { convertPrice } from "../../Utils/convertData";
import { animateScroll as scroll } from "react-scroll";
import { createPaymentService } from "../../api/paymentApi";
import { editUserService } from "../../api/userApi";
import { updateUser } from "../../reducers/user";
import { createNewOrderService } from "../../api/ortherApi";
import moment from "moment";
import { editProductService } from "../../api/productApi";

const PaymentPage = () => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    navigate("/login");
  }

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dis, setDis] = useState(10);
  const [sub, setSub] = useState(20);
  const [changeone, setchangeone] = useState(0);
  const [orderType, setOrderType] = useState("");

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [address, setAddress] = useState(user.address);

  console.log("check cart data: ", cartData);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getCartData();
    }, [1000]);

    const getCartData = async () => {
      if (user && user.id) {
        const response = await getAllCartsByUserIdService(user.id);
        if (response.data.errCode === 0) {
          const carts = response.data.cart;
          for (let i = 0; i < carts.length; i++) {
            const products = carts[i].Product;
            const buffer = products.imageUrl;
            const base64String = new Buffer(buffer, "base64").toString(
              "base64"
            );
            carts[i].Product.imageUrl = base64String;
          }
          setCartData(carts);
        }
      }
    };
  }, [user]);

  useEffect(() => {
    setTotal(0);
    cartData &&
      cartData.map((el, i) => {
        setTotal((prev) => prev + el.quantity * el.Product.price);
      });
  }, [cartData]);

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

  const handleOrder = async () => {
    // const response = await createPaymentService(payload);
    // // console.log("check res payment: ", response);
    // window.location.href = response.data.checkoutUrl;
    // console.log("check order type: ", orderType);
    if (!orderType) {
      toast.error("Hãy chọn phương thức thanh toán !");
      return;
    }

    if (orderType === "1") {
      if (!user.id || !total) {
        toast.error("Thiếu thông tin");
      } else {
        const payload = {
          userId: user.id,
          totalPrice: total - (total / 100) * 10,
          status: "Chưa thanh toán",
          cartData: cartData,
        };

        const response = await createNewOrderService(payload);
        console.log("check res: ", response.data.order);
        if (response.data.errCode === 0) {
          toast.success("Bạn đã đặt hàng thành công");
          try {
            await deleteCartByUserIdService(user.id);
            for (let i = 0; i < cartData.length; i++) {
              await editProductService({
                id: cartData[i].Product.id,
                newProductName: cartData[i].Product.productName,
                productName: cartData[i].Product.productName,
                categoryId: cartData[i].Product.categoryId,
                quantity: cartData[i].Product.quantity - cartData[i].quantity,
                price: cartData[i].Product.price,
                description: cartData[i].Product.description,
              });
            }
          } catch (e) {
            console.log(e);
            toast.error(e);
          }
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } else {
      const date = Date.now();
      const payload = {
        userId: user.id,
        orderId: moment.utc(date).local().format("HH:mm:ss"),
        transactionId: "ORDER_" + date,
        orderInfo: "ORDER_" + date,
        clientIp: "127.0.0.1",
        amount: total - (total / 100) * 10,
        status: "Đã thanh toán",
        cartData: cartData,
        orderDescription: "Thanh toán vnpay",
        createDate: moment.utc(date).local().format("YYYYMMDDHHmmss"),
      };
      const response = await createPaymentService(payload);
      console.log("check res payment: ", response);
      window.location.href = response.data.checkoutUrl;
    }
  };

  console.log("check cart data from payment page: ", cartData);

  return (
    <div>
      <VStack marginTop={{ base: "220px", md: "180px" }} justify="center">
        <Text fontSize="2xl" fontWeight="extrabold">
          Có {cartData.length} sản phẩm trong giỏ hàng
        </Text>

        <Stack
          direction={{ base: "column", sm: "row" }}
          padding={10}
          spacing={50}
        >
          {/* information */}
          <VStack spacing={5}>
            <div className="input_div_main">
              <div>
                <div className="input_heading">THÔNG TIN CÁ NHÂN</div>
                <form>
                  <div className="name_div">
                    <div className="name">
                      <label>
                        Họ<span> *</span>
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
                        Tên<span> *</span>
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
                      Địa chỉ<span> *</span>
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
                      SĐT<span> *</span>
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

                  <div className="input_details">
                    <label>
                      Phương thức thanh toán<span> *</span>
                    </label>
                    <br />
                    <Select
                      placeholder="---Chọn phương thức thanh toán---"
                      onChange={(e) => setOrderType(e.target.value)}
                    >
                      <option value={"1"}>Thanh toán khi nhận hàng</option>
                      <option value={"2"}>VNPay</option>
                    </Select>
                  </div>
                </form>
              </div>
            </div>
          </VStack>
          {/* end information */}

          <VStack spacing={5}>
            <Stack
              bg="gray.200"
              w={{ base: 300, sm: 600 }}
              spacing={3}
              borderWidth="1px"
              overflow="hidden"
              padding="5"
              textAlign="center"
            >
              <Text fontWeight="bold" fontSize="20px">
                TỔNG GIÁ
              </Text>{" "}
            </Stack>

            <VStack
              fontSize="16px"
              padding="5"
              w={{ base: 300, sm: 600 }}
              spacing={5}
              borderWidth="1px"
              overflow="hidden"
            >
              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  Tổng giá sản phẩm (đã bao gồm thuế)
                </Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  {convertPrice(total)}
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>
                  Phí vận chuyển
                </Text>
                <Spacer />
                <Text
                  fontWeight="bold"
                  color="green.500"
                  fontSize={{ base: "15px", md: "18px" }}
                >
                  + 0đ
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>Giảm giá</Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  - {convertPrice(Math.floor((total / 100) * 10))}
                </Text>
              </HStack>

              <HStack w="full">
                <Text fontSize={{ base: "15px", md: "18px" }}>Tổng </Text>
                <Spacer />
                <Text fontWeight="bold" fontSize={{ base: "15px", md: "18px" }}>
                  {convertPrice(Math.floor(total - (total / 100) * 10))}
                </Text>
              </HStack>

              <Badge
                overflow="hidden"
                borderRadius="2xl"
                fontSize={{ base: "15px", md: "lg" }}
                padding="5px 20px"
                w="full"
                variant="subtle"
                color="gray.800"
                colorScheme="green"
                textAlign={"center"}
              >
                Bạn đang tiết kiệm{" "}
                {convertPrice(Math.floor((total / 100) * 10))} trên đơn hàng này
              </Badge>
            </VStack>

            <Stack
              direction={{ base: "column", md: "row" }}
              w="full"
              padding="5"
            >
              <Text
                w={{ base: "full", md: "50%" }}
                fontSize="2xl"
                fontWeight="bold"
              >
                {convertPrice(Math.floor(total - (total / 100) * 10))}
              </Text>

              <Divider w="10%" orientation="vertical" />

              <Button
                w="full"
                colorScheme="whatsapp"
                color="white"
                size="lg"
                onClick={handleOrder}
              >
                Đặt hàng
              </Button>
            </Stack>

            <Divider />
            <Divider />
            <Divider />
          </VStack>
        </Stack>
      </VStack>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};
export default PaymentPage;
