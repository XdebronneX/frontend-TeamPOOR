import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Heading, Icon, } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { verifyUserEmail } from "../../actions/userActions";

const SuccessVerify = () => {
    const dispatch = useDispatch();
    let { id, token } = useParams();

    useEffect(() => {
        dispatch(verifyUserEmail(token, id))
    }, [dispatch, id, token]);

    return (
        <div className="bg-zinc-100 min-h-screen flex justify-center items-center">
            <div className="bg-white p-4 justify-center flex flex-col items-center rounded-xl space-y-5 mb-20">
                <Icon as={CheckCircleIcon} boxSize={140} color="red.500" mx="auto" />

                <Heading as="h2" size="lg" mt={4}>
                    Email Verification
                </Heading>

                <p className="text-zinc-500">
                    Your email has been verified successfully!
                </p>

                <Link to="/login">
                    <Button colorScheme="red" size="lg" isFullWidth>
                        login
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default SuccessVerify;