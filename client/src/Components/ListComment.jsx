import React, { useState, useEffect } from "react";
import { getAllProductCommentsService } from "../api/productCommentApi";
import { Box, Text, SkeletonText } from "@chakra-ui/react";
import moment from "moment";

const ListComment = (props) => {
  const { id, commentAdded } = props;
  const [listComment, setListComment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getCommentData();
      setLoading(false);
    }, [1000]);

    const getCommentData = async () => {
      const response = await getAllProductCommentsService();

      if (response.data.errCode === 0) {
        const data = response.data.productComment;
        const comments = data.filter((value) => value.productId === Number(id));
        // console.log("check comment: ", comments);
        comments.reverse();
        setListComment(comments);
      }
    };
  }, [id, commentAdded]);
  //   console.log("check loading: ", loading);

  return (
    <>
      {loading && (
        <SkeletonText my="4" noOfLines={2} spacing="4" skeletonHeight="2" />
      )}
      <Box>
        {listComment.length !== 0 && (
          <>
            {listComment.map((comment) => (
              <Box
                key={comment.id}
                borderWidth="1px"
                borderRadius="lg"
                p={3}
                my={3}
              >
                <Text fontSize={"lg"}>{comment.commentContent}</Text>
                <Text fontSize="sm" color="gray.500">
                  {comment.User.firstName + " " + comment.User.lastName} -{" "}
                  {moment
                    .utc(comment.createdAt)
                    .local()
                    .format("DD-MM-YYYY HH:mm")}
                </Text>
              </Box>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default ListComment;
