import { Box } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import AddTier from "@/modules/athlete-dashboard/components/AddTier";
import {
  useGetListBenefitQuery,
  useGetSubscriptionInfoQuery,
} from "@/api/athlete";
import { ListMembershipTiers } from "@/types/athlete/types";
import AthleteDashboardLayout from "@/layouts/AthleteDashboard";
import { useLoading } from "@/hooks/useLoading";
import { wrapper } from "@/store";
import { setContext } from "@/libs/axiosInstance";
import { athleteGuard } from "@/middleware/athleteGuard";
import { IGuards } from "@/types/globals/types";

const EditMembership = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { start, finish } = useLoading();
  const { data: dataTier } = useGetSubscriptionInfoQuery(
    session?.user.id ?? "",
    {
      skip: !session?.user.id,
    }
  );
  const { data: dataBenefit } = useGetListBenefitQuery("");
  const [dataRender, setDataRender] = useState<ListMembershipTiers>();

  const handleBack = () => {
    router.push("/athlete");
  };

  useEffect(() => {
    start();
    if (dataTier?.data) {
      setDataRender(dataTier?.data[0]);
      finish();
    }
  }, [dataTier]);

  return (
    <Box bg="white" minH="100vh" pb={{ xl: 12 }}>
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
