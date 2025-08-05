import { Flex } from '@chakra-ui/icons';
import { Image, Link as ChakraLink } from '@chakra-ui/react';
import { NavLink } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import logoIcon from '~/assets/icons/logo-icon-72.svg';
import logoText from '~/assets/icons/logo-text-72.svg';
import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';

type LogoProps = Partial<{
    size: 'base' | 'md';
    isHideText: boolean;
}>;

export const Logo = ({ size = 'base', isHideText = true }: LogoProps) => (
    <ChakraLink as={NavLink} to={PATHS.ROOT} data-test-id={DATA_TEST_ID.HEADER_LOGO}>
        <Flex alignItems='start' gap={2}>
            <Image src={logoIcon} alt='Logo' boxSize={size === 'md' ? '64px' : '32px'} />
            <Image
                src={logoText}
                alt='Logo text'
                maxWidth={size === 'md' ? '192px' : '96px'}
                display={{ sm: 'block', base: isHideText ? 'none' : 'block' }}
            />
        </Flex>
    </ChakraLink>
);
