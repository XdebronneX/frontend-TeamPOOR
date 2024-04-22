// import React from "react";
// import { Spinner, Box } from '@chakra-ui/react';

// const Loader = ({ size = "xl", color = "red.500", speed = "0.4s" }) => {
//     return (
//         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//             <Spinner
//                 thickness="4px"
//                 speed={speed} 
//                 emptyColor="gray.200"
//                 color={color}
//                 size={size}
//             />
//         </Box>
//     );
// }

// export default Loader;

import React from "react";
import { Box } from '@chakra-ui/react';
import SyncLoader from 'react-spinners/SyncLoader';
import BarLoader from 'react-spinners/BarLoader';

const Loader = () => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            {/* <SyncLoader
                color="#E50000"
                loading
                margin={7}
                speedMultiplier={1}
            /> */}
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
