import { Button, Box } from "@chakra-ui/react";
import React from "react";

interface FileUploadProps {
  text: string;
  icon: JSX.Element;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  text,
  icon,
  onChange,
  errorMessage,
}) => {
  return (
    <React.Fragment>
      <Button
        data-testid="file-upload"
        cursor="pointer"
        bg="primary"
        w={{ base: "100%", xl: "fit-content" }}
        h="48px"
        color="secondary"
        display="flex"
        alignItems="center"
        as="label"
        variant="primary"
        rightIcon={icon}
        _hover={{ opacity: 1 }}
      >
        {text}
        <input
          data-testid="file-input"
          hidden
          type="file"
          onChange={onChange}
          accept="image/jpeg,image/png"
        />
      </Button>
      {errorMessage && (
        <Box color="red.500" data-testid="error-message" fontSize="sm" mt={2}>
          {errorMessage}
        </Box>
      )}
    </React.Fragment>
  );
};

export default FileUpload;
