import React from "react";
import { Box } from '@chakra-ui/react';
import SyncLoader from 'react-spinners/SyncLoader';
import BarLoader from 'react-spinners/BarLoader';

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <BarLoader
                color="#E50000"
                height={5}
                speedMultiplier={2}
                width={109}
            />
        </Box>
    );
}

export default Loader;
