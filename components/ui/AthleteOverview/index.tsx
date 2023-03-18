import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import { People } from "@/components/svg/People";
import { WalletIcon } from "@/components/svg/Wallet";

interface OverviewProps {
  fans: string;
  money: string;
  isLoading: boolean;
}
const AthleteOverview: React.FC<OverviewProps> = ({
  fans,
  money,
  isLoading,
}) => {
  return (
    <Box
      bg="primary"
      color="secondary"
      borderRadius="lg"
      p={{ base: 5, lg: "30px" }}
    >
      <Heading
        fontSize={{ base: "md", xl: "xl" }}
        fontWeight={"extrabold"}
        pb={"2"}
      >
        Overview
      </Heading>
      <Flex alignItems={"center"} justifyContent="space-between">
        <Box w="50%">
          <Flex alignItems={"center"}>
            <People w={{ base: 8, xl: "52px" }} h={{ base: 8, xl: "52px" }} />
            <Box px={"4"}>
              <Skeleton isLoaded={!isLoading} h={{ base: 6, lg: 7 }} w={16}>
                <Text fontSize={{ base: "md", xl: "xl" }} fontWeight={"medium"}>
                  {fans}
                </Text>
              </Skeleton>
              <Text fontSize={{ base: "xs", xl: "md" }} fontWeight={"normal"}>
                Fans
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box borderLeftWidth={"thin"} w="50%" pl={7} borderColor="grey.300">
          <Flex alignItems={"center"}>
            <WalletIcon
              w={{ base: 8, xl: "52px" }}
              h={{ base: 8, xl: "52px" }}
              mx={"4"}
            />
            <Box>
              <Skeleton isLoaded={!isLoading} w={16} h={{ base: 6, lg: 7 }}>
                <Text fontSize={{ base: "md", xl: "xl" }} fontWeight={"medium"}>
                  {money}
                </Text>
              </Skeleton>

              <Text fontSize={{ base: "xs", xl: "md" }} fontWeight={"normal"}>
                Per month
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default AthleteOverview;
