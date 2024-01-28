import noImage from "../../../assets/images/noimage.jpg";
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select, Image
} from "@chakra-ui/react";
import { Images } from "../../Home/Data";

const FormProduct = (props) => {
  const {
    product,
    categories,
    type,
    handleEditProduct,
    handleCreateProduct,
    handleEditProductImage,
  } = props;
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [price, setPrice] = useState("");
  // console.log("check product form: ", product);

  useEffect(() => {
    if (type === "Update") {
      setProductName(product.productName);
      setQuantity(product.quantity);
      setPrice(product.price);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setImageUrl(product.imageUrl);
    }
  }, [type, product]);

  const handleOnClickSubmit = () => {
    if (type === "Create") {
      const data = {
        categoryId: categoryId,
        productName: productName,
        quantity: quantity,
        price: price,
        description: description,
        imageUrl: imageUrl,
      };
      handleCreateProduct(data);
    } else if (type === "Update") {
      const data = {
        id: product.id,
        newProductName: productName,
        productName: product.productName,
        categoryId: categoryId,
        quantity: quantity,
        price: price,
        description: description,
      };
      console.log("check data in form: ", data);
      handleEditProduct(data);
    } else {
      const data = {
        id: product.id,
        imageUrl: imageUrl,
      };
      handleEditProductImage(data);
    }
  };

  //   console.log("check data in form: ", user);
  return (
      <form>
        <Stack spacing={3}>
          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Tên sản phẩm</FormLabel>
            <Input
                type="text"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Tên sản phẩm"
                disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Số lượng</FormLabel>
            <Input
                type="text"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="Số lượng"
                disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Giá</FormLabel>
            <Input
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Giá"
                disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Mô tả</FormLabel>
            <Input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Mô tả"
                disabled={type === "Detail"}
            />
          </FormControl>

          <FormControl display={type === "Update_image" ? "none" : ""}>
            <FormLabel>Tên danh mục</FormLabel>
            <Select
                name="categoryName"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value={""}>---Tên danh mục---</option>
              {categories.map((value) => (
                  <option key={value.id} value={value.id}>
                    {value.categoryName}
                  </option>
              ))}
            </Select>
          </FormControl>
          <FormControl display={type === "Update" ? "none" : ""}>
            <img
                src={imageUrl ? URL.createObjectURL(imageUrl) : noImage}
                alt="Product Image"
                style={{
                  margin: "10px auto 10px auto",
                  width: "20rem",
                  height: "20rem"
                }}
            />
            <FormLabel>Ảnh</FormLabel>
            <Input
                type="file"
                onChange={(event) => {setImageUrl(event.target.files[0])}}
                disabled={type === "Detail"}
            />
          </FormControl>

          {type !== "Detail" && (
              <Button colorScheme="teal" onClick={handleOnClickSubmit}>
                Submit
              </Button>
          )}
        </Stack>
      </form>
  );
};

export default FormProduct;