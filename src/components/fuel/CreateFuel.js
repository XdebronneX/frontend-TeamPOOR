// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { createFuel, clearErrors } from "../../actions/fuelActions";
// import { CREATE_FUEL_RESET } from "../../constants/fuelConstants";
// import { toast } from "react-toastify";
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     Text,
//     VStack,
//     Flex,
//     Heading,
// } from "@chakra-ui/react";

// const CreateFuel = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [price, setPrice] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [totalCost, setTotalCost] = useState("");
//     const { createdFuel, error, loading } = useSelector((state) => state.newFuel);
//     const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });

//     const handleSuccess = (message = "") =>
//         toast.success(message, {
//             position: toast.POSITION.BOTTOM_CENTER,
//         });

//     const handleError = (error = "") =>
//         toast.error(error, {
//             position: toast.POSITION.BOTTOM_CENTER,
//         });

//     useEffect(() => {
//         if (error) {
//             handleError(error);
//             dispatch(clearErrors());
//         }
//         if (createdFuel) {
//             handleSuccess("Created Successfully!");
//             navigate("/profile", { replace: true });
//             dispatch({ type: CREATE_FUEL_RESET });
//         }
//     }, [dispatch, createdFuel, error, navigate]);

//     const handleChangePrice = (e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) {
//             setPrice(inputValue);
//             handleCalculation(inputValue, totalCost);
//         }
//     };

//     const handleChangeQuantity = (e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) {
//             setQuantity(inputValue);
//             if (!isNaN(price) && price !== 0) {
//                 setTotalCost((parseFloat(inputValue) * parseFloat(price)).toFixed(2));
//             }
//         }
//     };

//     const handleChangeTotalCost = (e) => {
//         const inputValue = e.target.value;
//         if (!isNaN(inputValue)) {
//             setTotalCost(inputValue);
//             handleCalculation(price, inputValue);
//         }
//     };

//     const handleCalculation = (newPrice, newTotalCost, newQuantity) => {
//         const p = parseFloat(newPrice);
//         const cost = parseFloat(newTotalCost);
//         const qty = parseFloat(newQuantity);

//         if (!isNaN(p) && !isNaN(cost) && cost !== 0) {
//             setQuantity((cost / p).toFixed(2));
//         } else if (!isNaN(p) && !isNaN(qty) && qty !== 0) {
//             setTotalCost((p * qty).toFixed(2));
//         } else if (!isNaN(cost) && !isNaN(qty) && qty !== 0) {
//             setPrice((cost / qty).toFixed(2));
//         }
//     };

//     const submitHandler = (data) => {
//         const formData = new FormData();
//         formData.set("date", data.date);
//         formData.set("odometer", data.odometer);
//         formData.set("price", data.price);
//         formData.set("quantity", data.quantity);
//         formData.set("totalCost", totalCost);
//         formData.set("fillingStation", data.fillingStation);
//         formData.set("notes", data.notes);
//         dispatch(createFuel(formData));
//     };

//     return (
//         <Flex justify="center" align="center" h="100vh">
//             <Box w="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
//                 <Heading mb={4}>Create Fuel Entry</Heading>
//                 <form onSubmit={handleSubmit(submitHandler)}>
//                     <VStack spacing={4}>
//                         <FormControl id="date" isInvalid={errors.date}>
//                             <FormLabel>Date</FormLabel>
//                             <Input type="date" {...register("date", { required: "Date is required" })} />
//                             <Text color="red">{errors.date && errors.date.message}</Text>
//                         </FormControl>
//                         <FormControl id="odometer" isInvalid={errors.odometer}>
//                             <FormLabel>Odometer Reading</FormLabel>
//                             <Input type="number" {...register("odometer", { required: "Odometer reading is required" })} />
//                             <Text color="red">{errors.odometer && errors.odometer.message}</Text>
//                         </FormControl>
//                         <FormControl id="price" isInvalid={errors.price}>
//                             <FormLabel>Price per Liter</FormLabel>
//                             <Input
//                                 type="number"
//                                 {...register("price", { required: "Price is required" })}
//                                 onChange={handleChangePrice}
//                                 value={price}
//                             />
//                             <Text color="red">{errors.price && errors.price.message}</Text>
//                         </FormControl>

