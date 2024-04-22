// import React from 'react';
// import { Box, Text, Button } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';

// const DashboardCard = ({ title, value, link }) => {
//     return (
//         <Box
//             bg="white"
//             p={4}
//             borderRadius="md"
//             boxShadow="lg"
//             transition="box-shadow 0.3s"
//             _hover={{ boxShadow: 'xl' }}
//         >
//             <Text fontSize="lg" fontWeight="bold" mb={2}>
//                 {title}
//             </Text>
//             <Text fontSize="2xl" color="primary.500">
//                 {value}
//             </Text>
//             {link && (
//                 <Link to={link} style={{ textDecoration: 'none' }}>
//                     <Button mt={4} colorScheme="teal" size="sm">
//                         View Details
//                     </Button>
//                 </Link>
//             )}
//         </Box>
//     );
// };

// export default DashboardCard;

import React from 'react';
import { Box, Text, Button, Link as ChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, value, link }) => {
    return (
        <Box
            bg="white"
            p={6}
            borderRadius="md"
            boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
            transition="box-shadow 0.3s"
            _hover={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
            textAlign="center"
        >
            <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4}>
                {value}
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="gray.700" mb={2}>
                {title}
            </Text>
            {link && (
                <ChakraLink as={Link} to={link} textDecoration="none">
                    <Button colorScheme="teal" size="sm">
                        View Details
                    </Button>
                </ChakraLink>
            )}
        </Box>
    );
};

export default DashboardCard;
