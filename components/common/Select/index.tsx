import { Box, Flex } from "@chakra-ui/react";
import SelectRC, {
  components,
  GroupBase,
  OptionsOrGroups,
  ValueContainerProps,
  OptionProps,
} from "react-select";
import { FC, useId, useMemo, useRef } from "react";
import { If, Then } from "react-if";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { Checked, ChervonDown } from "@/components/svg";
import { useDevice } from "@/hooks/useDevice";
import ErrorMessage from "../ErrorMessage";

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  id?: string;
  options?: OptionsOrGroups<Option, GroupBase<Option>> | undefined;
  value?: Option | Option[] | any;
  onChange?: (value: Option | Option[] | any) => void;
  size?: "small" | "medium";
  optionCount?: number;
  placeHolder?: string;
  showTick?: boolean;
  errorMessage?: string | null | any;
  isDarkTheme?: boolean;
  isMulti?: boolean;
  zIndex?: number;
  isInvalid?: boolean;
  isSelectDate?: boolean;
  placeholderSize?: string;
  isDisabled?: boolean;
  filterSelectOptions?:
    | ((option: FilterOptionOption<any>, inputValue: string) => boolean)
    | null
    | undefined;
}

const Select: FC<SelectProps> = ({
  id,
  options,
  optionCount = 7,
  placeHolder,
  value,
  showTick = true,
  errorMessage = null,
  isMulti = false,
  isDarkTheme = false,

  isInvalid,
  zIndex,
  isSelectDate,
  placeholderSize,
  isDisabled,
  onChange,
  filterSelectOptions,
  ...rest
}) => {
  const { isMobile, isDesktop } = useDevice();
  const renderOptionBaseOnOptionCount = useMemo(() => {
    if (!optionCount || optionCount > (options || []).length) return;
    /**  Option count * option's height + vertical padding 4 + 4  */
    const height = isMobile ? 33 : 42;
    return optionCount * height + 8;
  }, [optionCount, options, isMobile]);

  const ref = useRef(null);

  const CustomOption = (props: OptionProps<Option>) => {
    const { innerProps, isDisabled, children, setValue, isSelected } = props;

    return (
      <components.Option {...props} theme={theme as any}>
        <If condition={!isDisabled}>
          <Then>
            <Box
              px={"22px"}
              display="flex"
              justifyContent={isSelectDate ? "center" : "space-between"}
              cursor="pointer"
              onClick={setValue as any}
              _hover={{ color: isDarkTheme ? "primary" : "primary" }}
              color={
                isDarkTheme
                  ? isSelected
                    ? "accent.2"
                    : "primary"
                  : isSelected
                  ? "accent.2"
                  : "black"
              }
              {...innerProps}
              fontSize={{ base: "sm", lg: "xl" }}
              fontWeight={isSelected ? 700 : 500}
            >
              {children}
              {isSelected && showTick && (
                <Box as="span">{<Checked w={5} h={5} />}</Box>
              )}
            </Box>
          </Then>
        </If>
      </components.Option>
    );
  };

  const ValueContainer = ({
    children,
    ...props
  }: ValueContainerProps<Option>) => {
    const [values, input] = children as any;
    let selected: Array<{ children: string; key: string }> = [];

    if (Array.isArray(values)) {
      selected = values.map((value) => ({
        children: value.props.children,
        key: value.key,
      }));
    } else {
      selected =
        [
          {
            children: values?.props.children,
            key: values?.key,
          },
        ] || [];
    }

    return (
      <components.ValueContainer {...props}>
        <Flex alignItems="center" wrap={"wrap"}>
          {selected.map((value, index: number) => (
            <Box
              key={value.children}
              mr={1}
              color={
                value.key === "placeholder"
                  ? "grey.200"
                  : isDarkTheme
                  ? "primary"
                  : "primary"
              }
              fontWeight="500"
              fontSize={{
                base: placeholderSize ?? "sm",
                lg: placeholderSize ?? "lg",
              }}
              cursor={isDisabled ? "not-allowed" : ""}
            >
              {value.children}
              {index <= selected.length - 2 ? "," : ""}
            </Box>
          ))}
          {input}
        </Flex>
      </components.ValueContainer>
    );
  };

  const validateValue = useMemo(() => {
    if (Array.isArray(value) || value?.label) return value;
    return null;
  }, [value]);

  const DropdownIndicator = () => {
    return <ChervonDown w={5} h={5} color="grey.200" />;
  };

  return (
    <Box zIndex={zIndex || 10} w="100%" position="relative">
      <SelectRC
        onInputChange={(el) => {
          return el.length > 5 && isSelectDate ? el.slice(0, 5) : el;
        }}
        ref={ref}
        id={id}
        instanceId={useId()}
        value={validateValue}
        onChange={onChange}
        maxMenuHeight={renderOptionBaseOnOptionCount}
        placeholder={placeHolder}
        isDisabled={isDisabled}
        components={{
          DropdownIndicator,
          Option: CustomOption,
          ValueContainer,
        }}
        filterOption={filterSelectOptions}
        styles={{
          container: () => ({
            padding: 0,
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
          }),
          placeholder: (base) => ({
            ...base,
            color: "#797979",
          }),
          control: (baseStyles) => ({
            ...baseStyles,
            border: "none",
            background: "transparent",
            borderRadius: "none",
            borderBottom: isInvalid
              ? "1px solid #FF6767"
              : `1px solid ${isDarkTheme ? "#ADADAD" : "#505050"}`,
            boxShadow: "none",
            "&:hover": {
              borderColor: "none",
              boxShadow: "none",
            },
          }),

          menu: () => ({
            marginTop: 10,
            borderRadius: 6,
            border: `1px solid ${isDarkTheme ? "#7949FC" : "#7949FC"}  `,
            background: isDarkTheme ? "white" : "#33EFEF",
            position: "absolute",
            width: "100%",
          }),
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              width: isMobile ? "7px" : "12px",
              height: "auto",
            },
            "::-webkit-scrollbar-track": {
              background: "none",
            },
            "::-webkit-scrollbar-thumb": {
              background: isDarkTheme ? "#7949FC" : "#7949FC",
              border: `${isMobile ? "2px" : "4px"} solid white`,
              borderRadius: "10px",
            },
          }),
          indicatorSeparator: () => ({ display: "none" }),
          multiValueLabel: (base) => ({
            ...base,
            background: "none",
            color: "#313F4C",
          }),
          multiValueRemove: () => ({
            display: "none",
          }),
          multiValue: (base) => ({
            ...base,
            background: "none",
          }),
          input: (base) => ({
            ...base,
            color: "#1E16C1",
            fontSize: isDesktop ? "18px" : "14px",
            fontWeight: "bold",
          }),
        }}
        isMulti={isMulti}
        options={options}
        isClearable={false}
        hideSelectedOptions={false}
        {...rest}
      />
      <ErrorMessage condition={isInvalid} errorMessage={errorMessage} />
    </Box>
  );
};

const theme = {
  colors: {
    primary25: "#FFFFFF",
  },

  spacing: {
    baseUnit: 3,
  },
};

export default Select;
