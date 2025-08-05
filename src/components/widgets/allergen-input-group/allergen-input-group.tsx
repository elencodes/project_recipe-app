import { AddIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import React, { useCallback } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { PLACEHOLDERS } from '~/constants/placeholders';

type AllergenInputGroupProps = {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
};

export const AllergenInputGroup = ({ value, onChange, onAdd }: AllergenInputGroupProps) => {
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                onAdd();
            }
        },
        [onAdd],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange],
    );

    return (
        <InputGroup size='sm' pl={4} pb={2} w='97%' alignItems='center'>
            <Input
                data-test-id={DATA_TEST_ID.ADD_OTHER_ALLERGEN}
                placeholder={PLACEHOLDERS.BUTTON_ADD_OTHER_ALLERGEN}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                _placeholder={{ color: 'lime.800', opacity: 1 }}
                borderColor='blackAlpha.200'
                color='lime.800'
            />
            <IconButton
                ml={2}
                minW='15px'
                minH='15px'
                h='12px'
                variant='solid'
                isRound
                onClick={onAdd}
                aria-label='Добавить аллерген'
                bgColor='lime.600'
                color='white'
                data-test-id={DATA_TEST_ID.ADD_ALLERGEN_BUTTON}
                icon={<AddIcon h='7px' w='7px' />}
            />
        </InputGroup>
    );
};
