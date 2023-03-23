import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { If, Then, Else } from "react-if";

export interface IProps {
  activeStep: number;
  totalStep: number;
  onChangeStep: (step: number) => void;
}

const Step: React.FC<IProps> = ({ activeStep, totalStep, onChangeStep }) => {
  const stepArray = useMemo(
    () => Array.from({ length: totalStep }, (_, i) => i + 1),
    [totalStep]
  );

  const [maxStep, setMaxStep] = useState(activeStep);

  useEffect(() => {
    if (activeStep >= maxStep) {
      setMaxStep(activeStep);
    }
  }, [activeStep]);

  const renderStep = (step: number) => {
    const isActiveStep = step === activeStep;
    return (
      <Box
        role="button"
        className="step"
        cursor={step <= maxStep ? "pointer" : ""}
        key={step}
        p={1.5}
        borderRadius="full"
        bg={isActiveStep ? "secondary" : "white"}
        onClick={() => {
          if (step <= maxStep) onChangeStep(step);
        }}
      >
        <Box
          data-testid={`button-step-${step}`}
          w={2.5}
          h={2.5}
          borderRadius="full"
          bg={step <= maxStep ? "accent.2" : "gray.100"}
          pointerEvents={step <= maxStep ? "auto" : "none"}
        />
      </Box>
    );
  };

  return (
    <Flex gap={8} justifyContent="center" alignItems="center">
      <If condition={activeStep <= totalStep}>
        <Then>
          <Text as="span" fontSize="sm" color="primary" fontWeight={500}>
            Step {activeStep} of {totalStep}
          </Text>
          <Flex gap={2.5}>
            {stepArray.map((step) => {
              return renderStep(step);
            })}
          </Flex>
        </Then>
        <Else>
          <Text as="span" fontSize="sm" color="primary">
            Total step can not be smaller active step
          </Text>
        </Else>
      </If>
    </Flex>
  );
};

export default Step;
