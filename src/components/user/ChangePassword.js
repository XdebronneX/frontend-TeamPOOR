import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors } from '../../actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    InputRightElement,
    InputGroup,
    useToast,
    FormErrorMessage
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm, Controller } from 'react-hook-form';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { error, isUpdated } = useSelector((state) => state.updateUser);

    const handleSuccess = (message) => {
        toast({
            title: 'Success!',
            description: message,
            status: 'info',
            duration: 2000,
            isClosable: true,
            position: 'bottom-left'
        });
    };

    const handleError = (message) => {
        toast({
            title: 'Error!',
            description: message,
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'bottom-left'
        });
    };

    useEffect(() => {
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            handleSuccess('Password updated successfully');
            navigate('/profile');
            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, navigate, isUpdated]);

    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.set('oldPassword', oldPassword);
    //     formData.set('password', password);
    //     dispatch(updatePassword(formData));
    // };

    const submitHandler = handleSubmit((data) => {
        const formData = new FormData();
        formData.set('oldPassword', data.oldPassword);
        formData.set('password', data.password);
        dispatch(updatePassword(formData));
    });

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
                    Enter new password
                </Heading>
                {/* <FormControl id="oldPassword" isRequired>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword1 ? 'text' : 'password'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
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
                <FormControl id="password" isRequired>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl> */}
                <FormControl id="oldPassword" isRequired isInvalid={errors.oldPassword}>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup>
                        <Controller
                            name="oldPassword"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Current Password is required' }}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    {...field}
                                    type={showPassword1 ? 'text' : 'password'}
                                />
                            )}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword1((showPassword1) => !showPassword1)}>
                                {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.oldPassword && errors.oldPassword.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="password" isRequired isInvalid={errors.password}>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'New Password is required' }}
                            render={({ field }) => (
                                <Input
                                    value={field.value}
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                />
                            )}
                        />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                </FormControl>

                <Stack spacing={6} direction={['column', 'row']}>
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
                    <Button
                        bg={'blue.500'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.700',
                        }}
                        onClick={submitHandler}
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default ChangePassword;
