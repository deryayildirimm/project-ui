import React, { useState } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Button,
  Heading,
  Center,
  Card,
 Image,
  Icon,
  CardBody,
  

} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { animationVariants } from "../constants/animationVariants";
import { useParams } from "react-router";
import useAuthKeycloak from "./store/useAuthKeycloak";
import axios from "axios";
import { useEffect } from "react";
const Edit = () => {
  const [userName, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const params = useParams();
  const [aboutMe, setAboutMe] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //* keycloak authorization 
  const { token } = useAuthKeycloak();
  console.log("token: ---------- ", token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };


  //* funct. for post the user info to the databese 
  const setUsers = async () => {
    await axios({
      method: "post",
      url: `${import.meta.env.VITE_BASE_URL}/users/${params.id}`,
      headers: {
        headers,
      },
      data: {
        userName: userName,
        aboutMessage: aboutMe,
        phone: phone,
        address: address,
        email: email,
        password: password,

      },
    }).then((res) => {
      const data = res.data;
      if (data?.isSuccess) {
        console.log("data>>>>>>", data);
      } else {
        console.log(data?.errorMessage);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers();
  };

  const [fileUrl, setFileUrl] = React.useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFileUrl(reader.result);
    };
    reader.readAsDataURL(file);
    return <img src={e} alt="Uploaded image" width="100" height="100" />;
  };

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
              Profilini düzenle
            </motion.h1>
          </motion.div>
          <motion.div
            variants={animationVariants.fadeLeft}
            className="flex max-lg:flex-col max-lg:items-center gap-10 w-full justify-between items-end mt-4"
          ></motion.div>

          {/* </Reveal> */}
        </div>
        {/* about section */}
      </div>
      <div className="bg-white">
        <div
          style={{ maxWidth: 1200 }}
          className="p-10 max-md:px-5 py-28 mx-auto grid grid-cols-2 grid-rows-1 gap-20 max-lg:grid-cols-1 max-lg:grid-rows-2 "
        >
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="w-full max-lg:w-full flex flex-col  items-start max-lg:items-center max-lg:text-center gap-7"
          >
            <Center borderRadius="top">
              <Box
                p={4}
                maxW="500px"
                borderWidth="6px"
                borderRadius="2g"
                width="600px"
                height="800px"
                boxShadow="lg"
                padding-left
              >
                <Heading as="h1" size="xl" mb={5} color="#4A5568">
                  Profilini düzenle
                </Heading>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="userName">
                      <FormLabel>Ad Soyad</FormLabel>
                      <Input
                        type="text"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="aboutMe">
                      <FormLabel>Hakkımda</FormLabel>
                      <Textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="phone">
                      <FormLabel>Telefon no</FormLabel>
                      <Input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="adress">
                      <FormLabel>Adres</FormLabel>
                      <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="password">
                      <FormLabel>Şifre</FormLabel>
                      <Input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                  
                    <Input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      display="none"
                    />
                    <Button
                      width="200px"
                      colorScheme="teal"
                      as="label"
                      htmlFor="image-upload"
                      mt={3}
                    >
                      <Icon
                        as="svg"
                        viewBox="1 0 24 24"
                        color="white"
                        w={5}
                        h={5}
                      >
                        <path
                          fill="currentColor"
                          d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                        />
                      </Icon>
                      <Box ml={2}>Profil Fotoğrafı</Box>
                    </Button>

                    {fileUrl && (
                      <img
                        src={fileUrl}
                        alt="Uploaded image"
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    )}
                  </Stack>
                  <br></br>
                  <Button type="submit" colorScheme="blue" mt={1} w="100%">
                    Düzenlemeyi bitir
                  </Button>
                </form>
              </Box>
            </Center>
          </motion.div>

          <div className="w-full max-lg:w-full h-full max-sm:max-h-[800px] ">
            <div className=" h-full w-full relative overflow-hidden rounded-lg">
              <Card maxW="ml">
              <CardBody>

              <Image
                    src="user.png"
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
              </CardBody>
                 
                 
                
              </Card>
              <div className="absolute w-full h-full bg-white "></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
