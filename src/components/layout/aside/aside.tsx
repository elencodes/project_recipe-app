import { Flex } from '@chakra-ui/icons';

import { WriteRecipeBtn } from '~/components/ui';
import { Stats } from '~/components/widgets';

export const Aside = () => (
    <Flex
        height='100%'
        pb='52px'
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        position='relative'
    >
        <Stats />
        <WriteRecipeBtn />
    </Flex>
);
