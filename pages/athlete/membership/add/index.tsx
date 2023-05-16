import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useBenefits } from "@/libs/dtl/benefits";

const AddMembership = () => {
  const router = useRouter();
  const { data, loading } = useBenefits();
  const dataBenefit = data?.map(({ key, label }) => ({ value: key, label }));
  const handleBack = () => {
    router.push("/athlete");
  };

  if (loading) {
    return <></>;
  }

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
