import { Box, Flex } from "@chakra-ui/react";
import SelectRC, {
  components,
  GroupBase,
  OptionsOrGroups,
  ValueContainerProps,
  OptionProps,
  MenuListProps,
} from "react-select";
import { FC, useId, useMemo, useRef } from "react";
import { If, Then } from "react-if";
import { FixedSizeList } from "react-window";
import { FilterOptionOption } from "react-select/dist/declarations/src/filters";
import { Checked, ChervonDown } from "@/components/svg";
import { useDevice } from "@/hooks/useDevice";
import ErrorMessage from "../ErrorMessage";

type Option = {
  value: string;
  label: string;
};

type IValue = {
  children: string | string[];
  key: string;
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
  onChange,
  isInvalid,
  zIndex,
  isSelectDate,
  placeholderSize,
  filterSelectOptions,
  ...rest
}) => {
  const renderOptionBaseOnOptionCount = useMemo(() => {
    if (!optionCount || optionCount > (options || []).length) return;
    /**  Option count * option's height + vertical padding 4 + 4  */
    return optionCount * 35 + 8;
  }, [optionCount, options]);

  const ref = useRef(null);

  const MenuList = (props: MenuListProps) => {
    const { isDesktop } = useDevice();
    const height = isDesktop ? 45 : 35;
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    let childOptions: any[] = [];
    if (Array.isArray(children)) {
      childOptions = children;
    }
    return (
      <FixedSizeList
        width={"100%"}
        height={maxHeight}
        itemCount={childOptions.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
        className="menuSizeList"
      >
        {({ index, style }) => <div style={style}>{childOptions[index]}</div>}
      </FixedSizeList>
    );
  };

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
              _hover={{ color: isDarkTheme ? "acccent.1" : "acccent.2" }}
              color={
                isDarkTheme
                  ? isSelected
                    ? "acccent.1"
                    : "secondary"
                  : isSelected
                  ? "acccent.2"
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
                  ? "grey.300"
                  : isDarkTheme
                  ? "white"
                  : "primary"
              }
              fontSize={placeholderSize ?? "sm"}
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
    return <ChervonDown w={5} h={5} color={isDarkTheme ? "white" : ""} />;
  };

  return (
    <Box zIndex={zIndex || 10} w="100%" position="relative">
      <SelectRC
        ref={ref}
        id={id}
        instanceId={useId()}
        value={validateValue}
        onChange={onChange}
        maxMenuHeight={renderOptionBaseOnOptionCount}
        placeholder={placeHolder}
        components={{
          DropdownIndicator,
          Option: CustomOption,
          ValueContainer,
          MenuList,
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
              : `1px solid ${isDarkTheme ? "#D9D9D9" : "#505050"}`,
            boxShadow: "none",
            "&:hover": {
              borderColor: "none",
              boxShadow: "none",
            },
          }),

          menu: () => ({
            marginTop: 10,
            borderRadius: 6,
            border: `1px solid ${isDarkTheme ? "#FFC5EF" : "#505050"}  `,
            background: isDarkTheme ? "#313F4C" : "#D2FFFA",
            position: "absolute",
            width: "100%",
          }),
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              width: "4px",
              height: "0px",
            },
            "::-webkit-scrollbar-track": {
              background: "none",
            },
            "::-webkit-scrollbar-thumb": {
              background: isDarkTheme ? "#FFC5EF" : "#5B30F9",
              borderRadius: 10,
              marginRight: 10,
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
    // primary25: "#DEEBFF",
  },

  spacing: {
    baseUnit: 3,
  },
};

export default Select;