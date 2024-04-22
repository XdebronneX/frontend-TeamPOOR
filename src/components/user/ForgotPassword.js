import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../actions/userActions';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
    color: #ff0000;
    font-size: 1rem;
    margin-top: 10px;
`;

const SuccessMessage = styled.div`
    color: #00cc00;
    font-size: 1rem;
    margin-top: 10px;
`;

const Form = styled.form`
    background-color: #333;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 400px;
    width: 100%;
    color: #ffffff;
`;

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    const [email, setEmail] = useState('');
    const { error, loading, message} = useSelector((state) => state.forgotPassword);

    const handleError = (message) => {
        toast({
            title: 'Error!',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'bottom-left'
        });
    };

    useEffect(() => {
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email', email);
        dispatch(forgotPassword(formData));
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}>
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password
                </Heading>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {message && <SuccessMessage>{message}</SuccessMessage>}
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}>
                    You'll get an email with a reset link
                </Text>
                <FormControl id="email">
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red',
                        }}
                        onClick={() => navigate('/profile', { replace: true })}>
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.700',
                        }}
                        onClick={submitHandler}
                        disabled={loading ? true : false}
                    >
                        Send request
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default ForgotPassword;