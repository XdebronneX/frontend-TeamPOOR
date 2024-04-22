import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfile,
    LoadUser,
    clearErrors,
} from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import { useForm, Controller } from "react-hook-form";
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    // useToast,
    Avatar,
    AvatarBadge,
    IconButton,
    Radio,
    RadioGroup,
    Text,
    InputGroup,
    InputLeftAddon,
    Box,
} from "@chakra-ui/react";
import { FaImages } from "react-icons/fa6";
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const toast = useToast();
    const inputRef = useRef();

    const { user } = useSelector((state) => state.authUser);
    const { error, isUpdated, loading } = useSelector(
        (state) => state.updateUser
    );
    const isUpdatedRef = useRef(isUpdated);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default-avatar.png"
    );

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    // const handleSuccess = (message) => {
    //     toast({
    //         title: "Success!",
    //         description: message,
    //         status: "info",
    //         duration: 2000,
    //         isClosable: true,
    //         position: "bottom-left",
    //     });
    // };

    // const handleError = (message) => {
    //     toast({
    //         title: "Error!",
    //         description: message,
    //         status: "error",
    //         duration: 2000,
    //         isClosable: true,
    //         position: "bottom-left",
    //     });
    // };

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
        if (user) {
            setFirstname(user.firstname || "");
            setLastname(user.lastname || "");
            setGender(user.gender || "");
            setPhone((user.phone && user.phone.replace(/^\+63/, "")) || "");

            if (user.avatar && user.avatar.url) {
                setAvatarPreview(user.avatar.url);
            } else {
                setAvatarPreview("/images/default-avatar.png");
            }
        }

        if (error) {
            handleError(error);
            dispatch(clearErrors());
        }

        if (isUpdated && !isUpdatedRef.current) {
            dispatch(LoadUser());
            handleSuccess("Update successfully!");
            setTimeout(() => {
                navigate("/profile", { replace: true });
                dispatch({ type: UPDATE_PROFILE_RESET });
            });
        }
        isUpdatedRef.current = isUpdated;
    }, [dispatch, error, isUpdated, navigate, user]);

    const submitHandler = (e) => {
        const formData = new FormData();
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("gender", gender);
        formData.append("phone", "+63" + phone);
        formData.append("avatar", avatar);
        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatar(reader.result);
                setAvatarPreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleBadgeClick = () => {
        inputRef.current.click();
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack
                spacing={8}
                w={"full"}
                maxW={"lg"}
                bg={useColorModeValue("white", "gray.700")}
                rounded={"xl"}
                boxShadow={"lg"}
                p={8}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                    Edit Profile
                </Heading>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <Stack spacing={4}>
                        <Box
                            w="100%"
                            h="200px" // Adjust the height as needed
                            bg="gray.200"
                            rounded="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                            overflow="hidden"
                        >
                            <Avatar
                                size="2xl"
                                src={avatarPreview}
                                onClick={handleBadgeClick}
                            >
                                <AvatarBadge
                                    as={IconButton}
                                    size="md"
                                    rounded="full"
                                    top="80%"
                                    right="-2%"
                                    colorScheme="red"
                                    aria-label="upload Image"
                                    icon={<FaImages />}
                                />
                            </Avatar>
                            <input
                                type="file"
                                onChange={onChange}
                                style={{ display: "none" }}
                                ref={inputRef}
                            />
                        </Box>
                    </Stack>
                    <FormControl id="firstname">
                        <FormLabel>First name</FormLabel>
                        <Input
                            placeholder="Firstname"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="lastname">
                        <FormLabel>Last name</FormLabel>
                        <Input
                            placeholder="Lastname"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="gender">
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup onChange={(value) => setGender(value)} value={gender}>
                            <Stack direction="row">
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl id="phone">
                        <FormLabel>Phone Number</FormLabel>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                pattern: {
                                    value: /^9\d{9}$/,
                                    message: "Invalid mobile number",
                                },
                            }}
                            render={({ field }) => (
                                <>
                                    <InputGroup>
                                        <InputLeftAddon children="+63" />
                                        <Input
                                            {...field}
                                            type="text"
                                            placeholder="Phone number"
                                            aria-invalid={errors.phone ? "true" : "false"}
                                            value={phone}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const maxLength = 10;
                                                if (inputValue.length <= maxLength) {
                                                    field.onChange(inputValue);
                                                    setPhone(inputValue);
                                                }
                                            }}
                                        />
                                    </InputGroup>
                                    {errors.phone && (
                                        <Text color="red" fontSize="sm">
                                            {errors.phone.message}
                                        </Text>
                                    )}
                                </>
                            )}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={["column", "row"]} mt={6}>
                        <Button
                            bg={"red.500"}
                            color={"white"}
                            _hover={{
                                bg: "red",
                            }}
                            onClick={() => navigate("/profile", { replace: true })}
                        >
                            Cancel
                        </Button>
                        <Button
                            bg={"blue.500"}
                            color={"white"}
                            _hover={{
                                bg: "blue.700",
                            }}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
};

export default UpdateProfile;
