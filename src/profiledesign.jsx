
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { Divider, Spin } from "antd";
import { Descriptions } from "antd";
import useAuthKeycloak from "./store/useAuthKeycloak";
import axios from "axios";
import { scrollToTop } from "../constants/scrollToTop";

import {
  IconButton,
  Heading,
  Box,
  Card,
  CardBody,
  CardFooter,
  Text,
  CardHeader,
  Flex,
  Avatar,
 
  Button,
  Image,
  Menu,
  MenuButton,
  
  MenuItem,
  
MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfileDesign = () => {
  const [advertisement, setAdvertisement] = useState({});
  const [users, setUsers] = useState({});
  const params = useParams(); //
  const location = useLocation(); // gizli infolar için sadece listeden gidersen elemanı taşı
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  let id = 3;
  const { token } = useAuthKeycloak();
  console.log("token: ---------- ", token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    getUser();
  }, []);



  const getUser = async () => {
    const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
      headers,
    });
    setUsers(data.data);
  };

  const goToDetail = (x) => {
    navigate(
      `/profileDesign/${x}`,
      // { state: buttonText }
    );
    window.history.pushState(null, "", `/ProfileDesign/${x}`);
  };


  //* burada uygun id si olan user ın infosunu alıp aşağıda render lıyoruz
  //! user a erişim yetkimiz yok token uygun değil 403 hatası veriyor
  // let data_filter = users.filter((x) => x.id === advertisement.userId);

  const items = [
    {
      key: "1",
      label: "Telefon no",
      children: "1810000000",
      span: 3,
    },

    {
      key: "2",
      label: "Address",
      children:
        "No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China",
      span: 3,
    },
    {
      key: "3",
      children: (
        <Divider orientation="left" style={{ marginBottom: "-5px" }}>
          About Me
        </Divider>
      ),
      span: 3,
    },
    {
      key: "4",

      children:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ipsam, ipsum labore tempora, nesciunt blanditiis ut laboriosam quis dolore distinctio officia debitis. Aspernatur, harum quibusdam.",
      span: 3,
    },
    {
        key: "5",
        label: "Hesap türü",
        children:
          "FREELANCER VEYA FİRMA YETKİLİSİ",
        span: 3,
      },
  ];
  const items2=[
    {
        key: "1",
        label: "E-mail",
        children:
          "test@gmail.com",
        span: 3,
      },
      {
        key: "2",
        label: "Şifre",
        children:
          "*******",
        span: 3,
      },
  ];

  const infoAdvert = [
    {
      key: "1",
      //^   label: "Description",
      children: `${advertisement.description}`,
      span: 3,
    },
    {
      key: "2",
      label: "Description",
      children: `${advertisement.description}`,
      span: 3,
    },
    {
      key: "3",
      label: "Detail",
      children: `${advertisement.description}`,
      span: 3,
    },
  ];

  return (
    <>
    <div className=" w-full overflow-hidden">
      <div className=" flex bg-[url('/15.png')] pt-36 pb-20 bg-top bg-no-repeat bg-cover">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.2 }}
          style={{ maxWidth: 1200 }}
          className="mx-auto w-full text-white px-10 max-sm:px-5 flex flex-col max-lg:items-center max-lg:text-center gap-12"
        >
          <motion.h1
            variants={animationVariants.fadeLeft}
            className="text-6xl padding-right   max-w-lg "
          >
            Bilgilerini düzenle
          </motion.h1>
        </motion.div>
        <motion.div
          variants={animationVariants.fadeLeft}
          className="flex max-lg:flex-col max-lg:items-center gap-10 w-full justify-between items-end mt-4"
        ></motion.div>

<Menu>
<MenuButton as={Button} width={300} >
  Profil
</MenuButton>
<MenuList>
  <MenuItem minH='48px' >
    <Image
      boxSize='2rem'
      borderRadius='full'
      src='icon2.png'
      alt='Fluffybuns the destroyer'
      mr='12px'
    />
    <Link onClick={scrollToTop} to="/edit">
    <span>Profili düzenle</span></Link>
  </MenuItem>
  <MenuItem minH='40px'  onClick={() => goToDetail(id)}>
    <Image
      boxSize='2rem'
      borderRadius='full'
      src='icon1.jpg'
      alt='Simon the pensive'
      mr='12px'
    />
     
    <span>İş Oluştur</span>
  </MenuItem>
</MenuList>
</Menu>

        {/* </Reveal> */}
      </div>
      {/* about section */}
    </div>
      <div
        style={{
          maxWidth: 1200,
          height: "fit-content",
          gridTemplateColumns: "2fr 1fr",
          gridGap: "10px",
          backgroundColor: "white",
        }}
        className="mx-auto grid grid-cols-3 max-md:grid-rows-1 max-md:grid-cols-1  pb-15 p-5 max-lg:px-5 gap-4"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <Spin tip="Loading..." spinning={isLoading}>
          <Card maxW="md">
            <CardHeader>
              <Flex spacing="4">
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />

                  <Box>
                    <Heading size="sm">
                      Segun Adebayo
                      {/* {data_filter.first_name}  {data_filter.last_name} */}
                    </Heading>
                 
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Divider style={{ marginTop: "-15px" }}></Divider>
              <Descriptions items={items} />
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            ></CardFooter>
          </Card>
          </Spin>

        </div>
        {/* <h1>Detail Page: </h1>
      <h3>Title {advertisement.advertisementTitle}</h3>
      <h3>Description {advertisement.description}</h3> */}
        {/* user ınfo part */}
        {/* <h3>User First Name: {data_filter.first_name}</h3>
        <h3>User Last Name:{data_filter.last_name}</h3>
        <h3>Email {data_filter.email}</h3> */}

        {/* <button onClick={() => navigate(-1)}>Go Back</button>
          <button onClick={() => navigate(-2)}>Go 2 Back</button>
          <button onClick={() => navigate(2)}>Go 2 Forward</button> */}

        <div

          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
         
          <Card maxW="md" width="250">
          <CardHeader>
              <Flex spacing="2">
                <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
                  <Avatar margin={50} width={220} height={225}
                    name="Segun Adebayo"
                    src="profil.jpg"
                  />

                
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                />
              </Flex>
            </CardHeader>
            <CardBody>
             
              <Descriptions items={items2} />
              {/* <Text>
            
                With Chakra UI, I wanted to sync the speed of development with
                the speed of design. I wanted the developer to be just as
                excited as the designer to create a screen.
              </Text> */}
            </CardBody>

           
          </Card>
      
        </div>
      </div>
      
     
    </>
  );
};

export default ProfileDesign;
