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
    InputGroup,
    InputLeftAddon,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import 'react-phone-number-input/style.css';
import { REGISTER_USER_RESET } from '../../constants/userConstants';
import { toast } from 'react-toastify';

const Registers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, success, loading, message } = useSelector((state) => state.authUser);
    const { handleSubmit, control, formState: { errors }, register } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

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
        if (!isChecked) {
            handleError("Please accept the Terms and Conditions.");
            return;
        }
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

    const toggleModal1 = () => {
        setShowModal1(!showModal1);
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    display={{ base: 'none', md: 'block' }}
                    src={'/images/loginlogo.jpg'} // Update this path to the correct path of your image
                    sx={{
                        width: "100%", // Set the width to 100% for responsiveness
                        height: "1000px", // Set a fixed height for the image
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
                                <Checkbox onChange={handleCheckboxChange}>
                                    I agree to the <Link onClick={toggleModal1} color="blue.400" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Terms and Conditions</Link>.
                                </Checkbox>
                                <Button
                                    type="submit"
                                    color={'white'}
                                    bg={'blue.500'}
                                    _hover={{
                                        bg: 'blue.700',
                                    }}
                                    // Set opacity based on isChecked state
                                    opacity={!isChecked ? 0.5 : 1}
                                    // Disable the button when isChecked is false
                                    disabled={!isChecked}
                                >
                                    Sign up
                                </Button>
                            </Stack>
                        </form>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link onClick={LoginHandler} color="blue.400" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>Login</Link>
                            </Text>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

            {/* Terms and Conditions Modal */}
            <Modal isOpen={showModal1} onClose={toggleModal1} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="2xl">Terms and Conditions</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={6}>
                            <Text fontSize="lg">
                                <strong>1. Introduction</strong>
                                <br />
                                These Terms and Conditions govern the use of the products and services provided by TEAM POOR: System for Managing Motorcycle Parts and Services on our website and mobile application. By accessing or using the Platform, you agree to be bound by these Terms and Conditions in full. If you disagree with these Terms and Conditions or any part of these terms, you must not use the Platform.
                            </Text>
                            <Text fontSize="lg">
                                <strong>2. Products and Services</strong>
                                <br />
                                2.1. TEAM POOR: System for Managing Motorcycle Parts and Services provides motorcycle products and services including but not limited to sales of motorcycles, parts, accessories, maintenance, repair services, and related products.
                                <br />
                                2.2. The availability of products and services may vary depending on location and other factors. The Company reserves the right to modify, suspend, or discontinue any aspect of the products or services at any time without prior notice.
                            </Text>
                            <Text fontSize="lg">
                                <strong>3. Orders and Payments</strong>
                                <br />
                                3.1. By placing an order through the Platform, you agree to provide accurate and complete information about yourself and your payment method. You also authorize the TEAM POOR to charge the specified payment method for the total amount of the order, including any applicable taxes and shipping fees.
                                <br />
                                3.2. TEAM POOR: System for Managing Motorcycle Parts and Services reserves the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or suspicion of fraudulent activity.
                                <br />
                                3.3. All prices displayed on the Platform are in the local currency and are subject to change without notice. The TEAM POOR is not responsible for any discrepancies in pricing or product information provided by third-party vendors.
                            </Text>
                            <Text fontSize="lg">
                                <strong>4. Product and Service Warranty Policy</strong>
                                <br />
                                4.1. There is no product warranty for items purchased through our physical and online store. All products are sold as-is and are subject to the specifications and descriptions listed at the time of purchase.
                                <br />
                                4.2. Customers who purchase products from our physical store and utilize our mechanic service for installation are entitled to a service warranty.
                                <br />
                                4.3. The service warranty extends for a period of 7 days from the date of installation.
                                <br />
                                4.4. During the 7-day service warranty period, if any product installed by our mechanic is found to be broken or damaged due to the installation process, we will replace the broken product free of charge.
                                <br />
                                4.5. Our mechanic will reattach the new product to the customer's motorcycle at no additional cost.
                                <br />
                                4.6. After the 7-day service warranty period, the service warranty will expire, and any subsequent issues will not be covered.
                                <br />
                                4.7. The service warranty does not cover damage or breakage caused by misuse, accidents, or negligence on the part of the customer.
                                <br />
                                4.8. Any modifications or alterations made to the product after installation void the service warranty.
                                <br />
                                4.9. Customers must report any issues with installed products within the 7-day service warranty period to be eligible for a replacement.
                                <br />
                                4.10. Claims will be assessed by our team to determine eligibility for a replacement under the service warranty.
                            </Text>
                            <Text fontSize="lg">
                                <strong>5. Limitation of Liability</strong>
                                <br />
                                5.1. In no event shall the TEAM POOR: System for Managing Motorcycle Parts and Services be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising out of or in connection with the use of or inability to use the Platform or any products or services obtained through the Platform.
                                <br />
                                5.2. The total liability of the TEAM POOR for any claim arising out of or relating to these Terms and Conditions or the use of the Platform shall not exceed the total amount paid by you to the Company for the products or services giving rise to the claim.
                            </Text>
                            <Text fontSize="lg">
                                <strong>6. Changes to Terms and Conditions</strong>
                                <br />
                                6.1. The TEAM POOR: System for Managing Motorcycle Parts and Services reserves the right to modify or replace these Terms and Conditions at any time without prior notice. Your continued use of the Platform after any such changes constitutes your acceptance of the new Terms and Conditions.
                            </Text>
                            <Text fontSize="lg">
                                By engaging in TEAM POOR: System for Managing Motorcycle Parts and Services reserves, you acknowledge that you have read, understood, and agreed to abide by these terms and conditions. <br/>If you have any questions or concerns, please contact us before clicking the 'Agree' button to proceed. <br/>If you do not agree with the terms and conditions, please click the 'Disagree' button. <br/>Your continued use or acceptance of the agreement implies your understanding and acceptance of the terms and conditions.
                            </Text>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={toggleModal1}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Stack>
    );
};

export default Registers;
