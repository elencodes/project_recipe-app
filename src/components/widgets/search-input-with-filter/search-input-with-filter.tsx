import {
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import { FilterDrawer } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { useFilterQueryParams } from '~/hooks/use-filter-query-params.tsx';
import { FilterIcon } from '~/icons/filter-icons/filter-icon';
import { SearchIcon } from '~/icons/input-icons/search-icon';
import { useLazyGetRecipesWithFiltersQuery } from '~/query/services/recipes/recipes-api.ts';
import { useAppDispatch, useAppSelector } from '~/redux/hooks.ts';
import { selectSelectedAllergens } from '~/redux/slices/allergens-slice.ts';
import {
    clearPage,
    selectFilteredRecipes,
    selectShowEmptyText,
    setFilteredRecipes,
    setHasMore,
    setIsFiltering,
    setShowedEmptyText,
} from '~/redux/slices/recipes-slice.ts';
import { selectInputValue, setInputValue, setSearchValue } from '~/redux/slices/search-slice.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

const { SearchErrorToast } = TOAST_MESSAGES;
const MIN_SEARCH_LENGTH = 3;

export const SearchInputWithFilter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [trigger] = useLazyGetRecipesWithFiltersQuery();
    const { toast } = useCustomToast();
    const searchQuery = useAppSelector(selectInputValue);
    const selectedAllergens = useAppSelector(selectSelectedAllergens);
    const filteredRecipes = useAppSelector(selectFilteredRecipes);
    const showEmptyText = useAppSelector(selectShowEmptyText);
    const dispatch = useAppDispatch();
    const [input, setInput] = useState(searchQuery);
    const params = useFilterQueryParams();

    const isSearchEnabled =
        input.trim().length >= MIN_SEARCH_LENGTH || selectedAllergens.length > 0;

    const getInputBorderColor = () => {
        if (showEmptyText) return 'red.500';
        if (filteredRecipes.length > 0) return 'lime.600';
        return undefined;
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.trim();
        setInput(newValue);
        dispatch(setSearchValue(newValue));

        if (newValue.length >= MIN_SEARCH_LENGTH) {
            dispatch(setInputValue(newValue));
        }
    };

    const handleSearch = async (
        e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>,
    ) => {
        if (e && 'key' in e && e.key !== 'Enter') return;

        dispatch(clearPage());
        dispatch(setIsFiltering(true));
        dispatch(setShowedEmptyText(false));

        try {
            const result = await trigger({ ...params, page: 1 }).unwrap();

            if (result?.data.length > 0) {
                dispatch(setFilteredRecipes(result.data));
                dispatch(setHasMore(1 < result.meta.totalPages));
            } else {
                dispatch(setFilteredRecipes([]));
                dispatch(setShowedEmptyText(true));
            }
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(SearchErrorToast);
            }
        } finally {
            dispatch(setIsFiltering(false));
        }
    };

    const handleOpenFilters = () => {
        onOpen();
    };

    return (
        <>
            <HStack spacing={2} align='center' w='100%' maxW={{ base: '448px', md: '518px' }}>
                <IconButton
                    variant='outline'
                    aria-label='Filter'
                    data-test-id={DATA_TEST_ID.FILTER_BUTTON}
                    fontSize='24px'
                    colorScheme='blackAlpha'
                    size={{ base: 'sm', md: 'lg' }}
                    width={{ base: '40px', md: '48px' }}
                    height={{ base: '40px', md: '48px' }}
                    icon={<FilterIcon />}
                    onClick={handleOpenFilters}
                />
                <InputGroup size={{ base: 'sm', md: 'lg' }} borderColor='blackAlpha.600'>
                    <Input
                        data-test-id={DATA_TEST_ID.SEARCH_INPUT}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleSearch}
                        borderColor={getInputBorderColor()}
                        placeholder={PLACEHOLDERS.SEARCH_INPUT}
                        _placeholder={{ color: 'lime.800', opacity: 1 }}
                    />
                    <InputRightElement>
                        <IconButton
                            data-test-id={DATA_TEST_ID.SEARCH_BUTTON}
                            variant='ghost'
                            aria-label='Поиск'
                            size='sm'
                            icon={<SearchIcon boxSize={{ base: '14px', xl: '18px' }} />}
                            onClick={handleSearch}
                            pointerEvents={!isSearchEnabled ? 'none' : 'auto'}
                        />
                    </InputRightElement>
                </InputGroup>
            </HStack>
            <FilterDrawer isOpen={isOpen} onClose={onClose} />
        </>
    );
};
