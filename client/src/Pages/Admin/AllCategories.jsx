import React from "react";
import { Box, Button, Divider, Text } from "@chakra-ui/react";
import UserComp from "./Comp/UserComp";
import CategoryComp from "./Comp/CategoryComp";

const AllCategories = ({
  categories = [],
  handleShowModalCategory,
  handleDeleteCategory,
}) => {
  return (
    <Box>
      <Text>Tất cả danh mục</Text>
      <Divider
        mt="3px"
        mb="3px"
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
      <Button
        m={"20px auto"}
        colorScheme="whatsapp"
        onClick={() => handleShowModalCategory(null, "Create")}
      >
        + Tạo danh mục mới
      </Button>
      <hr color="black" size="50px" />
      <Box>
        {categories &&
          categories.map((el, index) => (
            <CategoryComp
              key={index}
              {...el}
              handleShowModalCategory={handleShowModalCategory}
              handleDeleteCategory={handleDeleteCategory}
            />
          ))}
      </Box>
      <Divider
        my={5}
        orientation="horizontal"
        style={{ color: "red", size: "20" }}
      />
    </Box>
  );
};

export default AllCategories;
