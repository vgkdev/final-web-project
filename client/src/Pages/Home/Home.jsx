import { Box, Text, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Hotdeals from "./Hotdeals";
import { NavLink } from "react-router-dom";

// import { Images } from "./Data";
import { useEffect, useState } from "react";
import BestSeller from "./BestSeller";
import axios from "axios";
import { IoIosMenu } from "react-icons/io";
import React from "react";
import { dataUrl } from "../../share";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.jpg";
import banner6 from "../../assets/images/banner6.jpg";
import makeupIcon from "../../assets/images/makeup-icon.jpg";
import treatmentIcon from "../../assets/images/treatment-icon.jpg";
import hairIcon from "../../assets/images/hair-icon.jpg";
import skinCareIcon from "../../assets/images/skincare-icon.jpg";
import cleanIcon from "../../assets/images/clean-icon.jpg";
import personalCareIcon from "../../assets/images/personal-care-icon.jpg";
import perfumeIcon from "../../assets/images/perfume-icon.jpg";
import motherAndBabyIcon from "../../assets/images/mother-and-baby-icon.jpg";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.log("data------", data);
  }, [data]);

  return (
    <>
      {/* <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100086177367243%26mibextid%3DZbWKwL&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="500"
        // style="border:none;overflow:hidden"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      ></iframe> */}

      {/* menu */}
      <Box
        w="90%"
        m="auto"
        mt="40px"
        display={["inline", "flex", "flex"]}
        p="2px"
        justifyContent="space-between"
        border="0.3px solid grey"
        style={{ zIndex: "-100" }}
      >
        {/* option */}
        <Box
          ml={["16px", "16px", "16px"]}
          display={["block", "block", null, null, null]}
          width={["80%", "35%", "27%"]}
        >
          <Box display="flex" p={["5px 10px", "2px 2px", "2px 9px"]}>
            <Box>
              <IoIosMenu size="24px"></IoIosMenu>
            </Box>
            <Box>
              <Text
                marginLeft="3px"
                pt={["2px", "3px", "0px"]}
                fontWeight="bold"
                fontSize={["13px", "12px", "16px"]}
              >
                TẤT CẢ DANH MỤC
              </Text>
            </Box>
          </Box>

          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                // width={["69%", "68%", "78%"]}
                marginRight="5px"
                boxSize={"30px"}
                objectFit={"contain"}
                src={treatmentIcon}
              />
            </Box>
            <NavLink to="/treatment">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>
                  Sản phẩm đặc trị
                </Text>
              </Box>
            </NavLink>
          </Box>

          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                boxSize={"30px"}
                objectFit={"contain"}
                src={skinCareIcon}
              />
            </Box>
            <NavLink to="/skin">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Dưỡng da</Text>
              </Box>
            </NavLink>
          </Box>

          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                boxSize={"30px"}
                objectFit={"contain"}
                src={cleanIcon}
              />
            </Box>
            <NavLink to="/clean">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>Làm sạch</Text>
              </Box>
            </NavLink>
          </Box>

          <Box display="flex" p={["1px 10px", "1px 4px", "4px 11px"]}>
            <Box>
              <Image
                width={["69%", "68%", "78%"]}
                marginRight="5px"
                boxSize={"30px"}
                objectFit={"contain"}
                src={personalCareIcon}
              />
            </Box>
            <NavLink to="/personal-care">
              <Box>
                <Text fontSize={["12px", "12px", "15px"]}>
                  Sản phẩm chức năng
                </Text>
              </Box>
            </NavLink>
          </Box>
        </Box>
        {/* end option */}
        {/* Slider */}
        <Box
          p="0.5px"
          margin="auto"
          width={["89%", "73%", "73%"]}
          style={{ zIndex: "-100" }}
        >
          <Slider {...settings}>
            <Box>
              <Image
                objectFit="contain"
                boxSize={"fit-content"}
                src={banner1}
              />
            </Box>
            <Box>
              <Image
                objectFit="contain"
                boxSize={"fit-content"}
                src={banner2}
              />
            </Box>
          </Slider>
        </Box>
      </Box>
      {/* end menu */}

      {/* <Hotdeals dt={data} /> */}
      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner3} />
      </Box>

      <br />
      <BestSeller />
      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner4}></Image>
      </Box>

      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner5}></Image>
      </Box>

      <br />
      <Box w="90%" m="auto">
        <Image w="100%" src={banner6}></Image>
      </Box>
      <br />
    </>
  );
};
export default React.memo(Home);
