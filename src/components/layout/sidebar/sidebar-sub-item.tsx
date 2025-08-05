import { Text } from '@chakra-ui/react';
import { NavLink, useMatch } from 'react-router';

import { DATA_TEST_ID } from '~/constants/data-test-ids';

import styles from './sidebar-sub-item.module.css';

type SidebarSubItemProps = {
    label: string;
    to: string;
    slug: string;
};

const SidebarSubItem = ({ label, to, slug }: SidebarSubItemProps) => {
    const match = useMatch(to);
    const isActive = !!match;

    return (
        <NavLink
            to={to}
            end
            data-test-id={isActive ? `${slug}${DATA_TEST_ID.ACTIVE_LINK}` : undefined}
            className={`${styles.subItem} ${isActive ? styles.active : ''}`}
        >
            <Text fontSize='md'>{label}</Text>
        </NavLink>
    );
};

export default SidebarSubItem;
