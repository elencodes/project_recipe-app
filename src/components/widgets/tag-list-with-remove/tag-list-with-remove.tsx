import { HStack, Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { Option } from '~/types/option-type';

type TagListWithRemoveProps = {
    selected: string[];
    options: Option[];
    onRemove: (value: string) => void;
};

export const TagListWithRemove = ({ selected, options, onRemove }: TagListWithRemoveProps) => (
    <HStack spacing={4} pt={4} flexWrap='wrap' w='100%'>
        {selected.map((item) => {
            const label = options.find((opt) => opt.value === item)?.label || item;

            return (
                <Tag
                    key={item}
                    variant='outline'
                    bgColor='lime.100'
                    colorScheme='lime'
                    color='lime.600'
                    fontSize='xs'
                    size='sm'
                    data-test-id={DATA_TEST_ID.FILTER_TAG}
                >
                    <TagLabel>{label}</TagLabel>
                    <TagCloseButton onClick={() => onRemove(item)} />
                </Tag>
            );
        })}
    </HStack>
);
