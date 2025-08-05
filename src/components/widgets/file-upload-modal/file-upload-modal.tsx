import {
    Box,
    Button,
    Flex,
    Heading,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { CloseIcon } from '~/icons/auth-icons/close-icon';
import { ImageIcon } from '~/icons/recipe-page-icons/image-icon';
import { useUploadFileMutation } from '~/query/services/file/file-api.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';
import { isRTKQueryError } from '~/utils/is-rtk-error.ts';

type FileUploadModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUploadSuccess: (imageUrl: string) => void;
    onDeleteImage?: () => void;
    dataTestId: string;
    imageSrc?: string;
};

type FormData = {
    file: FileList | null;
};

const { FileUploadErrorToast } = TOAST_MESSAGES;

export const FileUploadModal = ({
    isOpen,
    onClose,
    onUploadSuccess,
    onDeleteImage,
    dataTestId,
    imageSrc,
}: FileUploadModalProps) => {
    const [uploadFile, { isLoading }] = useUploadFileMutation();
    const { toast } = useCustomToast();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { register, handleSubmit, watch, reset } = useForm<FormData>();

    const file = watch('file')?.[0];
    const previewUrl = file ? URL.createObjectURL(file) : null;
    const hasExistingImage = !!imageSrc;
    const showImage = previewUrl || hasExistingImage;

    const onSubmit = async () => {
        if (!file) return;
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await uploadFile(formData).unwrap();
            if (response.url) {
                onUploadSuccess(response.url);
            }
        } catch (error: unknown) {
            if (isRTKQueryError(error)) {
                toast(FileUploadErrorToast);
            }
        } finally {
            handleClose();
        }
    };

    const handleClose = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        reset();
        onClose();
    };

    const handleDeleteImage = () => {
        if (onDeleteImage) {
            onDeleteImage();
        }
        handleClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent
                maxW={{ base: '316px', md: '400px' }}
                py={4}
                data-test-id={DATA_TEST_ID.RECIPE_IMAGE_MODAL}
            >
                <ModalHeader>
                    <IconButton
                        aria-label='Close modal'
                        icon={<CloseIcon />}
                        position='absolute'
                        minW={6}
                        h={6}
                        top={5}
                        right={6}
                        lineHeight={0}
                        onClick={handleClose}
                        variant='unstyled'
                        _hover={{
                            color: 'blackAlpha.700',
                        }}
                    />
                    <Heading
                        as='h2'
                        fontSize='2xl'
                        textAlign='center'
                        flexDirection='column'
                        mb={8}
                    >
                        Изображение
                    </Heading>
                    <ModalBody alignSelf='center'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box
                                w='206px'
                                h='206px'
                                mx='auto'
                                bg='blackAlpha.200'
                                rounded='md'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                cursor='pointer'
                                onClick={() => inputRef.current?.click()}
                                _hover={{ bg: 'blackAlpha.300' }}
                                position='relative'
                                data-test-id={DATA_TEST_ID.RECIPE_IMAGE_MODAL_BLOCK}
                            >
                                <Input
                                    type='file'
                                    accept='image/*'
                                    {...register('file')}
                                    ref={(e) => {
                                        register('file').ref(e);
                                        inputRef.current = e;
                                    }}
                                    display='none'
                                    data-test-id={dataTestId}
                                />
                                {showImage ? (
                                    <Image
                                        src={previewUrl || buildImageUrl(imageSrc)}
                                        alt='Preview'
                                        objectFit='cover'
                                        w='100%'
                                        h='100%'
                                        rounded='md'
                                        data-test-id={DATA_TEST_ID.RECIPE_IMAGE_MODAL_PREVIEW}
                                    />
                                ) : (
                                    <Box textAlign='center'>
                                        <ImageIcon width='33px' height='28px' />
                                    </Box>
                                )}
                            </Box>
                            <Flex mt={4} gap={2} direction='column'>
                                {(file || hasExistingImage) && (
                                    <>
                                        <Button
                                            w='100%'
                                            variant='dark'
                                            size='lg'
                                            type={file ? 'submit' : 'button'}
                                            isLoading={isLoading}
                                            loadingText='Загрузка...'
                                            onClick={file ? undefined : handleClose}
                                        >
                                            {file ? 'Сохранить' : 'Закрыть'}
                                        </Button>
                                        <Button
                                            w='100%'
                                            variant='ghost'
                                            colorScheme='dark'
                                            size='lg'
                                            onClick={handleDeleteImage}
                                        >
                                            Удалить
                                        </Button>
                                    </>
                                )}
                            </Flex>
                        </form>
                    </ModalBody>
                </ModalHeader>
            </ModalContent>
        </Modal>
    );
};
