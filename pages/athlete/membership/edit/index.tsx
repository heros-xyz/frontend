import { Box } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import {
  useGetListBenefitQuery,
  useGetSubscriptionInfoQuery,
} from "@/api/athlete";
import { ListMembershipTiers } from "@/types/athlete/types";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";

const EditMembership = () => {
  const router = useRouter();
  const { data: dataTier } = useGetSubscriptionInfoQuery("");
  const { data: dataBenefit } = useGetListBenefitQuery("");
  const [dataRender, setDataRender] = useState<ListMembershipTiers>();

  const handleBack = () => {
    router.push("/athlete");
  };

  useEffect(() => {
    if (dataTier?.data) setDataRender(dataTier?.data[0]);
  }, [dataTier]);

  return (
    <Box bg="primary" minH="100vh" pb={{ xl: 12 }}>
      <Head>
        <title>Athlete | Edit Tier</title>
      </Head>
      <AddTier
        title="Edit Tier"
        onBack={handleBack}
        idEdit={`${dataRender?.id}`}
        totalFan={dataRender?.totalFan}
        dataEdit={{
          monthlyPrice: `${dataRender?.monthlyPrice}`,
          tierDescription: `${dataRender?.tierDescription}`,
          listBenefitsId: dataRender?.benefits.map((el) => `${el.id}`) || [],
        }}
        listBenefit={dataBenefit !== undefined ? dataBenefit : []}
      />
    </Box>
  );
};
export default EditMembership;

EditMembership.getLayout = function getLayout(page: ReactElement) {
  return <AthleteDashboardLayout>{page}</AthleteDashboardLayout>;
};
