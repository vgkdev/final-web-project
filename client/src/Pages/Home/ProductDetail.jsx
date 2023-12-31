import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  IconButton,
  HStack,
  Textarea,
  Grid,
  Input,
} from "@chakra-ui/react";
import {
  BsSuitHeartFill,
  BsFillCartPlusFill,
  BsArrowDown,
  BsArrowUp,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Components/Loading";
import { MainProducts } from "../../Components/MainProducts";
import { animateScroll as scroll } from "react-scroll";
import {
  createNewProductCommentService,
  getAllProductCommentsService,
} from "../../api/productCommentApi";
import moment from "moment";
import ListComment from "../../Components/ListComment";
import { createNewCartService } from "../../api/cartApi";
import { toast } from "react-toastify";
import { createNewFavoriteListService } from "../../api/favoriteListApi";

// import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const [commentAdded, setCommentAdded] = useState(false);

  const { id } = useParams();
  const products = useSelector((state) => state.products.products);
  const categories = useSelector((state) => state.categories.categories);
  const user = useSelector((state) => state.user.user);

  const relatedProducts = categories
    .flatMap((category) => category.Products)
    .filter((p) => p.id !== id)
    .slice(0, 4);

  useEffect(() => {
    setLoading(true);
    setQuantity(1);
    scroll.scrollToTop();
    setTimeout(() => {
      setData(getProductData(products));
      setLoading(false);
    }, [1000]);
  }, [products, id]);

  const getProductData = (data) => {
    const product = data.filter((product) => product.id === Number(id));
    if (product.length !== 0) {
      return product[0];
    } else {
      return null;
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Xin hãy đăng nhập !");
    } else {
      const payload = {
        userId: user.id,
        productId: data.id,
        quantity: quantity,
      };

      const productAddToCart = products.find((p) => p.id === data.id);
      if (productAddToCart.quantity >= quantity) {
        console.log("check quantity: ", productAddToCart.quantity);
        const response = await createNewCartService(payload);
        if (response.data.errCode === 0) {
          toast.success("Đã thêm vào giỏ hàng");
          // console.log("add success");
        } else {
          toast.error("Lỗi không thêm được vào giỏ hàng");
        }
        console.log("check add to cart: ", response);
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
        productId: id,
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

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error("Xin hãy đăng nhập !");
    } else {
      if (comment === "") {
        toast.error("Xin hãy nhập nội dung bình luận !");
      } else {
        const payload = {
          userId: user.id,
          productId: data.id,
          commentContent: comment,
        };

        const response = await createNewProductCommentService(payload);
        if (response.data.errCode === 0) {
          setCommentAdded(!commentAdded);
          setComment("");
        }
      }
    }

    // console.log("check payload: ", response);
  };

  // console.log("check products: ", products);
  return (
    <>
      {data && !loading && (
        <Container maxW="container.lg" py={8}>
          <Flex direction={{ base: "column", lg: "row" }}>
            <Box flex={1}>
              <Image
                src={`data:image/jpeg;base64,${data.imageUrl}`}
                boxSize={"400px"}
                objectFit="contain"
                alt={data.name}
              />
            </Box>

            <Box flex={2} pl={{ base: 0, lg: 8 }} mt={{ base: 8, lg: 0 }}>
              <Text fontSize={"2xl"} fontWeight={"bold"} mb={4}>
                {data.productName}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color="red.500" mb={4}>
                {data.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
              <Text fontSize="lg" mb={4}>
                {data.description}
              </Text>
              <Text fontSize="lg" mb={4}>
                Số lượng: {data.quantity}
              </Text>
              <Divider my={8} />

              <HStack spacing="4" mb={4}>
                <Text>Số lượng:</Text>
                <IconButton
                  icon={<BsArrowDown />}
                  aria-label="Giảm số lượng"
                  onClick={() =>
                    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
                  }
                />
                <Text>{quantity}</Text>
                <IconButton
                  icon={<BsArrowUp />}
                  aria-label="Tăng số lượng"
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                />
              </HStack>

              <Button
                bgColor={"#6bc6d9"}
                color={"#ffffff"}
                onClick={handleAddToCart}
                mb={4}
                mr={3}
              >
                <BsFillCartPlusFill style={{ marginRight: "6px" }} />
                Thêm vào giỏ hàng
              </Button>
              <Button
                onClick={handleAddFavoriteList}
                bgColor={"#6bc6d9"}
                color={"#ffffff"}
                mb={4}
              >
                <BsSuitHeartFill />
              </Button>
            </Box>
          </Flex>

          <Divider my={8} />
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Nhận xét
          </Text>

          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Nhập bình luận của bạn..."
            mb={4}
          />
          <Button
            onClick={handleSubmitComment}
            bgColor={"#6bc6d9"}
            color={"#ffffff"}
          >
            Gửi
          </Button>

          {/* <Box>
            {listComment.length !== 0 && (
              <>
                {listComment.map((comment) => (
                  <Box
                    key={comment.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    p={3}
                    my={3}
                  >
                    <Text fontSize={"lg"}>{comment.commentContent}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {comment.User.firstName + " " + comment.User.lastName} -{" "}
                      {moment
                        .utc(comment.createdAt)
                        .local()
                        .format("DD-MM-YYYY HH:mm")}
                    </Text>
                  </Box>
                ))}
              </>
            )}
          </Box> */}
          <ListComment id={id} commentAdded={commentAdded} />

          <Divider my={8} />
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Sản phẩm cùng loại
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            mb={5}
          >
            {relatedProducts.map((product) => (
              <MainProducts
                key={product.id}
                id={product.id}
                image={product.imageUrl}
                name={product.productName}
                price={product.price}
                description={product.description}
              />
            ))}
          </Grid>
          {/* <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
           
          </Stack> */}
        </Container>
      )}

      {loading && <Loading />}
    </>
  );
};

export default ProductDetail;
