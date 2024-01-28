import { useEffect, useState } from "react";
import { Box, Text, Wrap, SimpleGrid, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MainProducts } from "../../Components/MainProducts";

const PersonalCare = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Số lượng sản phẩm trên mỗi trang

  const categories = useSelector((state) => state.categories.categories);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const personalCareProducts = categories.filter((value) => {
      return value.categoryName === "Sản phẩm chức năng";
    });
    setProducts(personalCareProducts[0]?.Products || []);
  }, [categories]);

  // Lấy chỉ mục của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Tính toán số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
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
        Sản phẩm chức năng
      </Text>

      <Wrap justify="center" my={"16"}>
        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {currentProducts &&
            currentProducts.map((value, i) => (
              <MainProducts
                key={value.id}
                id={value.id}
                image={value.imageUrl}
                name={value.productName}
                price={value.price}
                description={value.description}
              />
            ))}
        </SimpleGrid>
      </Wrap>

      <Box textAlign="center" mt={4}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            size="sm"
            colorScheme={currentPage === number ? "teal" : "gray"}
            onClick={() => paginate(number)}
            mx={1}
          >
            {number}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default PersonalCare;
