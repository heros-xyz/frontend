import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { If, Then } from "react-if";
import { IFanInfo } from "@/types/athlete/types";
import ItemSuggestionsFan from "../../SearchFanSuggestions/ItemSuggestionsFan";

interface SearchFanSuggestionsList extends BoxProps {
  buttonName: string;
  items: IFanInfo[];
  searchKeyword?: string;
  onShowAllResult(): void;
  onSelectedItem: (item: IFanInfo) => void;
}

const SearchFanSuggestionsList: React.FC<SearchFanSuggestionsList> = ({
  buttonName,
  items,
  searchKeyword,
  onSelectedItem,
  onShowAllResult,
  ...props
}) => {
  return (
    <If condition={items.length}>
      <Then>
        <Box bg="accent.4" p="3" pt="0" borderRadius="base" {...props}>
          <Then>
            {items.map((item) => (
              <ItemSuggestionsFan
                searchKeyword={searchKeyword}
                key={item.id}
                item={item}
                onClickItem={onSelectedItem}
              />
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
              >
                {buttonName}
              </Box>
            </Box>
          </Then>
        </Box>
      </Then>
    </If>
  );
};

export default SearchFanSuggestionsList;
