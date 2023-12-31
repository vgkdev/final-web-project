import { useState } from "react";
import { MainProducts } from "../MainProducts";
import { Box } from "@chakra-ui/react";
import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NavSingle = ({
  products,
  array,
  state,
  setState,
  setnav,
  path,
}) => {
  const navigate = useNavigate();

  const handleOnClickShowMoreProducts = () => {
    setState(false);
    setnav(false);
    navigate(path);
  };

  // console.log("check products from nav single: ", products);
  return (
    <Box
      id="nav_dropdown"
      // style={{ border: "1px solid red" }}
      p={7}
      gap={5}
      onMouseEnter={() => {
        setnav(true);
        setState(true);
      }}
      onMouseLeave={() => {
        setnav(false);
        setState(true);
      }}
    >
      {state && products ? (
        <>
          {products.map(
            (content, index) =>
              index < 2 && (
                <MainProducts
                  setState={setState}
                  setnav={setnav}
                  key={content.id}
                  id={content.id}
                  image={content.imageUrl}
                  name={content.productName}
                  price={content.price}
                  description={content.description}
                />
              )
          )}
          <Box
            cursor={"pointer"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"end"}
            m={5}
            onClick={handleOnClickShowMoreProducts}
          >
            Xem thêm {<FaArrowCircleRight style={{ marginLeft: "5px" }} />}
          </Box>
        </>
      ) : null}
    </Box>
  );
};
