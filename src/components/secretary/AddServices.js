// import React, { Fragment, useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Loader from '../layout/Loader';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAppointDetails, updateAdditionalServices, clearErrors } from '../../actions/appointmentActions';
// import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';
// import { getAllServices } from '../../actions/serviceActions';
// import { FiSearch } from "react-icons/fi";
// import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, VStack, Image } from '@chakra-ui/react';

// const AddServices = () => {
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
//     const { loading: serviceLoading, services } = useSelector((state) => state.allServices);
//     const { error, isUpdated } = useSelector((state) => state.adminAppointment);

//     const errMsg = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     const successMsg = (message = '') => toast.success(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getAppointDetails(id));
//         dispatch(getAllServices());

//         if (error) {
//             errMsg(error);
//             dispatch(clearErrors());
//         }

//         if (isUpdated) {
//             navigate('/secretary/appointment/list');
//             successMsg('Additional services added successfully!');
//             dispatch({ type: UPDATE_APPOINTMENT_RESET });
//         }
//     }, [dispatch, error, isUpdated, id, navigate]);

//     const calculateTotalPrice = () => {
//         let totalPrice = 0;
//         selectedServices.forEach((serviceId) => {
//             const service = services.find((service) => service._id === serviceId);
//             if (service && !isNaN(service.price)) {
//                 totalPrice += service.price;
//             } else if (service && isNaN(service.price)) {
//                 console.error(`Service price is invalid for service: ${service.name}`);
//             }
//         });
//         return totalPrice;
//     };

//     const handleServiceSelect = (serviceId) => {
//         setSelectedServices(prevSelectedServices => {
//             if (!prevSelectedServices.includes(serviceId)) {
//                 return [...prevSelectedServices, serviceId];
//             }
//             return prevSelectedServices;
//         });
//     };

//     const additionalHandler = () => {
//         if (selectedServices.length === 0) {
//             errMsg("Please select at least one service");
//             return;
//         }

//         const formDataServices = selectedServices.map(serviceId => {
//             const service = services.find(service => service._id === serviceId);
//             return {
//                 serviceId: serviceId,
//                 serviceName: service.name,
//                 servicePrice: service.price,
//             };
//         });

//         const totalPrice = calculateTotalPrice();
//         if (isNaN(totalPrice)) {
//             errMsg("Total price is invalid. Please review your selections.");
//             return;
//         }

//         const formData = {
//             services: formDataServices,
//             totalPrice: totalPrice
//         };

//         dispatch(updateAdditionalServices(id, formData));
//     };