//                         <FormControl id="quantity" isInvalid={errors.quantity}>
//                             <FormLabel>Quantity(Per Liter/s)</FormLabel>
//                             <Input
//                                 type="number"
//                                 {...register("quantity", { required: "Quantity is required" })}
//                                 onChange={handleChangeQuantity}
//                                 value={quantity}
//                             />
//                             <Text color="red">{errors.quantity && errors.quantity.message}</Text>
//                         </FormControl>

//                         <FormControl id="totalCost" isInvalid={errors.totalCost}>
//                             <FormLabel>Total Cost</FormLabel>
//                             <Input
//                                 type="number"
//                                 {...register("totalCost", { required: "Total Cost is required" })}
//                                 onChange={handleChangeTotalCost}
//                                 value={totalCost}
//                             />
//                             <Text color="red">{errors.totalCost && errors.totalCost.message}</Text>
//                         </FormControl>

//                         <FormControl id="fillingStation" isInvalid={errors.fillingStation}>
//                             <FormLabel>Filling Station</FormLabel>
//                             <Input type="text" {...register("fillingStation", { required: "Filling Station is required" })} />
//                             <Text color="red">{errors.fillingStation && errors.fillingStation.message}</Text>
//                         </FormControl>
//                         <FormControl id="notes" isInvalid={errors.notes}>
//                             <FormLabel>Notes</FormLabel>
//                             <Input type="text" {...register("notes", { required: "Notes is required" })} />
//                             <Text color="red">{errors.notes && errors.notes.message}</Text>
//                         </FormControl>
//                         <div style={{ display: 'flex', gap: '10px' }}>
//                             <Button
//                                 type="submit"
//                                 colorScheme="blue"
//                                 isLoading={loading}
//                                 loadingText="Submitting"
//                             >
//                                 Submit
//                             </Button>

//                             <Button
//                                 type="button"
//                                 onClick={() => navigate("/profile", { replace: true })}
//                                 colorScheme="red"
//                                 variant="outline"
//                             >
//                                 Cancel
//                             </Button>
//                         </div>

//                     </VStack>
//                 </form>
//             </Box>
//         </Flex>
//     );
// };

// export default CreateFuel;

//** Original code */
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { createFuel, clearErrors } from "../../actions/fuelActions";
// import { CREATE_FUEL_RESET } from "../../constants/fuelConstants";
// import { toast } from "react-toastify";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Text,
//   VStack,
//   Flex,
//   Heading,
//   Select,
// } from "@chakra-ui/react";
// import { myMotorcycle } from "../../actions/motorcycleActions";

// const CreateFuel = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [totalCost, setTotalCost] = useState("");
//   const { createdFuel, error, loading } = useSelector((state) => state.newFuel);
//   const { userMotorcycles } = useSelector((state) => state.myMotor);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//   } = useForm({ mode: "all" });

//   const handleSuccess = (message = "") =>
//     toast.success(message, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });

//   const handleError = (error = "") =>
//     toast.error(error, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });

//   useEffect(() => {
//     dispatch(myMotorcycle()); // Fetch user's motorcycles here
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       handleError(error);
//       dispatch(clearErrors());
//     }
//     if (createdFuel) {
//       handleSuccess("Created Successfully!");
//       navigate("/profile", { replace: true });
//       dispatch({ type: CREATE_FUEL_RESET });
//     }
//   }, [dispatch, createdFuel, error, navigate]);

// const handleChangePrice = (e) => {
//   const inputValue = e.target.value;
//   if (!isNaN(inputValue)) {
//     setPrice(inputValue);
//     handleCalculation(inputValue, totalCost);
//   }
// };

// const handleChangeQuantity = (e) => {
//   const inputValue = e.target.value;
//   if (!isNaN(inputValue)) {
//     setQuantity(inputValue);
//     if (!isNaN(price) && price !== 0) {
//       setTotalCost((parseFloat(inputValue) * parseFloat(price)).toFixed(2));
//     }
//   }
// };

