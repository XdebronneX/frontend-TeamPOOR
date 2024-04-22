import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartActions";
import CheckoutSteps from "./CheckoutSteps";
import {
    Box,
    Flex,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
} from "@chakra-ui/react";
import ListOfAddresses from "../addresses/ListOfAddresses";
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";

const Shipping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authUser);
    const { userAddresses, loading } = useSelector(
        (state) => state.myAddresses
    );
    const { shippingInfo } = useSelector((state) => state.cart);

    useEffect(() => {
        if (userAddresses && userAddresses.length > 0) {
            if (user.firstname && user.lastname) {
                setFullname(`${ user.firstname } ${ user.lastname }`);
            }
            if (user.phone) {
                setPhone(user.phone);
            }
            // Find the user's default address
            const defaultAddress = userAddresses.find((address) => address.isDefault);
            if (defaultAddress) {
                setAddress({
                    postalcode: defaultAddress.postalcode,
                    address: defaultAddress.address,
                    region: defaultAddress.region,
                    province: defaultAddress.province,
                    city: defaultAddress.city,
                    barangay: defaultAddress.barangay,
                });
                console.log("defaultAdd", defaultAddress);
            }
        }
    }, [user, userAddresses]);

    const [fullname, setFullname] = useState(shippingInfo.fullname);
    const [phone, setPhone] = useState(shippingInfo.phone);
    const [address, setAddress] = useState(shippingInfo.address);

    const submitHandler = async (e) => {
        e.preventDefault();

        const regionCode = address.region;
        const provinceCode = address.province;
        const cityCode = address.city;

        const regionResponse = await regions(regionCode);
        const provinceResponse = await provinces(regionCode);
        const cityResponse = await cities(provinceCode);
        const barangayResponse = await barangays(cityCode);

        const regionName = regionResponse.find(
            (region) => region.region_code === regionCode
        )?.region_name;
        const provinceName = provinceResponse.find(
            (province) => province.province_code === provinceCode
        )?.province_name;
        const cityName = cityResponse.find(
            (city) => city.city_code === cityCode
        )?.city_name;
        const barangayName = barangayResponse.find(
            (barangay) => barangay.brgy_code === address.barangay
        )?.brgy_name;

        console.log("regionName", regionName);

        const addressInfo = {
            postalcode: address.postalcode,
            address: address.address,
            region: regionName,
            province: provinceName,
            city: cityName,
            barangay: barangayName,
        };

        dispatch(saveShippingInfo({ fullname, phone, address: addressInfo }));
        console.log("address", address);
        navigate("/payment");
    };

    const cancelHandler = () => {
        navigate("/cart");
    };

    return (
        <div className="space-y-5 px-80 py-3 bg-zinc-100 min-h-screen">
            <CheckoutSteps shipping />

            <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4">
                <p className="font-extrabold text-2xl tracking-wide">
                    Shipping Information
                </p>
            </div>

            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-3 gap-5">
                    <div className="bg-white justify-center rounded-xl p-3 col-span-2 space-y-4 shadow-sm">
                        <div className="flex flex-col justify-center space-y-3"></div>

                        <div className="">
                            <FormControl isRequired className="space-y-3">
                                <div>
                                    <FormLabel>Delivery Address</FormLabel>
                                    <label className="font-xs text-zinc-500">
                                        Please select address below.
                                    </label>
                                </div>
                                <div className="border-b" />
                                <ListOfAddresses
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className="bg-white shadow-sm justify-center rounded-xl p-3 space-y-3">
                        <div className="flex flex-col justify-center space-y-3">
                            <p className="text-lg font-bold">Contact Details</p>
                        </div>

                        <div className="border-b" />
                        <div className="space-y-4">
                            <div>
                                <FormControl id="address_field" mb={4} isRequired>
                                    <FormLabel>Fullname</FormLabel>
                                    <Input
                                        type="text"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                    />
                                </FormControl>
                                <FormControl id="phone_field" mb={4} isRequired>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </FormControl>
                            </div>

                            <div className="border-b" />

                            <div className="">
                                <Button
                                    id="shipping_btn"
                                    type="submit"
                                    colorScheme="red"
                                    size="md"
                                    width="100%"
                                >
                                    Proceed To Payment
                                </Button>

                                <Button
                                    id="cancel_btn"
                                    onClick={cancelHandler}
                                    variant="ghost"
                                    size="md"
                                    mt={4}
                                    width="100%"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Shipping;