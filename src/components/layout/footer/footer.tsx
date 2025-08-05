import { Flex, SearchIcon } from '@chakra-ui/icons';
import { Avatar, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { NavCircleButton } from '~/components/ui';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { AddRecipeFooterIcon } from '~/icons/footer-icons/add-recipe-footer-icon';
import { HomeIcon } from '~/icons/footer-icons/home-icon';
import { useGetUserInfoQuery } from '~/query/services/user/user-api';
import { buildImageUrl } from '~/utils/build-image-url';

export const Footer = () => {
    const navigate = useNavigate();
    const { data: userInfo } = useGetUserInfoQuery();

    if (!userInfo) return null;

    const handleGoHomeButtonClick = () => {
        navigate(PATHS.ROOT);
    };

    const handleWriteRecipeButtonClick = () => {
        navigate(PATHS.NEW_RECIPE);
    };

    const handleProfileButtonClick = () => {
        navigate(PATHS.PROFILE);
    };

    return (
        <Box as='footer' bg='lime.50' height='84px'>
            <Flex align='center' h='100%' justify='space-around'>
                <NavCircleButton
                    icon={<HomeIcon />}
                    label='Главная'
                    onClick={handleGoHomeButtonClick}
                    isPrimary
                />
                <NavCircleButton icon={<SearchIcon />} label='Поиск' />
                <NavCircleButton
                    icon={<AddRecipeFooterIcon color='black' />}
                    label='Записать'
                    onClick={handleWriteRecipeButtonClick}
                />
                <NavCircleButton
                    icon={
                        <Avatar
                            name={`${userInfo.firstName} ${userInfo.lastName}`}
                            src={buildImageUrl(userInfo?.photoLink)}
                            boxSize='40px'
                            borderRadius='full'
                        />
                    }
                    label='Мой профиль'
                    onClick={handleProfileButtonClick}
                    dataTestId={DATA_TEST_ID.FOOTER_PROFILE}
                />
            </Flex>
        </Box>
    );
};
