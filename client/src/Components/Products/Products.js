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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    setTimeout(() => {
      setData(getAllProducts(categories));
      setLoading(false);
    }, 1000);
  }, [categories]);

  const getAllProducts = (data) => {
    const allProducts = data
      .map((category) => category.Products)
      .flatMap((products) => products);
    return allProducts;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

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
        {!loading && currentProducts.length === 0 && (
          <Box textAlign={"center"}>Không tìm thấy sản phẩm !</Box>
        )}

        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {currentProducts &&
            currentProducts.length !== 0 &&
            !loading &&
            currentProducts.map((value) => (
              <MainProducts
                key={value.id}
                id={value.id}
                image={value.imageUrl}
                name={value.productName}
                price={value.price}
                description={value.description}
              />
            ))}

          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <Loading key={index} />
            ))}
        </SimpleGrid>
      </Wrap>

      <Stack direction="row" spacing={2} align="center" justify="center">
        {pageNumbers.map((number) => (
          <Button
            key={number}
            size="sm"
            colorScheme={currentPage === number ? "teal" : "gray"}
            onClick={() => paginate(number)}
          >
            {number}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export { Products };
