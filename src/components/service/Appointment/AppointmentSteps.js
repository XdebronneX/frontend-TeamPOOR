import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Box, HStack, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const AppointmentSteps = ({ booking, listofservices, customerinfo, confirmAppointment }) => {
    return (
        <Flex justifyContent="center" mt={5}>
            <StepLink to="/booking" isActive={booking}>
                Booking
            </StepLink>
            <StepLink to="/book/service" isActive={listofservices}>
                List of service
            </StepLink>
            <StepLink to="/customer-info" isActive={customerinfo}>
                Customer infomation
            </StepLink>
            <StepLink to="/confirm//appointment" isActive={confirmAppointment}>
                Confirm Appointment
            </StepLink>
        </Flex>
    );
};

const StepLink = ({ to, isActive, children }) => {
    return (
        <Link to={isActive ? to : '#'} disabled={!isActive}>
            <HStack spacing={2} marginX={2}>
                <Box
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg={isActive ? 'blue.400' : 'gray.200'}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {isActive && <Icon as={CheckIcon} w={4} h={4} color="white" />}
                </Box>
                <Text color={isActive ? 'blue.400' : 'gray.400'} fontWeight="semibold">
                    {children}
                </Text>
            </HStack>
        </Link>
    );
};

export default AppointmentSteps;