import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";
import { NavSingle } from "./navSingle";
import { Link } from "react-router-dom";
import "./cart.css";
import { Image } from "@chakra-ui/react";
import skinCareIcon from "../../assets/images/skincare-icon.jpg";
import { TbVaccineBottle } from "react-icons/tb";
export const BottomNav = (props) => {
  const { serumProducts, skinProducts, cleanProducts, personalProducts } =
    props;

  const [navDropDown, setnavDropDown] = useState(false);
  const [dropDownSerum, setDropDownSerum] = useState(false);
  const [dropDownSkin, setDropDownSkin] = useState(false);
  const [dropDownClean, setDropDownClean] = useState(false);
  const [dropDownPersonalCare, setDropDownPersonalCare] = useState(false);

  const [makeup, setMakeup] = useState(false);
  const [skin, setSkin] = useState(false);
  const [clean, setClean] = useState(false);
  const [pcare, setPcare] = useState(false);
  const [mom, setmom] = useState(false);
  const [frag, setFrag] = useState(false);
  const [ayurveda, setAyurveda] = useState(false);
  const [brand, setBrand] = useState(false);
  const restState = [
    setSkin,
    setClean,
    setPcare,
    setmom,
    setFrag,
    setAyurveda,
    setBrand,
  ];

  // const brands = [{ "": [] }];
  return (
    <div id="bottom_nav">
      {/* menu */}
      <div id="nav_content">
        <div
          onMouseEnter={() => {
            setDropDownSerum(true);
            setSkin(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setMakeup(true);
          }}
          onMouseLeave={() => {
            setDropDownSerum(false);
          }}
        >
          SẢN PHẨM ĐẶC TRỊ <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownSkin(true);
            setMakeup(false);
            setClean(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setSkin(true);
          }}
          onMouseLeave={() => {
            setDropDownSkin(false);
          }}
        >
          DƯỠNG DA <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownClean(true);
            setMakeup(false);
            setSkin(false);
            setPcare(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setClean(true);
          }}
          onMouseLeave={() => {
            setDropDownClean(false);
          }}
        >
          LÀM SẠCH <IoIosArrowDown />
        </div>

        <div
          onMouseEnter={() => {
            setDropDownPersonalCare(true);
            setMakeup(false);
            setSkin(false);
            setClean(false);
            setmom(false);
            setFrag(false);
            setAyurveda(false);
            setBrand(false);
            setPcare(true);
          }}
          onMouseLeave={() => {
            setDropDownPersonalCare(false);
          }}
        >
          SẢN PHẨM CHỨC NĂNG <IoIosArrowDown />
        </div>

        <Link to="/products">
          <div id="cart">
            <TbVaccineBottle /> Tất cả sản phẩm
          </div>
        </Link>

        <Link to="/cart">
          <div id="cart">
            <GiShoppingBag></GiShoppingBag> GIỎ HÀNG
          </div>
        </Link>
      </div>

      {/* {navDropDown ? (
        <>
          <NavSingle
            array={makeupArr}
            products={serumProducts}
            state={makeup}
            setState={setMakeup}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={skinArr}
            products={skinProducts}
            state={skin}
            setState={setSkin}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={cleanArr}
            products={cleanProducts}
            state={clean}
            setState={setClean}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={personalcare}
            products={personalProducts}
            state={pcare}
            setState={setPcare}
            setnav={setnavDropDown}
          />
          <NavSingle
            array={brands}
            state={brand}
            setState={setBrand}
            setnav={setnavDropDown}
          />
        </>
      ) : null} */}

      {dropDownSerum && (
        <NavSingle
          products={serumProducts}
          state={makeup}
          setState={setMakeup}
          setnav={setDropDownSerum}
          path={"/treatment"}
        />
      )}

      {dropDownSkin && (
        <NavSingle
          products={skinProducts}
          state={skin}
          setState={setSkin}
          setnav={setDropDownSkin}
          path={"/skin"}
        />
      )}

      {dropDownClean && (
        <NavSingle
          products={cleanProducts}
          state={clean}
          setState={setClean}
          setnav={setDropDownClean}
          path={"/clean"}
        />
      )}

      {dropDownPersonalCare && (
        <NavSingle
          products={personalProducts}
          state={pcare}
          setState={setPcare}
          setnav={setDropDownPersonalCare}
          path={"/personal-care"}
        />
      )}
    </div>
  );
};
