import { useMediaQuery } from '@chakra-ui/react';

export const useScreenSize = () => {
    const [isDesktop] = useMediaQuery('(max-width: 1450px)');
    const [isTablet] = useMediaQuery('(max-width: 1439px)');
    const [isMobile] = useMediaQuery('(max-width: 767px)');

    return { isTablet, isMobile, isDesktop };
};
