import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useGetListBenefitQuery } from "@/api/athlete";

const AddMembership = () => {
  const router = useRouter();
  const { data: dataBenefit } = useGetListBenefitQuery("");
  const handleBack = () => {
    router.push("/athlete");
  };

  return (
    <Box bg="primary" minH="100vh" pb={{ xl: 12 }}>
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
