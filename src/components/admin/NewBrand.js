// import React, { useState, useEffect, Fragment } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { createBrands, clearErrors } from "../../actions/brandActions";
// import { CREATE_BRANDS_RESET } from "../../constants/brandConstants";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Box, FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
// import Sidebar from "./Sidebar";
// import MetaData from "../layout/MetaData";

// const NewBrand = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [images, setImages] = useState("");
//   const { loading, error, success } = useSelector((state) => state.newBrand);
//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm();

//   const successMsg = (message = "") =>
//     toast.success(message, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });

//   const notify = (error = "") =>
//     toast.error(error, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });

//   useEffect(() => {
//     if (error) {
//       notify(error);
//       dispatch(clearErrors());
//     }
//     if (success) {
//       successMsg("Brand Created Successfully");
//       dispatch({ type: CREATE_BRANDS_RESET });
//       navigate("/admin/view/all/brands");
//     }
//   }, [dispatch, error, success, navigate]);

//   const submitHandler = async () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("images", images);

//     dispatch(createBrands(formData));
//   };

//   const onChange = (e) => {
//     if (e.target.name === "images") {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setImages(reader.result);
//         }
//       };

//       reader.readAsDataURL(file);
//     } else {
//       setName(e.target.value);
//     }
//   };

//   return (
//     <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
//       <nav className="h-full flex flex-col sticky top-4">
//         <Sidebar />
//       </nav>

//       <Fragment>
//         <MetaData title={"Create brand"} />
//         <div className="flex flex-1 justify-center items-start">
//           <div className="w-2/4 bg-white rounded-xl p-3">
//             <Text fontSize="3xl" mb={4} textAlign="center">
//               New Brand
//             </Text>
//             <form
//               onSubmit={handleSubmit(submitHandler)}
//               encType="multipart/form-data"
//             >
//               <FormControl mb={4}>
//                 <FormLabel htmlFor="name_field">Name</FormLabel>
//                 <Input
//                   type="text"
//                   id="name_field"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </FormControl>
//               <FormControl mb={4}>
//                 <FormLabel>Image</FormLabel>
//                 <Input
//                   type="file"
//                   name="images"
//                   accept="images/*"
//                   onChange={onChange}
//                 />
//               </FormControl>
//               <Button type="submit" colorScheme="teal">
//                 Submit
//               </Button>
//             </form>
//           </div>
//         </div>
//       </Fragment>
//     </aside>
//   );
// };

// export default NewBrand;

import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBrands, clearErrors } from "../../actions/brandActions";
import { CREATE_BRANDS_RESET } from "../../constants/brandConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormControl, FormLabel, Input, Button, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useForm } from "react-hook-form";

const NewBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [images, setImages] = useState("")
  const { loading, error, success } = useSelector((state) => state.newBrand);

  const { handleSubmit, register, formState: { errors } } = useForm();

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
    if (success) {
      successMsg("Brand Created Successfully");
      dispatch({ type: CREATE_BRANDS_RESET });
      navigate("/admin/view/all/brands");
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = async (formData) => {
    if (!formData.name || !formData.images) {
      notify("Please fill out all fields.");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("images", formData.images[0]);

    dispatch(createBrands(data));
  };

    const onChange = (e) => {
      if (e.target.name === "images") {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImages(reader.result);
          }
        };

        reader.readAsDataURL(file);
      } else {
        setName(e.target.value);
      }
    };

  return (
    <aside className="bg-zinc-100 min-h-screen p-3 flex flex-row gap-4">
      <nav className="h-full flex flex-col sticky top-4">
        <Sidebar />
      </nav>

      <Fragment>
        <MetaData title={"Create brand"} />
        <div className="flex flex-1 justify-center items-start">
          <div className="w-2/4 bg-white rounded-xl p-3">
            <Text fontSize="3xl" mb={4} textAlign="center">
              New Brand
            </Text>
            <form
              onSubmit={submitHandler}
              encType="multipart/form-data"
            >
              <FormControl mb={4}>
                <FormLabel htmlFor="name_field">Name</FormLabel>
                <Input
                  type="text"
                  id="name_field"
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  name="images"
                  accept="image/*"
                  onChange={onChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Fragment>
    </aside>
  );
};

export default NewBrand;
