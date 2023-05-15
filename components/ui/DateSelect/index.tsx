import { useState } from "react";
import dayjs from "dayjs";
import { useUpdateEffect } from "react-use";
import Select from "@/components/common/Select";
import { generateOptions, monthOptions } from "@/utils/time";

interface DateSelectProps {
  submitted: boolean;
  date: string | Date | null;
  onChange: (date: string) => void;
  format?: string;
  zIndex?: number;
  isDisabled?: boolean;
  isDarkTheme?: boolean;
}

const DateSelect: React.FC<DateSelectProps> = ({
  submitted,
  date = "2024-01-24",
  format = "YYYY-MM-DD",
  zIndex,
  isDarkTheme,
  isDisabled,
  onChange,
}) => {
  const dateDefault = dayjs(date ? date : new Date(), format, true);

  const dayValue = dateDefault.format("DD");
  const monthValue = dateDefault.format("MMM");
  const monthValueMM = dateDefault.format("MM");
  const yearValue = dateDefault.format("YYYY");

  const [day, setDay] = useState({
    value: date ? dayValue : "",
    label: date ? dayValue : "",
  });
  const [month, setMonth] = useState({
    value: date ? monthValueMM : "",
    label: date ? monthValue : "",
  });
  const [year, setYear] = useState({
    value: date ? yearValue : "",
    label: date ? yearValue : "",
  });

  useUpdateEffect(() => {
    if (day.value && month.value && year.value) {
      const date = `${year.value}-${month.value}-${day.value}`;
      onChange(date);
    }
  }, [day, month, year]);

  return (
    <>
      <Select
        showTick={false}
        placeHolder="DD"
        options={generateOptions("day")}
        optionCount={4}
        isSelectDate
        value={day}
        onChange={(values) => setDay(values)}
        isInvalid={submitted && !day.value}
        zIndex={zIndex}
        isDarkTheme={isDarkTheme}
        isDisabled={isDisabled}
      />
      <Select
        showTick={false}
        placeHolder="MM"
        value={month}
        options={monthOptions}
        optionCount={4}
        isSelectDate
        onChange={(values) => setMonth(values)}
        isInvalid={submitted && !month.value}
        zIndex={zIndex}
        isDarkTheme={isDarkTheme}
        isDisabled={isDisabled}
      />
      <Select
        showTick={false}
        placeHolder="YYYY"
        value={year}
        options={generateOptions("year")}
        optionCount={4}
        isSelectDate
        onChange={(values) => setYear(values)}
        isInvalid={submitted && !year.value}
        zIndex={zIndex}
        isDarkTheme={isDarkTheme}
        isDisabled={isDisabled}
      />
    </>
  );
};

export default DateSelect;
