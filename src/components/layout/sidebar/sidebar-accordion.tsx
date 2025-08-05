import { Accordion } from '@chakra-ui/react';

import { useAppSelector } from '~/redux/hooks.ts';
import { selectCategories } from '~/redux/slices/category-slice.ts';

import { SidebarItem } from './sidebar-item.tsx';

export const SidebarAccordion = () => {
    const categories = useAppSelector(selectCategories);

    return (
        <Accordion allowToggle>
            {categories.map((category) => (
                <SidebarItem key={category._id} category={category} />
            ))}
        </Accordion>
    );
};
