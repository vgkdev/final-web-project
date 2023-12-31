import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "./App.css";
import Navimag from "./Components/NavBar/beautybebo_logo.png";
import Drop from "./Components/Dropcde/Drop";
import Footer from "./Components/Footer/Footer";
import Navdar from "./Components/MyAccount/Navdar";
import Topnavbar from "./Components/MyAccount/Topnavbar";

import { Navbar } from "./Components/NavBar/NavBar";
import { useMedia } from "./MediaQuery/UseMedia";
import AllRoutes from "./Routes/AllRoutes";
import logoApp from "./assets/images/logo-app.png";
import { useEffect, useState } from "react";
import { getAllProductsService } from "./api/productApi";
import { Buffer } from "buffer";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./reducers/categories";
import Loading from "./Components/Loading";
import { setProducts } from "./reducers/products";
import { ToastContainer } from "react-toastify";

function App() {
  const { smallScreen, mediumScreen } = useMedia();

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  useEffect(() => {
    dispatch(fetchCategories());
    // console.log("check categories redux: ", categories);
  }, [dispatch]);

  useEffect(() => {
    if (categories.length !== 0) {
      const allProducts = categories
        .map((category) => category.Products)
        .flatMap((products) => products);

      // const updatedProducts = allProducts.map((product) => {
      //   return {
      //     ...product,
      //     price: product.price.toLocaleString("vi-VN", {
      //       style: "currency",
      //       currency: "VND",
      //     }),
      //   };
      // });
      // console.log("check products: ", updatedProducts);
      dispatch(setProducts(allProducts));
    }
  }, [categories, dispatch]);

  return (
    <div className="App">
      <ToastContainer position="top-center" autoClose={3000} />

      {loading && <Loading />}

      {/* <Topnavbar /> */}
      {mediumScreen && !loading && <Navdar />}

      {mediumScreen && !loading && <Navbar />}
      {!mediumScreen && !loading && (
        <Flex
          style={{ position: "sticky", top: "0px", zIndex: 12 }}
          bgColor={"#6bc6d9"}
          w="100%"
          justifyContent={"space-between"}
          p={"5px 5%"}
        >
          <div style={{ width: "35%", paddingLeft: "5%", marginTop: "-18px" }}>
            <Link to={"/"}>
              <img
                alt="logo"
                style={{ width: "100%", borderRadius: "5px" }}
                src={logoApp}
              />{" "}
            </Link>
          </div>
          <Flex gap={5}>
            <Box>
              <Button
                colorScheme="#dd0285"
                border={"1px solid white"}
                color="black"
              >
                <Link to="/cart">
                  <Text>My Cart</Text>{" "}
                </Link>
              </Button>
            </Box>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <Link to={"/"}>
                  {" "}
                  <MenuItem /* onClick={()=>toggleClick("home")} */>
                    {" "}
                    Home
                  </MenuItem>{" "}
                </Link>
                <Link to={"/login"}>
                  {" "}
                  <MenuItem /* onClick={()=>toggleClick("about")} */ /* bgColor={yellow} */
                  >
                    Login
                  </MenuItem>{" "}
                </Link>
                <Link to={"/signup"}>
                  <MenuItem /* onClick={()=>toggleClick("skills")} */>
                    Signup
                  </MenuItem>{" "}
                </Link>
                <Link to={"/admin"}>
                  {" "}
                  <MenuItem /* onClick={()=>toggleClick("projects")} */ /* bgColor={yellow} */
                  >
                    Admin
                  </MenuItem>{" "}
                </Link>
                <Link to={"/cart"}>
                  {" "}
                  <MenuItem /* onClick={()=>toggleClick("contact")} */>
                    {" "}
                    Cart
                  </MenuItem>{" "}
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      )}
      {!loading && <AllRoutes />}
      {!loading && <Footer />}
    </div>
  );
}

export default App;
