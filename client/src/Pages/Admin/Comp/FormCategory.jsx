import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

const FormCategory = (props) => {
  const { category, type, handleEditCategory, handleCreateCategory } = props;
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (type !== "Create") {
      setCategoryName(category.categoryName);
    }
  }, [type, category]);

  const handleOnClickSubmit = () => {
    // console.log(firstName, lastName, email, address, phoneNumber);

    if (type === "Create") {
      const data = {
        categoryName: categoryName,
      };
      handleCreateCategory(data);
    } else {
      const data = {
        id: category.id,
        newCategoryName: categoryName,
        categoryName: category.categoryName,
      };
      handleEditCategory(data);
    }
  };

  //   console.log("check data in form: ", user);
  return (
    <form>
      <Stack spacing={3}>
        <FormControl>
          <FormLabel>Tên danh mục</FormLabel>
          <Input
            type="text"
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            placeholder="Tên danh mục"
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

export default FormCategory;
