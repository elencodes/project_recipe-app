import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Button, HStack, Menu, MenuButton, MenuList, Tag, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { AllergenInputGroup, CheckboxItem } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { Option } from '~/types/option-type';

type MultiSelectProps = {
    selected: string[];
    onChange: (values: string[]) => void;
    options: Option[];
} & Partial<{
    isDisabled: boolean;
    isCustomInputEnabled: boolean;
    placeholder: string;
    minWidth: { base: string; sm?: string; md: string } | string;
    dataTestId: string;
    isAllergens: boolean;
    tagDataTestId: string;
    maxHeight: string;
    maxVisibleTags: number;
    isInvalid: boolean;
}>;

export const MultiSelect = ({
    selected,
    onChange,
    options,
    isDisabled = false,
    isCustomInputEnabled = false,
    placeholder = `${PLACEHOLDERS.SELECT}`,
    minWidth = '269px',
    dataTestId = '',
    isAllergens = false,
    tagDataTestId = '',
    maxHeight,
    maxVisibleTags,
    isInvalid,
}: MultiSelectProps) => {
    const [newValue, setNewValue] = useState('');
    const visibleTags = !maxVisibleTags ? selected : selected.slice(0, maxVisibleTags);

    const handleToggle = (value: string) => {
        onChange(
            selected.includes(value)
                ? selected.filter((item) => item !== value)
                : [...selected, value],
        );
    };

    const handleAddCustom = () => {
        const trimmed = newValue.trim();
        if (trimmed && !selected.includes(trimmed)) {
            onChange([...selected, trimmed]);
            setNewValue('');
        }
    };

    const getBorderColor = ({
        isInvalid,
        isOpen,
        hasSelected,
    }: {
        isInvalid?: boolean;
        isOpen?: boolean;
        hasSelected?: boolean;
    }) => {
        if (isInvalid) return 'red.500';
        if (isOpen || hasSelected) return 'lime.300';
        return 'blackAlpha.200';
    };

    return (
        <Menu closeOnSelect={false} strategy='absolute' isLazy>
            {({ isOpen }) => (
                <>
                    <MenuButton
                        data-test-id={dataTestId}
                        as={Button}
                        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        minWidth={minWidth}
                        maxW={minWidth}
                        minH='40px'
                        h='auto'
                        textAlign='left'
                        variant='outline'
                        colorScheme='black'
                        px={maxVisibleTags && 3}
                        border={isInvalid ? '2px' : undefined}
                        borderColor={getBorderColor({
                            isInvalid,
                            isOpen,
                            hasSelected: !!selected.length,
                        })}
                        isDisabled={isDisabled}
                    >
                        {!selected.length || isDisabled ? (
                            <Text
                                fontWeight={400}
                                size='md'
                                maxW='100%'
                                noOfLines={1}
                                color='blackAlpha.700'
                            >
                                {placeholder}
                            </Text>
                        ) : (
                            <HStack wrap='wrap' py={2} spacing={!maxVisibleTags ? 3 : 1}>
                                {visibleTags.map((item) => {
                                    const label =
                                        options.find((opt) => opt.value === item)?.label || item;
                                    return (
                                        <Tag
                                            key={item}
                                            variant='outline'
                                            colorScheme='lime'
                                            color='lime.600'
                                            fontSize='xs'
                                            size='sm'
                                            data-test-id={tagDataTestId}
                                        >
                                            {label}
                                        </Tag>
                                    );
                                })}
                                {maxVisibleTags && selected.length > maxVisibleTags && (
                                    <Tag
                                        variant='outline'
                                        colorScheme='lime'
                                        color='lime.600'
                                        fontSize='xs'
                                        size='sm'
                                        data-test-id={`${tagDataTestId}-rest`}
                                    >
                                        +{selected.length - maxVisibleTags}
                                    </Tag>
                                )}
                            </HStack>
                        )}
                    </MenuButton>
                    <MenuList
                        data-test-id={DATA_TEST_ID.ALLERGENS_MENU}
                        borderTopRadius={0}
                        minWidth={minWidth}
                        maxHeight={maxHeight}
                        overflowY={maxHeight ? 'auto' : 'unset'}
                        zIndex={3}
                        p={0}
                    >
                        <VStack align='start' p={0} gap={0}>
                            {options.map(({ value, label }, index) => (
                                <CheckboxItem
                                    key={value}
                                    value={value}
                                    label={label}
                                    isChecked={selected.includes(value)}
                                    onCustomToggle={handleToggle}
                                    bgColor={index % 2 === 0 ? 'white' : 'blackAlpha.100'}
                                    px={2}
                                    py={1}
                                    dataTestId={
                                        isAllergens
                                            ? `${DATA_TEST_ID.ALLERGEN}${index}`
                                            : `${DATA_TEST_ID.CHECKBOX}${label.toLowerCase()}`
                                    }
                                />
                            ))}
                        </VStack>
                        {isCustomInputEnabled && (
                            <AllergenInputGroup
                                value={newValue}
                                onChange={setNewValue}
                                onAdd={handleAddCustom}
                            />
                        )}
                    </MenuList>
                </>
            )}
        </Menu>
    );
};
