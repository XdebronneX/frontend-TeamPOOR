import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Register, clearErrors } from '../../actions/userActions';
import { useForm, Controller } from 'react-hook-form';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Image,
    Link,
    // useToast,
    InputGroup,
    InputLeftAddon
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import 'react-phone-number-input/style.css';
import { REGISTER_USER_RESET } from '../../constants/userConstants';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const Registers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const toast = useToast();
    const { error, success, loading, message } = useSelector((state) => state.authUser);
    const { handleSubmit, control, formState: { errors }, register } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    // const handleSuccess = (message) => {
    //     toast({
    //         title: "Success!",
    //         description: message,
    //         status: "info",
    //         duration: 3000,
    //         isClosable: true,
    //     });
    // };

    // const handleError = (message) => {
    //     toast({
    //         title: "Error!",
    //         description: message,
    //         status: "error",
    //         duration: 3000,
    //         isClosable: true,
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
            handleSuccess(message);
            setTimeout(() => {
                navigate("/", { replace: true });
                dispatch({ type: REGISTER_USER_RESET });
            }, 5000);
        }
    }, [dispatch, error, success, message]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.set('firstname', data.firstname);
        formData.set('lastname', data.lastname);
        formData.set('phone', "+63" + data.phone);
        formData.set('email', data.email);
        formData.set('password', data.password);
        dispatch(Register(formData));
    };

    const LoginHandler = () => {
        navigate('/login');
    };
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    display={{ base: 'none', md: 'block' }}
                    src={'https://source.unsplash.com/random?motorbike'}
                    sx={{
                        backgroundImage: "url(https://source.unsplash.com/random?motorbike)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette && t.palette.grey
                                ? t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900]
                                : undefined,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%", // Set the width to 100% for responsiveness
                        height: "1000px", // Set a fixed height for the background image
                    }}
                />
            </Flex>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Create your account
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}
                        w={'full'}>
                        {/* {message && <SuccessMessage>{message}</SuccessMessage>} */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing={4}>
                                <FormControl id="firstname">
                                    <FormLabel>First Name</FormLabel>
                                    <Controller
                                        name="firstname"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'First Name is required',
                                            minLength: {
                                                value: 4,
                                                message: 'First Name must be at least 4 characters long',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'First Name must not exceed 30 characters',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <Input {...field} type="text" placeholder="First Name" aria-invalid={errors.firstname ? 'true' : 'false'} />
                                                {errors.firstname && (
                                                    <Text color="red" fontSize="sm">
                                                        {errors.firstname.message}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <FormControl id="lastname">
                                    <FormLabel>Last Name</FormLabel>
                                    <Controller
                                        name="lastname"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Last Name is required',
                                            minLength: {
                                                value: 4,
                                                message: 'Last Name must be at least 4 characters long',
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'Last Name must not exceed 30 characters',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <Input {...field} type="text" placeholder="Last Name" aria-invalid={errors.lastname ? 'true' : 'false'} />
                                                {errors.lastname && (
                                                    <Text color="red" fontSize="sm">
                                                        {errors.lastname.message}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <FormControl id="phone">
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Mobile number is required',
                                            pattern: {
                                                value: /^9\d{9}$/,
                                                message: 'Invalid mobile number',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <InputGroup>
                                                    <InputLeftAddon children="+63" />
                                                    <Input
                                                        {...field}
                                                        type="text"
                                                        placeholder="Mobile number"
                                                        aria-invalid={errors.phone ? 'true' : 'false'}
                                                        onChange={(e) => {
                                                            let inputValue = e.target.value;
                                                            const formattedNumber = inputValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                                            const maxLength = 10; // Maximum length of formatted number (10 digits)
                                                            if (formattedNumber.length <= maxLength) {
                                                                field.onChange(formattedNumber); // Update the field value with only numeric characters
                                                            }
                                                        }}
                                                    />
                                                </InputGroup>
                                                {errors.phone && (
                                                    <Text color="red" fontSize="sm">
                                                        {errors.phone.message}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <FormControl id="email">
                                    <FormLabel>Email address</FormLabel>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Invalid email address',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <>
                                                <Input {...field} type="email" placeholder="Email Address" aria-invalid={errors.email ? 'true' : 'false'} />
                                                {errors.email && (
                                                    <Text color="red" fontSize="sm">
                                                        {errors.email.message}
                                                    </Text>
                                                )}
                                            </>
                                        )}
                                    />
                                </FormControl>
                                <FormControl id="password">
                                    <FormLabel>Password</FormLabel>
                                    <Stack spacing={1} direction={{ base: 'column', sm: 'row' }}>
                                        <Input
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters long',
                                                },
                                            })}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Password"
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                        />
                                        <Button
                                            variant={'ghost'}
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}>
                                            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                        </Button>
                                    </Stack>
                                    {errors.password && (
                                        <Text color="red" fontSize="sm">
                                            {errors.password.message}
                                        </Text>
                                    )}
                                </FormControl>
                                <Button
                                    type="submit"
                                    color={'white'}
                                    bg={'blue.500'}
                                    _hover={{
                                        bg: 'blue.700',
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link onClick={LoginHandler} color="blue.400">Login</Link>
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Stack>
    );
};

export default Registers;
