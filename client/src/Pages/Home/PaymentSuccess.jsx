import { useEffect, useRef, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import {
  deleteCartByUserIdService,
  getAllCartsByUserIdService,
} from "../../api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewOrderService } from "../../api/ortherApi";
import { toast } from "react-toastify";
import { Buffer } from "buffer";
import { editProductService } from "../../api/productApi";

const PaymentSuccess = () => {
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);

  const checkCreateOrder = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!user) {
    navigate("/login");
  }

  const [cartData, setCartData] = useState([]);
  const [total, setTotal] = useState(0);

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

  const handleOrder = async () => {
    const payload = {
      userId: user.id,
      totalPrice: total - (total / 100) * 10,
      status: "Đã thanh toán",
      cartData: cartData,
    };

    const response = await createNewOrderService(payload);
    console.log("check res: ", response.data.order);
    if (response.data.errCode === 0) {
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
      checkCreateOrder.current = true;
    } else {
      toast.error(response.data.message);
    }
  };

  if (
    cartData.length !== 0 &&
    total !== 0 &&
    checkCreateOrder.current === false
  ) {
    console.log("check cart data: ", cartData);
    handleOrder();
  }

  return (
    <Box textAlign="center" my={20}>
      <Text fontSize="2xl" fontWeight="bold" color="green.500">
        Bạn đã thanh toán thành công
      </Text>

      <Button mt={5} onClick={() => navigate("/")} colorScheme="blue">
        Quay lại trang chủ
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
