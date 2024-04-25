import React, { useEffect, useState } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUsers, clearErrors } from '../../actions/userActions';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';
import {
    Button, Flex,
    Text, FormControl, FormLabel, FormErrorMessage,
    Heading, Input, Stack, Image,
    Link, Box, useColorModeValue,
} from '@chakra-ui/react';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let location = useLocation();

    const { isAuthenticated, error, loading } = useSelector((state) => state.authUser);
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [buttonClicked, setButtonClicked] = useState(false);
    const [email, setEmail]  = useState("")
    const [password, setPassword] = useState("")
    const redirect = location.search ? location.search.split("=")[1] : "";

    const handleSuccess = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const handleError = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (isAuthenticated) {
            if (redirect === 'shipping' || redirect === 'booking') {
                navigate(`/${redirect}`, { replace: true });
            } else {
                handleSuccess("You have successfully logged in.");
                navigate('/');
            }
        }
        if (error && buttonClicked) {
            handleError(error);
            dispatch(clearErrors());
        }
    }, [dispatch, isAuthenticated, error, navigate, redirect, buttonClicked]);

    const submitHandler = () => {
        setButtonClicked(true);
        dispatch(LoginUsers(email,password));
    };

    const RegisterHandler = () => {
        navigate('/register');
    };

    const ForgotPasswordHandler = () => {
        navigate('/forgot/password');
    };

    const bgColor = useColorModeValue('white', 'gray.700');

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                        <Flex p={8} flex={1} align={'center'} justify={'center'}>
                            <Stack spacing={4} w={'full'} maxW={'md'}>
                                <Stack align={'center'}>
                                    <Heading fontSize={'4xl'} textAlign={'center'}>
                                        Sign in your account
                                    </Heading>
                                    <Text fontSize={'lg'} color={'gray.600'}>
                                        to enjoy all of our cool features ✌️
                                    </Text>
                                </Stack>
                                <Box rounded={'lg'} bg={bgColor} boxShadow={'lg'} p={5}>
                                    <form onSubmit={handleSubmit(submitHandler)}>
                                        <FormControl id="email" isInvalid={!!errors.email}>
                                            <FormLabel>Email address</FormLabel>
                                            <Controller
                                                name="email"
                                                control={control}
                                                rules={{
                                                    required: "Email is required",
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: "Invalid email format",
                                                    },
                                                }}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <Input {...field} type="email" placeholder='Enter your email address' />
                                                )}
                                            />
                                            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                                        </FormControl>
                                        <FormControl id="password" isInvalid={!!errors.password}>
                                            <FormLabel>Password</FormLabel>
                                            <Controller
                                                name="password"
                                                control={control}
                                                rules={{
                                                    required: "Password is required",
                                                }}
                                                defaultValue=""
                                                render={({ field }) => (<Input {...field} type="password" placeholder='Enter your password' />
                                                )}
                                            />
                                            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                                        </FormControl>
                                        <Stack spacing={6}>
                                            <Stack direction="row" align={'start'} justify={'space-between'}>
                                                <Link onClick={ForgotPasswordHandler} color={'blue.400'}>
                                                    Forgot Password?
                                                </Link>
                                                <Text>
                                                    Don't have an account? <Link onClick={RegisterHandler} color={'blue.400'}>Signup here</Link>
                                                </Text>
                                            </Stack>
                                                <Button type="submit" bg={'blue.500'}
                                                    color={'white'}
                                                    w="full"
                                                    _hover={{
                                                        bg: 'blue.700',
                                                    }}
                                                    >
                                                Sign in
                                            </Button>
                                        </Stack>
                                    </form>
                                </Box>
                            </Stack>
                        </Flex>
                        <Flex flex={1}>
                            <Image
                                alt={'Login Image'}
                                objectFit={'cover'}
                                // flex={1}
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
                    </Stack>
                </>
            )}
        </>
    );
};

export default Login;
