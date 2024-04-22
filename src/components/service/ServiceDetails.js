import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Text, Button, Flex, Box, VStack, Heading, Spacer, Center, Image, Spinner, Divider, Badge } from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Loader from "../layout/Loader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getServiceDetails, clearErrors } from "../../actions/serviceActions";
import { addServiceToCart } from "../../actions/serviceCartActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ServiceDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, service, error } = useSelector((state) => state.serviceDetails);

    useEffect(() => {
        dispatch(getServiceDetails(id));
    }, [dispatch, id]);

    const addToCart = () => {
        dispatch(addServiceToCart(id));
        toast.success("Item added to cart!", { position: "bottom-center" });
    };

    return (
        <Container maxW="container.xl" py="6">
            {!loading ? (
                <Center>
                    <Spinner size="xl" />
                </Center>
            ) : error ? (
                <Text color="red.500">Error: {error}</Text>
            ) : (
                <Flex flexDir={{ base: "column", md: "row" }}>
                    <Box flex="1">
                        <Carousel
                            showThumbs={true}
                            showArrows={true}
                            autoPlay={true}
                            interval={5000}
                            transitionTime={500}
                            thumbWidth={100}
                            thumbHeight={80}
                        >
                            {service.images &&
                                service.images.map((image) => (
                                    <div key={image.id}>
                                        <img
                                            src={image.url}
                                            alt={`ServiceImage - ${service.name}`}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "600px",
                                                width: "auto",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                ))}
                        </Carousel>
                    </Box>
                    <Box flex="1">
                        <VStack align="stretch" spacing="5">
                            <Heading as="h1" size="xl" fontWeight="bold">
                                {service.name}
                            </Heading>
                            <Flex justify="space-between" align="center">
                                <Text fontSize="2xl" color="red.500">
                                    ₱{service.price}
                                </Text>
                                {/* <Button colorScheme="red" onClick={addToCart} disabled={!service.isAvailable}>
                                    ADD TO CART
                                </Button> */}
                            </Flex>
                            <Divider />
                            <VStack align="stretch" spacing="2">
                                <Text fontWeight="bold">Description</Text>
                                <Text>{service.description}</Text>
                                {/* <Text>
                                    <Badge colorScheme={service.isAvailable ? "green" : "red"}>
                                        {service.isAvailable ? "Available" : "Not Available"}
                                    </Badge>
                                </Text> */}
                            </VStack>
                        </VStack>
                    </Box>
                </Flex>
            )}
        </Container>
    );
};

export default ServiceDetails;

