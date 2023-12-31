import React from "react";
import {
  Box,
  List,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <>
        <Box
          bg="#6bc6d9"
          className="FooterMainBox"
          // border={{ base: "1px solid #000000", md: "3px solid #000000" }}
          py={5}
          mt="1%"
        >
          <SimpleGrid
            m="auto"
            className="FooterSimpleGrid"
            columns={[2, 2, 4]}
            w={{ base: "90%", md: "85%" }}
            rowGap="40px"
            mt="20px"
            justifyContent={"space-around"}
          >
            <Box>
              <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                THÔNG TIN LIÊN LẠC
              </Text>
              <Text color="#fff">- - - - - -</Text>
              <Box
                color="gray"
                fontWeight="500"
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight="30px"
              >
                <Text
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  (+84) 123456789
                </Text>
                <Text
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  heshi.com <br />
                </Text>
                <Text
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Thành phố Hồ Chí Minh <br />
                </Text>
                <Text
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Giờ mở cửa: 10:00AM - 7:00PM
                </Text>
                <Box
                  display="flex"
                  gap="30px"
                  fontSize="30px"
                  color="#000000"
                  mt="20px"
                >
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=100091881355909"
                  >
                    <BsFacebook cursor={"pointer"} />
                  </a>

                  <BsInstagram />
                </Box>
              </Box>
            </Box>

            <Box>
              <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                Đường dẫn
              </Text>
              <Text color="#fff">- - - - - -</Text>
              <UnorderedList
                color="gray"
                fontWeight="500"
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight="30px"
              >
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Về chúng tôi
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Liên hệ chúng tôi
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Điều khoản và điều kiện
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Chính sách bảo mật
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Chính sách đổi trả & hoàn tiền
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Chính sách vận chuyển
                </ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                THÔNG TIN KHÁC HÀNG
              </Text>
              <Text color="#fff">- - - - - -</Text>
              <UnorderedList
                color="gray"
                fontWeight="500"
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight="30px"
              >
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/"}>Tài khoản</Link>
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/"}>Theo dõi đơn hàng của bạn</Link>
                </ListItem>

                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/favorite-list"}>Danh sách yêu thích</Link>
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  Tin tức và sự kiện
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  FAQ
                </ListItem>
              </UnorderedList>
            </Box>

            <Box>
              <Text color={"white"} fontWeight={"bold"} fontSize={17}>
                Danh mục
              </Text>
              <Text color="#fff">- - - - - -</Text>
              <UnorderedList
                color="gray"
                fontWeight="500"
                fontSize={{ base: "12px", md: "14px" }}
                lineHeight="30px"
              >
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/treatment"}>Sản phẩm đặc trị</Link>
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/skin"}>Dưỡng da</Link>
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/clean"}>Làm sạch</Link>
                </ListItem>
                <ListItem
                  textColor={"#000000"}
                  _hover={{ color: "#000000", cursor: "pointer" }}
                >
                  <Link to={"/personal-care"}>Thực phẩm chức năng</Link>
                </ListItem>
              </UnorderedList>
            </Box>
          </SimpleGrid>
        </Box>
      </>
    </div>
  );
};

export default Footer;
