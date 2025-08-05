import { VStack } from '@chakra-ui/react';

import { DeleteAccountSection } from '~/components/widgets/delete-account-section/delete-account-section.tsx';
import { UserProfileSettingsSection } from '~/components/widgets/user-profile-settings-section/user-profile-settings-section.tsx';
import { UserStatisticSection } from '~/components/widgets/user-statistic-section/user-statistic-section.tsx';
import { useGetUserInfoQuery } from '~/query/services/user/user-api.ts';

export const SettingsPage = () => {
    const { data: userInfo, isLoading } = useGetUserInfoQuery();

    if (!userInfo || isLoading) return null;

    return (
        <VStack my={5} spacing={6}>
            <UserProfileSettingsSection userInfo={userInfo} />
            <UserStatisticSection subscribers={userInfo.subscribers} />
            <DeleteAccountSection />
        </VStack>
    );
};
