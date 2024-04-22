import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    Heading,
    Icon,
    useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const SuccessBooking = () => {
    sessionStorage.clear();
    localStorage.clear();
    return (
        <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-4 justify-center flex flex-col items-center rounded-xl space-y-5 mb-20">
                <Icon as={CheckCircleIcon} boxSize={140} color="red.500" mx="auto" />

                <Heading as="h2" size="lg" mt={4}>
                    Your Order has been placed successfully.
                </Heading>

                <p className="text-zinc-500">
                    Thank you for your order. You will receive email confirmation shortly.
                </p>

                <Link to="/appointment/list">
                    <Button colorScheme="red" size="lg" isFullWidth>
                        Check Appointment
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessBooking;