import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices, clearErrors } from "../../../actions/serviceActions";
import { saveServiceInfo } from "../../../actions/serviceCartActions";
import AppointmentSteps from "./AppointmentSteps";
import { Select, Checkbox } from "@chakra-ui/react";

const ServicesChoose = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { services, error, loading } = useSelector(
    (state) => state.allServices
  );
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    dispatch(getAllServices());
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleServiceChange = (serviceId) => {
    const updatedServices = [...selectedServices];
    if (updatedServices.includes(serviceId)) {
      updatedServices.splice(updatedServices.indexOf(serviceId), 1);
    } else {
      updatedServices.push(serviceId);
    }
    setSelectedServices(updatedServices);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleContinue = () => {
    const selectedServicesData = services.filter((service) =>
      selectedServices.includes(service._id)
    );
    const selectedTypeData = selectedType !== "" ? selectedType : null;
    dispatch(
      saveServiceInfo({
        cartServices: selectedServicesData,
        selectedTypeData,
      })
    );
    navigate("/customer-info");
  };

  const filteredServices = services.filter((service) => {
    if (selectedType === "") {
      return true;
    } else {
      const type = parseInt(selectedType);
      return service.type === type || service.type === 3;
    }
  });

  return (
    <div className="space-y-5 py-3 bg-zinc-100 min-h-screen">
      <AppointmentSteps booking listofservices />

      <div className="container shadow-sm rounded-xl w-9/12 p-3 space-y-5 bg-white">
        <div>
          <h2 className="text-center font-bold">Choose Services</h2>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Fragment>
          <div class="container w-9/12 grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-x-4">
            <div className="container shadow-sm rounded-xl p-3 space-y-5 bg-white col-span-2">
              <div>
                <label htmlFor="serviceType">Select Type of Service:</label>
                <Select
                  id="serviceType"
                  value={selectedType}
                  onChange={handleTypeChange}
                  placeholder="Select Type"
                >
                  <option value="1">On site</option>
                  <option value="2">Home Service</option>
                </Select>
              </div>

              <div className="mb-3">
                <label>Choose Services:</label>
                {filteredServices.map((service) => (
                  <>
                    {service.isAvailable === true && (
                      <div key={service._id} className="form-check">
                        <Checkbox
                          id={`service-${service._id}`}
                          isChecked={selectedServices.includes(service._id)}
                          onChange={() => handleServiceChange(service._id)}
                        >
                          {service.name}
                        </Checkbox>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className="shadow-sm rounded-xl p-3 space-y-5 bg-white h-24 flex justify-center items-center">
              <button
                className="btn btn-primary btn-block rounded-pill bg-primary font-weight-bold"
                onClick={handleContinue}
              >
                Continue
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ServicesChoose;
