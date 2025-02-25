import {
    GridItem,
    Box,
    Heading,
    VStack,
    Flex,
    HStack,
    Text 
} from "@chakra-ui/react";

const CommentList = ({ comments }) => {
  return (
    <GridItem>
      <Box width="full">
        <Heading size={{ base: "lg", md: "md" }} mb={4} color="blue.900">
          Comentarios
        </Heading>
        <VStack spacing={4} width="full" align="stretch">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <Box
                key={index}
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                bg="white"
              >
                <Flex justifyContent="space-between" mb={2}>
                  <HStack>
                    <Text fontWeight="bold" color="blue.900">
                      {comment.emisor}
                    </Text>
                    <Text color="gray.500" fontSize={{ base: "md", md: "sm" }}>
                      {new Date(comment.fechahora).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}{" "}
                      -{" "}
                      {new Date(comment.fechahora).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </HStack>
                </Flex>
                <Box>
                  <Heading size="xs" mb={2} color="gray.700">
                    {comment.asunto}
                  </Heading>
                  <Text color="gray.900" fontSize={{ base: "lg", md: "md" }}>
                    {comment.descripcion}
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text color="gray.500">No hay comentarios disponibles.</Text>
          )}
        </VStack>
      </Box>
    </GridItem>
  );
};

export default CommentList;
