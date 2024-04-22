import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../actions/userActions';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    // useToast,
    InputRightElement,
    InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { toast } from 'react-toastify';

const NewPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useParams();
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { error, success } = useSelector((state) => state.forgotPassword);
    // const toast = useToast();  // Add this line

    // const handleSuccess = () => {
    //     toast({
    //         title: 'Success!',
    //         description: 'Password reset successfully',
    //         status: 'info',
    //         duration: 3000,
    //         isClosable: true,
    //         position: 'bottom-left',
    //     });
    // };

    // const handleError = (message) => {
    //     toast({
    //         title: 'Error!',
    //         description: message,
    //         status: 'error',
    //         duration: 3000,
    //         isClosable: true,
    //         position: 'bottom-left',
    //     });
    // };

    const handleSuccess = (message = '') => {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };

    const handleError = (error = '') => {
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });
    };
    
    useEffect(() => {
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
        if (success) {
            handleSuccess();
            setTimeout(() => {
                navigate('/login', { replace: true });
            }, 2000);
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);
        dispatch(resetPassword(token, formData));
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
                    Reset password
                </Heading>
                <FormControl id="password" isRequired>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword1 ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword1((showPassword1) => !showPassword1)}>
                                {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'blue.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.700',
                        }}
                        onClick={submitHandler}>
                        Submit
                    </Button>
                    <Button
                        bg={'red.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red',
                        }}
                        onClick={() => navigate('/profile', { replace: true })}
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default NewPassword;