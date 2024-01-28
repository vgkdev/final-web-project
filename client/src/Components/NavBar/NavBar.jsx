import { BottomNav } from "./Bottom_nav";
import { MiddleLogoDiv } from "./Middle_logo_div";
import { TopImageDiv } from "./Top_image";
import { Buffer } from "buffer";

import { useDispatch, useSelector } from "react-redux";

export const Navbar = () => {
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);

  console.log("check categories data: ", categories);

  const serumProducts = categories.filter((value) => {
    return value.categoryName === "Sản phẩm đặc trị";
  });

  const skinProducts = categories.filter((value) => {
    return value.categoryName === "Dưỡng da";
  });

  const cleanProducts = categories.filter((value) => {
    return value.categoryName === "Làm sạch";
  });

  const personalProducts = categories.filter((value) => {
    return value.categoryName === "Sản phẩm chức năng";
  });

  const otherProducts = categories.filter((value) => {
    return value.categoryName === "Khác";
  });

  return (
    <>
      <BottomNav
        serumProducts={serumProducts[0]?.Products}
        skinProducts={skinProducts[0]?.Products}
        cleanProducts={cleanProducts[0]?.Products}
        personalProducts={personalProducts[0]?.Products}
        otherProducts={otherProducts[0]?.Products}
      />
    </>
  );
};
