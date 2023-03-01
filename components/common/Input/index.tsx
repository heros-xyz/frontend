import {
  FormControl,
  FormControlProps,
  FormHelperText,
  Input as ChakraInput,
  InputProps,
} from "@chakra-ui/react";

interface Props extends FormControlProps {
  inputProps?: InputProps;
  errorMessage?: string;
  isError?: boolean;
}

const Input: React.FC<Props> = (props) => {
  return (
    <FormControl {...props}>
      <ChakraInput {...props.inputProps} borderColor="primary" />
      {props.isError && (
        <FormHelperText fontSize={"xs"} color="error.dark">
          {props.errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default Input;
