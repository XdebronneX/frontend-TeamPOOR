import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Box,
    Text,
    Button,
    Avatar,
    Divider,
    Stack,
    Heading,
    Flex,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";
import Loader from "../layout/Loader";
import { myMotorcycle } from '../../actions/motorcycleActions';
import { FaPlusCircle } from "react-icons/fa";
import { myAddresses, updateDefaultAddresses, clearErrors } from '../../actions/addressActions';
import { UPDATE_ADDRESSES_RESET } from '../../constants/addressConstants';
import { myFuel } from '../../actions/fuelActions';
import {
    regions,
    provinces,
    cities,
    barangays,
} from "select-philippines-address";
import { FaGasPump } from 'react-icons/fa';
import { myOrders, allOrders, listOrders } from '../../actions/orderActions';
import { RiCurrencyFill } from "react-icons/ri";
import { MDBDataTable } from 'mdbreact';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading: loadingUsers } = useSelector((state) => state.authUser);
    const { userAddresses, error, loading: loadingAddresses } = useSelector((state) => state.myAddresses);
    const { isUpdated } = useSelector((state) => state.userControl);
    const [addressData, setAddressData] = useState([]);
    const { userMotorcycles, loading: loadingMotorcycles } = useSelector((state) => state.myMotor);
    const { userFuel, loading: loadingFuel } = useSelector((state) => state.myFuel);
    const { orders, error: errorMyOrders, loading: loadingMyOrders } = useSelector(state => state.myOrders)
    const { loading: loadingAllOrders, loading: loadingListOrders, alllistorders } = useSelector((state) => state.allOrders);

    const UpdateProfileHandler = () => {
        navigate("/profile/update");
    };

    const ChangePasswordHandler = () => {
        navigate("/change/password");
    };

    const handleMotorcycle = () => {
        navigate("/create/motorcycle/new");
    };
    const handleFuel = () => {
        navigate("/add-fuel");
    };

    const updateMyAddressHandler = (id) => {
        dispatch(updateDefaultAddresses(id));
    };

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

    useEffect(() => {
        dispatch(myAddresses());
        dispatch(myMotorcycle());
        dispatch(myFuel());
        dispatch(myOrders());
        if (user.role === "admin") {
            dispatch(allOrders());
        }
        if (user.role === "secretary") {
            dispatch(listOrders());
        }
        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            handleSuccess("Set new default address!");
            setTimeout(() => {
                dispatch({ type: UPDATE_ADDRESSES_RESET });
            });
        }
    }, [dispatch, error, isUpdated, navigate]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Date Order',
                    field: 'date',
                    sort: 'disabled',
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'disabled',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled',
                },
            ],
            rows: [],
        };

        alllistorders.forEach((order) => {
            const orderStatus = order.orderStatus || [];
            const sortedStatus = orderStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

            let badgeColor = '';
            let badgeText = '';

            switch (latestStatus) {
                case 'TOPAY':
                    badgeColor = 'primary';
                    badgeText = 'To Pay';
                    break;
                case 'Pending':
                    badgeColor = 'primary';
                    badgeText = 'Pending';
                    break;
                case 'TOSHIP':
                    badgeColor = 'info';
                    badgeText = 'To Ship';
                    break;
                case 'TORECEIVED':
                    badgeColor = 'primary';
                    badgeText = 'Out Of Delivery';
                    break;
                case 'FAILEDATTEMPT':
                    badgeColor = 'warning';
                    badgeText = 'Failed Attempt';
                    break;
                case 'CANCELLED':
                    badgeColor = 'danger';
                    badgeText = 'Cancelled';
                    break;
                case 'RETURNED':
                    badgeColor = 'danger';
                    badgeText = 'Returned';
                    break;
                case 'DELIVERED':
                    badgeColor = 'success';
                    badgeText = 'Received';
                    break;
                case 'COMPLETED':
                    badgeColor = 'success';
                    badgeText = 'Completed';
                    break;
                default:
                    badgeText = 'No status';
            }

            const formattedDateOrdered = new Date(order.dateOrdered).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            });

            data.rows.push({
                id: order._id,
                date: formattedDateOrdered,
                numofItems: order.orderItems.length,
                amount: `₱ ${order.totalPrice.toLocaleString()}`,
                status: (
                    <span className={`badge badge-${badgeColor}`}>
                        {badgeText}
                    </span>
                ),
            });
        });

        return data;
    };

    const setListOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc',
                },
                {
                    label: 'Date Order',
                    field: 'date',
                    sort: 'disabled',
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'disabled',
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'disabled',
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'disabled',
                },
            ],
            rows: [],
        };

        if (alllistorders && alllistorders.length > 0) {
            alllistorders.forEach((order) => {
                const orderStatus = order.orderStatus || [];
                const sortedStatus = orderStatus.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                const latestStatus = sortedStatus.length > 0 ? sortedStatus[0].status : 'No status';

                let badgeColor = '';
                let badgeText = '';

                switch (latestStatus) {
                    case 'Pending':
                    case 'TOPAY':
                        badgeColor = 'primary';
                        badgeText = 'Pending';
                        break;
                    case 'TOSHIP':
                        badgeColor = 'info';
                        badgeText = 'To Ship';
                        break;
                    case 'TORECEIVED':
                        badgeColor = 'primary';
                        badgeText = 'Out Of Delivery';
                        break;
                    case 'FAILEDATTEMPT':
                        badgeColor = 'warning';
                        badgeText = 'Failed Attempt';
                        break;
                    case 'CANCELLED':
                        badgeColor = 'danger';
                        badgeText = 'Cancelled';
                        break;
                    case 'RETURNED':
                        badgeColor = 'danger';
                        badgeText = 'Returned';
                        break;
                    case 'DELIVERED':
                        badgeColor = 'success';
                        badgeText = 'Received';
                        break;
                    case 'COMPLETED':
                        badgeColor = 'success';
                        badgeText = 'Completed';
                        break;
                    default:
                        badgeText = 'No status';
                }
                const formattedDateOrdered = new Date(order.dateOrdered).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });

                data.rows.push({
                    id: order._id,
                    numofItems: order.orderItems.length,
                    amount: `₱ ${order.totalPrice.toLocaleString()}`,
                    status: (
                        <span className={`badge badge-${badgeColor}`}>
                            {badgeText}
                        </span>
                    ),
                    date: formattedDateOrdered,
                });
            });
        }

        return data;
    };

    const setAddresses = () => {
        const data = {
            columns: [
                {
                    label: 'Date Created',
                    field: 'created',
                    sort: 'asc',
                },
                {
                    label: 'Address',
                    field: 'address',
                    sort: 'disabled',
                },
                {
                    label: 'Barangay',
                    field: 'barangayName',
                    sort: 'disabled',
                },
                {
                    label: 'City',
                    field: 'cityName',
                    sort: 'disabled',
                },
                {
                    label: 'Postal Code',
                    field: 'postalcode',
                    sort: 'disabled',
                },
                {
                    label: 'Set Default',
                    field: 'isDefault',
                    sort: 'disabled',
                }
            ],
            rows: [],
        };

        if (addressData) {
            addressData.forEach((address) => {
                const formattedDate = new Date(address.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });
                data.rows.push({
                    created: formattedDate,
                    postalcode: address.postalcode,
                    address: address.address,
                    cityName: address.cityName,
                    barangayName: address.barangayName,
                    isDefault: (
                        <Button
                            disabled={address.isDefault}
                            onClick={() => updateMyAddressHandler(address._id)}
                            colorScheme="blue"
                            variant={address.isDefault ? "solid" : "outline"}
                        >
                            {address.isDefault ? "Default Address" : "Set Default"}
                        </Button>
                    )
                });
            });
        }
        return data;
    };

    const setFuels = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
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
            ],
            rows: [],
        };

        if (userFuel) {
            userFuel.forEach((row) => {
                const createdAt = new Date(row.date);
                const formattedDateTime = `${createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })}`;

                data.rows.push({
                    id: row._id,
                    odometer: row.odometer,
                    quantity: row.quantity,
                    price: row.price,
                    totalCost: row.totalCost,
                    fillingStation: row.fillingStation,
                    notes: row.notes,
                    date: formattedDateTime,
                });
            });
        }

        return data;
    };

    const setMotors = () => {
        const data = {
            columns: [
                {
                    label: 'Date Registered',
                    field: 'date',
                    sort: 'asc',
                },
                {
                    label: 'Plate Number',
                    field: 'plateNumber',
                    sort: 'asc',
                },
                {
                    label: 'Model',
                    field: 'model',
                    sort: 'disabled',
                },
                {
                    label: 'Year',
                    field: 'year',
                    sort: 'disabled',
                },
                {
                    label: 'Brand',
                    field: 'brand',
                    sort: 'disabled',
                },
                {
                    label: 'Type',
                    field: 'type',
                    sort: 'disabled',
                },
                {
                    label: 'Fuel',
                    field: 'fuel',
                    sort: 'disabled',
                },
                {
                    label: 'Motorcycle',
                    field: 'imageMotorcycle',
                    sort: 'disabled',
                },
            ],
            rows: [],
        };

        if (userMotorcycles) {
            userMotorcycles.forEach((row) => {
                const formattedDate = new Date(row.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                });
                data.rows.push({
                    date: formattedDate,
                    model: row.model,
                    year: row.year,
                    brand: row.brand,
                    plateNumber: row.plateNumber,
                    engineNumber: row.engineNumber,
                    type: row.type,
                    fuel: row.fuel,
                    imageMotorcycle: row.imageMotorcycle ? (
                        <img
                            src={row.imageMotorcycle.url}
                            alt="Motorcycle Image"
                            style={{ width: '100px', height: '100px' }}
                        />
                    ) : (
                        <img
                            src="your_default_image_url"
                            alt="Default Image"
                            style={{ width: '100px', height: '100px' }}
                        />
                    ),
                });
            });
        }

        return data;
    };

    const totalCost = userFuel ? userFuel.reduce((acc, curr) => acc + curr.totalCost, 0) : 0;
    const formattedTotalCostFuel = totalCost.toLocaleString();

    const totalPrice = orders ? orders.reduce((acc, curr) => acc + curr.totalPrice, 0) : 0;
    const formattedTotalCostProduct = totalPrice.toLocaleString();
    return (
        <Fragment>
            {loadingAddresses || loadingMotorcycles || loadingFuel || loadingMyOrders || loadingAllOrders || loadingListOrders ? (
                <Loader />
            ) : (
                <Stack minH="100vh" direction={{ base: "column", md: "row" }} align="stretch">
                    <Flex flexDirection={{ base: "column", md: "row" }} spacing={8}>
                        <Box flex="1" p={4} bg="gray.100" rounded="md" boxShadow="md" mb={{ base: 8, md: 0 }}>
                            <Heading as="h1" fontSize="3xl" fontWeight="bold" textAlign="center" mb={4}>Welcome, {user.firstname}!</Heading>
                            <Flex justify="center" mb={4}>
                                <Avatar src={user.avatar && user.avatar.url} size="xl" />
                            </Flex>
                            <Stack spacing={4} align="center">
                                <Button colorScheme="teal" onClick={UpdateProfileHandler} leftIcon={<EditIcon />} variant="outline">
                                    Edit Profile
                                </Button>
                                <Button colorScheme="teal" onClick={ChangePasswordHandler} variant="outline">
                                    Change Password
                                </Button>
                            </Stack>
                            <Box mt={4}>
                                <Heading as="h2" fontSize="xl" fontWeight="bold" mb={2}>Account Information</Heading>
                                <Text fontSize="lg" fontWeight="bold">First Name:</Text>
                                <Text fontSize="lg">{user.firstname}</Text>
                                <Text fontSize="lg" fontWeight="bold">Last Name:</Text>
                                <Text fontSize="lg">{user.lastname}</Text>
                                <Text fontSize="lg" fontWeight="bold">Email:</Text>
                                <Text fontSize="lg">{user.email}</Text>
                                <Text fontSize="lg" fontWeight="bold">Mobile Number:</Text>
                                <Text fontSize="lg">{user.phone}</Text>
                            </Box>
                            {user.role === "user" && (
                                <>
                                    <Box mt={4} p={4} bg="blue.200" rounded="md" boxShadow="md" display="flex" alignItems="center" borderColor="blue.500" borderWidth="2px">
                                        <FaGasPump style={{ marginRight: '8px', color: 'blue' }} />
                                        <Text fontSize="lg" fontWeight="bold" color="blue.800">Total Fuel Expenses: <strong>₱{formattedTotalCostFuel}</strong></Text>
                                    </Box>
                                    <Box mt={4} p={4} bg="green.200" rounded="md" boxShadow="md" display="flex" alignItems="center" borderColor="green.500" borderWidth="2px">
                                        <RiCurrencyFill style={{ marginRight: '8px', color: 'green' }} />
                                        <Text fontSize="lg" fontWeight="bold" color="green.800">Total Product Expenses: <strong>₱{formattedTotalCostProduct}</strong></Text>
                                    </Box>
                                    <Stack spacing={2} mt={4} align="center">
                                        <Button onClick={handleMotorcycle} colorScheme="red" leftIcon={<FaPlusCircle />}>
                                            Register Motorcycle
                                        </Button>
                                        <Button onClick={handleFuel} colorScheme="red" leftIcon={<FaPlusCircle />}>
                                            Log Fuel
                                        </Button>
                                    </Stack>
                                </>
                            )}
                        </Box>
                    </Flex>
                    {user.role === "user" && (
                        <Box flex="1" p={4} bg="white" rounded="md" boxShadow="md" overflow="auto" maxHeight="99vh">
                            <Stack spacing={4}>
                                <Heading as="h2" fontSize="xl" fontWeight="bold" mb={4}>Additional Information</Heading>
                                <Divider />
                                <Heading>List of addresses</Heading>
                                <MDBDataTable
                                    striped
                                    bordered
                                    noBottomColumns
                                    data={setAddresses()}
                                />
                                <Heading>List of motorcycles</Heading>
                                <MDBDataTable
                                    striped
                                    bordered
                                    noBottomColumns
                                    data={setMotors()}
                                />
                                <Heading>List of fuel log</Heading>
                                <MDBDataTable
                                    striped
                                    bordered
                                    noBottomColumns
                                    data={setFuels()}
                                />
                            </Stack>
                        </Box>
                    )}
                    {user.role === "admin" && (
                        <Box flex="1" p={4} bg="white" rounded="md" boxShadow="md" overflow="auto" maxHeight="99vh">
                            <Stack spacing={4}>
                                <Heading as="h2" fontSize="xl" fontWeight="bold" mb={4}>List of customers order</Heading>
                                <Divider />
                                <MDBDataTable
                                    striped
                                    bordered
                                    noBottomColumns
                                    data={setOrders()}
                                />
                            </Stack>
                        </Box>
                    )}
                    {user.role === "secretary" && (
                        <Box flex="1" p={4} bg="white" rounded="md" boxShadow="md" overflow="auto" maxHeight="99vh">
                            <Stack spacing={4}>
                                <Heading as="h2" fontSize="xl" fontWeight="bold" mb={4}>List of customers order</Heading>
                                <Divider />
                                <MDBDataTable
                                    striped
                                    bordered
                                    noBottomColumns
                                    data={setListOrders()}
                                />
                            </Stack>
                        </Box>
                    )}
                </Stack>
            )}
        </Fragment>
    );
};

export default Profile;
