import { Text, VStack } from '@chakra-ui/react';

import { AvatarUpload } from '~/components/widgets/avatar-upload/avatar-upload';
import { UserSettingsForm } from '~/components/widgets/user-settings-form/user-settings-form';
import { UserInfoResponse } from '~/query/services/user/types';

type UserProfileSettingsSectionProps = {
    userInfo: UserInfoResponse;
};

export const UserProfileSettingsSection = ({ userInfo }: UserProfileSettingsSectionProps) => (
    <VStack alignItems={{ base: 'center', md: 'start' }} spacing={4} w='100%'>
        <Text w='100%' fontSize={{ base: 'lg', md: 'xl' }} fontWeight='600'>
            Авторизация и персонализация
        </Text>
        <AvatarUpload initialImage={userInfo.photoLink} />
        <UserSettingsForm userInfo={userInfo} />
    </VStack>
);
