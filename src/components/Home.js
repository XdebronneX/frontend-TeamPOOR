import React, { useEffect } from 'react'
import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    IconButton,
    createIcon,
    IconProps,
    useColorModeValue,
    Avatar,
    Grid,
    HStack,
    Collapse
} from '@chakra-ui/react'
import Carousel from './layout/Carousel'
import { allOrders, clearErrors } from "../actions/orderActions"
import { useDispatch, useSelector } from 'react-redux';

const TestimonialContent = (props) => {
    const { children } = props

    return (
        <Stack
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow={'lg'}
            p={8}
            rounded={'xl'}
            align={'center'}
            pos={'relative'}
            _after={{
                content: `""`,
                w: 0,
                h: 0,
                borderLeft: 'solid transparent',
                borderLeftWidth: 16,
                borderRight: 'solid transparent',
                borderRightWidth: 16,
                borderTop: 'solid',
                borderTopWidth: 16,
                borderTopColor: useColorModeValue('white', 'gray.800'),
                pos: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
            {children}
        </Stack>
    )
}

const TestimonialHeading = (props) => {
    const { children } = props

    return (
        <Heading as={'h3'} fontSize={'xl'}>
            {children}
        </Heading>
    )
}

const TestimonialText = (props) => {
    const { children } = props

    return (
        <Text
            textAlign={'center'}
            color={useColorModeValue('gray.600', 'gray.400')}
            fontSize={'sm'}>
            {children}
        </Text>
    )
}

const Home = () => {
    const [show, setShow] = React.useState(false)
    const handleToggle = () => setShow(!show)

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.authUser);
    // useEffect(() => {
    //     if (user.role === "admin") {
    //         dispatch(allOrders());
    //     }
    // }, [dispatch]);
    return (
        <>
            <Container maxW={'11xl'} mt={1}>
                <Carousel />
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    // py={{ base: 20, md: 36 }}
                    display={{ base: "none", md: "block" }}
                >
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Welcome to  <br />
                        <Text as={'span'} color={'red.400'}>
                            teamPOOR
                        </Text>
                    </Heading>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}
                    >
                        <Box mt={8} width="50%" textAlign="center" fontStyle={"arial"}>
                            <Collapse startingHeight={70} in={show}>
                                Rev up your passion for riding at our premier motorcycle shop. Discover a curated selection of top-notch bikes, gear, and accessories that blend style and performance seamlessly.
                                <br />
                                Whether you're a seasoned rider or a newcomer, our knowledgeable staff is here to guide you to the perfect ride. Embrace the exhilaration of the open road with quality products and unmatched expertise – because at TeamPOOR, we're not just selling motorcycles; we're fueling your journey.
                            </Collapse>
                            <Button size='lg' onClick={handleToggle} mt={5}>
                                Show {show ? 'Less' : 'More'}
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
                <Stack spacing={{ base: 10, md: 20 }} mt={14}>
                    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
                        <Container maxW={'7xl'} py={16} as={Stack} spacing={12}>
                            {/* <Stack spacing={0} align={'center'}>
                                <Heading>Our Clients Speak</Heading>
                                <Text>Welcome to our shop, where every rider's dream takes shape.</Text>
                            </Stack> */}
                            <Stack
                                direction={{ base: 'column', md: 'row' }}
                                spacing={{ base: 10, md: 4, lg: 5 }}>
                                <Box>
                                    <TestimonialContent>
                                        <TestimonialHeading>OEM-Quality Parts</TestimonialHeading>
                                        <TestimonialText>
                                            We source and provide original equipment manufacturer (OEM) quality parts, ensuring reliability, compatibility, and optimal performance for your motorcycle.
                                        </TestimonialText>
                                    </TestimonialContent>
                                </Box>
                                <Box>
                                    <TestimonialContent>
                                        <TestimonialHeading>Expert Repair Services</TestimonialHeading>
                                        <TestimonialText>
                                            Trust our skilled technicians for professional repair services. From routine maintenance to complex repairs, our team is dedicated to keeping your motorcycle running smoothly.
                                        </TestimonialText>
                                    </TestimonialContent>
                                </Box>
                                <Box>
                                    <TestimonialContent>
                                        <TestimonialHeading>Efficient Online Ordering</TestimonialHeading>
                                        <TestimonialText>
                                            Experience seamless online ordering with our user-friendly platform. Browse, select, and order parts from the comfort of your home, with efficient shipping options available.
                                        </TestimonialText>
                                    </TestimonialContent>
                                </Box>
                            </Stack>
                        </Container>
                    </Box>
                </Stack>
            </Container>
        </>
    )
}

export default Home