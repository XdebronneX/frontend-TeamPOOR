import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Spacer, Text, Box, HStack } from '@chakra-ui/react';

const StatusTabs = ({ All, ToPay, ToShip, ToReceived, Completed, Cancelled }) => {
    return (
        <Flex justifyContent="center" mt={3}>
            <Link to="/orders/me" isActive={All} bgColor="blue.100">
                All
            </Link>
            <Spacer />
            <Link to="/to-pay" isActive={ToPay} bgColor="green.100">
                To Pay
            </Link>
            <Spacer />
            <Link to="/to-ship" isActive={ToShip} bgColor="yellow.100">
                To Ship
            </Link>
            <Spacer />
            <Link to="/to-received" isActive={ToReceived} bgColor="purple.100">
                To Received
            </Link>
            <Spacer />
            <Link to="/completed" isActive={Completed} bgColor="teal.100">
                Completed
            </Link>
            <Spacer />
            <Link to="/cancelled" isActive={Cancelled} bgColor="red.100">
                Cancelled
            </Link>
        </Flex>
    );
};


export default StatusTabs;
