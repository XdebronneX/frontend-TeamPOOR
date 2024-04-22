import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllServices, clearErrors } from "../../actions/serviceActions";
import {
    Box,
    Image,
    Badge,
} from "@chakra-ui/react";
import Loader from "../layout/Loader";

const Services = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, services } = useSelector((state) => state.allServices);

    useEffect(() => {
        dispatch(getAllServices());
    }, [dispatch]);
    console.log("Services:", services);

    const getBadgeColorAndText = (type) => {
        let badgeColor = '';
        let badgeText = '';

        switch (type) {
            case 1:
                badgeColor = 'blue';
                badgeText = 'On site';
                break;
            case 2:
                badgeColor = 'green';
                badgeText = 'Home service';
                break;
            case 3:
                badgeColor = 'yellow';
                badgeText = 'Home service & On site';
                break;
            default:
                badgeText = 'No status';
        }

        return { badgeColor, badgeText };
    };

    return (
        <div className="sm:px-20">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <div className="p-5">
                    <h4 className="text-2xl font-bold">Services</h4>
                    <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3 gap-4 mt-5">
                        {services.map((service) => (
                            <Box
                                className="bg-white shadow rounded-xl "
                                pointerEvents={service.isAvailable === false ? 'none' : 'auto'}
                            >
                                {service.images && service.images[0] && (
                                    <Link
                                        to={`/showSingleService/${service._id}`}
                                        className="relative items-center justify-center"
                                    >
                                        <Image
                                            src={service.images[0].url}
                                            alt={`Picture of ${service.name}`}
                                            roundedTop="md"
                                            loading="lazy"
                                            cover="contain"
                                            className={
                                                service.isAvailable === false ? "grayscale" : ""
                                            }
                                        />
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
                                <div className="px-3">
                                    <div className="flex flex-row justify-between items-center border-t py-3">
                                        <p className="text-red-500 text-lg font-bold">
                                            ₱{service.price.toFixed(2)}
                                        </p>
                                        <Badge
                                            variant="solid"
                                            colorScheme={getBadgeColorAndText(service.type).badgeColor}
                                            className="text-sm"
                                            rounded="full" // Add rounded prop here
                                        >
                                            {getBadgeColorAndText(service.type).badgeText}
                                        </Badge>

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

