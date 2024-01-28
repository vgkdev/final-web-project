import { useEffect, useState } from "react";
import { Box, Text, Wrap, SimpleGrid, Button, Select } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { MainProducts } from "../../Components/MainProducts";

const Skin = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Số lượng sản phẩm trên mỗi trang
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState(""); // Mức giá được chọn
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    const skinProducts = categories.find(
      (category) => category.categoryName === "Dưỡng da"
    );
    if (skinProducts) {
      setProducts(skinProducts.Products || []);
      setLoading(false);
    }
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

  // Hàm lọc sản phẩm theo mức giá
  const filterProductsByPrice = () => {
    if (!selectedPriceRange) return;

    let filteredProducts = products;
    switch (selectedPriceRange) {
      case "under100k":
        filteredProducts = products.filter((product) => product.price < 100000);
        break;
      case "100kto300k":
        filteredProducts = products.filter(
          (product) => product.price >= 100000 && product.price <= 300000
        );
        break;
      case "over300k":
        filteredProducts = products.filter((product) => product.price > 300000);
        break;
      default:
        break;
    }
    setProducts(filteredProducts);
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
        Sản phẩm dưỡng da
      </Text>

      <Box>
        <Select
          placeholder="Chọn mức giá"
          onChange={(e) => setSelectedPriceRange(e.target.value)}
          value={selectedPriceRange}
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
        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {currentProducts.map((value, i) => (
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

export default Skin;
