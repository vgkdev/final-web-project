import React, { useEffect, useState } from "react";
import { MainProducts } from "../../Components/MainProducts";
import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Image,
  Button,
  Stack,
  Wrap,
  SimpleGrid,
} from "@chakra-ui/react";
import Loading from "../../Components/Loading";
import {
  deleteFavoriteListService,
  getFavoriteListByUserIdService,
} from "../../api/favoriteListApi";
import { convertImageToBase64 } from "../../Utils/convertData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FavoriteList = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changeData, setChangeData] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      setLoading(true);
      try {
        console.log("check render");
        const response = await getFavoriteListByUserIdService(user.id);
        // console.log("check res: ", response);
        if (response.data.errCode === 0) {
          const favoriteList = response.data.favoriteList;
          const convertedFavoriteList = favoriteList.map((favorite) => ({
            ...favorite,
            Product: {
              ...favorite.Product,
              imageUrl: convertImageToBase64(favorite.Product.imageUrl),
            },
          }));

          setData(convertedFavoriteList);
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchFavoriteProducts();
  }, [user?.id, changeData]);

  const handleDeleteItemInFavoriteList = async (id) => {
    // console.log("check product id: ", props.id);
    const response = await deleteFavoriteListService(id);
    if (response.data.errCode === 0) {
      toast.success("Đã xóa sản phẩm khỏi danh sách yêu thích");
    } else {
      toast.error("Lỗi không thể xóa sản phẩm khỏi danh sách !");
    }
    setChangeData(!changeData);
  };

  // if (!user) {
  //   navigate("/login");
  // }
  // console.log("check data: ", data);

  return (
    <Box p={5}>
      <Text
        textAlign="center"
        fontSize="21px"
        textDecoration="underline 2px #6bc6d9"
        fontWeight="semibold"
        margin="15px"
      >
        Danh sách sản phẩm yêu thích
      </Text>

      <Wrap justify="center" my={"16"}>
        {!loading && data.length === 0 && (
          <Box textAlign={"center"}>Không tìm thấy sản phẩm !</Box>
        )}

        <SimpleGrid w="90%" spacing={3} columns={[1, 2, 3, 4]} gap={5} m={5}>
          {data &&
            data.length !== 0 &&
            !loading &&
            data.map((value) => (
              <MainProducts
                key={value.id}
                id={value.Product.id}
                image={value.Product.imageUrl}
                name={value.Product.productName}
                price={value.Product.price}
                description={value.Product.description}
                type={"FAVORITE"}
                handleDeleteItemInFavoriteList={handleDeleteItemInFavoriteList}
              />
            ))}

          {loading && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </SimpleGrid>
      </Wrap>
    </Box>
  );
};
export default FavoriteList;
