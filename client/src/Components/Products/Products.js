import React, { useEffect, useState } from "react";
import "./Products.css";
import { MainProducts } from "../MainProducts";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Button,
  Wrap,
  SimpleGrid,
  Select,
  Stack,
} from "@chakra-ui/react";
import Loading from "../Loading";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = useSelector((state) => state.categories.categories);

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

  useEffect(() => {
    setFilteredProducts(data);
  }, [data]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Filter sản phẩm theo giá
  const filterProductsByPrice = () => {
    let filtered = data;
    if (selectedPriceRange === "under100k") {
      filtered = filtered.filter((product) => product.price < 100000);
    } else if (selectedPriceRange === "100kto300k") {
      filtered = filtered.filter(
        (product) => product.price >= 100000 && product.price <= 300000
      );
    } else if (selectedPriceRange === "over300k") {
      filtered = filtered.filter((product) => product.price > 300000);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên sau khi filter
  };

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

      <Box>
        <Select
          placeholder="Chọn mức giá"
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="under100k">Dưới 100,000</option>
          <option value="100kto300k">100,000 - 300,000</option>
          <option value="over300k">Trên 300,000</option>
        </Select>
        <Button my={5} onClick={filterProductsByPrice}>
          Lọc
        </Button>
      </Box>

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
