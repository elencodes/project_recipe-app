import { ResponsiveValue } from '@chakra-ui/icons';
import { chakra } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type FloatProps = PropsWithChildren &
    Partial<{
        top: ResponsiveValue<number>;
        left: ResponsiveValue<number>;
        right: ResponsiveValue<number>;
        bottom: ResponsiveValue<number>;
    }>;

export const Float = ({ children, top, left, right, bottom }: FloatProps) => (
    <chakra.div position='absolute' top={top} right={right} bottom={bottom} left={left}>
        {children}
    </chakra.div>
);
