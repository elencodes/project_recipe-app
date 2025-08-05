import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useScreenSize } from '~/hooks/use-screen-size';
import { ButtonArrowRightIcon } from '~/icons/button-icons/button-arrow-right-icon';

type SectionWrapperProps = {
    title: string;
    children: ReactNode;
} & Partial<{
    description: string;
    buttonLabel: string;
    onButtonClick: () => void;
    theme: 'light' | 'lime';
    dataTestId: string;
    dataTestIdMob: string;
    dataTestIdSection: string;
    isJuiciest: boolean;
}>;

export const SectionWrapper = ({
    title,
    description,
    buttonLabel,
    onButtonClick,
    theme = 'light',
    children,
    dataTestId,
    dataTestIdMob,
    dataTestIdSection,
    isJuiciest = false,
}: SectionWrapperProps) => {
    const { isTablet } = useScreenSize();

    return (
        <Box
            w='100%'
            pt={{ base: 4, sm: 6 }}
            borderRadius='16px'
            mt={theme === 'lime' ? 8 : 0}
            bg={theme === 'lime' ? 'lime.300' : 'white'}
            data-test-id={dataTestIdSection}
        >
            <Flex
                justify='space-between'
                align={{ base: 'start', sm: 'center' }}
                flexDir={{ base: 'column', sm: 'row' }}
                mb={4}
            >
                <Box>
                    <Heading
                        fontWeight='500'
                        fontSize={{
                            xl: theme === 'lime' ? '36px' : '48px',
                            md: '36px',
                            base: '24px',
                        }}
                        mb={description ? 1 : 0}
                        ml={{ base: 0, sm: 2 }}
                        px={theme === 'lime' ? '4' : '0'}
                    >
                        {title}
                    </Heading>
                    {description && (
                        <Text fontSize='sm' color='gray.600' maxW='540px'>
                            {description}
                        </Text>
                    )}
                </Box>
                {buttonLabel && (!isTablet || isJuiciest) && (
                    <Button
                        size='md'
                        bg={theme === 'lime' ? 'lime.300' : 'lime.400'}
                        onClick={onButtonClick}
                        rightIcon={<ButtonArrowRightIcon boxSize='16px' color='black' />}
                        display={{ base: 'none', md: 'block' }}
                        _hover={{ bg: 'lime.50' }}
                        data-test-id={dataTestId}
                    >
                        {buttonLabel}
                    </Button>
                )}
            </Flex>
            <Box>{children}</Box>

            <Flex p={4} justifyContent='center'>
                {buttonLabel && (isTablet || isJuiciest) && (
                    <Button
                        size='md'
                        bg={theme === 'lime' ? 'lime.300' : 'lime.400'}
                        onClick={onButtonClick}
                        rightIcon={<ButtonArrowRightIcon boxSize='16px' color='black' />}
                        data-test-id={dataTestIdMob}
                        display={{ base: 'flex', md: 'none' }}
                        alignItems='center'
                    >
                        {buttonLabel}
                    </Button>
                )}
            </Flex>
        </Box>
    );
};
