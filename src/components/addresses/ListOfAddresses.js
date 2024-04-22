import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { myAddresses } from '../../actions/addressActions';
import { Flex, Heading, Text, Button, useToast, ButtonGroup } from '@chakra-ui/react';
import { DELETE_ADDRESSES_RESET } from '../../constants/addressConstants';
import { UPDATE_ADDRESSES_RESET } from '../../constants/addressConstants';
import { deleteAddresses, updateDefaultAddresses, clearErrors } from '../../actions/addressActions';
import Loader from '../layout/Loader';
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";
import { FaPencilAlt, FaTrash, FaCheck } from 'react-icons/fa';
import { FaPlusCircle } from "react-icons/fa";
import MetaData from '../layout/MetaData';
const ListOfAddresses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();
    const { userAddresses, error, loading } = useSelector((state) => state.myAddresses);
    const { isDeleted, isUpdated } = useSelector((state) => state.userControl);
    const [addressData, setAddressData] = useState([]);

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
        dispatch(myAddresses());
        if (error) {
            showErrorToast(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            // dispatch(myAddresses());
            showSuccessToast("Set new default address!");
            setTimeout(() => {
                // navigate("/my-addresses", { replace: true });
                dispatch({ type: UPDATE_ADDRESSES_RESET });
            });
        }
        if (isDeleted) {
            showSuccessToast('Address deleted successfully!');
            navigate('/my-addresses');
            dispatch({ type: DELETE_ADDRESSES_RESET });
        }
    }, [dispatch, error, isDeleted, navigate, isUpdated]);

    const updateMyAddressHandler = (id) => {
        dispatch(updateDefaultAddresses(id));
    };

    useEffect(() => {
        const fetchData = async () => {
            if (userAddresses && userAddresses.length > 0) {
                const newData = await Promise.all(userAddresses.map(async (address) => {
                    const regionCode = address.region;
                    const provinceCode = address.province;
                    const cityCode = address.city;

                    const regionResponse = await regions(regionCode);
                    const provinceResponse = await provinces(regionCode);
                    const cityResponse = await cities(provinceCode);
                    const barangayResponse = await barangays(cityCode);

                    return {
                        ...address,
                        regionName: regionResponse.find(region => region.region_code === regionCode)?.region_name,
                        provinceName: provinceResponse.find(province => province.province_code === provinceCode)?.province_name,
                        cityName: cityResponse.find(city => city.city_code === cityCode)?.city_name,
                        barangayName: barangayResponse.find(barangay => barangay.brgy_code === address.barangay)?.brgy_name,
                    };
                }));
                setAddressData(newData);
            }
        };
        fetchData();
    }, [userAddresses]);

    const handleAddresses = () => {
        navigate("/create/my-address");
    };

    useEffect(() => {
        dispatch(myAddresses());
        if (error) {
            showErrorToast(error);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            showSuccessToast('Address deleted successfully!');
            navigate('/my-addresses');
            dispatch({ type: DELETE_ADDRESSES_RESET });
        }
    }, [dispatch, error, isDeleted, navigate]);

    const deleteMyAddressHandler = (id) => {
        dispatch(deleteAddresses(id));
    };

    return (
        <Flex direction="column" width="100%" maxWidth="1000px" mx="auto" p={4} borderWidth="1px" borderRadius="md">
            <MetaData  title="My Addresses"></MetaData>
            <Button onClick={handleAddresses} colorScheme="teal" mb={2} leftIcon={<FaPlusCircle />}>New Address</Button>
            <Heading as="h1" size="lg" textAlign="center" mb={4}>List of My Addresses</Heading>
            {!loading && (
                <Flex justifyContent="center" alignItems="center" height="200px">
                    <Loader />
                </Flex>
            )}

            {error && <Text color="red.500" textAlign="center">Error: {error}</Text>}
            {addressData &&
                addressData.map((address, index) => (
                    <Flex key={index} width="100%" p={4} borderWidth="1px" borderRadius="md" mb={4}>
                        <Flex direction="column" flex="1">
                            <Text fontSize="lg"><strong>Postal Code:</strong> {address.postalcode}</Text>
                            <Text fontSize="lg"><strong>Address:</strong> {address.address}</Text>
                            <Text fontSize="lg"><strong>Region:</strong> {address.regionName}</Text>
                            <Text fontSize="lg"><strong>Province:</strong> {address.provinceName}</Text>
                            <Text fontSize="lg"><strong>City:</strong> {address.cityName}</Text>
                            <Text fontSize="lg"><strong>Barangay:</strong> {address.barangayName}</Text>
                        </Flex>
                        <ButtonGroup>
                            <Button colorScheme="red" size="sm" ml="2" onClick={() => deleteMyAddressHandler(address._id)} leftIcon={<FaTrash />}></Button>
                            <Link to={`/my-address/${address._id}`}>
                                <Button colorScheme="blue" size="sm" ml="1" leftIcon={<FaPencilAlt />}></Button>
                            </Link>
                            <Button
                                disabled={address.isDefault} // Disable the button if the address is already set as default
                                className={
                                    address.isDefault
                                        ? "p-2 border border-red-500 bg-red-500 items-center rounded-lg" // Apply styles for the disabled state
                                        : "p-2 border border-zinc-500 items-center rounded-lg" // Apply styles for the enabled state
                                }
                                style={{ pointerEvents: address.isDefault ? 'none' : 'auto' }}
                                onClick={address.isDefault ? undefined : () => updateMyAddressHandler(address._id)}
                            >
                                <Text style={{ color: address.isDefault ? "red" : "" }} >
                                    {address.isDefault ? "Default Address" : "Set Default"}
                                </Text>
                            </Button>
                        </ButtonGroup>
                    </Flex>
                ))}
        </Flex>
    );

};

export default ListOfAddresses;
