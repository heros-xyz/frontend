import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useGetListBenefitQuery } from "@/api/athlete";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";
import { setContext } from "@/libs/axiosInstance";
import { wrapper } from "@/store";

const AddMembership = () => {
  const router = useRouter();
  const { data: dataBenefit } = useGetListBenefitQuery("");
  const handleBack = () => {
    router.push("/athlete");
  };

  return (
    <Box bg="white" minH="100vh" pb={{ xl: 12 }}>
      <Head>
        <title>Athlete | Add Tier</title>
      </Head>
      <AddTier
        title="Add Tier"
        onBack={handleBack}
        listBenefit={dataBenefit !== undefined ? dataBenefit : []}
      />
    </Box>
  );
};
export default AddMembership;

AddMembership.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  () => async (context) => {
    setContext(context);

    return athleteGuard(context, ({ session }: IGuards) => {
      return {
        props: {
          session,
        },
      };
    });
  }
);
