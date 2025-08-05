import { FormControl, FormLabel, HStack, Switch, VStack } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { MultiSelect, SearchInputWithFilter } from '~/components';
import { Loader } from '~/components/ui/loader/loader.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { useScreenSize } from '~/hooks/use-screen-size.tsx';
import { useAppSelector } from '~/redux/hooks.ts';
import {
    selectAllergens,
    selectIsExcludeEnabled,
    selectSelectedAllergens,
    setSelectedAllergens,
    toggleExcludeAllergens,
} from '~/redux/slices/allergens-slice.ts';
import { selectIsFiltering } from '~/redux/slices/recipes-slice.ts';

export const SearchGroup = () => {
    const dispatch = useDispatch();
    const { isTablet } = useScreenSize();

    const allergenOptions = useAppSelector(selectAllergens);
    const selectedOptions = useAppSelector(selectSelectedAllergens);
    const excludeAllergens = useAppSelector(selectIsExcludeEnabled);
    const isFiltering = useAppSelector(selectIsFiltering);

    const handleSelectChange = (values: string[]) => {
        dispatch(setSelectedAllergens(values));
    };

    const handleExcludeAllergensToggle = (checked: boolean) => {
        dispatch(toggleExcludeAllergens(checked));
    };

    if (isFiltering) {
        return <Loader dataTestId={DATA_TEST_ID.LOADER_SEARCH_BLOCK} isSmall />;
    }

    return (
        <VStack spacing={4} w='100%' p={2}>
            <SearchInputWithFilter />
            {!isTablet && !isFiltering && (
                <HStack align='center' w='100%' maxW={{ base: '448px', md: '518px' }}>
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel htmlFor='exclude-allergens' mb='0'>
                            {PLACEHOLDERS.BUTTON_EXCLUDE_ALLERGENS}
                        </FormLabel>
                        <Switch
                            data-test-id={DATA_TEST_ID.ALLERGENS_SWITCHER}
                            colorScheme='lime'
                            id='exclude-allergens'
                            isChecked={excludeAllergens}
                            onChange={(e) => handleExcludeAllergensToggle(e.target.checked)}
                        />
                    </FormControl>
                    <MultiSelect
                        isAllergens
                        selected={selectedOptions}
                        onChange={handleSelectChange}
                        options={allergenOptions}
                        isCustomInputEnabled
                        isDisabled={!excludeAllergens}
                        dataTestId={DATA_TEST_ID.ALLERGENS_MENU_BUTTON}
                    />
                </HStack>
            )}
        </VStack>
    );
};
