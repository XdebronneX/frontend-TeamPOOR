import React from "react";
import { Link } from "react-router-dom";
import { Flex, Text, Box, HStack, Icon } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CheckoutSteps = ({ shipping, payment, confirmOrder }) => {
    return (
        <Flex justifyContent="center" mt={5}>
            <StepLink to="/shipping" isActive={shipping}>
                Shipping
            </StepLink>
            <StepLink to="/payment" isActive={payment}>
                Payment
            </StepLink>
            <StepLink to="/order/confirm" isActive={confirmOrder}>
                Confirm Order
            </StepLink>
        </Flex>
    );
};

const StepLink = ({ to, isActive, children }) => {
    return (
        <Link to={isActive ? to : "#"} disabled={!isActive}>
            <div className="flex-1 flex-row mx-5">
                <div className="flex flex-row items-center space-x-2 ">
                    <div className="bg-red-500 rounded-full items-center flex justify-center p-2">
                        {isActive && <Icon as={CheckIcon} w={3} h={3} color="white" />}
                    </div>

                    <p className="font-semibold">{children}</p>
                </div>

                {/* <div className="p-1 bg-red-500 w-full h-1 " /> */}
            </div>
        </Link>
    );
};

export default CheckoutSteps;