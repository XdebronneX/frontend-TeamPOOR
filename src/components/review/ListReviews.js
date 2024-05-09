import React from "react";
import { Box, Heading, Divider, Text, Avatar } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
const ListReviews = ({ reviews }) => {
  return (
    <Box className="bg-zinc-100 rounded-xl p-3 space-y-2">
      {/* <Divider /> */}

      {reviews &&
        reviews.map((review) => (
          // <Box key={review._id} className="review-card my-3">
          //   <Text className="review_user" fontWeight="bold" mb="2">
          //     by {review.user.firstname} {review.user.lastname}
          //   </Text>

          //   <Box className="flex flex-row items-center rating-outer">
          //     {[...Array(5)].map((_, index) => (
          //       <FaStar
          //         key={index}
          //         color={index + 1 <= review.rating ? "#FCCD00" : "gray.300"}
          //       />
          //     ))}
          //   </Box>

          //   <Text className="review_comment">{review.comment}</Text>

          //   <Divider my="2" />
          // </Box>
          <div className="space-y-3">
            <div className="flex flex-row gap-3">
              <Avatar size="md" src={review.user.avatar.url} />

              <div className="flex-1">
                <div className="flex flex-row justify-between ">
                  <Text className="font-semibold ">
                    {review.user.firstname} {review.user.lastname}
                  </Text>

                  <Text className="text-xs">{review.date}</Text>
                </div>

                <div className="flex flex-row items-center space-x-2">
                  <Box className="flex flex-row items-center rating-outer">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={
                          index + 1 <= review.rating ? "#FCCD00" : "gray.300"
                        }
                      />
                    ))}
                  </Box>

                  <Text className="text-zinc-600 text-xs">
                    {review.rating} out of 5
                  </Text>
                </div>

                <Text className="mt-1">{review.comment}</Text>
              </div>
            </div>
            <Divider />
          </div>
        ))}
    </Box>
  );
};

export default ListReviews;
