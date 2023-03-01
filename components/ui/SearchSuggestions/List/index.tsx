import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { IAthleteSearchProfile } from "@/types/athlete/types";
import ItemSuggestions from "../ItemSuggestions";

interface SearchSuggestionsProps extends BoxProps {
  buttonName: string;
  items: IAthleteSearchProfile[];
  onShowAllResult(): void;
  onClick: () => void;
}

const SearchSuggestionsList: React.FC<SearchSuggestionsProps> = ({
  buttonName,
  items,
  onShowAllResult,
  onClick,
  ...props
}) => {
  return (
    <Box bg="acccent.4" p="3" pt="0" borderRadius="base" {...props}>
      {items.map((item) => (
        <ItemSuggestions item={item} key={item.id} onClick={onClick} />
      ))}
      <Box textAlign="center" mt="2.5">
        <Box
          cursor={"pointer"}
          onClick={onShowAllResult}
          color="primary"
          fontSize={{ base: "xs", md: "md" }}
          fontWeight="bold"
          lineHeight="140%"
          textTransform="capitalize"
          p={{ base: 0.5, lg: items.length ? 0.5 : 2.5 }}
        >
          {buttonName}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchSuggestionsList;
