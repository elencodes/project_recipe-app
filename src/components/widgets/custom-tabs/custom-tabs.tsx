import { Box, Tab, TabList, Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { ResponsiveRecipeGrid } from '~/components';
import { RecipesGrid } from '~/query/services/recipes/types';

type TabItem = {
    label: string;
    slug: string;
};

type CustomTabsProps = RecipesGrid & {
    tabs: TabItem[];
};

export const CustomTabs = ({ tabs, recipes }: CustomTabsProps) => {
    const { subcategory, category } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const foundIndex = tabs.findIndex((tab) => tab.slug === subcategory);
        if (foundIndex !== -1) {
            setTabIndex(foundIndex);
        }
    }, [subcategory, location.pathname, tabs]);

    const handleTabChange = (index: number) => {
        const selectedTab = tabs[index];
        setTabIndex(index);
        if (category && selectedTab?.slug) {
            navigate(`${PATHS.ROOT}${category}${PATHS.ROOT}${selectedTab.slug}`);
        }
    };

    return (
        <Tabs index={tabIndex} onChange={handleTabChange} variant='unstyled' width='100%'>
            <Box
                overflowX='auto'
                whiteSpace='nowrap'
                sx={{
                    '::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                }}
            >
                <TabList
                    borderBottom='2px solid'
                    borderColor='gray.200'
                    minWidth='max-content'
                    width='fit-content'
                    m='auto'
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            data-test-id={`tab-${tab.slug}-${index}`}
                            key={tab.slug}
                            fontWeight='500'
                            color='lime.800'
                            whiteSpace='nowrap'
                            _selected={{
                                color: 'lime.600',
                                borderBottom: '2px solid',
                                borderColor: 'lime.600',
                            }}
                            _focus={{ boxShadow: 'none' }}
                            px={4}
                            py={2}
                            flexShrink={0}
                        >
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>
            </Box>

            <Box pt={4}>
                <ResponsiveRecipeGrid recipes={recipes} />
            </Box>
        </Tabs>
    );
};
