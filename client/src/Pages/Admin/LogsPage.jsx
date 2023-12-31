import { Box, Divider, Text, Button } from "@chakra-ui/react";
import React from "react";
import ProductComp from "./Comp/ProductComp";

const LogsPage = ({
  products,
  handleShowModalProduct,
  handleDeleteProduct,
}) => {
  return (
    <Box>
      <Text fontSize="xl">Tất cả sản phẩm</Text>
      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />

      <Button
        // style={{ margin: "10px auto" }}
        m={"20px auto"}
        colorScheme="whatsapp"
        onClick={() => handleShowModalProduct(null, "Create")}
      >
        + Create new category
      </Button>

      {products && (
        <ProductComp
          products={products}
          handleShowModalProduct={handleShowModalProduct}
          handleDeleteProduct={handleDeleteProduct}
        />
      )}

      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
    </Box>
  );
};

export default LogsPage;
