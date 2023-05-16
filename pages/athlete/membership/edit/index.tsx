import { Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useBenefits } from "@/libs/dtl/benefits";
import { useMembershipTiersAsMaker } from "@/libs/dtl/membershipTiers";

const EditMembership = () => {
  const router = useRouter();
  const { data: dataBenefit } = useBenefits();
  const { data: membershipData, loading } = useMembershipTiersAsMaker();
  const benefitToEdit = membershipData?.[0];

  const handleBack = () => {
    router.push("/athlete");
  };

  if (loading) {
    return <></>;
  }

  return (
    <Box bg="white" minH="100vh" pb={{ xl: 12 }}>
      <Head>
        <title>Athlete | Edit Tier</title>
      </Head>
      <AddTier
        title="Edit Tier"
        onBack={handleBack}
        idEdit={benefitToEdit?.id}
        totalFan={benefitToEdit?.totalFan}
        dataEdit={{
          monthlyPrice: String(benefitToEdit?.monthlyPrice) ?? "",
          tierDescription: benefitToEdit?.tierDescription ?? "",
          listBenefitsId:
            benefitToEdit?.benefits?.map?.((el) => `${el.key}`) || [],
        }}
        listBenefit={
          dataBenefit !== undefined
            ? dataBenefit.map((benefit) => ({
                value: benefit?.key,
                label: benefit?.label,
              }))
            : []
        }
      />
    </Box>
  );
};
export default EditMembership;

EditMembership.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
