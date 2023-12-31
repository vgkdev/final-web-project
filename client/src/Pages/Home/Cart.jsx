import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Spinner,
  Stack,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { AddIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { dataUrl } from "../../share";
import { Navigate, useNavigate } from "react-router-dom";
import CartSingleCard from "./CartSingleCard";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  deleteCartService,
  editCartService,
  getAllCartsByUserIdService,
} from "../../api/cartApi";
import { Buffer } from "buffer";
import { convertPrice } from "../../Utils/convertData";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [dis, setDis] = useState(10);
  const [sub, setSub] = useState(20);
  const [changeone, setchangeone] = useState(0);

  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);

  const navigate = useNavigate();

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

  const deleteCart = async (id) => {
    // console.log("check id: ", id);
    const response = await deleteCartService(id);
    if (response.data.errCode === 0) {
      // const carts = response.data.cart;
      // for (let i = 0; i < carts.length; i++) {
      //   const products = carts[i].Product;
      //   const buffer = products.imageUrl;
      //   const base64String = new Buffer(buffer, "base64").toString("base64");
      //   carts[i].Product.imageUrl = base64String;
      // }
      // setCartData(carts);
      // toast.success("Xóa đơn hàng thành công");
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
          toast.success("Xóa đơn hàng thành công");
        } else {
          setCartData([]);
        }
      }
    } else {
      toast.error("Xóa đơn hàng thất bại !");
    }
  };

  const updateCart = async (id, quantity, productId) => {
    const payload = {
      id: id,
      quantity: quantity,
    };

    // console.log("check payload: ", payload);
    const productEditCart = products.find((p) => p.id === productId);
    if (productEditCart.quantity >= quantity) {
      const response = await editCartService(payload);
      if (response.data.errCode === 0) {
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
            toast.success("Cập nhật đơn hàng thành công");
          } else {
            setCartData([]);
          }
        }
      } else {
        toast.error("Cập nhật đơn hàng thất bại !");
      }
    } else {
      toast.error("Số lượng sản phẩm hiện tại không đủ !");
    }
  };

  const handlePayment = () => {
    if (cartData && cartData.length !== 0) {
      for (let i = 0; i < cartData.length; i++) {
        if (cartData[i].Product.quantity < cartData[i].quantity) {
          toast.error(
            `Số lượng sản phẩm hiện tại không đủ, xin bạn giảm bớt số lượng sản phẩm ${cartData[i].Product.productName} !`
          );
          return;
        }
      }
      navigate("/payment");
    } else {
      toast.error("Giỏ hàng trống !");
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log("check cart data: ", cartData);
  return (
    <div>
      <VStack marginTop={{ base: "220px", md: "180px" }} justify="center">
        <Text fontSize="2xl" fontWeight="extrabold">
          Có {cartData.length} sản phẩm trong giỏ hàng
        </Text>

        <Stack
          direction={{ base: "column", lg: "row" }}
          padding={10}
          spacing={50}
        >
          {/* Cart's products */}
          <VStack spacing={5}>
            <HStack spacing={5} w="full" padding={3} bg="#fcffee">
              <Image
                w={10}
                src="https://images.bewakoof.com/web/Red-truck.png"
              />
              <Text>Bạn sẽ được giao hàng MIỄN PHÍ cho đơn hàng này</Text>
            </HStack>
            {cartData &&
              cartData.map((el, i) => (
                <CartSingleCard
                  key={i}
                  cartData={el}
                  deleteCart={deleteCart}
                  updateCart={updateCart}
                />
              ))}
          </VStack>
          {/* end Cart's products */}

          {/* calc price */}
          <VStack spacing={5}>
            <HStack spacing={5} w="full" padding={3} bg="#EB046D">
              <Text fontWeight="bold" color="white">
                Tiết kiệm thêm 100.000đ với sản phẩm ưu đãi từ Heshi
              </Text>
              <Spacer />{" "}
              <ArrowRightIcon
                cursor={"pointer"}
                onClick={() => navigate("/skin")}
              />
            </HStack>

            <Box
              fontSize="16px"
              w={{ base: 300, sm: 600 }}
              spacing={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="5"
            >
              Nhận chiết khấu 100.000đ ngay lập tức cho lần mua hàng đầu tiên
              của bạn trên 5.000.000đ Mã giảm giá -NEW100
            </Box>

            <Box
              fontSize="16px"
              w={{ base: 300, sm: 600 }}
              spacing={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="5"
            >
              Nhận thêm 20% tiền hoàn lại cho các đơn hàng trả trước trên
              2.000.000đ. Mã giảm giá - NEW20. Chỉ áp dụng cho khách hàng mới!
            </Box>

            <Box
              bg="#ecf6f5"
              fontWeight="bold"
              fontSize="16px"
              w={{ base: 300, sm: 600 }}
              spacing={3}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px 20px"
            >
              Có Phiếu giảm giá / Giới thiệu / Thẻ quà tặng ?
            </Box>

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
                onClick={handlePayment}
              >
                Thanh toán
              </Button>
            </Stack>

            <Divider />
            <Divider />
            <Divider />
          </VStack>
          {/* end calc price */}
        </Stack>
      </VStack>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Cart;