//     const filteredServices = services.filter(service =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Fragment>
//             <div className="row">
//                 <div className="col-12 col-md-10">
//                     <Fragment>
//                         {(appointmentLoading || serviceLoading) ? <Loader /> : (
//                             <div className="row d-flex justify-content-around">
//                                 <div className="col-12 col-lg-7 order-details">
//                                     <h2 className="my-5">Appointment # {booking._id}</h2>
//                                     <h4 className="my-4">Order Items:</h4>
//                                     <div className="space-y-3">
//                                         {booking &&
//                                             booking.appointmentServices &&
//                                             booking.appointmentServices.map((item) => (
//                                                 <div key={item._id} className="flex flex-row justify-between items-start">
//                                                     <div>
//                                                         {item.service && item.service.images && (
//                                                             <img
//                                                                 src={item.service.images[0].url}
//                                                                 alt={item.service.name}
//                                                                 height="45"
//                                                                 width="65"
//                                                             />
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && (
//                                                             <Link to={`/showSingleService/${item.service._id}`}>
//                                                                 {item.service.name}
//                                                             </Link>
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && item.service.price && (
//                                                             <p>${item.service.price}</p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                     <div>
//                                         <h4 className="my-4">Select Additional:</h4>

//                                         <Stack spacing={4}>
//                                             <InputGroup>
//                                                 <InputLeftElement pointerEvents="none">
//                                                     <FiSearch />
//                                                 </InputLeftElement>
//                                                 <Input
//                                                     placeholder="Search services..."
//                                                     value={searchTerm}
//                                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                                 />
//                                             </InputGroup>
//                                             <VStack align="start" spacing={2}>
//                                                 {searchTerm && filteredServices.length === 0 && (
//                                                     <Text>No services found</Text>
//                                                 )}
//                                                 {searchTerm && filteredServices.map((service) => (
//                                                     <Box
//                                                         key={service._id}
//                                                         borderWidth="1px"
//                                                         borderRadius="md"
//                                                         p={2}
//                                                         cursor="pointer"
//                                                         onClick={() => handleServiceSelect(service._id)}
//                                                         w="100%"
//                                                     >
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={2}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="40px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="md" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="sm" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                         </Flex>
//                                                     </Box>
//                                                 ))}
//                                             </VStack>
//                                             {selectedServices.map((serviceId, index) => {
//                                                 const service = services.find(service => service._id === serviceId);
//                                                 return (
//                                                     <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={4}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="50px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="xl" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="md" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                         </Flex>
//                                                     </Box>
//                                                 );
//                                             })}
//                                         </Stack>
//                                     </div>
//                                     <div className="border-b border-zinc-200 mt-4" />
//                                     <Flex justify="space-between" align="center">
//                                         <Box>
//                                             <Text fontSize="lg" fontWeight="bold">Total Price:</Text>
//                                             <Text fontSize="lg">${calculateTotalPrice()}</Text>
//                                         </Box>
//                                         <Button colorScheme="blue" onClick={additionalHandler}>Add</Button>
//                                     </Flex>
//                                 </div>
//                             </div>
//                         )}
//                     </Fragment>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// export default AddServices;


// import React, { Fragment, useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Loader from '../layout/Loader';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAppointDetails, updateAdditionalServices, clearErrors } from '../../actions/appointmentActions';
// import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';
// import { getAllServices } from '../../actions/serviceActions';
// import { FiSearch } from "react-icons/fi";
// import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, VStack, Image, IconButton } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';

// const AddServices = () => {
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
//     const { loading: serviceLoading, services } = useSelector((state) => state.allServices);
//     const { error, isUpdated } = useSelector((state) => state.adminAppointment);

//     const errMsg = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     const successMsg = (message = '') => toast.success(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getAppointDetails(id));
//         dispatch(getAllServices());

//         if (error) {
//             errMsg(error);
//             dispatch(clearErrors());
//         }

//         if (isUpdated) {
//             navigate('/secretary/appointment/list');
//             successMsg('Additional services updated successfully!');
//             dispatch({ type: UPDATE_APPOINTMENT_RESET });
//         }
//     }, [dispatch, error, isUpdated, id, navigate]);

//     const calculateTotalPrice = () => {
//         let totalPrice = 0;
//         selectedServices.forEach((serviceId) => {
//             const service = services.find((service) => service._id === serviceId);
//             if (service && !isNaN(service.price)) {
//                 totalPrice += service.price;
//             } else if (service && isNaN(service.price)) {
//                 console.error(`Service price is invalid for service: ${service.name}`);
//             }
//         });
//         return totalPrice;
//     };

//     const handleServiceSelect = (serviceId) => {
//         setSelectedServices(prevSelectedServices => {
//             if (!prevSelectedServices.includes(serviceId)) {
//                 return [...prevSelectedServices, serviceId];
//             }
//             return prevSelectedServices;
//         });
//     };

//     const handleServiceRemove = (serviceId) => {
//         setSelectedServices(prevSelectedServices =>
//             prevSelectedServices.filter(id => id !== serviceId)
//         );
//     };

//     const additionalHandler = () => {
//         if (selectedServices.length === 0) {
//             errMsg("Please select at least one service");
//             return;
//         }

//         const formDataServices = selectedServices.map(serviceId => {
//             const service = services.find(service => service._id === serviceId);
//             return {
//                 serviceId: serviceId,
//                 serviceName: service.name,
//                 servicePrice: service.price,
//             };
//         });

//         const totalPrice = calculateTotalPrice();
//         if (isNaN(totalPrice)) {
//             errMsg("Total price is invalid. Please review your selections.");
//             return;
//         }

//         const formData = {
//             services: formDataServices,
//             totalPrice: totalPrice
//         };

//         dispatch(updateAdditionalServices(id, formData));
//     };

//     const filteredServices = services.filter(service =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Fragment>
//             <div className="row">
//                 <div className="col-12 col-md-10">
//                     <Fragment>
//                         {(appointmentLoading || serviceLoading) ? <Loader /> : (
//                             <div className="row d-flex justify-content-around">
//                                 <div className="col-12 col-lg-7 order-details">
//                                     <h2 className="my-5">Appointment # {booking._id}</h2>
//                                     <h4 className="my-4">Order Items:</h4>
//                                     <div className="space-y-3">
//                                         {booking &&
//                                             booking.appointmentServices &&
//                                             booking.appointmentServices.map((item) => (
//                                                 <div key={item._id} className="flex flex-row justify-between items-start">
//                                                     <div>
//                                                         {item.service && item.service.images && (
//                                                             <img
//                                                                 src={item.service.images[0].url}
//                                                                 alt={item.service.name}
//                                                                 height="45"
//                                                                 width="65"
//                                                             />
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && (
//                                                             <Link to={`/showSingleService/${item.service._id}`}>
//                                                                 {item.service.name}
//                                                             </Link>
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && item.service.price && (
//                                                             <p>${item.service.price}</p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                     <div>
//                                         <h4 className="my-4">Select Additional:</h4>

//                                         <Stack spacing={4}>
//                                             <InputGroup>
//                                                 <InputLeftElement pointerEvents="none">
//                                                     <FiSearch />
//                                                 </InputLeftElement>
//                                                 <Input
//                                                     placeholder="Search services..."
//                                                     value={searchTerm}
//                                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                                 />
//                                             </InputGroup>
//                                             <VStack align="start" spacing={2}>
//                                                 {searchTerm && filteredServices.length === 0 && (
//                                                     <Text>No services found</Text>
//                                                 )}
//                                                 {searchTerm && filteredServices.map((service) => (
//                                                     <Box
//                                                         key={service._id}
//                                                         borderWidth="1px"
//                                                         borderRadius="md"
//                                                         p={2}
//                                                         cursor="pointer"
//                                                         onClick={() => handleServiceSelect(service._id)}
//                                                         w="100%"
//                                                     >
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={2}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="40px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="md" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="sm" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                         </Flex>
//                                                     </Box>
//                                                 ))}
//                                             </VStack>
//                                             {selectedServices.map((serviceId, index) => {
//                                                 const service = services.find(service => service._id === serviceId);
//                                                 return (
//                                                     <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={4}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="50px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="xl" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="md" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                             <IconButton
//                                                                 icon={<CloseIcon />}
//                                                                 colorScheme="red"
//                                                                 variant="ghost"
//                                                                 onClick={() => handleServiceRemove(serviceId)}
//                                                             />
//                                                         </Flex>
//                                                     </Box>
//                                                 );
//                                             })}
//                                         </Stack>
//                                     </div>
//                                     <div className="border-b border-zinc-200 mt-4" />
//                                     <Flex justify="space-between" align="center">
//                                         <Box>
//                                             <Text fontSize="lg" fontWeight="bold">Total Price:</Text>
//                                             <Text fontSize="lg">${calculateTotalPrice()}</Text>
//                                         </Box>
//                                         <Button colorScheme="blue" onClick={additionalHandler}>Update</Button>
//                                     </Flex>
//                                 </div>
//                             </div>
//                         )}
//                     </Fragment>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// export default AddServices;

//** working pero walang delete */
// import React, { Fragment, useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Loader from '../layout/Loader';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAppointDetails, updateAdditionalServices, deleteAddedServices, clearErrors } from '../../actions/appointmentActions';
// import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';
// import { getAllServices } from '../../actions/serviceActions';
// import { FiSearch } from "react-icons/fi";
// import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, VStack, Image, IconButton } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';

// const AddServices = () => {
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
//     const { loading: serviceLoading, services } = useSelector((state) => state.allServices);
//     const { error, isUpdated } = useSelector((state) => state.adminAppointment);

//     const errMsg = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     const successMsg = (message = '') => toast.success(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getAppointDetails(id));
//         dispatch(getAllServices());

//         if (error) {
//             errMsg(error);
//             dispatch(clearErrors());
//         }

//         if (isUpdated) {
//             navigate('/secretary/appointment/list');
//             successMsg('Additional services updated successfully!');
//             dispatch({ type: UPDATE_APPOINTMENT_RESET });
//         }
//     }, [dispatch, error, isUpdated, id, navigate]);

//     const calculateTotalPrice = () => {
//         let totalPrice = 0;
//         selectedServices.forEach((serviceId) => {
//             const service = services.find((service) => service._id === serviceId);
//             if (service && !isNaN(service.price)) {
//                 totalPrice += service.price;
//             } else if (service && isNaN(service.price)) {
//                 console.error(`Service price is invalid for service: ${service.name}`);
//             }
//         });
//         return totalPrice;
//     };

//     const handleServiceSelect = (serviceId) => {
//         setSelectedServices(prevSelectedServices => {
//             if (!prevSelectedServices.includes(serviceId)) {
//                 return [...prevSelectedServices, serviceId];
//             }
//             return prevSelectedServices;
//         });
//     };

//     const handleServiceRemove = (serviceId) => {
//         // Remove serviceId from selectedServices state
//         setSelectedServices(prevSelectedServices =>
//             prevSelectedServices.filter(id => id !== serviceId)
//         );

//         // Dispatch action to remove service from appointmentServices
//         dispatch(deleteAddedServices(booking._id, serviceId));
//     };

//     const additionalHandler = () => {
//         if (selectedServices.length === 0) {
//             errMsg("Please select at least one service");
//             return;
//         }

//         const formDataServices = selectedServices.map(serviceId => {
//             const service = services.find(service => service._id === serviceId);
//             return {
//                 serviceId: serviceId,
//                 serviceName: service.name,
//                 servicePrice: service.price,
//             };
//         });

//         const totalPrice = calculateTotalPrice();
//         if (isNaN(totalPrice)) {
//             errMsg("Total price is invalid. Please review your selections.");
//             return;
//         }

//         const formData = {
//             services: formDataServices,
//             totalPrice: totalPrice
//         };

//         dispatch(updateAdditionalServices(id, formData));
//     };

//     const filteredServices = services.filter(service =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Fragment>
//             <div className="row">
//                 <div className="col-12 col-md-10">
//                     <Fragment>
//                         {(appointmentLoading || serviceLoading) ? <Loader /> : (
//                             <div className="row d-flex justify-content-around">
//                                 <div className="col-12 col-lg-7 order-details">
//                                     <h2 className="my-5">Appointment # {booking._id}</h2>
//                                     <h4 className="my-4">Order Items:</h4>
//                                     <div className="space-y-3">
//                                         {booking &&
//                                             booking.appointmentServices &&
//                                             booking.appointmentServices.map((item) => (
//                                                 <div key={item._id} className="flex flex-row justify-between items-start">
//                                                     <div>
//                                                         {item.service && item.service.images && (
//                                                             <img
//                                                                 src={item.service.images[0].url}
//                                                                 alt={item.service.name}
//                                                                 height="45"
//                                                                 width="65"
//                                                             />
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && (
//                                                             <Link to={`/showSingleService/${item.service._id}`}>
//                                                                 {item.service.name}
//                                                             </Link>
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && item.service.price && (
//                                                             <p>${item.service.price}</p>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                     <div>
//                                         <h4 className="my-4">Select Additional:</h4>

//                                         <Stack spacing={4}>
//                                             <InputGroup>
//                                                 <InputLeftElement pointerEvents="none">
//                                                     <FiSearch />
//                                                 </InputLeftElement>
//                                                 <Input
//                                                     placeholder="Search services..."
//                                                     value={searchTerm}
//                                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                                 />
//                                             </InputGroup>
//                                             <VStack align="start" spacing={2}>
//                                                 {searchTerm && filteredServices.length === 0 && (
//                                                     <Text>No services found</Text>
//                                                 )}
//                                                 {searchTerm && filteredServices.map((service) => (
//                                                     <Box
//                                                         key={service._id}
//                                                         borderWidth="1px"
//                                                         borderRadius="md"
//                                                         p={2}
//                                                         cursor="pointer"
//                                                         onClick={() => handleServiceSelect(service._id)}
//                                                         w="100%"
//                                                     >
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={2}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="40px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="md" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="sm" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                         </Flex>
//                                                     </Box>
//                                                 ))}
//                                             </VStack>
//                                             {selectedServices.map((serviceId, index) => {
//                                                 const service = services.find(service => service._id === serviceId);
//                                                 return (
//                                                     <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
//                                                         <Flex justify="space-between" align="center">
//                                                             <HStack spacing={4}>
//                                                                 {service.images.length > 0 && (
//                                                                     <Image
//                                                                         src={service.images[0].url}
//                                                                         alt={service.name}
//                                                                         boxSize="50px"
//                                                                         objectFit="cover"
//                                                                     />
//                                                                 )}
//                                                                 <VStack align="start">
//                                                                     <Text fontSize="xl" fontWeight="bold">
//                                                                         {service.name}
//                                                                     </Text>
//                                                                     <Text fontSize="md" color="gray.500">
//                                                                         ${service.price}
//                                                                     </Text>
//                                                                 </VStack>
//                                                             </HStack>
//                                                             <IconButton
//                                                                 icon={<CloseIcon />}
//                                                                 colorScheme="red"
//                                                                 variant="ghost"
//                                                                 onClick={() => handleServiceRemove(serviceId)}
//                                                             />
//                                                         </Flex>
//                                                     </Box>
//                                                 );
//                                             })}
//                                         </Stack>
//                                     </div>
//                                     <div className="border-b border-zinc-200 mt-4" />
//                                     <Flex justify="space-between" align="center">
//                                         <Box>
//                                             <Text fontSize="lg" fontWeight="bold">Total Price:</Text>
//                                             <Text fontSize="lg">${calculateTotalPrice()}</Text>
//                                         </Box>
//                                         <Button colorScheme="blue" onClick={additionalHandler}>Update</Button>
//                                     </Flex>
//                                 </div>
//                             </div>
//                         )}
//                     </Fragment>
//                 </div>
//             </div>
//         </Fragment>
//     );
// }

// export default AddServices;

//** working naman pero panget yung delete */
import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointDetails, updateAdditionalServices, deleteAddedServices, clearErrors } from '../../actions/appointmentActions'; // Update import
import { UPDATE_APPOINTMENT_RESET, DELETE_APPOINTMENT_RESET, } from '../../constants/appointmentConstants';
import { getAllServices } from '../../actions/serviceActions';
import { FiSearch } from "react-icons/fi";
import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, VStack, Image, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const AddServices = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
    const { loading: serviceLoading, services } = useSelector((state) => state.allServices);
    const { error, isUpdated } = useSelector((state) => state.adminAppointment);

    const errMsg = (message = '') => toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const successMsg = (message = '') => toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    useEffect(() => {
        dispatch(getAppointDetails(id));
        dispatch(getAllServices());

        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            navigate('/secretary/appointment/list');
            successMsg('Additional services updated successfully!');
            dispatch({ type: UPDATE_APPOINTMENT_RESET });
        }
    }, [dispatch, error, isUpdated, id, navigate]);

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        selectedServices.forEach((serviceId) => {
            const service = services.find((service) => service._id === serviceId);
            if (service && !isNaN(service.price)) {
                totalPrice += service.price;
            } else if (service && isNaN(service.price)) {
                console.error(`Service price is invalid for service: ${service.name}`);
            }
        });
        return totalPrice;
    };

    const handleServiceSelect = (serviceId) => {
        setSelectedServices(prevSelectedServices => {
            if (!prevSelectedServices.includes(serviceId)) {
                return [...prevSelectedServices, serviceId];
            }
            return prevSelectedServices;
        });
    };

    const handleServiceRemove = (serviceId) => {
        // Find the appointment service that corresponds to serviceId
        const appointmentService = booking.appointmentServices.find(item => item.service._id === serviceId);

        if (!appointmentService) {
            errMsg("Appointment service not found");
            return;
        }

        // Extract the _id of the appointmentService
        const appointmentServiceId = appointmentService._id;

        // Remove serviceId from selectedServices state
        setSelectedServices(prevSelectedServices =>
            prevSelectedServices.filter(id => id !== serviceId)
        );

        // Dispatch action to remove service from appointmentServices
        dispatch(deleteAddedServices(id, appointmentServiceId));
        dispatch(getAppointDetails(id));
        dispatch({ type: DELETE_APPOINTMENT_RESET });
    };

    const additionalHandler = () => {
        if (selectedServices.length === 0) {
            errMsg("Please select at least one service");
            return;
        }

        const formDataServices = selectedServices.map(serviceId => {
            const service = services.find(service => service._id === serviceId);
            return {
                serviceId: serviceId,
                serviceName: service.name,
                servicePrice: service.price,
            };
        });

        const totalPrice = calculateTotalPrice();
        if (isNaN(totalPrice)) {
            errMsg("Total price is invalid. Please review your selections.");
            return;
        }

        const formData = {
            services: formDataServices,
            totalPrice: totalPrice
        };

        dispatch(updateAdditionalServices(id, formData));
    };

    const filteredServices = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        {(appointmentLoading || serviceLoading) ? <Loader /> : (
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
                                                    <div>
                                                        <IconButton
                                                            icon={<CloseIcon />}
                                                            colorScheme="red"
                                                            variant="ghost"
                                                            onClick={() => handleServiceRemove(item.service._id)}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div>
                                        <h4 className="my-4">Select Additional:</h4>

                                        <Stack spacing={4}>
                                            <InputGroup>
                                                <InputLeftElement pointerEvents="none">
                                                    <FiSearch />
                                                </InputLeftElement>
                                                <Input
                                                    placeholder="Search services..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </InputGroup>
                                            <VStack align="start" spacing={2}>
                                                {searchTerm && filteredServices.length === 0 && (
                                                    <Text>No services found</Text>
                                                )}
                                                {searchTerm && filteredServices.map((service) => (
                                                    <Box
                                                        key={service._id}
                                                        borderWidth="1px"
                                                        borderRadius="md"
                                                        p={2}
                                                        cursor="pointer"
                                                        onClick={() => handleServiceSelect(service._id)}
                                                        w="100%"
                                                    >
                                                        <Flex justify="space-between" align="center">
                                                            <HStack spacing={2}>
                                                                {service.images.length > 0 && (
                                                                    <Image
                                                                        src={service.images[0].url}
                                                                        alt={service.name}
                                                                        boxSize="40px"
                                                                        objectFit="cover"
                                                                    />
                                                                )}
                                                                <VStack align="start">
                                                                    <Text fontSize="md" fontWeight="bold">
                                                                        {service.name}
                                                                    </Text>
                                                                    <Text fontSize="sm" color="gray.500">
                                                                        ${service.price}
                                                                    </Text>
                                                                </VStack>
                                                            </HStack>
                                                        </Flex>
                                                    </Box>
                                                ))}
                                            </VStack>
                                            {selectedServices.map((serviceId, index) => {
                                                const service = services.find(service => service._id === serviceId);
                                                return (
                                                    <Box key={index} borderWidth="1px" borderRadius="lg" p={4}>
                                                        <Flex justify="space-between" align="center">
                                                            <HStack spacing={4}>
                                                                {service.images.length > 0 && (
                                                                    <Image
                                                                        src={service.images[0].url}
                                                                        alt={service.name}
                                                                        boxSize="50px"
                                                                        objectFit="cover"
                                                                    />
                                                                )}
                                                                <VStack align="start">
                                                                    <Text fontSize="xl" fontWeight="bold">
                                                                        {service.name}
                                                                    </Text>
                                                                    <Text fontSize="md" color="gray.500">
                                                                        ${service.price}
                                                                    </Text>
                                                                </VStack>
                                                            </HStack>
                                                            {/* <IconButton
                                                                icon={<CloseIcon />}
                                                                colorScheme="red"
                                                                variant="ghost"
                                                                onClick={() => handleServiceRemove(serviceId)}
                                                            /> */}
                                                        </Flex>
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    </div>
                                    <div className="border-b border-zinc-200 mt-4" />
                                    <Flex justify="space-between" align="center">
                                        <Box>
                                            <Text fontSize="lg" fontWeight="bold">Total Price:</Text>
                                            <Text fontSize="lg">${calculateTotalPrice()}</Text>
                                        </Box>
                                        <Button colorScheme="blue" onClick={additionalHandler}>Update</Button>
                                    </Flex>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
}

export default AddServices;

//** working with delete july 2*/
// import React, { Fragment, useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import Loader from '../layout/Loader';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAppointDetails, updateAdditionalServices, deleteAddedServices, clearErrors } from '../../actions/appointmentActions';
// import { UPDATE_APPOINTMENT_RESET } from '../../constants/appointmentConstants';
// import { getAllServices } from '../../actions/serviceActions';
// import { FiSearch } from "react-icons/fi";
// import { Flex, Button, Input, HStack, Stack, Box, Text, InputGroup, InputLeftElement, VStack, Image, IconButton } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';

// const AddServices = () => {
//     const [selectedServices, setSelectedServices] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const dispatch = useDispatch();
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { loading: appointmentLoading, booking = {} } = useSelector((state) => state.appointmentDetails);
//     const { loading: serviceLoading, services } = useSelector((state) => state.allServices);
//     const { error, isUpdated } = useSelector((state) => state.adminAppointment);

//     const errMsg = (message = '') => toast.error(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     const successMsg = (message = '') => toast.success(message, {
//         position: toast.POSITION.BOTTOM_CENTER
//     });

//     useEffect(() => {
//         dispatch(getAppointDetails(id));
//         dispatch(getAllServices());

//         if (error) {
//             errMsg(error);
//             dispatch(clearErrors());
//         }

//         if (isUpdated) {
//             navigate('/secretary/appointment/list');
//             successMsg('Additional services updated successfully!');
//             dispatch({ type: UPDATE_APPOINTMENT_RESET });
//         }
//     }, [dispatch, error, isUpdated, id, navigate]);

//     const calculateTotalPrice = () => {
//         let totalPrice = 0;
//         selectedServices.forEach((serviceId) => {
//             const service = services.find((service) => service._id === serviceId);
//             if (service && !isNaN(service.price)) {
//                 totalPrice += service.price;
//             } else if (service && isNaN(service.price)) {
//                 console.error(`Service price is invalid for service: ${service.name}`);
//             }
//         });
//         return totalPrice;
//     };

//     const handleServiceSelect = (serviceId) => {
//         setSelectedServices(prevSelectedServices => {
//             if (!prevSelectedServices.includes(serviceId)) {
//                 return [...prevSelectedServices, serviceId];
//             }
//             return prevSelectedServices;
//         });
//     };

//     const handleServiceRemove = (serviceId) => {
//         const appointmentService = booking.appointmentServices.find(item => item.service._id === serviceId);

//         if (!appointmentService) {
//             errMsg("Appointment service not found");
//             return;
//         }

//         const appointmentServiceId = appointmentService._id;

//         setSelectedServices(prevSelectedServices =>
//             prevSelectedServices.filter(id => id !== serviceId)
//         );

//         dispatch(deleteAddedServices(id, appointmentServiceId));
//     };

//     const additionalHandler = () => {
//         if (selectedServices.length === 0) {
//             errMsg("Please select at least one service");
//             return;
//         }

//         const formDataServices = selectedServices.map(serviceId => {
//             const service = services.find(service => service._id === serviceId);
//             return {
//                 serviceId: serviceId,
//                 serviceName: service.name,
//                 servicePrice: service.price,
//             };
//         });

//         const totalPrice = calculateTotalPrice();
//         if (isNaN(totalPrice)) {
//             errMsg("Total price is invalid. Please review your selections.");
//             return;
//         }

//         const formData = {
//             services: formDataServices,
//             totalPrice: totalPrice
//         };

//         dispatch(updateAdditionalServices(id, formData));
//     };

//     const filteredServices = services.filter(service =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <Fragment>
//             <div className="row">
//                 <div className="col-12 col-md-10">
//                     <Fragment>
//                         {(appointmentLoading || serviceLoading) ? <Loader /> : (
//                             <div className="row d-flex justify-content-around">
//                                 <div className="col-12 col-lg-7 order-details">
//                                     <h2 className="my-5">Appointment # {booking._id}</h2>
//                                     <h4 className="my-4">Order Itemssssssssssss:</h4>
//                                     <div className="space-y-3">
//                                         {booking &&
//                                             booking.appointmentServices &&
//                                             booking.appointmentServices.map((item) => (
//                                                 <div key={item._id} className="flex flex-row justify-between items-start">
//                                                     <div>
//                                                         {item.service && item.service.images && (
//                                                             <img
//                                                                 src={item.service.images[0].url}
//                                                                 alt={item.service.name}
//                                                                 height="45"
//                                                                 width="65"
//                                                             />
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         {item.service && (
//                                                             <Link to={`/showSingleService/${item.service._id}`}>
//                                                                 {item.service.name}
//                                                             </Link>
//                                                         )}
//                                                     </div>
//                                                     <div>
//                                                         <p>${item.service && item.service.price}</p>
//                                                     </div>
//                                                     <div>
//                                                         <IconButton
//                                                             size="sm"
//                                                             colorScheme="red"
//                                                             aria-label="Remove service"
//                                                             icon={<CloseIcon />}
//                                                             onClick={() => handleServiceRemove(item.service._id)}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </Fragment>
//                 </div>
//             </div>
//         </Fragment>
//     );
// };

// export default AddServices;
