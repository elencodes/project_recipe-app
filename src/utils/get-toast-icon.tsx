import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';

import { Statuses } from '~/query/constants/status-codes.ts';

export const getToastIcon = (status: Statuses) => {
    switch (status) {
        case Statuses.SUCCESS:
            return <CheckCircleIcon boxSize={5} />;
        case Statuses.ERROR:
        default:
            return <WarningIcon boxSize={5} />;
    }
};