// const handleChangeTotalCost = (e) => {
//   const inputValue = e.target.value;
//   if (!isNaN(inputValue)) {
//     setTotalCost(inputValue);
//     handleCalculation(price, inputValue);
//   }
// };

// const handleCalculation = (newPrice, newTotalCost, newQuantity) => {
//   const p = parseFloat(newPrice);
//   const cost = parseFloat(newTotalCost);
//   const qty = parseFloat(newQuantity);

//   if (!isNaN(p) && !isNaN(cost) && cost !== 0) {
//     setQuantity((cost / p).toFixed(2));
//   } else if (!isNaN(p) && !isNaN(qty) && qty !== 0) {
//     setTotalCost((p * qty).toFixed(2));
//   } else if (!isNaN(cost) && !isNaN(qty) && qty !== 0) {
//     setPrice((cost / qty).toFixed(2));
//   }
// };

//   const submitHandler = (data) => {
//     const formData = new FormData();
//     formData.set("date", data.date);
//     formData.set("odometer", data.odometer);
//     formData.set("price", data.price);
//     formData.set("quantity", data.quantity);
//     formData.set("totalCost", totalCost);
//     formData.set("fillingStation", data.fillingStation);
//     formData.set("notes", data.notes);
//     formData.set("motorcycle", data.motorcycle);
//     dispatch(createFuel(formData));
//   };

//   return (
//     <div className="bg-zinc-100 min-h-screen py-5">
//       <Flex justify="center" align="center">
//         <Box w="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" className="bg-white">
//           <Heading mb={4}>Create Fuel Entry</Heading>
//           <form onSubmit={handleSubmit(submitHandler)}>
//             <VStack spacing={4}>
//               <FormControl id="date" isInvalid={errors.date}>
//                 <FormLabel>Date</FormLabel>
//                 <Input
//                   type="date"
//                   {...register("date", { required: "Date is required" })}
//                 />
//                 <Text color="red">{errors.date && errors.date.message}</Text>
//               </FormControl>
//               <FormControl id="odometer" isInvalid={errors.odometer}>
//                 <FormLabel>Odometer Reading</FormLabel>
//                 <Input
//                   type="number"
//                   placeholder="Enter odometer"
//                   {...register("odometer", {
//                     required: "Odometer reading is required",
//                   })}
//                 />
//                 <Text color="red">
//                   {errors.odometer && errors.odometer.message}
//                 </Text>
//               </FormControl>
//               <FormControl id="price" isInvalid={errors.price}>
//                 <FormLabel>Price per Liter</FormLabel>
//                 <Input
//                   type="number"
//                   {...register("price", { required: "Price is required" })}
//                   onChange={handleChangePrice}
//                   value={price}
//                   placeholder="Enter price"
//                 />
//                 <Text color="red">{errors.price && errors.price.message}</Text>
//               </FormControl>

//               <FormControl id="quantity" isInvalid={errors.quantity}>
//                 <FormLabel>Quantity(Per Liter/s)</FormLabel>
//                 <Input
//                   type="number"
//                   {...register("quantity", {
//                     required: "Quantity is required",
//                   })}
//                   onChange={handleChangeQuantity}
//                   value={quantity}
//                   placeholder="Enter quantity"
//                 />
//                 <Text color="red">
//                   {errors.quantity && errors.quantity.message}
//                 </Text>
//               </FormControl>

//               <FormControl id="totalCost" isInvalid={errors.totalCost}>
//                 <FormLabel>Total Cost</FormLabel>
//                 <Input
//                   type="number"
//                   {...register("totalCost", {
//                     required: "Total Cost is required",
//                   })}
//                   onChange={handleChangeTotalCost}
//                   value={totalCost}
//                   placeholder="Enter totalcost"
//                 />
//                 <Text color="red">
//                   {errors.totalCost && errors.totalCost.message}
//                 </Text>
//               </FormControl>

