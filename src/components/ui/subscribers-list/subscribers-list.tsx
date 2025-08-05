import { Grid } from '@chakra-ui/react';

import { SubscriberCard } from '~/components/ui/subscriber-card/subscriber-card.tsx';
import { UserAllResponse } from '~/query/services/user/types';

type SubscribersListProps = {
    users: UserAllResponse[];
};

export const SubscribersList = ({ users }: SubscribersListProps) => {
    if (!users.length) return null;

    return (
        <Grid
            templateColumns={{
                base: '1fr',
                sm: 'repeat(2, 1fr)',
                xl: 'repeat(3, 1fr)',
            }}
            gap={4}
            width='100%'
            maxW='100%'
            autoRows='1fr'
        >
            {users.map((user) => (
                <SubscriberCard key={user.id} {...user} />
            ))}
        </Grid>
    );
};
