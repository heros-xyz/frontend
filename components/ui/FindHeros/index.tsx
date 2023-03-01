import {
  Box,
  BoxProps,
  Center,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { LogoMiniIcon } from "@/components/svg/LogoMini";
import { FindIcon } from "@/components/svg/Find";
import { useSearchAthleteProfileQuery } from "@/api/athlete";
import useDebounce from "@/hooks/useDebounce";
import { IconInfo } from "@/components/svg/IconInfo";
import SearchSuggestionsList from "../SearchSuggestions/List";

interface IFindHeros extends BoxProps {
  value?: string;
  onChange?: (el: React.ChangeEvent<HTMLInputElement>) => void;
  showResult?: boolean;
  onSeeAll?: () => void;
}

const FindHeros: React.FC<IFindHeros> = ({ value, onSeeAll, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearchBarFocused, setFocus] = useState(false);
  const [showSuggestList, setShowSuggestList] = useState(false);

  const router = useRouter();

  const onChange = useCallback((el: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(el.target.value);
    setShowSuggestList(true);
  }, []);

  const searchValueDebounced = useDebounce(searchValue, 500);

  const LIMIT = 5;

  const { data } = useSearchAthleteProfileQuery(
    {
      searching: searchValueDebounced?.toLocaleLowerCase(),
      limit: LIMIT,
    },
    { skip: searchValue.length <= 1 }
  );

  const onShowAllResult = () => {
    setShowSuggestList(false);
    if (router.pathname !== "/fan/all-result") {
      router.push({ pathname: "/fan/all-result", query: { searchValue } });
      return;
    }

    onSeeAll && onSeeAll();
  };

  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  return (
    <Box {...props} position="relative">
      <Flex h={14} pt={1}>
        <Link href={"/"}>
          <Center
            h={{ base: 6, xl: "1.875rem" }}
            w={{ base: 6, xl: "1.875rem" }}
            my={3}
            mr={3}
          >
            <LogoMiniIcon w="100%" h="100%" />
          </Center>
        </Link>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FindIcon color="white" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Find your heros"
            _placeholder={{ color: "grey.100" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
            color="white"
            border={0}
            value={value}
            borderRadius={0}
            borderBottom="1px"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            fontSize={{ base: "md", xl: "lg" }}
            onKeyUp={(e) => {
              if (e.key === "Enter" && searchValue.length > 1) {
                onShowAllResult();
                setShowSuggestList(false);
              }
            }}
          />
        </InputGroup>
      </Flex>
      {data && showSuggestList && (
        <SearchSuggestionsList
          zIndex={15}
          right={0}
          left={8}
          top={{ base: "50px", lg: "60px" }}
          position="absolute"
          buttonName={data.length ? "See All Results" : "No Result Found"}
          items={data}
          onShowAllResult={onShowAllResult}
          onClick={() => setShowSuggestList(false)}
        />
      )}
      {searchValue.length === 0 && isSearchBarFocused && (
        <HStack
          bg="acccent.4"
          p={{ base: 3, lg: 4 }}
          borderRadius="base"
          left={8}
          right={0}
          position="absolute"
          zIndex={15}
          alignItems="start"
        >
          <IconInfo
            w={{ base: "15px", lg: "24px" }}
            h={{ base: "15px", lg: "24px" }}
            mt="0.5"
            mr={{ lg: 2 }}
          />
          <Text fontSize={{ base: "xs", lg: "md" }} fontWeight={500}>
            You can either search by athletes’ name or their sports and sports
            related terms.
          </Text>
        </HStack>
      )}
    </Box>
  );
};

export default FindHeros;
