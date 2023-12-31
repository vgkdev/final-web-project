import { Box, Button, Grid, Text, GridItem } from "@chakra-ui/react";
import React from "react";

const CategoryComp = ({
  id,
  categoryName,
  Products,
  handleShowModalCategory,
  handleDeleteCategory,
}) => {
  return (
    <Box textAlign={"left"} mb="20px" border={"2px solid #50555e"} p={3}>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 5, md: 3, lg: 4 }}>
          <Text fontSize="lg">
            {categoryName}
            {/* ({Products.length} products) */}
          </Text>
        </GridItem>

        <GridItem
          //   colStart={4}
          //   colEnd={6}
          colSpan={{ base: 5, md: 2, lg: 1 }}
          style={{ display: "flex", gap: "5px" }}
        >
          <Button
            colorScheme={"blue"}
            onClick={() => handleShowModalCategory(id, "Detail")}
          >
            Chi tiết
          </Button>
          <Button
            colorScheme={"blue"}
            onClick={() => handleShowModalCategory(id, "Update")}
          >
            Cập nhật
          </Button>
          <Button colorScheme={"blue"} onClick={() => handleDeleteCategory(id)}>
            {" "}
            Xóa{" "}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default CategoryComp;
