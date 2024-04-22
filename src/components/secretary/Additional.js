//** Best as of March 14 Perfecto */
import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointDetails, updateAdditional, clearErrors } from '../../actions/appointmentActions';
import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';
import { getAllProducts } from '../../actions/productActions';
import { FiMinus, FiPlus, FiSearch } from "react-icons/fi";
import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, IconButton, VStack, Image } from '@chakra-ui/react';

const Additional = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [productQuantities, setProductQuantities] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
    const { loading: productLoading, products } = useSelector((state) => state.allProducts);
    const { error, isUpdated } = useSelector((state) => state.adminAppointment);
    const orderId = id;

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(getAppointDetails(orderId));
        dispatch(getAllProducts());

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/secretary/appointment/list');
            successMsg('Additional added successfully!');
            dispatch({ type: UPDATE_APPOINTMENT_RESET });
        }
    }, [dispatch, error, isUpdated, orderId, navigate]);

    const handleProductSelect = (productId) => {
        setSelectedProducts(prevSelectedProducts => {
            if (!prevSelectedProducts.includes(productId)) {
                return [...prevSelectedProducts, productId];
            }
            return prevSelectedProducts;
        });
        setProductQuantities({ ...productQuantities, [productId]: 1 });
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            return; // Ensure quantity is always at least 1
        }
        setProductQuantities({ ...productQuantities, [productId]: newQuantity });
    };

    const additionalHandler = () => {
        if (selectedProducts.length === 0) {
            errMsg("Please select at least one product");
            return;
        }

        const formDataParts = selectedProducts.map(productId => {
            const product = products.find(product => product._id === productId);
            return {
                productId: productId,
                productName: product.name,
                brandName: product.brand.name, // Assuming `brand` is an object with `name` property
                quantity: productQuantities[productId] || 0,
            };
        });

        const formData = {
            parts: formDataParts,
        };

        dispatch(updateAdditional(id, formData));
    };

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        {(appointmentLoading || productLoading) ? <Loader /> : (
                            <div className="row d-flex justify-content-around">
                                <div className="col-12 col-lg-7 order-details">
                                    <h2 className="my-5">Appointment # {booking._id}</h2>
                                    <h4 className="my-4">Order Items:</h4>
                                    <div className="space-y-3">
                                        {booking &&
                                            booking.appointmentServices &&
                                            booking.appointmentServices.map((item) => (
                                                <div key={item._id} className="flex flex-row justify-between items-start">
                                                    <div>
                                                        {item.service && item.service.images && (
                                                            <img
                                                                src={item.service.images[0].url}
                                                                alt={item.service.name}
                                                                height="45"
                                                                width="65"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        {item.service && (
                                                            <Link to={`/showSingleService/${item.service._id}`}>
                                                                {item.service.name}
                                                            </Link>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {item.service && item.service.price && (
                                                            <p>${item.service.price}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div>
                                        <h4 className="my-4">Select Additional Products:</h4>
                                        <Stack spacing={4}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    <FiSearch />
                                                </InputLeftElement>
                                                <Input
                                                    placeholder="Search products..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </InputGroup>
                                            <VStack align="start" spacing={2}>
                                                {searchTerm && filteredProducts.length === 0 && (
                                                    <Text>No products found</Text>
                                                )}
                                                {searchTerm && filteredProducts.map((product) => (
                                                    <Box
                                                        key={product._id}
                                                        borderWidth="1px"
                                                        borderRadius="md"
                                                        p={2}
                                                        cursor="pointer"
                                                        onClick={() => handleProductSelect(product._id)}
                                                        w="100%"
                                                    >
                                                        <Flex justify="space-between" align="center">
                                                            <HStack spacing={2}>
                                                                {product.images.length > 0 && (
                                                                    <Image
                                                                        src={product.images[0].url}
                                                                        alt={product.name}
                                                                        boxSize="40px"
                                                                        objectFit="cover"
                                                                    />
                                                                )}
                                                                <VStack align="start">
                                                                    <Text fontSize="md" fontWeight="bold">
                                                                        {product.name} - {product.brand.name}
                                                                    </Text>
                                                                    <Text fontSize="sm" color="gray.500">
                                                                        ${product.price}
                                                                    </Text>
                                                                </VStack>
                                                            </HStack>
                                                        </Flex>
                                                    </Box>
                                                ))}
                                            </VStack>

                                            {selectedProducts.map((productId, index) => {
                                                const product = products.find(product => product._id === productId);
                                                return (
                                                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                                                        <Flex justify="space-between" align="center">
                                                            <HStack spacing={4}>
                                                                {product.images.length > 0 && (
                                                                    <Image
                                                                        src={product.images[0].url}
                                                                        alt={product.name}
                                                                        boxSize="50px"
                                                                        objectFit="cover"
                                                                    />
                                                                )}
                                                                <VStack align="start">
                                                                    <Text fontSize="xl" fontWeight="bold">
                                                                        {product.name}
                                                                    </Text>
                                                                    <Text fontSize="md" color="gray.500">
                                                                        ${product.price}
                                                                    </Text>
                                                                </VStack>
                                                            </HStack>
                                                            <Flex align="center">
                                                                <IconButton
                                                                    size="sm"
                                                                    colorScheme="red"
                                                                    aria-label="Decrease Quantity"
                                                                    onClick={() => handleQuantityChange(productId, productQuantities[productId] - 1)}
                                                                    icon={<FiMinus />}
                                                                    isDisabled={productQuantities[productId] <= 1}
                                                                />
                                                                <Input
                                                                    type="number"
                                                                    value={productQuantities[productId]}
                                                                    readOnly
                                                                    size="sm"
                                                                    w="40px"
                                                                    mx={2}
                                                                    textAlign="center"
                                                                    aria-label="Product Quantity"
                                                                />
                                                                <IconButton
                                                                    size="sm"
                                                                    colorScheme="green"
                                                                    aria-label="Increase Quantity"
                                                                    onClick={() => handleQuantityChange(productId, productQuantities[productId] + 1)}
                                                                    icon={<FiPlus />}
                                                                />
                                                            </Flex>
                                                        </Flex>
                                                    </Box>
                                                );
                                            })}

                                        </Stack>
                                    </div>

                                    <div className="border-b border-zinc-200 mt-4" />
                                    <Flex justify="flex-end">
                                        <Button colorScheme="blue" onClick={additionalHandler}>Add</Button>
                                    </Flex>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default Additional;