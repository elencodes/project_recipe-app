import { Statuses } from '~/query/constants/status-codes.ts';

export const getToastBackgroundColor = (status: Statuses) => {
    switch (status) {
        case Statuses.SUCCESS:
            return 'green.500';
        case Statuses.ERROR:
            return 'red.500';
        default:
            return 'red.500';
    }
};
