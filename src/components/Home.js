import React, { useEffect } from "react";
import {
  Stack,
  Heading,
  Text,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import Carousel from "./layout/Carousel";
import { allOrders, clearErrors } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { MdDeliveryDining } from "react-icons/md";
import { viewAllUsers } from "../actions/userActions";
import { getAllProducts } from "../actions/productActions";
import { getAllServices } from "../actions/serviceActions";
import { BsBoxSeam } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { LuDownload } from "react-icons/lu";

const Home = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authUser);
  const { products, loading: loadingProducts } = useSelector(
    (state) => state.allProducts
  );
  const { services, loading: loadingServices } = useSelector(
    (state) => state.allServices
  );

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllServices());
  }, [dispatch]);

  return (
    <div className="flex-1 min-h-screen">
      <div className="bg-[#fbe2e2] absolute top-[-6rem] -z-10 right-[11rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem]"></div>
      <div className="bg-red-100 absolute top-[-5rem] -z-10 left-[35rem] h-[31.24rem] w-[31.25rem] rounded-full blur-[10rem] md:left-[-32rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 px-36">
        <div className="flex flex-col justify-center ">
          <Text className="font-extrabold text-6xl">
            Stay Connected Anywhere with{" "}
            <span className="text-red-500 text-6xl">TeamPoor</span> Mobile App
          </Text>

          <Text className="text-2xl mt-4">
            Download now and unlock endless possibilities.
          </Text>

          <div className="flex flex-row items-center gap-4">
            <a
              href="https://drive.usercontent.google.com/download?id=1Wic8DnFYKnpzkb-6E-NvbjGCePhf525d&export=download&authuser=0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="py-2 px-3 rounded-full bg-red-500 w-fit mt-4 duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
                <Text className="text-white font-bold text-lg">
                  Download Apk
                </Text>
              </div>
            </a>
          </div>
        </div>
        <div className="col-span-2">
          <img
            style={{
              maxHeight: "calc(100vh)",
              width: "100%",
              objectFit: "contain",
            }}
            src={"/images/guy5.png"}
            alt="Guy"
          />
        </div>
      </div>

      <div className="flex-1 px-28 ">
        <div className="bg-white shadow-lg rounded-full ">
          <div className="flex flex-row justify-around items-center px-10 py-4">
            <div className="flex flex-row gap-4 items-center duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
              <div className="p-4 rounded-full bg-red-50 items-center flex">
                <Icon as={CiLocationOn} color="red.500" boxSize={6} />
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-red-500">
                  Taguig City
                </span>
                <span className="text-normal font-bold">Location</span>
              </div>
            </div>

            <div className="flex flex-row gap-4 items-center duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
              <div className="p-4 rounded-full bg-red-50 items-center flex">
                <Icon as={LuDownload} color="red.500" boxSize={6} />
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-red-500">1K+</span>
                <span className="text-normal font-bold">Total Downloads</span>
              </div>
            </div>

            <div className="flex flex-row gap-4 items-center duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
              <div className="p-4 rounded-full bg-red-50 items-center flex">
                <Icon as={LuBoxes} color="red.500" boxSize={6} />
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-red-500">
                  {products?.length}
                </span>
                <span className="text-normal font-bold">Total Products</span>
              </div>
            </div>

            <div className="flex flex-row gap-4 items-center duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
              <div className="p-4 rounded-full bg-red-50 items-center flex">
                <Icon
                  as={HiOutlineWrenchScrewdriver}
                  color="red.500"
                  boxSize={6}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-red-500">
                  {services?.length}
                </span>
                <span className="text-normal font-bold">Total Services</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 grid-rows-1 gap-4 px-36 py-16">
        <div className="p-8 bg-white rounded-3xl shadow-2xl space-y-2 items-center justify-center flex flex-col duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
          <div className="p-4 rounded-full bg-red-50 items-center w-fit">
            <Icon as={LuBoxes} color="red.500" boxSize={6} />
          </div>
          <Text className="font-bold text-lg">OEM-Quality Parts</Text>
          <Text>
            We source and provide original equipment manufacturer (OEM) quality
            parts, ensuring reliability, compatibility, and optimal performance
            for your motorcycle.
          </Text>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-2xl space-y-2 items-center justify-center flex flex-col duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
          <div className="p-4 rounded-full bg-red-50 items-center w-fit">
            <Icon as={HiOutlineWrenchScrewdriver} color="red.500" boxSize={6} />
          </div>
          <Text className="font-bold text-lg">Expert Repair Services</Text>
          <Text>
            Trust our skilled technicians for professional repair services. From
            routine maintenance to complex repairs, our team is dedicated to
            keeping your motorcycle running smoothly.
          </Text>
        </div>
        <div className="p-8 bg-white rounded-3xl shadow-2xl space-y-2 items-center justify-center flex flex-col duration-700 ease-in-out transition-transform transform-gpu hover:scale-110">
          <div className="p-4 rounded-full bg-red-50 items-center w-fit">
            <Icon as={BsBoxSeam} color="red.500" boxSize={6} />
          </div>
          <Text className="font-bold text-lg">Efficient Online Ordering</Text>
          <Text>
            Experience seamless online ordering with our user-friendly platform.
            Browse, select, and order parts from the comfort of your home, with
            efficient shipping options available.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Home;
