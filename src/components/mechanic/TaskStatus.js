import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Spacer, Text, Box, HStack } from '@chakra-ui/react';

const StatusTabs = ({ All, Today, Upcoming, Completed }) => {
    return (
        <Flex justifyContent="center" mt={3}>
            <Link to="/mechanics/task" isActive={All} bgColor="blue.100">
                All Task
            </Link>
            <Spacer />
            <Link to="/today/task" isActive={Today} bgColor="green.100">
                Today Task
            </Link>
            <Spacer />
            <Link to="/upcoming/task" isActive={Upcoming} bgColor="yellow.100">
                Upcoming Task
            </Link>
            <Spacer />
            <Link to="/completed/task" isActive={Completed} bgColor="yellow.100">
                Completed Task
            </Link>
            <Spacer />
        </Flex>
    );
};


export default StatusTabs;
