import { Center, Spinner } from '@chakra-ui/react';

type LoaderProps = {
    dataTestId: string;
    isSmall?: boolean;
};

export const Loader = ({ dataTestId, isSmall = false }: LoaderProps) => (
    <Center
        height={{ base: '134px', sm: isSmall ? '134px' : '206px' }}
        width={{ base: '134px', sm: isSmall ? '134px' : '206px' }}
        bgGradient='radial(50% 50% at 50% 50%, lime.300 0%, transparent  60%)'
        borderRadius='50%'
        border='none'
        outline='none'
        shadow='none'
    >
        <Spinner
            size={{ base: isSmall ? 'sm' : 'md', sm: isSmall ? 'md' : 'lg' }}
            color='black'
            data-test-id={dataTestId}
            thickness='2px'
            speed='0.6s'
            background='transparent'
        />
    </Center>
);
