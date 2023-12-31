import {
  Box,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { FaTrash, FaEdit, FaImage } from "react-icons/fa";
import { convertPrice } from "../../../Utils/convertData";

const ProductComp = ({
  handleDeleteProduct,
  handleShowModalProduct,
  products,
}) => {
  console.log("check props: ", products);
  return (
    <Box p={"2"} textAlign={"center"} mb="20px" border={"2px solid #50555e"}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Thông tin sản phẩm</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Tên sản phẩm</Th>
              <Th>Tên danh mục</Th>
              <Th>Ảnh</Th>
              <Th>Số lượng</Th>
              <Th>Giá</Th>
              <Th>Quản lý</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.productName}</Td>
                <Td>{item.Category.categoryName}</Td>
                <Td>
                  <Image
                    objectFit="contain"
                    boxSize="100px"
                    src={`data:image/jpeg;base64,${item.imageUrl}`}
                  />
                </Td>
                <Td>{item.quantity}</Td>
                <Td>{convertPrice(item.price)}</Td>

                <Td>
                  <IconButton
                    bg={"none"}
                    aria-label="Edit"
                    icon={<FaEdit />}
                    onClick={() => handleShowModalProduct(item.id, "Update")}
                    mr="2"
                  />
                  <IconButton
                    bg={"none"}
                    aria-label="Edit"
                    icon={<FaImage />}
                    onClick={() =>
                      handleShowModalProduct(item.id, "Update_image")
                    }
                    mr="2"
                  />
                  <IconButton
                    bg={"none"}
                    aria-label="Delete"
                    icon={<FaTrash />}
                    onClick={() => handleDeleteProduct(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductComp;
