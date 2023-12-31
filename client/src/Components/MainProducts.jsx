import { FaShoppingCart, FaRegBookmark, FaStar } from "react-icons/fa";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Container,
} from "@chakra-ui/react";
import "./Products/Products.css";
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  BsSuitHeartFill,
  BsFillCartPlusFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import { createNewCartService } from "../api/cartApi";
import { toast } from "react-toastify";
import { convertPrice } from "../Utils/convertData";
import {
  createNewFavoriteListService,
  deleteFavoriteListService,
} from "../api/favoriteListApi";

export function MainProducts(props) {
  const { setnav, setState } = props;

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products.products);

  // console.log("check props: ", props);

  const handleMouseEnter = (e) => {
    e.currentTarget.style.boxShadow = "0px 4px 30px rgba(0, 0, 0, 0.25)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.boxShadow = "";
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Xin hãy đăng nhập !");
    } else {
      const payload = {
        userId: user.id,
        productId: props.id,
        quantity: 1,
      };

      const productAddToCart = products.find((p) => p.id === props.id);
      if (productAddToCart.quantity > 0) {
        // console.log("check payload: ", payload);
        const response = await createNewCartService(payload);
        if (response.data.errCode === 0) {
          toast.success("Đã thêm vào giỏ hàng");
        } else {
          toast.error("Lỗi không thêm được vào giỏ hàng");
        }
      } else {
        toast.error("Số lượng sản phẩm hiện tại không đủ !");
      }
    }
  };

  const handleAddFavoriteList = async () => {
    if (!user) {
      toast.error("Xin hãy đăng nhập !");
    } else {
      const payload = {
        userId: user.id,
        productId: props.id,
      };

      const response = await createNewFavoriteListService(payload);
      if (response.data.errCode === 0) {
        toast.success("Đã thêm vào danh sách yêu thích");
      } else {
        if (response.data.errCode === 2) {
          toast.error("Sản phẩm đã tồn tại trong danh sách");
        } else {
          toast.error("Lỗi không thêm được vào danh sách yêu thích");
        }
      }
    }
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      border={"1px solid #e7e7e7"}
      borderRadius={"5px"}
      // maxW={"270"}
      width={"270"}
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
    >
      <Card size="sm" width={"100%"}>
        <CardBody
          cursor={"pointer"}
          onClick={() => {
            navigate(`/product/${props.id}`);
            if (setnav) setnav(false);
          }}
        >
          <Image
            margin={"0 auto"}
            alignItems={"center"}
            style={{ zIndex: "1000" }}
            objectFit="contain"
            boxSize="170"
            src={`data:image/jpeg;base64,${props.image}`}
            alt="product-img"
          />
          <Stack mt="6" spacing="2">
            <Heading size="md">{props.name}</Heading>
            <Text fontSize="sm">{props.description}</Text>
            <Text color="blue.600" fontSize="sm">
              {convertPrice(props.price)}
            </Text>
          </Stack>
        </CardBody>

        <Divider borderColor={"silver"} />

        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              bgColor={"#6bc6d9"}
              color={"#ffffff"}
              onClick={handleAddToCart}
              mb={4}
              mr={3}
            >
              <BsFillCartPlusFill style={{ marginRight: "5px" }} />
            </Button>
            {props.type && props.type === "FAVORITE" ? (
              <Button
                bgColor={"red"}
                color={"#ffffff"}
                mb={4}
                onClick={() => props.handleDeleteItemInFavoriteList(props.id)}
              >
                <BsFillTrashFill />
              </Button>
            ) : (
              <Button
                bgColor={"#6bc6d9"}
                color={"#ffffff"}
                mb={4}
                onClick={handleAddFavoriteList}
              >
                <BsSuitHeartFill />
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Box>
  );
}
