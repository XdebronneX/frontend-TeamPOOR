import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Empty = () => {
    const navigate = useNavigate();
    const GoBack = () => {
        navigate("/products");
    };
    return (
        <div>
            <Container
                w="75%"
                m="auto"
                align={"left"}
                h="80vh"
                display="flex"
                justifyContent={"center"}
                alignContent={"center"}
                alignItems={"center"}
            >
                <Box>
                    <Heading mx={"4"} my={"6"} textTransform={"uppercase"}>
                        Your Cart is Empty
                    </Heading>
                    <Text mx={"4"} my={"6"}>
                        Similar to the precise assembly of gears and pistons in a motorcycle engine, the integration of various components in a bike harmoniously work together to ensure optimal performance on the road.
                    </Text>

                    <Button
                        onClick={GoBack}
                        mx={"4"}
                        my={"5"}
                        p="1rem 4rem"
                        bg={"black"}
                        color={"whitesmoke"}
                        colorScheme={"blue"}
                    >
                        Continue shopping
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Empty;