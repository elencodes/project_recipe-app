import { Card, CardBody, CardHeader, CardProps, HStack, IconButton, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { TrashIcon } from '~/icons/recipe-page-icons/trash-icon';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import { useDeleteNoteMutation } from '~/query/services/user/user-api.ts';
import { removeNote } from '~/redux/slices/user-recipes-slice.ts';
import { formatNoteDate } from '~/utils/format-note-date';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

export type BloggerNoteCardProps = {
    date: string;
    text: string;
    _id?: string;
    isUserPage?: boolean;
} & CardProps;

const { ServerErrorToast } = TOAST_MESSAGES;

export const BloggerNoteCard = ({ date, text, _id, isUserPage, ...rest }: BloggerNoteCardProps) => {
    const [deleteNote] = useDeleteNoteMutation();
    const dispatch = useDispatch();
    const { toast } = useCustomToast();

    const handleDelete = async () => {
        if (!_id) return;
        try {
            await deleteNote(_id).unwrap();
            dispatch(removeNote(_id));
            const message = TOAST_MESSAGES.CreateNoteToast[StatusCodes.OK];
            toast({ ...message, status: Statuses.SUCCESS });
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(ServerErrorToast);
            }
        }
    };

    return (
        <Card {...rest}>
            <CardHeader p={6} pb={4}>
                <HStack justifyContent='space-between'>
                    <Text
                        fontSize='sm'
                        color='lime.600'
                        data-test-id={DATA_TEST_ID.NOTES_CARD_DATE}
                    >
                        {formatNoteDate(date)}
                    </Text>
                    {isUserPage && (
                        <IconButton
                            aria-label='Удалить'
                            variant='ghost'
                            colorScheme='dark'
                            size={{ base: 'xs', md: 'md' }}
                            icon={<TrashIcon />}
                            onClick={handleDelete}
                            data-test-id={DATA_TEST_ID.USER_PROFILE_NOTE_DELETE_BTN}
                        />
                    )}
                </HStack>
            </CardHeader>
            <CardBody p={6} pt={0} pb={5}>
                <Text
                    fontSize='sm'
                    lineHeight={5}
                    letterSpacing='-0.8px'
                    data-test-id={DATA_TEST_ID.NOTES_CARD_TEXT}
                >
                    {text}
                </Text>
            </CardBody>
        </Card>
    );
};
