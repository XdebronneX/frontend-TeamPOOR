import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCustomerInfo } from "../../../actions/serviceCartActions";
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
import ListOfAddresses from "../../addresses/ListOfAddresses";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import AppointmentSteps from "./AppointmentSteps";
import { myMotorcycle } from "../../../actions/motorcycleActions";

const CustomerInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authUser);
  const { userAddresses, loading } = useSelector(
    (state) => state.myAddresses
  );
  const { userMotorcycles } = useSelector((state) => state.myMotor);
  const { customerInfo } = useSelector((state) => state.serviceCart);
  const [selectedMotorcycle, setSelectedMotorcycle] = useState("");
  useEffect(() => {
    dispatch(myMotorcycle()); // Fetch user's motorcycles here
  }, [dispatch]);

  const handleMotorcycleChange = (event) => {
    setSelectedMotorcycle(event.target.value);
  };

  useEffect(() => {
    if (userAddresses && userAddresses.length > 0) {
      if (user.firstname && user.lastname) {
        setFullname(`${user.firstname} ${user.lastname}`);
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
        // console.log('defaultAdd', defaultAddress);
      }
    }
  }, [user, userAddresses]);

  const [fullname, setFullname] = useState(customerInfo.fullname);
  const [phone, setPhone] = useState(customerInfo.phone);
  const [address, setAddress] = useState(customerInfo.address);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Find the selected motorcycle details
    const selectedMotorcycleDetails = userMotorcycles.find(
      (motorcycle) => motorcycle._id === selectedMotorcycle
    );

    // Extract necessary details from the selected motorcycle
    const { fuel, brand, year, plateNumber, engineNumber, type } =
      selectedMotorcycleDetails;

    // Remaining code remains the same
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

    const addressInfo = {
      postalcode: address.postalcode,
      address: address.address,
      region: regionName,
      province: provinceName,
      city: cityName,
      barangay: barangayName,
    };

    dispatch(
      saveCustomerInfo({
        fullname,
        phone,
        address: addressInfo,
        fuel,
        brand,
        year,
        plateNumber,
        engineNumber,
        type,
      })
    );
    navigate("/confirm/appointment");
  };

  const cancelHandler = () => {
    navigate("/cart");
  };

  return (
    <div className="space-y-5 py-3 bg-zinc-100 min-h-screen">
      <AppointmentSteps booking listofservices customerinfo />

      <div className="container shadow-sm rounded-xl w-9/12 p-3 space-y-5 bg-white">
        <div>
          <h2 className="text-center font-bold">Shipping Information</h2>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div class="container w-9/12 grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
          <div className="shadow-sm rounded-xl p-3 space-y-5 bg-white col-span-2">
            <FormControl id="motorcycle_field" mb={4}>
              <FormLabel>Motorcycle</FormLabel>
              <Select
                placeholder="Select Motorcycle"
                value={selectedMotorcycle}
                onChange={handleMotorcycleChange}
              >
                {userMotorcycles &&
                  userMotorcycles.map((motorcycle) => (
                    <option key={motorcycle._id} value={motorcycle._id}>
                      {motorcycle.year} - {motorcycle.plateNumber}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <ListOfAddresses
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </div>

          <div className="shadow-sm rounded-xl p-3 space-y-5 bg-white flex-col justify-center items-center h-min">
            <FormControl id="address_field" mb={4}>
              <FormLabel>Fullname</FormLabel>
              <Input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </FormControl>
            <FormControl id="phone_field" mb={4}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>

            <div className="border-b"></div>

            <Button
              id="shipping_btn"
              type="submit"
              colorScheme="blue"
              size="md"
              width="100%"
            >
              Proceed to summary
            </Button>

            <Button
              id="cancel_btn"
              onClick={cancelHandler}
              colorScheme="red"
              size="md"
              width="100%"
            >
              Back to Cart
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfo;
