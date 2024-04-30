import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllServices, clearErrors } from "../../actions/serviceActions";
import { Box, Image, Badge } from "@chakra-ui/react";
import Loader from "../layout/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, services } = useSelector((state) => state.allServices);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);
  console.log("Services:", services);

  const getBadgeColorAndText = (type) => {
    let badgeColor = "";
    let badgeText = "";

    switch (type) {
      case 1:
        badgeColor = "blue";
        badgeText = "On site";
        break;
      case 2:
        badgeColor = "green";
        badgeText = "Home service";
        break;
      case 3:
        badgeColor = "yellow";
        badgeText = "Home service & On site";
        break;
      default:
        badgeText = "No status";
    }

    return { badgeColor, badgeText };
  };

  const cards = [
    {
      image: "https://i.postimg.cc/XjyjxtWr/10.png",
    },
    {
      image: "https://i.postimg.cc/t9tsR4z5/8.png",
    },
    {
      image: "https://i.postimg.cc/gdQXN5Jv/5.png",
    },
  ];

  const settings = {
    // dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    centerPadding: "60px",
  };

  return (
    <div className="flex-1 h-full bg-zinc-100">
      <div>
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              key={index}
              height="420"
              backgroundSize="contain"
              backgroundPosition="center"
              backgroundRepeat="no-repeat"
              backgroundImage={`url(${card.image})`}
              width="100%"
            ></Box>
          ))}
        </Slider>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="py-5 px-32">
          <h4 className="text-2xl font-bold">Services</h4>
          <div className="grid grid-cols-1 xl:grid-cols-5 md:grid-cols-3 gap-4 mt-3">
            {services.map((service) => (
              <Box
                className="flex flex-col bg-white rounded hover:scale-105 transition delay-150 duration-300 ease-in-out"
                pointerEvents={service.isAvailable === false ? "none" : "auto"}
              >
                {service.images && service.images[0] && (
                  <Link
                    to={`/showSingleService/${service._id}`}
                    className="relative items-center justify-center"
                  >
                    <div className="bg-white rounded-xl overflow-hidden">
                      <Image
                        src={service.images[0].url}
                        alt={`Picture of ${service.name}`}
                        objectFit="cover"
                        height="350"
                        width="100%"
                        className={
                          service.isAvailable === false ? "grayscale" : ""
                        }
                      />
                    </div>

                    {service.isAvailable === false ? (
                      <Image
                        src={
                          "https://png.pngtree.com/png-vector/20221012/ourmid/pngtree-out-of-stock-supply-exhausted-concept-vector-png-image_14991028.png"
                        }
                        alt={`Picture of ${service.name}`}
                        className="absolute inset-0"
                      />
                    ) : null}
                  </Link>
                )}
                <div className="py-3 space-y-2 p-2">
                  {/* <div className="flex flex-row justify-between items-center border-t py-3">
                    <p className="text-red-500 text-lg font-bold">
                      ₱{service.price.toFixed(2)}
                    </p>
                    <Badge
                      variant="solid"
                      colorScheme={
                        getBadgeColorAndText(service.type).badgeColor
                      }
                      className="text-sm"
                      rounded="full"
                    >
                      {getBadgeColorAndText(service.type).badgeText}
                    </Badge>
                  </div> */}

                  <div>
                    <Badge
                      variant="solid"
                      colorScheme={
                        getBadgeColorAndText(service.type).badgeColor
                      }
                      className="text-xs px-2"
                      rounded="full"
                    >
                      {getBadgeColorAndText(service.type).badgeText}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-md font-bold">{service.name}</p>
                  </div>
                  <div className="h-12">
                    <p className="text-normal line-clamp-2 text-zinc-500">
                      {service.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 text-normal font-bold">
                      ₱{service.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Box>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
