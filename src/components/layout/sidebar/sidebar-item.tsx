import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    Image,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import SidebarSubItem from '~/components/layout/sidebar/sidebar-sub-item.tsx';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { Category } from '~/types/category-type';
import { buildImageUrl } from '~/utils/build-image-url.ts';

type SidebarItemProps = {
    category: Category;
};

export const SidebarItem = ({ category }: SidebarItemProps) => {
    const navigate = useNavigate();

    const handleCategoryClick = () => {
        const firstSub = category.subCategories?.[0];
        if (firstSub) {
            navigate(`${PATHS.ROOT}${category.category}${PATHS.ROOT}${firstSub.category}`);
        }
    };

    return (
        <AccordionItem border='none'>
            <AccordionButton _expanded={{ bg: 'lime.100', fontWeight: 'bold' }} px={2} py={2}>
                <Flex
                    data-test-id={`${category.category === DATA_TEST_ID.VEGAN ? DATA_TEST_ID.VEGAN_CUISINE : category.category}`}
                    onClick={handleCategoryClick}
                    align='center'
                    flex='1'
                    gap={3}
                >
                    {category.icon && (
                        <Image
                            src={buildImageUrl(category.icon)}
                            alt={category.title}
                            w='24px'
                            h='24px'
                        />
                    )}
                    <Text textAlign='left'>{category.title}</Text>
                </Flex>
                <AccordionIcon />
            </AccordionButton>

            {category.subCategories && (
                <AccordionPanel px={0}>
                    {category.subCategories.map((sub) => (
                        <SidebarSubItem
                            key={sub._id}
                            label={sub.title}
                            slug={sub.category}
                            to={`${PATHS.ROOT}${category.category}${PATHS.ROOT}${sub.category}`}
                        />
                    ))}
                </AccordionPanel>
            )}
        </AccordionItem>
    );
};
