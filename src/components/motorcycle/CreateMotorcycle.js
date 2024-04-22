import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createMotorcycle, clearErrors } from "../../actions/motorcycleActions";
import { CREATE_MOTORCYCLES_RESET } from "../../constants/motorcycleConstants";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Image,
  Stack,
  Flex,
  Heading,
  useColorModeValue,
  HStack,
  Avatar,
  InputGroup,
  useToast,
} from "@chakra-ui/react";

const CreateMotorcycle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [motorcycle, setMotorcycle] = useState({
    year: "",
    brand: "",
    plateNumber: "",
    engineNumber: "",
    type: "",
    fuel: "",
  });
  const { model, year, brand, plateNumber, engineNumber, type, fuel } =
    motorcycle;

  const [imagePlateNumber, setImagePlateNumber] = useState(
    "/images/imgdocument.jpg"
  );
  const [imageMotorcycle, setImageMotorcycle] = useState(
    "/images/imgmotorcycle.jpg"
  );
  const { createdMotorcycle, error, loading } = useSelector(
    (state) => state.newMotor
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleSuccess = () => {
    toast({
      title: "Success!",
      description: "Created successfully!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const handleError = (message) => {
    toast({
      title: "Error!",
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });
  };

  const onChangeImgMotorcycle = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageMotorcycle(reader.result);
        setMotorcycle(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const onChangeImgProof = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePlateNumber(reader.result);
        setMotorcycle(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (error) {
      handleError(error);
      dispatch(clearErrors());
    }
    if (createdMotorcycle) {
      handleSuccess("Created Successfully!");
      navigate("/profile", { replace: true });
      dispatch({ type: CREATE_MOTORCYCLES_RESET });
    }
  }, [dispatch, createdMotorcycle, error, navigate]);

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.set("year", data.year);
    formData.set("brand", data.brand);
    formData.set("plateNumber", data.plateNumber);
    formData.set("engineNumber", data.engineNumber);
    formData.set("type", data.type);
    formData.set("fuel", data.fuel);
    formData.set("imagePlateNumber", imagePlateNumber);
    formData.set("imageMotorcycle", imageMotorcycle);

    dispatch(createMotorcycle(formData));
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Register Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1547054728-fcb8828cc832?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Register your motorcycles
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            w={"full"}
          >
            <form onSubmit={handleSubmit(submitHandler)}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="year">
                      <FormLabel>Year</FormLabel>
                      <Controller
                        name="year"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "year is required",
                          minLength: {
                            value: 4,
                            message: "year must be at least 4 characters long",
                          },
                          maxLength: {
                            value: 4,
                            message: "year must not exceed 4 characters",
                          },
                        }}
                        render={({ field }) => (
                          <>
                            <Input {...field} type="text" placeholder="year" />
                            {errors.year && (
                              <Text color="red" fontSize="sm">
                                {errors.year.message}
                              </Text>
                            )}
                          </>
                        )}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="brand">
                      <FormLabel>Brand</FormLabel>
                      <Controller
                        name="brand"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "brand is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Input {...field} type="text" placeholder="brand" />
                            {errors.brand && (
                              <Text color="red" fontSize="sm">
                                {errors.brand.message}
                              </Text>
                            )}
                          </>
                        )}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="plateNumber">
                      <FormLabel>Plate number</FormLabel>
                      <Controller
                        name="plateNumber"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: "plateNumber is required",
                        }}
                        render={({ field }) => (
                          <>
                            <Input
                              {...field}
                              type="text"
                              placeholder="plate number"
                            />
                            {errors.plateNumber && (
                              <Text color="red" fontSize="sm">
                                {errors.plateNumber.message}
                              </Text>
                            )}
                          </>
                        )}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box> <FormControl id="engineNumber">
                    <FormLabel>Engine Number</FormLabel>
                    <Controller
                      name="engineNumber"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "engineNumber is required",
                        minLength: {
                          value: 5,
                          message:
                            "engineNumber must be at least 5 characters long",
                        },
                        maxLength: {
                          value: 30,
                          message:
                            "engineNumber must not exceed 30 characters",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            type="text"
                            placeholder="engineNumber"
                          />
                          {errors.engineNumber && (
                            <Text color="red" fontSize="sm">
                              {errors.engineNumber.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </FormControl></Box>
                  <Box>  <FormControl id="type">
                    <FormLabel>Type</FormLabel>
                    <Controller
                      name="type"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "type is required",
                        minLength: {
                          value: 5,
                          message: "type must be at least 5 characters long",
                        },
                        maxLength: {
                          value: 30,
                          message: "type must not exceed 30 characters",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input {...field} type="text" placeholder="type" />
                          {errors.type && (
                            <Text color="red" fontSize="sm">
                              {errors.type.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </FormControl></Box>
                </HStack>
                <Box>
                  <FormControl id="fuel">
                    <FormLabel>Fuel</FormLabel>
                    <Controller
                      name="fuel"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "fuel is required",
                        minLength: {
                          value: 5,
                          message: "fuel must be at least 5 characters long",
                        },
                        maxLength: {
                          value: 30,
                          message: "fuel must not exceed 30 characters",
                        },
                      }}
                      render={({ field }) => (
                        <>
                          <Input {...field} type="text" placeholder="fuel" />
                          {errors.fuel && (
                            <Text color="red" fontSize="sm">
                              {errors.fuel.message}
                            </Text>
                          )}
                        </>
                      )}
                    />
                  </FormControl>
                </Box>
                {/* Motorcycle Image */}
                <FormControl id="imageMotorcycle">
                  <FormLabel>Motorcycle Image</FormLabel>
                  <Avatar src={imageMotorcycle} />
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("imageMotorcycle", {
                      required: "Motorcycle image is required",
                      validate: {
                        fileFormat: (value) =>
                          /\/(jpe?g|png|gif|bmp)$/i.test(value[0]?.type),
                        fileSize: (value) => value[0]?.size < 10485760, // 10 MB
                      },
                    })}
                    onChange={onChangeImgMotorcycle}
                  />
                  {errors.imageMotorcycle && (
                    <Text color="red" fontSize="sm">
                      {errors.imageMotorcycle.message}
                    </Text>
                  )}
                </FormControl>

                {/* Registration Proof Image */}
                <FormControl id="imagePlateNumber">
                  <FormLabel>Plate Number</FormLabel>
                  <Avatar src={imagePlateNumber} />
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("imagePlateNumber", {
                      required: "Registration proof image is required",
                      validate: {
                        fileFormat: (value) =>
                          /\/(jpe?g|png|gif|bmp)$/i.test(value[0]?.type),
                        fileSize: (value) => value[0]?.size < 10485760, // 10 MB
                      },
                    })}
                    onChange={onChangeImgProof}
                  />
                  {errors.imagePlateNumber && (
                    <Text color="red" fontSize="sm">
                      {errors.imagePlateNumber.message}
                    </Text>
                  )}
                </FormControl>

                <Stack spacing={10} pt={2}>
                  <Button type="submit" colorScheme={"red"} variant={"solid"}>
                    Create motorcycle
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default CreateMotorcycle;