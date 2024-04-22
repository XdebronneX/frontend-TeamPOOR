import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAddresses, clearErrors } from "../../actions/addressActions";
import { CREATE_ADDRESSES_RESET } from "../../constants/addressConstants";
// import { toast } from "react-toastify";
import MetaData from '../layout/MetaData';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    FormErrorMessage,
    useToast
} from "@chakra-ui/react";
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";

const CreateAddresses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const { createdAddresses, error, loading } = useSelector((state) => state.newAddresses);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [address, setAddress] = useState("");
    const [postalcode, setPostalcode] = useState("");
    const [regionData, setRegionData] = useState([]);
    const [provinceData, setProvinceData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [barangayData, setBarangayData] = useState([]);
    const [regionName, setRegionName] = useState([]);
    const [provinceName, setProvinceName] = useState([]);
    const [cityName, setCityName] = useState([]);
    const [barangayName, setBarangayName] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedBarangay, setSelectedBarangay] = useState("");

    const handleSuccess = () => {
        toast({
            title: "Success!",
            description: "Address created successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        reset(); // Reset form after successful submission
        dispatch({ type: CREATE_ADDRESSES_RESET });
        navigate("/my-addresses");
    };

    const handleError = (message) => {
        toast({
            title: "Error!",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
        dispatch(clearErrors());
    };

    const submitHandler = (data) => {
        const formData = new FormData();
        formData.set("address", data.address);
        formData.set("region", selectedRegion);
        formData.set("province", selectedProvince);
        formData.set("city", selectedCity);
        formData.set("barangay", selectedBarangay);
        formData.set("postalcode", data.postalcode);
        dispatch(createAddresses(formData));
    };

    useEffect(() => {
        if (!createdAddresses) return;
        setAddress(createdAddresses.address || "");
        setPostalcode(createdAddresses.postalcode || "");
        setSelectedRegion(createdAddresses.region || "");
        provinces(createdAddresses.region || "").then((provinceResponse) => setProvinceData(provinceResponse));
        setSelectedProvince(createdAddresses.province || "");
        cities(createdAddresses.province || "").then((cityResponse) => setCityData(cityResponse));
        setSelectedCity(createdAddresses.city || "");
        barangays(createdAddresses.city || "").then((barangayResponse) => setBarangayData(barangayResponse || []));
        setSelectedBarangay(createdAddresses.barangay || "");

        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
        else {
            handleSuccess('Address created successfully');
            navigate("/my-addresses", { replace: true });
            dispatch({ type: CREATE_ADDRESSES_RESET });
        }
    }, [createdAddresses, error, dispatch, navigate]);

    useEffect(() => {
        regions().then((regionResponse) => setRegionData(regionResponse));
    }, []);

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
        <Box p="4" maxW="md" mx="auto">
            <MetaData title={"Create Address"} />
            <form onSubmit={handleSubmit(submitHandler)}>
                <FormControl id="address" isInvalid={errors.address}>
                    <FormLabel>Address</FormLabel>
                    <Input
                        type="text"
                        {...register("address", {
                            required: "Address is required",
                        })}
                    />
                    <FormErrorMessage>{errors.address && errors.address.message}</FormErrorMessage>
                </FormControl>
                <FormControl id="postalcode" isInvalid={errors.postalcode}>
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                        type="text"
                        {...register("postalcode", {
                            required: "Postal Code is required",
                        })}
                    />
                    <FormErrorMessage>{errors.postalcode && errors.postalcode.message}</FormErrorMessage>
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
                                key={region.region_name}
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

                <Button mt="4" colorScheme="teal" isLoading={loading} type="submit">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CreateAddresses;
