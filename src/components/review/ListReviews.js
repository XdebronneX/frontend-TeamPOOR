import React from "react";
import { Box, Heading, Divider, Text } from "@chakra-ui/react";

const ListReviews = ({ reviews }) => {
    return (
        <Box className="reviews w-75">
            <Heading as="h3" mb="4">
                Comments
            </Heading>

            <Divider />

            {reviews &&
                reviews.map((review) => (
                    <Box key={review._id} className="review-card my-3">
                        {/* <Box className="rating-outer">
                            <Box
                                className="rating-inner"
                                bg="teal.500"
                                h="100%"
                                width={`${(review.rating / 5) * 100}%`}
                            />
                        </Box> */}

                        <Text className="review_user" fontWeight="bold" mb="2">
                            by {review.name}
                        </Text>

                        <Text className="review_comment">{review.comment}</Text>

                        <Divider my="2" />
                    </Box>
                ))}
        </Box>
    );
};

export default ListReviews;
