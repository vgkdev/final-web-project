import React, { useEffect, useState } from "react";
import "./Products.css";
import { MainProducts } from "../MainProducts";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Image,
  Button,
  Stack,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import Loading from "../Loading";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    setTimeout(() => {
      setData(getAllProducts(categories));
      setLoading(false);
    }, [1000]);
  }, [categories]);

  const getAllProducts = (data) => {
    const allProducts = data
      .map((category) => category.Products)
      .flatMap((products) => products);
    return allProducts;
  };
  // console.log("check all products: ", products);

  return (
    <Box p={5}>
      <Text
        textAlign="center"
        fontSize="21px"
        textDecoration="underline 2px #6bc6d9"
        fontWeight="semibold"
        margin="15px"
      >
        Tất cả sản phẩm
      </Text>

      <Wrap justify="center" my={"16"}>
        {!loading && data.length === 0 && (
          <Box textAlign={"center"}>Không tìm thấy sản phẩm !</Box>
        )}

        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {data &&
            data.length !== 0 &&
            !loading &&
            data.map((value) => (
              <MainProducts
                key={value.id}
                id={value.id}
                image={value.imageUrl}
                name={value.productName}
                price={value.price}
                description={value.description}
              />
            ))}

          {loading && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </SimpleGrid>
      </Wrap>
    </Box>
  );
};
export { Products };
