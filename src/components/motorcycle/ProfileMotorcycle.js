import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { myMotorcycle } from '../../actions/motorcycleActions';
import { MDBDataTable } from 'mdbreact';
import Loader from '../layout/Loader';
import {
  Box,
  Container,
  Text,
  Grid,
  Button,
  Avatar,
  Divider,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

const ProfileMotorcycle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userMotorcycles, loading } = useSelector((state) => state.myMotor);

  useEffect(() => {
    dispatch(myMotorcycle());
  }, [dispatch]);

  const handleMotorcycle = () => {
    navigate("/create/motorcycle/new");
  };

  const setMotors = () => {
    const data = {
      columns: [
        // {
        //   label: 'ID',
        //   field: 'id',
        //   sort: 'asc',
        // },
        {
          label: 'Date Registered',
          field: 'date',
          sort: 'asc',
        },
        {
          label: 'Plate Number',
          field: 'plateNumber',
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
        // {
        //   label: 'Engine Number',
        //   field: 'engineNumber',
        //   sort: 'asc',
        // },
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
        // {
        //   label: 'Plate Number Image',
        //   field: 'imagePlateNumber',
        //   sort: 'asc',
        // },
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
          // id: row._id,
          date: formattedDate,
          year: row.year,
          brand: row.brand,
          plateNumber: row.plateNumber,
          // engineNumber: row.engineNumber,
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
          // imagePlateNumber: row.imagePlateNumber ? (
          //   <img
          //     src={row.imagePlateNumber.url}
          //     alt="Registration Proof Image"
          //     style={{ width: '100px', height: '100px' }}
          //   />
          // ) : (
          //   <img
          //     src="your_default_image_url"
          //     alt="Default Image"
          //     style={{ width: '100px', height: '100px' }}
          //   />
          // ),
        });
      });
    }

    return data;
  };

  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" fontSize="3xl" fontWeight="bold">
          My Motorcycles
        </Heading>
        <Button onClick={handleMotorcycle} colorScheme="teal" leftIcon={<FaPlusCircle />}>
          Register Motorcycle
        </Button>
      </Flex>
      {!loading ? (
        <Loader />
      ) : (
        <Fragment>
          {userMotorcycles && userMotorcycles.length === 0 ? (
            <Text>No motorcycles found.</Text>
          ) : (
            <MDBDataTable
              striped
              bordered
              noBottomColumns
              data={setMotors()}
            />
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default ProfileMotorcycle;
