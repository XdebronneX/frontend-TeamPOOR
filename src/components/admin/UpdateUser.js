import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";

const UpdateUser = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { error, isUpdated } = useSelector((state) => state.adminDeprovision);
  const { user } = useSelector((state) => state.userDetails);
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      successMsg("User updated successfully");
      dispatch({ type: UPDATE_USER_RESET });
      navigate("/admin/view/all/users");
    }
  }, [dispatch, error, navigate, isUpdated, user, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("firstname", firstname);
    formData.set("lastname", lastname);
    formData.set("email", email);
    formData.set("role", role);
    dispatch(updateUser(user._id, formData));
  };

  return (
    <aside className="bg-zinc-100  p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <div className="flex flex-1 justify-center items-start">
        <div className="w-2/4 bg-white rounded-xl p-3">
          <Text fontSize="3xl" mb={4} textAlign="center">
            Update User
          </Text>
          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="secretary">Secretary</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="supplier">Supplier</option>
                </Select>
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" width="full">
                Update User
              </Button>
              <Button
                type="button"
                onClick={() =>
                  navigate("/admin/view/all/users", { replace: true })
                }
                colorScheme="red"
                variant="outline"
                size="lg"
                width="full"
              >
                Cancel
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default UpdateUser;
