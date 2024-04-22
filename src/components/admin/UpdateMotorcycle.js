import React, { useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMotorcycle,
  getMotorcycleDetails,
  clearErrors,
} from "../../actions/motorcycleActions";
import { UPDATE_MOTORCYCLES_RESET } from "../../constants/motorcycleConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";

const UpdateMotorcycle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [year, setYear] = useState("");
  const [brand, setBrand] = useState("");
  const [plateNumber, setPlateNumber] = useState("");

  const { error, isUpdated } = useSelector((state) => state.adminControl);
  const { motorcycle, loading } = useSelector(
    (state) => state.motorcycleDetails
  );
  const { id } = useParams();

  const errMsg = (message = "") =>
    toast.error(message, { position: toast.POSITION.BOTTOM_CENTER });
  const successMsg = (message = "") =>
    toast.success(message, { position: toast.POSITION.BOTTOM_CENTER });

  useEffect(() => {
    if (motorcycle && motorcycle._id !== id) {
      dispatch(getMotorcycleDetails(id));
    } else {
      setYear(motorcycle.year);
      setBrand(motorcycle.brand);
      setPlateNumber(motorcycle.plateNumber);
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      successMsg("Motorcycle updated successfully");
      dispatch({ type: UPDATE_MOTORCYCLES_RESET });
      navigate("/admin/view/all/motorcycles");
    }
  }, [dispatch, error, navigate, isUpdated, motorcycle, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("year", year);
    formData.set("brand", brand);
    formData.set("plateNumber", plateNumber);
    dispatch(updateMotorcycle(motorcycle._id, formData));
  };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Update motorcycle"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              Update Motorcycle
            </Text>
            <form onSubmit={submitHandler}>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Year Model</FormLabel>
                  <Input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Brand</FormLabel>
                  <Input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Plate Number</FormLabel>
                  <Input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" size="lg" width="full">
                  Update Motorcycle
                </Button>
                <Button
                  type="button"
                  onClick={() =>
                    navigate("/admin/view/all/motorcycles", { replace: true })
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
      </Fragment>
    </aside>
  );
};

export default UpdateMotorcycle;
