import React, { useContext, useEffect, useState } from "react";
import {
  Wrap,
  HStack,
  VStack,
  Text,
  Badge,
  ButtonGroup,
  IconButton,
  Button,
  Spacer,
  Stack,
  Divider,
  Image,
  Box,
} from "@chakra-ui/react";

import { AddIcon, ArrowRightIcon, CloseIcon } from "@chakra-ui/icons";
import { AiOutlineHeart } from "react-icons/ai";
import { convertPrice } from "../../Utils/convertData";

const CartSingleCard = ({ cartData, deleteCart, updateCart }) => {
  // console.log("check cartData: ", cartData.Product.quantity);
  const [quantity, setQuantity] = useState(cartData.quantity);

  const handleChange = () => {};
  const handleRemove = () => {};

  return (
    <Wrap
      w={{ base: 320, md: 600 }}
      spacing={3}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="5"
      // border={"1px solid red"}
    >
      <VStack w="full">
        <Box w={"full"}>
          <Text
            textAlign={"center"}
            fontSize={{ base: "15px", md: "xl" }}
            color="gray.500"
            fontWeight={"semibold"}
          >
            {cartData.Product.productName}
          </Text>

          <Stack>
            <Image
              src={`data:image/jpeg;base64,${cartData.Product.imageUrl}`}
              style={{ borderRadius: "5px" }}
              objectFit="contain"
              boxSize="170"
            />
          </Stack>

          <Stack align="revert-layer" spacing={4}>
            <Stack spacing={10} direction={{ base: "column", md: "row" }}>
              <HStack alignContent="center">
                <Text fontWeight="bold" fontSize="2xl">
                  {cartData.Product.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </HStack>

              <Stack direction={{ base: "column", md: "row" }} spacing={35}>
                <ButtonGroup size="sm" isAttached variant="outline">
                  <Button
                    fontWeight="bold"
                    fontSize="xl"
                    onClick={() => setQuantity(() => Math.max(quantity - 1, 1))}
                  >
                    -
                  </Button>

                  <Button>
                    {convertPrice(quantity * cartData.Product.price)}
                  </Button>

                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Add to friends"
                    icon={<AddIcon w={3} h={3} />}
                  />
                </ButtonGroup>
              </Stack>

              <Stack>
                <Text>Số lượng mua: {quantity}</Text>
              </Stack>
            </Stack>
          </Stack>

          <Spacer />
        </Box>
      </VStack>

      <Divider />

      <Stack w="full" spacing={5} direction={{ base: "column", lg: "row" }}>
        <Button
          onClick={() => deleteCart(cartData.id)}
          w={{ base: "full", lg: "40%" }}
          size="md"
          colorScheme="red"
          color="white"
        >
          Xóa
        </Button>
        <Divider orientation="vertical" />
        <Button
          w={{ base: "full", lg: "40%" }}
          size="md"
          colorScheme="cyan"
          color="white"
          onClick={() => updateCart(cartData.id, quantity, cartData.Product.id)}
        >
          Cập nhật số lượng
        </Button>
      </Stack>
    </Wrap>
  );
};

export default CartSingleCard;
