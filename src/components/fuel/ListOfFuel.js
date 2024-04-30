import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaGasPump, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Flex, Heading, Text, Button, useToast, Box, Container } from '@chakra-ui/react';
import Loader from '../layout/Loader';
import { deleteFuel, myFuel, clearErrors } from '../../actions/fuelActions';
import { DELETE_FUEL_RESET } from '../../constants/fuelConstants';
import { MDBDataTableV5, MDBDataTable } from 'mdbreact';

const ListOfFuel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { userFuel, error, loading } = useSelector((state) => state.myFuel);
    const { isDeleted } = useSelector((state) => state.userControlFuel);
    const showErrorToast = (message) => {
        toast({
            title: 'Error',
            description: message,
            status: 'error',
            position: 'bottom-center',
            duration: 3000,
            isClosable: true,
        });
    };

    const showSuccessToast = (message) => {
        toast({
            title: 'Success',
            description: message,
            status: 'success',
            position: 'bottom-center',
            duration: 3000,
            isClosable: true,
        });
    };

    useEffect(() => {
        dispatch(myFuel());
        if (error) {
            showErrorToast(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            showSuccessToast('Fuel record deleted successfully!');
            dispatch({ type: DELETE_FUEL_RESET });
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteFuelHandler = (id) => {
        dispatch(deleteFuel(id));
    };
    const handlefuel = () => {
        navigate("/add-fuel");
    };

    const setFuels = () => {
        const data = {
            columns: [
                {
                    label: 'Date log',
                    field: 'date',
                    sort: 'asc',
                },
                {
                    label: 'Odometer',
                    field: 'odometer',
                    sort: 'disabled',
                },
                {
                    label: 'Liter/s',
                    field: 'quantity',
                    sort: 'disabled',
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'disabled',
                },
                {
                    label: 'TotalCost',
                    field: 'totalCost',
                    sort: 'disabled',
                },
                {
                    label: 'Filling Station',
                    field: 'fillingStation',
                    sort: 'disabled',
                },
                {
                    label: 'Note',
                    field: 'notes',
                    sort: 'disabled',
                },
                {
                    label: 'Motorcycle',
                    field: 'motor',
                    sort: 'disabled',
                },

                {
                    label: 'Delete',
                    field: 'delete',
                    sort: 'disabled',
                },
            ],
            rows: [],
        };

        if (userFuel) {
            userFuel.forEach((row) => {
                const createdAt = new Date(row.date);
                const formattedDateTime = `${createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}`;
                const BrandPlate = `${row.motorcycle?.brand} - (${row.motorcycle?.plateNumber})`
                data.rows.push({
                    id: row._id,
                    motor: BrandPlate,
                    odometer: row.odometer,
                    quantity: row.quantity,
                    price: row.price,
                    totalCost: row.totalCost,
                    fillingStation: row.fillingStation,
                    notes: row.notes,
                    date: formattedDateTime,
                    // edit: (
                    //     <Fragment>
                    //         <Link to={`/user/fuel/${row._id}`}>
                    //             <Button colorScheme="blue" size="sm" ml="3" leftIcon={<FaPencilAlt />}>
                    //                 Edit
                    //             </Button>
                    //         </Link>
                    //     </Fragment>
                    // ),
                    delete: (
                        <Fragment>
                            <Button
                                colorScheme="red"
                                size="sm"
                                ml="3"
                                onClick={() => deleteFuelHandler(row._id)}
                                leftIcon={<FaTrash />}
                            >
                                Delete
                            </Button>
                        </Fragment>
                    ),
                });
            });
        }

        return data;
    };

    const totalCost = userFuel ? userFuel.reduce((acc, curr) => acc + curr.totalCost, 0) : 0;
    const formattedTotalCost = totalCost.toLocaleString();
    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Box mt={4} p={4} bg="gray.100" rounded="md" boxShadow="md" display="flex" alignItems="center">
                    <FaGasPump style={{ marginRight: '8px' }} />
                    <Text>Total Expenses: <strong>₱{formattedTotalCost}</strong></Text>
                </Box>
                <Heading as="h1" fontSize="3xl" fontWeight="bold">
                    Fuel Log
                </Heading>
                <Button onClick={handlefuel} colorScheme="teal" leftIcon={<FaPlusCircle />}>
                    Log fuel
                </Button>
            </Flex>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    {userFuel && userFuel.length === 0 ? (
                        <Text>No Fuel found.</Text>
                    ) : (
                        <MDBDataTable
                            striped
                            bordered
                            noBottomColumns
                            data={setFuels()}
                        />
                    )}
                </Fragment>
            )}
        </Container>
    )
}

export default ListOfFuel;
