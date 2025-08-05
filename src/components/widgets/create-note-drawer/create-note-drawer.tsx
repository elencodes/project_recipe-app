import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    HStack,
    Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { PLACEHOLDERS } from '~/constants/placeholders';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { StatusCodes, Statuses } from '~/query/constants/status-codes.ts';
import { useCreateNoteMutation } from '~/query/services/user/user-api.ts';
import { addNote } from '~/redux/slices/user-recipes-slice.ts';
import { NoteFormData, noteSchema } from '~/schemas/note-schema.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type CreateNoteDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateNoteDrawer = ({ isOpen, onClose }: CreateNoteDrawerProps) => {
    const [createNote] = useCreateNoteMutation();
    const dispatch = useDispatch();
    const { toast } = useCustomToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NoteFormData>({
        resolver: yupResolver(noteSchema),
    });

    const onSubmit = async (data: NoteFormData) => {
        try {
            const result = await createNote({ text: data.description }).unwrap();
            dispatch(
                addNote({
                    _id: result._id,
                    date: new Date().toISOString(),
                    text: result.text,
                }),
            );
            const message = TOAST_MESSAGES.CreateNoteToast[StatusCodes.CREATED];
            toast({ ...message, status: Statuses.SUCCESS });
            reset();
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                const message = TOAST_MESSAGES.CreateNoteToast[StatusCodes.INTERNAL_SERVER_ERROR];
                toast({ ...message });
            }
        } finally {
            onClose();
        }
    };

    return (
        <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent
                maxW={{ base: '344px', md: '424px' }}
                data-test-id={DATA_TEST_ID.FILTER_DRAWER}
            >
                <DrawerCloseButton
                    top={{ base: 4, md: 8 }}
                    right={{ base: 4, md: 8 }}
                    borderRadius='full'
                    bg='black'
                    size='sm'
                    color='white'
                    data-test-id={DATA_TEST_ID.CLOSE_FILTER_DRAWER}
                />
                <DrawerHeader pt={{ base: 4, md: 8 }} px={{ base: 4, md: 8 }}>
                    Новая заметка
                </DrawerHeader>
                <DrawerBody
                    px={{ base: 4, md: 8 }}
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '6px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0, 0, 0, 0.16)',
                            borderRadius: '8px',
                        },
                    }}
                >
                    <FormControl isInvalid={!!errors.description}>
                        <Textarea
                            {...register('description' as const)}
                            placeholder={PLACEHOLDERS.MAX_LENGTH_TEXTAREA}
                            _placeholder={{ color: 'blackAlpha.700', fontSize: 'sm' }}
                        />
                    </FormControl>
                </DrawerBody>
                <DrawerFooter flexDirection='column' px={{ base: 4, md: 8 }}>
                    <HStack spacing={2} py={4} flexWrap='wrap' w='100%' justify='end'>
                        <Button
                            size={{ base: 'sm', md: 'lg' }}
                            variant='solid'
                            bgColor='black'
                            color='white'
                            onClick={handleSubmit(onSubmit)}
                        >
                            Опубликовать
                        </Button>
                    </HStack>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
