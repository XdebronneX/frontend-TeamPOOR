import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_ADDRESSES_RESET } from '../../constants/addressConstants';
import { updateAddresses, getAddressDetails, clearErrors, myAddresses } from '../../actions/addressActions';
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Center,
    useToast,
    Avatar,
    AvatarBadge,
    IconButton,
    Select,
    FormErrorMessage,
    Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import MetaData from '../layout/MetaData';
const UpdateAddress = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const toast = useToast();

    const { addresses } = useSelector((state) => state.addressDetails);
    const { error, isUpdated, loading } = useSelector((state) => state.userControl);
    const [address, setAddress] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


    const handleSuccess = (message) => {
        toast({
            title: "Success!",
            description: message,
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
        });
    };

    const handleError = (message) => {
        toast({
            title: "Error!",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "bottom-left",
        });
    };

    useEffect(() => {
        if (addresses && addresses._id !== id) {
            dispatch(getAddressDetails(id));
        }
        if (addresses) {
            setPostalcode(addresses.postalcode || "");
            setAddress(addresses.address || "");
            setSelectedRegion(addresses.region || "");

            provinces(addresses.region || "").then((provinceResponse) =>
                setProvinceData(provinceResponse)
            );
            setSelectedProvince(addresses.province || "");

            cities(addresses.province || "").then((cityResponse) =>
                setCityData(cityResponse)
            );
            setSelectedCity(addresses.city || "");

            barangays(addresses.city || "").then((barangayResponse) =>
                setBarangayData(barangayResponse || [])
            );
            setSelectedBarangay(addresses.barangay || "");

            regions().then((regionResponse) => setRegionData(regionResponse));
        }

        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            dispatch(myAddresses());
            handleSuccess("Update successfully!");
            setTimeout(() => {
                navigate("/my-addresses", { replace: true });
                dispatch({ type: UPDATE_ADDRESSES_RESET });
            });
        }
    }, [dispatch, error, isUpdated, navigate, addresses, id]);


    const submitHandler = (e) => {
        const formData = new FormData();
        formData.append("address", address);
        formData.append("region", selectedRegion);
        formData.append("province", selectedProvince);
        formData.append("city", selectedCity);
        formData.append("barangay", selectedBarangay);
        formData.append("postalcode", postalcode);
        dispatch(updateAddresses(addresses._id,formData));
    };

    const handleRegionChange = (value) => {
        setSelectedRegion(value);
        provinces(value).then((provinceResponse) =>
            setProvinceData(provinceResponse)
        );
    };

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        cities(value).then((cityResponse) => setCityData(cityResponse));
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
        barangays(value).then((barangayResponse) =>
            setBarangayData(barangayResponse || [])
        );
    };

    const handleBarangayChange = (value) => {
        setSelectedBarangay(value);
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <MetaData  title={"Edit Address"} />
            <Stack
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                    User Profile Edit
                </Heading>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormControl id="address">
                        <FormLabel>Address</FormLabel>
                        <Input
                            placeholder="address"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="postalcode">
                        <FormLabel>Postalcode</FormLabel>
                        <Input
                            placeholder="Postalcode"
                            _placeholder={{ color: "gray.500" }}
                            type="text"
                            value={postalcode}
                            onChange={(e) => setPostalcode(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="region">
                        <FormLabel>Region</FormLabel>
                        <Select
                            placeholder="Select a region"
                            value={selectedRegion}
                            onChange={(e) => handleRegionChange(e.target.value)}
                        >
                            {regionData.map((region) => (
                                <option
                                    key={region.region_code}
                                    label={region.region_name}
                                    value={region.region_code}
                                />
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="province" isRequired>
                        <FormLabel>Province</FormLabel>
                        <Select
                            placeholder="Select a province"
                            onChange={(e) => handleProvinceChange(e.target.value)}
                            value={selectedProvince}
                        >
                            {provinceData.map((province) => (
                                <option
                                    key={province.province_code}
                                    label={province.province_name}
                                    value={province.province_code}
                                />
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="city" isRequired>
                        <FormLabel>City</FormLabel>
                        <Select
                            placeholder="Select a city"
                            onChange={(e) => handleCityChange(e.target.value)}
                            value={selectedCity}
                        >
                            {cityData.map((city) => (
                                <option
                                    key={city.city_code}
                                    label={city.city_name}
                                    value={city.city_code}
                                />
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl id="barangay" isRequired>
                        <FormLabel>Barangay</FormLabel>
                        <Select
                            placeholder="Select barangay"
                            value={selectedBarangay}
                            onChange={(e) => handleBarangayChange(e.target.value)}
                        >
                            {barangayData.map((barangay) => (
                                <option key={barangay.brgy_code} value={barangay.brgy_code}>
                                    {barangay.brgy_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]}>
                        <Button
                            bg={"red.500"}
                            color={"white"}
                            w="full"
                            _hover={{
                                bg: "red",
                            }}
                            onClick={() => navigate("/my-addresses", { replace: true })}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={"blue.500"}
                            color={"white"}
                            w="full"
                            _hover={{
                                bg: "blue.700",
                            }}
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
}

export default UpdateAddress