//               <FormControl
//                 id="fillingStation"
//                 isInvalid={errors.fillingStation}
//               >
//                 <FormLabel>Filling Station</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Enter filling station"
//                   {...register("fillingStation", {
//                     required: "Filling Station is required",
//                   })}
//                 />
//                 <Text color="red">
//                   {errors.fillingStation && errors.fillingStation.message}
//                 </Text>
//               </FormControl>
//               <FormControl id="notes" isInvalid={errors.notes}>
//                 <FormLabel>Notes</FormLabel>
//                 <Input
//                   type="text"
//                   placeholder="Enter notes"
//                   {...register("notes", { required: "Notes is required" })}
//                 />
//                 <Text color="red">{errors.notes && errors.notes.message}</Text>
//               </FormControl>
//               <FormControl id="motorcycle" isInvalid={errors.motorcycle}>
//                 <FormLabel>Select Motorcycle</FormLabel>
//                 <Controller
//                   name="motorcycle"
//                   control={control}
//                   defaultValue=""
//                   render={({ field }) => (
//                     <Select {...field} placeholder="Select motorcycle">
//                       {userMotorcycles && userMotorcycles.length > 0 ? (
//                         userMotorcycles.map((motorcycle) => (
//                           <option key={motorcycle._id} value={motorcycle._id}>
//                             {motorcycle.brand} ({motorcycle.plateNumber})
//                           </option>
//                         ))
//                       ) : (
//                         <option value="" disabled>
//                           No motorcycles available
//                         </option>
//                       )}
//                     </Select>
//                   )}
//                 />
//               </FormControl>

//               <div style={{ display: "flex", gap: "10px" }}>
//                 <Button
//                   type="submit"
//                   colorScheme="blue"
//                   isLoading={loading}
//                   loadingText="Submitting"
//                 >
//                   Submit
//                 </Button>

//                 <Button
//                   type="button"
//                   onClick={() => navigate("/profile", { replace: true })}
//                   colorScheme="red"
//                   variant="outline"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </VStack>
//           </form>
//         </Box>
//       </Flex>
//     </div>
//   );
// };

// export default CreateFuel;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createFuel, clearErrors } from "../../actions/fuelActions";
import { CREATE_FUEL_RESET } from "../../constants/fuelConstants";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Flex,
  Heading,
  Select,
} from "@chakra-ui/react";
import { myMotorcycle } from "../../actions/motorcycleActions";

