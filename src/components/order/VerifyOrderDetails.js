import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Heading, Icon, } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { verifyOrders, clearErrors } from "../../actions/orderActions";
import { clearCart } from "../../actions/cartActions";

const VerifyOrderDetails = () => {
    const dispatch = useDispatch();
    let { id, token } = useParams();

    useEffect(() => {
        dispatch(verifyOrders(token, id))
        dispatch(clearCart())
    }, [dispatch, id, token]);

    return (
        <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-4 justify-center flex flex-col items-center rounded-xl space-y-5 mb-20">
                <Icon as={CheckCircleIcon} boxSize={140} color="red.500" mx="auto" />

                <Heading as="h2" size="lg" mt={4}>
                    Payment  Successful!
                </Heading>

                <p className="text-zinc-500">
                    Payment successfully!
                </p>

                <Link to="/orders/me">
                    <Button colorScheme="red" size="lg" isFullWidth>
                        Check Orders
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default VerifyOrderDetails;