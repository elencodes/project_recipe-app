import { Checkbox } from '@chakra-ui/icons';
import { Box, BoxProps } from '@chakra-ui/react';

type CheckboxItemProps = {
    value: string;
    label: string;
    isChecked: boolean;
    onCustomToggle: (value: string) => void;
} & Partial<{
    bgColor: string;
    dataTestId: string;
}> &
    BoxProps;

export const CheckboxItem = ({
    value,
    label,
    isChecked,
    onCustomToggle,
    bgColor,
    dataTestId,
    ...boxProps
}: CheckboxItemProps) => (
    <Box w='100%' bgColor={bgColor} {...boxProps}>
        <Checkbox
            data-test-id={dataTestId}
            isChecked={isChecked}
            onChange={() => onCustomToggle(value)}
            size='sm'
            iconColor='black'
            sx={{
                '.chakra-checkbox__control': {
                    border: '2px solid',
                    borderColor: isChecked ? 'lime.400' : 'lime.150',
                    borderRadius: 'sm',
                    bg: isChecked ? 'lime.400' : 'transparent',
                    _checked: {
                        bg: 'lime.400',
                        borderColor: 'lime.400',
                    },
                },
            }}
        >
            {label}
        </Checkbox>
    </Box>
);
