import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeServiceFromCart } from '../../actions/serviceCartActions';
import {
    Box,Table,Thead,Tbody, Tr,Th,Td,Image, Text,Button,Flex, Input,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import Empty from '../cart/EmptyCart';

const CartService = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartServices } = useSelector((state) => state.serviceCart);

    const removeCartServiceHandler = (id) => {
        dispatch(removeServiceFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Box>
            {cartServices.length === 0 ? (
                <Empty />
            ) : (
                <Table variant="simple" size="sm">
                    <Thead>
                        <Tr>
                            <Th>Image</Th>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {cartServices.map((service) => (
                            <Tr key={service.service}>
                                <Td>
                                    <Image
                                        src={service.image}
                                        alt={service.name}
                                        height="90px"
                                        width="115px"
                                        objectFit="contain"
                                    />
                                </Td>
                                <Td>
                                    <Link to={`/showSingleService/${service.service}`}>
                                        {service.name}
                                    </Link>
                                </Td>
                                <Td>${service.price}</Td>
                                <Td>
                                    <Button
                                        id="delete_cart_item"
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => removeCartServiceHandler(service.service)}
                                    >
                                        <FiTrash2 />
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default CartService;
