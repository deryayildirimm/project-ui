import { FaAngleDown, FaBars, FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import Button from "../buttons-component/solidbutton";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,

  PopoverTrigger,
   PopoverContent,
      PopoverFooter,
 PopoverHeader,
PopoverArrow,
PopoverCloseButton,
PopoverBody,
ButtonGroup,
Popover,
Box,

} from "@chakra-ui/react";
import { formatCompactNumber } from "../../constants/formatNumber";
import { scrollToTop } from "../../constants/scrollToTop";
import useAuthKeycloak from "../../src/store/useAuthKeycloak.js";
const NavBar = ({ navBar2, showCase1Page }) => {
  const [totalQty, setTotalQty] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const { cartItems, setCartItems, modal, setModal } =
    useContext(CartContext);
  const [whenScroll, setWhenScroll] = useState("bg-transparent");
  const [logo, setlogo] = useState("D.png");
  const [textColor, setTextColor] = useState("text-white");
  const [showcaseDropDown, setShowcaseDropDown] = useState(false);
  const [viewSideNav, setViewSideNav] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  const hideNav = () => {
    setViewSideNav(false);
  };

  const { setLogout, isLogin } = useAuthKeycloak()


  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 180) {
        setWhenScroll("bg-black");
        setlogo("D.png");
        setTextColor("text-white");

      } else {
        setWhenScroll("transparent");
        setTextColor("text-white");
        setlogo("D.png");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  useEffect(() => {
    let totalQuantity = cartItems.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    setTotalQty(totalQuantity);
    let total = cartItems.map((e,) => {
      return e.quantity * e.price;
    });
    let totalPrice = total.reduce((acc, product) => acc + product, 0);
    setSubTotal(totalPrice);
    setCheckOut(false);
  }, [cartItems]);
  useEffect(() => {
    const body = document.getElementsByTagName("body").item(0);
    if (modal) {
      body.style.overflowY = "hidden";
    } else {
      body.style.overflowY = "auto";
    }
  }, [modal]);
  return (
    <>
      {modal ? (
        <div
          style={{ zIndex: 101 }}
          className="modal   fixed top-0 overflow-y-auto  flex flex-col  items-center left-0 bottom-0 right-0 bg-black/70 max-sm:bg-white"
        >
          <div className="w-[500px]  max-sm:w-full    max-sm:my-0  bg-white">
            <div
              style={{ borderBottomWidth: 1 }}
              className="modal-header text-2xl font-semibold px-6 py-4 border-gray-400/90 flex justify-between items-center"
            >
              <h1 className="title">Aldığınız hizmetler</h1>

              <div
                onClick={() => {
                  setModal(false);
                }}
                className="cancel cursor-pointer w-7 h-7"
                id="close-modal"
              >
                <div style={{ width: 3 }} className="relative mx-auto h-full">
                  <div
                    style={{ width: 2 }}
                    className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 rotate-45"
                  ></div>
                  <div
                    style={{ width: 2 }}
                    className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 -rotate-45"
                  ></div>
                </div>
              </div>
            </div>
            {totalQty > 0 ? (
              <div>
                <div
                  className={`p-6 ${checkOut ? "max-sm:pb-48" : "max-sm:pb-36"
                    } flex flex-col gap-5`}
                >
                  {cartItems.map((e, i) => {
                    if (e.quantity > 0) {
                      return (
                        <div key={i}>
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                              <div className="flex gap-4">
                                <Link
                                  onClick={() => {
                                    setModal(false);
                                    scrollToTop();
                                  }}
                                  to={`/products/${e.id}`}
                                  className="flex gap-4"
                                >
                                  <img
                                    className="min-w-[65px] w-20 h-full max-sm:h-[85px] object-cover"
                                    src={e.image}
                                    alt={e.image}
                                  />
                                </Link>
                                <div>
                                  <Link
                                    onClick={() => {
                                      setModal(false);
                                      scrollToTop();
                                    }}
                                    to={`/products/${e.id}`}
                                  >
                                    <h2 className="title-font text-xl">
                                      House in {e.name}
                                    </h2>
                                  </Link>
                                  <h3>
                                    PKR {formatCompactNumber(e.price)}/Month
                                  </h3>
                                  <p
                                    onClick={() => {
                                      let arr = cartItems;
                                      arr.splice(i, 1);
                                      setCartItems([...arr]);
                                    }}
                                    className="text-lg w-fit hover:text-black transition-all duration-300 cursor-pointer text-red-500 hover mt-3"
                                  >
                                    remove
                                  </p>
                                </div>
                              </div>
                              <div>
                                <NumberInput
                                  value={e.quantity}
                                  min={1}
                                  className="w-20"
                                  size={"md"}
                                  onChange={(event) => {
                                    if (Number(event) > 0) {
                                      let arr = cartItems;
                                      arr[i].quantity = Number(event);
                                      setCartItems([...arr]);
                                    }
                                  }}
                                >
                                  <NumberInputField readOnly={true} />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <h2>Total</h2>
                              <p>
                                PKR {formatCompactNumber(e.quantity * e.price)}
                              </p>
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="p-6 pt-0 bg-white max-sm:pt-6 flex max-sm:fixed bottom-0 left-0 right-0 flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <h2>Subtotal</h2>
                    <p className="total text-red-500">
                      PKR {formatCompactNumber(subTotal)}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setCheckOut(true);
                    }}
                    content={"Continue to Checkout"}
                    padding={"py-2"}
                  />
                  {checkOut ? (
                    <p className="text-red-500">
                      Checkout is disabled on this site.
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              <div className="p-20 flex justify-center items-center">
                <p className="text-xl">İçerik bulunamadı</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        style={{ zIndex: 98 }}
        className={
          showCase1Page
            ? " top-0 left-0 right-0 absolute"
            : `${navBar2 ? "bg-white shadow-xl" : whenScroll} ${whenScroll === "bg-white" ? "shadow-l" : ""
            } transition-all fixed top-0 left-0 right-0 `
        }
      >
        <nav
          style={{ maxWidth: 1200 }}
          className=" flex justify-between   gap-11 py-2 max-md:py-9 px-2 max-sm:px-9 font-medium"
        >
          <Link onClick={scrollToTop} to="/">
            <img
              src="/D.png"
              className="w-24 max-lg:w-24 border"
              alt="D"
            />
          </Link>
          <ul
            className={
              showCase1Page
                ? "text-xl  max-lg:hidden justify-center items-center gap-8 text-white"
                : `${navBar2 ? "text-black" : textColor
                } text-xl flex max-lg:hidden justify-center items-center gap-8`
            }
          >
            <Link
              onClick={scrollToTop}
              className="hover:text-red-500 transition-all"
              to="/"
            >
              ANASAYFA
            </Link>
            <Link
              onClick={scrollToTop}
              className="hover:text-red-500 transition-all"
              to="/Services"
            >
              KEŞFET
            </Link>

            <Link
              onClick={scrollToTop}
              className="hover:text-red-500 transition-all"
              to="/about"
            >
              MENTOR NEDİR?
            </Link>
            {/*             
            <Link
              onClick={scrollToTop}
              className="hover:text-red-500 transition-all"
              to="/admin/dashboard"
            >
              ADMİN
            </Link>
             */}
            <div
              className="relative cursor-pointer  transition-all"
             
            >
             
        


              <Popover
     
     placement='bottom'
     closeOnBlur={false}
   >
     <PopoverTrigger>
       <Button
               content={"KAYDOL"}
               fontSize={"text-xl"}
               fontWeight={""}
               padding={"px-5  py-2"}
             />
     </PopoverTrigger>
     <PopoverContent color='white' bg='#8C8C8C' borderColor='gray.500 ' width={330} height={310}>
       <PopoverHeader pt={5} fontWeight='bold' border='1'>
       Neye ihtiyacın var ?
       </PopoverHeader>
       <PopoverArrow bg='white' />
       <PopoverCloseButton />
       <PopoverBody>
        Freelancer olarak ilerleyip kendi işlerini yürütebilirsin. Ayrıca, Kurumsal bir şirkette çalışıyorsan ve yetkiliysen şikretin için bir Mentor bulabilirsin.
       </PopoverBody>
       <PopoverFooter
         border='0'
         display='flex'
         alignItems='center'
         justifyContent='space-between'
         pb={4}
       >
         <Box fontSize='sm'></Box>
         
         <ButtonGroup size='sm'>
         {!isLogin && <Link onClick={scrollToTop} to="/keycloak-auth">
             <Button
               content={"Freelancer ol"}
               fontSize={"2"}
               fontWeight={""}
               padding={"px-1 py-2"}
             />
           </Link>}
           {isLogin && <Button
             onClick={() => setLogout()}
             content={"Çıkış yap"}
             fontSize={"11"}
             fontWeight={""}
             padding={"px-5  py-3"}
           />}
         
         </ButtonGroup>
         <ButtonGroup size='sm'>
         {!isLogin && <Link onClick={scrollToTop} to="/keycloak-auth">
             <Button
            
               content={"Firma Yetkilisi ol"}
               fontSize={"11"}
               fontWeight={""}
               padding={"px-1 py-2"}
             />
           </Link>}
         
         
         </ButtonGroup>
       </PopoverFooter>
     </PopoverContent>
   </Popover>

            </div>
      
            
          </ul>
          <ul
            className={`${navBar2 ? "text-black" : textColor
              } text-xl hidden max-lg:flex justify-center items-center gap-8`}
          >
            <div
              className="relative"
              onClick={() => {
                setModal(true);
              }}


            >

              {totalQty > 0 ? (
                <p
                  className={`absolute bg-red-500 pt-[1.5px] text-white rounded-full h-[18px] px-1   min-w-[18px] ${totalQty >= 100 ? "-right-[15px]" : "-right-[10px]"
                    }  text-xs font-medium text-center -top-[10px]`}
                >
                  {totalQty}
                </p>
              ) : (
                ""
              )}
              <FaShoppingCart />
            </div>

            <FaBars
              onClick={() => {
                setViewSideNav(!viewSideNav);
              }}
              className="cursor-pointer"
            />
          </ul>



        </nav>
      </div>

      {/* side nav bar for mobile view */}
      <div
        onClick={() => {
          setViewSideNav(!viewSideNav);
        }}
        style={{ zIndex: 99 }}
        className={`fixed ${viewSideNav ? "translate-x-0" : "-translate-x-full"
          } top-0 left-0 bottom-0 right-0  bg-black/40`}
      ></div>
      <nav
        style={{ zIndex: 100 }}
        // style={{ height: 8000 }}
        className={`fixed top-0 bottom-0 hidden max-lg:block ${viewSideNav ? "translate-x-0" : "-translate-x-full"
          } bg-white  left-0 w-96 p-5 px-10 max-sm:px-5 max-sm:w-80 z-30 transition-all font-medium`}
      >
        <div id="header" className="flex justify-between items-center">
          <img className="w-36" src="/D.png" alt="D" />
          <div
            onClick={() => {
              setViewSideNav(!viewSideNav);
            }}
            className="cancel cursor-pointer w-7 h-7"
            id="close-modal"
          >
            <div style={{ width: 3 }} className="relative mx-auto h-full">
              <div
                style={{ width: 2 }}
                className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 rotate-45"
              ></div>
              <div
                style={{ width: 2 }}
                className="absolute h-full bg-gray-800 transition-all hover:bg-gray-600 max-sm:hover:bg-gray-800 -rotate-45"
              ></div>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-3 mt-8 text-xl ">
          <Link
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/"
            className="hover:text-red-500 transition-all"
          >
            Anasayfa
          </Link>
          <Link
            onClick={() => {
              hideNav();
              scrollToTop();
            }}
            to="/services"
            className="hover:text-red-500 transition-all"
          >
            Servisler
          </Link>
          <div className="relative">
            <div
              onClick={() => {
                setShowcaseDropDown(!showcaseDropDown);
              }}
              className="flex justify-between hover:text-red-500 max-sm:hover:text-black transition-all items-center cursor-pointer"
            >
              <p className="transition-all">Show Cases</p>
              <FaAngleDown
                className={`${showcaseDropDown ? "-rotate-180" : "rotate-0"
                  } transition-all `}
              />
            </div>
            <ul
              className={`flex flex-col gap-2 mt-3 pl-5 transition-all duration-300 origin-top  `}
            >
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                className="hover:text-red-500 transition-all"
                to={"/showcases/showcase1"}
              >
                Show Cases 1
              </Link>
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/showcases/showcase2"}
                className="hover:text-red-500 transition-all"
              >
                Show Cases 2
              </Link>
            </ul>
            <div
              className={`${showcaseDropDown ? "top-[114px]" : "top-[41px]"
                } transition-all duration-200 absolute  w-full bg-white h-24`}
            >
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/about"}
                className="hover:text-red-500 transition-all w-full block"
              >
                KEŞFET
              </Link>
              <Link
                onClick={() => {
                  hideNav();
                  scrollToTop();
                }}
                to={"/contact"}
                className="hover:text-red-500 transition-all w-full block"
              >
                <Button
                  content={"KAYDOL"}
                  fontSize={""}
                  padding={"py-[6px] px-3"}
                  furtherClasses={" mt-4"}
                />
              </Link>
            </div>
          </div>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
