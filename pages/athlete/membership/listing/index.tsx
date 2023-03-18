import { Box, Button, Center, List, ListItem, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Else, If, Then } from "react-if";
import Head from "next/head";
import EditPencilIcon from "@/components/svg/EditPencilIcon";
import { useGetSubscriptionInfoQuery } from "@/api/athlete";
import { ListMembershipTiers } from "@/types/athlete/types";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";

const ListingMembership = () => {
  const router = useRouter();
  const { data: dataTier } = useGetSubscriptionInfoQuery("");
  const [dataRender, setDataRender] = useState<ListMembershipTiers>();

  const handleAdd = () => {
    router.push("/athlete/membership/add");
  };
  const handleEdit = () => {
    router.push("/athlete/membership/edit");
  };

  useEffect(() => {
    if (dataTier?.data) setDataRender(dataTier?.data[0]);
  }, [dataTier]);

  return (
    <Box bg="white" minH="100vh">
      <Head>
        <title>Athlete | Membership</title>
      </Head>
      <Center color="primary">
        <Box
          w={{ base: "full", xl: "500px" }}
          mx={5}
          fontSize={{ base: "xs", xl: "md" }}
        >
          <Text
            w="full"
            fontWeight="bold"
            pt={{ base: 5, xl: "3.75rem" }}
            fontSize={{ base: "xl", xl: "2xl" }}
          >
            Membership
          </Text>
          <If condition={!dataRender}>
            <Then>
              <Text mt={{ base: 5, xl: 8 }}>
                You have not had any membership tiers.
              </Text>
            </Then>
            <Else>
              <Text mt={{ base: 5, xl: 8 }}>
                Here you&apos;ll see the membership tiers you are offering and
                the number of active fans.
              </Text>
              <Box
                mt={{ base: 5, xl: 8 }}
                bg="accent.2"
                p={{ base: "4", xl: "30px" }}
                color="white"
                rounded="lg"
              >
                <Box mb="2" display="flex" justifyContent="space-between">
                  <Text
                    fontWeight="extrabold"
                    fontSize={{ base: "md", lg: "2xl" }}
                    color="secondary"
                  >
                    Bronze
                  </Text>
                  <EditPencilIcon
                    cursor="pointer"
                    onClick={handleEdit}
                    w={{ base: "14px", xl: "19px" }}
                    h={{ base: "14px", xl: "19px" }}
                  />
                </Box>
                <Text
                  fontWeight="normal"
                  fontSize={{ base: "xxs", lg: "md" }}
                  mb="2.5"
                >
                  {dataRender?.tierDescription}
                </Text>
                <Text
                  fontWeight="medium"
                  fontSize={{ base: "xs", lg: "md" }}
                  mb="2.5"
                >
                  ${dataRender?.monthlyPrice?.toFixed(2)}/month ·{" "}
                  {dataRender?.totalFan || 0}{" "}
                  {(dataRender?.totalFan ?? 0) > 1 ? "fans" : "fan"}
                </Text>
                <Text
                  fontWeight="medium"
                  fontSize={{ base: "xxs", lg: "md" }}
                  mb="1.5"
                >
                  Benefit:
                </Text>
                <List
                  fontSize={{ base: "xxs", lg: "md" }}
                  fontWeight="normal"
                  listStyleType="disc"
                  ml="6"
                >
                  {dataRender?.benefits.map((el) => (
                    <ListItem key={el?.id}>{el?.name}</ListItem>
                  ))}
                </List>
              </Box>
              <Center
                mt={{ base: 5, xl: 8 }}
                w="full"
                h={{ base: "50px", xl: "70px" }}
                border="1px"
                color="accent.2"
                borderColor="accent.2"
                borderRadius="8px"
              >
                <Box
                  w="full"
                  pl={{ base: "4", xl: "30px" }}
                  fontWeight="extrabold"
                  fontSize={{ xl: "2xl" }}
                >
                  Silver (Coming soon)
                </Box>
              </Center>
              <Center
                mt={{ base: 5, xl: 8 }}
                w="full"
                h={{ base: "50px", xl: "70px" }}
                border="1px"
                color="accent.2"
                borderColor="accent.2"
                borderRadius="8px"
              >
                <Box
                  w="full"
                  pl={{ base: "4", xl: "30px" }}
                  fontWeight="extrabold"
                  fontSize={{ xl: "2xl" }}
                >
                  Gold (Coming soon)
                </Box>
              </Center>
            </Else>
          </If>
          <Box
            display="flex"
            alignItems={{ base: "center", xl: "end" }}
            flexDirection="column"
          >
            <Button
              bg="secondary"
              color="primary"
              w={{ base: "100%", xl: "auto" }}
              mt={{
                base: !!dataRender ? "30px" : "15px",
                xl: "60px",
              }}
              fontWeight={"bold"}
              type="submit"
              fontSize={{ base: "md", xl: "xl" }}
              onClick={handleAdd}
              isDisabled={!!dataRender}
              h="auto"
              borderRadius={"10px"}
              _disabled={{ bg: "grey.100", color: "grey.300" }}
            >
              add tier
            </Button>
            <If condition={!!dataRender}>
              <Then>
                <Text mt={{ base: 2.5, xl: 4 }} color="grey.300">
                  (You&apos;ll be able to add higher tiers in the future.)
                </Text>
              </Then>
            </If>
          </Box>
        </Box>
      </Center>
    </Box>
  );
};
export default ListingMembership;

ListingMembership.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
