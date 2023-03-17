import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { Else, If, Then } from "react-if";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import { useRouter } from "next/router";
import { ArrowLeft } from "@/components/svg/ArrowLeft";
import ErrorMessage from "@/components/common/ErrorMessage";
import AddArchiveIcon from "@/components/svg/AddArchiveIcon";
import EditPencilIcon from "@/components/svg/EditPencilIcon";
import {
  useAddSubscriptionInfoMutation,
  useUpdateSubscriptionInfoMutation,
} from "@/api/athlete";
import { useSubscriptionForm } from "@/hooks/useSubscriptionForm";

interface IProp {
  title: string;
  onBack: () => void;
  idEdit?: string;
  dataEdit?: {
    monthlyPrice: string;
    tierDescription: string;
    listBenefitsId: string[];
  };
  totalFan?: number;
  listBenefit: { value: string; label: string }[];
}
const AddTier: React.FC<IProp> = ({
  title,
  onBack,
  idEdit,
  dataEdit,
  totalFan,
  listBenefit,
}) => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [benefit, setBenefit] = useState<string | string[]>([]);
  const [benefitData, setBenefitData] = useState<string | string[]>([]);
  const [edited, setEdited] = useState<boolean>(false);

  const [addSubscription, { isLoading: loadingAdd, isSuccess: successAdd }] =
    useAddSubscriptionInfoMutation();
  const [
    updateSubscription,
    { isLoading: loadingUpdate, isSuccess: successUpdate },
  ] = useUpdateSubscriptionInfoMutation();

  const { formik, isValid, submitCount, values, handleSubmit } =
    useSubscriptionForm();

  useUpdateEffect(() => {
    formik.setFieldValue("monthlyPrice", dataEdit?.monthlyPrice);
    formik.setFieldValue("tierDescription", dataEdit?.tierDescription);
    formik.setFieldValue("listBenefitsId", dataEdit?.listBenefitsId);
    setBenefitData(dataEdit?.listBenefitsId || []);
    setBenefit(dataEdit?.listBenefitsId || []);
  }, [dataEdit]);

  useUpdateEffect(() => {
    if (submitCount % 2 === 0 && isValid && benefitData?.length > 0) {
      const { monthlyPrice, ...newValue } = values;
      if (title === "Edit Tier" && idEdit) {
        updateSubscription({
          id: idEdit,
          name: "Bronze Tier",
          monthlyPrice: parseFloat(monthlyPrice),
          ...newValue,
        });
      } else {
        addSubscription({
          name: "Bronze Tier",
          monthlyPrice: parseFloat(monthlyPrice),
          ...newValue,
        });
      }
    }
  }, [submitCount]);

  useUpdateEffect(() => {
    router.push("/athlete/membership/listing");
  }, [successAdd]);

  useUpdateEffect(() => {
    setEdited(true);
  }, [successUpdate]);

  return (
    <Center
      color="white"
      flexDirection="column"
      p={{ base: "5", xl: "19rem" }}
      pt={{ xl: "3.75rem" }}
      pb={{ base: "80px", xl: 0 }}
      w="full"
      fontSize={{ base: "sm", xl: "xl" }}
    >
      <Box w={{ xl: "500px" }}>
        <Box w="full" fontWeight="bold">
          <ArrowLeft
            verticalAlign=""
            w={{ base: "14px", xl: "18px" }}
            h={{ base: "14px", xl: "18px" }}
            cursor="pointer"
            onClick={onBack}
          />
          <Text as="span" ml="6" fontSize={{ base: "xl", xl: "2xl" }}>
            {title}
          </Text>
        </Box>
        <Text
          w="full"
          mt={{ base: 2.5, xl: "30px" }}
          fontSize={{ base: "sm", xl: "md" }}
        >
          This will be your lowest tier you can offer to your fans
        </Text>
        <Text
          w="full"
          fontSize={{ base: "md", xl: "xl" }}
          fontWeight="bold"
          color="acccent.3"
          mt={{ base: "5", xl: "4" }}
        >
          Bronze Tier
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={{ base: "5", xl: "4" }}>
            <Box fontWeight="medium">
              Monthly Price
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Text mt={2.5} fontSize={{ base: "xs", xl: "md" }}>
              We recommend that you set a price between $1 and $10 per month for
              the bronze tier to attract as many fans as possible. It is up to
              you however how much you charge.
            </Text>
            <InputGroup h={{ base: "50px" }} mt={{ base: 2.5, xl: "30px" }}>
              <InputLeftAddon
                color="primary"
                bg="acccent.1"
                border={0}
                h="full"
                fontSize={{ base: "sm" }}
                borderLeftRadius={{ base: "4px", xl: "12px" }}
                fontWeight="medium"
              >
                $
              </InputLeftAddon>
              <Input
                isDisabled={!!totalFan && totalFan > 0}
                border={0}
                autoComplete="off"
                bg="acccent.4"
                color="grey.300"
                placeholder="1.00"
                w="full"
                id="monthlyPrice"
                name="monthlyPrice"
                onChange={(e) => {
                  formik.setFieldValue(
                    "monthlyPrice",
                    e.target.value.replace(/[^0-9 | ^\.]/g, "")
                  );
                  if (/[0-9]+\.[0-9]{3}/.test(e.target.value)) {
                    formik.setFieldValue(
                      "monthlyPrice",
                      e.target.value.slice(0, -1)
                    );
                  }
                }}
                value={formik.values.monthlyPrice}
                isInvalid={Boolean(
                  formik.errors.monthlyPrice && formik.touched.monthlyPrice
                )}
                h="full"
                borderRightRadius={{ base: "4px", xl: "12px" }}
              />
            </InputGroup>
            <ErrorMessage
              fontSize={{ xl: "sm" }}
              mt={2}
              condition={
                formik.errors.monthlyPrice && formik.touched.monthlyPrice
              }
              errorMessage={formik.errors.monthlyPrice}
            />
          </Box>
          <Box mt={{ base: "5", xl: "8" }}>
            <Box fontWeight="medium">Tier Description (150 characters max)</Box>
            <Text mt={{ base: 2.5, xl: 8 }} fontSize={{ base: "xs", xl: "md" }}>
              Describe the tier in a few words. For example: Follow my life
              through daily updates.
            </Text>
            <Textarea
              resize={"none"}
              autoComplete="off"
              fontSize={{ base: "sm", xl: "lg" }}
              color="white"
              mt={{ base: 2.5 }}
              variant="flushed"
              placeholder="Tier description"
              w="full"
              id="tierDescription"
              name="tierDescription"
              onChange={formik.handleChange}
              value={formik.values.tierDescription}
              borderColor="white"
              isInvalid={Boolean(
                formik.errors.tierDescription && formik.touched.tierDescription
              )}
              minH={{
                base: `${
                  Math.ceil(formik.values.tierDescription?.length / 40) * 30
                }px`,
                xl: `${
                  Math.ceil(formik.values.tierDescription?.length / 40) * 45 ||
                  45
                }px`,
              }}
              borderRadius={0}
            />
            <ErrorMessage
              fontSize={{ xl: "sm" }}
              mt={2}
              condition={
                formik.errors.tierDescription && formik.touched.tierDescription
              }
              errorMessage={formik.errors.tierDescription}
            />
          </Box>
          <Box mt={{ base: "5", xl: "4" }}>
            <Box fontWeight="medium">
              Tier Benefits
              <Text as="span" color="error.dark">
                {" "}
                *
              </Text>
            </Box>
            <Text mt={2.5} fontSize={{ base: "xs", xl: "md" }}>
              Let your fans know what they can get from this membership tier.
            </Text>
            <Menu
              closeOnSelect={false}
              onClose={() => {
                setBenefitData(benefit);
                formik.setFieldValue("listBenefitsId", benefit);
              }}
              isLazy
            >
              <MenuButton
                bg="acccent.1"
                color="primary"
                borderRadius={{ base: "6px", xl: "12px" }}
                w="full"
                minH="70px"
                textAlign="left"
                p="5"
                mt={{ base: "5", xl: "8" }}
                type="button"
              >
                <If
                  condition={benefitData.length > 0 && listBenefit.length > 0}
                >
                  <Then>
                    <Box color="white" w="full">
                      <If
                        condition={benefitData?.includes(listBenefit[0]?.value)}
                      >
                        <Then>
                          <Text
                            bg="primary"
                            h={{ base: "44px" }}
                            borderRadius={{ base: "4px", xl: "6px" }}
                            display="flex"
                            alignItems="center"
                            pl={4}
                            mb={
                              benefitData?.includes(listBenefit[0]?.value)
                                ? 2.5
                                : 0
                            }
                          >
                            {listBenefit[0]?.label}
                          </Text>
                        </Then>
                      </If>
                      <If
                        condition={benefitData.includes(listBenefit[1]?.value)}
                      >
                        <Then>
                          <Text
                            bg="primary"
                            h={{ base: "44px" }}
                            borderRadius="4"
                            display="flex"
                            alignItems="center"
                            pl={4}
                          >
                            {listBenefit[1]?.label}
                          </Text>
                        </Then>
                      </If>
                      <Box mt={{ base: 4 }} color="primary">
                        <EditPencilIcon
                          w={{ base: "16px", xl: "19px" }}
                          h={{ base: "16px", xl: "19px" }}
                        />
                        <Text
                          as="span"
                          ml="4"
                          fontSize={{ base: "xs", xl: "xl" }}
                        >
                          Edit benefits
                        </Text>
                      </Box>
                    </Box>
                  </Then>
                  <Else>
                    <AddArchiveIcon w={{ base: "30px" }} h={{ base: "30px" }} />
                    <Text as="span" ml="4" fontSize={{ base: "xs", xl: "xl" }}>
                      Select benefits
                    </Text>
                  </Else>
                </If>
              </MenuButton>
              <MenuList bg="primary" color="secondary" borderColor="acccent.1">
                <MenuOptionGroup
                  type="checkbox"
                  defaultValue={benefitData}
                  onChange={(value) => {
                    setBenefit(value);
                  }}
                >
                  <MenuItemOption
                    value={listBenefit[0]?.value}
                    bg="primary"
                    color="secondary"
                    w={{ base: "335px", xl: "500px" }}
                    flexDirection="row-reverse"
                    _checked={{ color: "acccent.1" }}
                  >
                    {listBenefit[0]?.label}
                  </MenuItemOption>
                  <MenuItemOption
                    value={listBenefit[1]?.value}
                    bg="primary"
                    color="secondary"
                    flexDirection="row-reverse"
                    _checked={{ color: "acccent.1" }}
                  >
                    {listBenefit[1]?.label}
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <ErrorMessage
              fontSize={{ xl: "sm" }}
              mt={2}
              condition={submitted && benefitData.length === 0}
              errorMessage="This is a required field"
            />
          </Box>
          <Box float={{ xl: "right" }}>
            <Button
              bg="secondary"
              color="primary"
              w="100%"
              mt="50px"
              h="auto"
              py="3"
              fontWeight={"bold"}
              type="submit"
              fontSize={{ base: "md", xl: "xl" }}
              onClick={() => {
                setSubmitted(true);
                handleSubmit();
              }}
              isLoading={loadingAdd || loadingUpdate}
            >
              {title === "Edit Tier" ? "Save" : "Add"}
            </Button>
            <If condition={edited}>
              <Then>
                <Center
                  color="#65D169"
                  mt={{ base: 2.5, xl: 4 }}
                  fontSize={{ base: "xs", xl: "md" }}
                >
                  Changes saved!
                </Center>
              </Then>
            </If>
          </Box>
        </form>
      </Box>
    </Center>
  );
};

export default AddTier;