const CreateFuel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [odometer, setOdometer] = useState(""); // State to store odometer reading
  const [odometerMilestone, setOdometerMilestone] = useState(1000); // Initial milestone
  const { createdFuel, error, loading } = useSelector((state) => state.newFuel);
  const { userMotorcycles } = useSelector((state) => state.myMotor);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ mode: "all" });

  // Handle success and error notifications
  const handleSuccess = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const handleError = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    dispatch(myMotorcycle()); // Fetch user's motorcycles here
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      handleError(error);
      dispatch(clearErrors());
    }
    if (createdFuel) {
      handleSuccess("Created Successfully!");
      navigate("/profile", { replace: true });
      dispatch({ type: CREATE_FUEL_RESET });
    }
  }, [dispatch, createdFuel, error, navigate]);

  const handleChangePrice = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setPrice(inputValue);
      handleCalculation(inputValue, totalCost);
    }
  };

  const handleChangeQuantity = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setQuantity(inputValue);
      if (!isNaN(price) && price !== 0) {
        setTotalCost((parseFloat(inputValue) * parseFloat(price)).toFixed(2));
      }
    }
  };

  const handleChangeTotalCost = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setTotalCost(inputValue);
      handleCalculation(price, inputValue);
    }
  };

  const handleCalculation = (newPrice, newTotalCost, newQuantity) => {
    const p = parseFloat(newPrice);
    const cost = parseFloat(newTotalCost);
    const qty = parseFloat(newQuantity);

    if (!isNaN(p) && !isNaN(cost) && cost !== 0) {
      setQuantity((cost / p).toFixed(2));
    } else if (!isNaN(p) && !isNaN(qty) && qty !== 0) {
      setTotalCost((p * qty).toFixed(2));
    } else if (!isNaN(cost) && !isNaN(qty) && qty !== 0) {
      setPrice((cost / qty).toFixed(2));
    }
  };

  const submitHandler = (data) => {
    // Submit form data
    const formData = new FormData();
    formData.set("date", data.date);
    formData.set("odometer", data.odometer);
    formData.set("price", data.price);
    formData.set("quantity", data.quantity);
    formData.set("totalCost", totalCost);
    formData.set("fillingStation", data.fillingStation);
    formData.set("notes", data.notes);
    formData.set("motorcycle", data.motorcycle);
    dispatch(createFuel(formData));
  };

  return (
    <div className="bg-zinc-100 min-h-screen py-5">
      <Flex justify="center" align="center">
        <Box w="md" p={8} borderWidth={1} borderRadius={8} boxShadow="lg" className="bg-white">
          <Heading mb={4}>Create Fuel Entry</Heading>
          <form onSubmit={handleSubmit(submitHandler)}>
            <VStack spacing={4}>
              <FormControl id="date" isInvalid={errors.date}>
                <FormLabel>Date</FormLabel>
                <Input
                  type="date"
                  {...register("date", { required: "Date is required" })}
                />
                <Text color="red">{errors.date && errors.date.message}</Text>
              </FormControl>
              <FormControl id="odometer" isInvalid={errors.odometer}>
                <FormLabel>Odometer Reading</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter odometer"
                  {...register("odometer", {
                    required: "Odometer reading is required",
                  })}
                />
                <Text color="red">
                  {errors.odometer && errors.odometer.message}
                </Text>
              </FormControl>
              <FormControl id="price" isInvalid={errors.price}>
                <FormLabel>Price per Liter</FormLabel>
                <Input
                  type="number"
                  {...register("price", { required: "Price is required" })}
                  onChange={handleChangePrice}
                  value={price}
                  placeholder="Enter price"
                />
                <Text color="red">{errors.price && errors.price.message}</Text>
              </FormControl>

              <FormControl id="quantity" isInvalid={errors.quantity}>
                <FormLabel>Quantity(Per Liter/s)</FormLabel>
                <Input
                  type="number"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  onChange={handleChangeQuantity}
                  value={quantity}
                  placeholder="Enter quantity"
                />
                <Text color="red">
                  {errors.quantity && errors.quantity.message}
                </Text>
              </FormControl>

              <FormControl id="totalCost" isInvalid={errors.totalCost}>
                <FormLabel>Total Cost</FormLabel>
                <Input
                  type="number"
                  {...register("totalCost", {
                    required: "Total Cost is required",
                  })}
                  onChange={handleChangeTotalCost}
                  value={totalCost}
                  placeholder="Enter totalcost"
                />
                <Text color="red">
                  {errors.totalCost && errors.totalCost.message}
                </Text>
              </FormControl>

              <FormControl
                id="fillingStation"
                isInvalid={errors.fillingStation}
              >
                <FormLabel>Filling Station</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter filling station"
                  {...register("fillingStation", {
                    required: "Filling Station is required",
                  })}
                />
                <Text color="red">
                  {errors.fillingStation && errors.fillingStation.message}
                </Text>
              </FormControl>
              <FormControl id="notes" isInvalid={errors.notes}>
                <FormLabel>Notes</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter notes"
                  {...register("notes", { required: "Notes is required" })}
                />
                <Text color="red">{errors.notes && errors.notes.message}</Text>
              </FormControl>
              <FormControl id="motorcycle" isInvalid={errors.motorcycle}>
                <FormLabel>Select Motorcycle</FormLabel>
                <Controller
                  name="motorcycle"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} placeholder="Select motorcycle">
                      {userMotorcycles && userMotorcycles.length > 0 ? (
                        userMotorcycles.map((motorcycle) => (
                          <option key={motorcycle._id} value={motorcycle._id}>
                            {motorcycle.brand} ({motorcycle.plateNumber})
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No motorcycles available
                        </option>
                      )}
                    </Select>
                  )}
                />
              </FormControl>

              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  loadingText="Submitting"
                >
                  Submit
                </Button>

                <Button
                  type="button"
                  onClick={() => navigate("/profile", { replace: true })}
                  colorScheme="red"
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </VStack>
          </form>
        </Box>
      </Flex>
    </div>
  );
};


export default CreateFuel;
