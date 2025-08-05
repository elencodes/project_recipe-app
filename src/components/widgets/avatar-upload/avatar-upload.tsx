import {
    Avatar,
    Box,
    Button,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { CloseIcon } from '~/icons/auth-icons/close-icon';
import { ImageIcon } from '~/icons/recipe-page-icons/image-icon';
import { useUploadUserPhotoMutation } from '~/query/services/user/user-api.ts';
import { buildImageUrl } from '~/utils/build-image-url.ts';
import { getCroppedImg } from '~/utils/crop-image-to-canvas';

const { ServerErrorToast } = TOAST_MESSAGES;

export const AvatarUpload = ({ initialImage }: { initialImage?: string }) => {
    const { toast } = useCustomToast();
    const [uploadUserPhoto] = useUploadUserPhotoMutation();
    const [imageUrl, setImageUrl] = useState(initialImage);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result as string);
                onOpen();
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels);
    };

    const handleCropAndSave = async () => {
        if (selectedFile && croppedAreaPixels) {
            const croppedImage = await getCroppedImg(selectedFile, croppedAreaPixels);
            const formData = new FormData();
            formData.append('file', croppedImage);

            try {
                await uploadUserPhoto(formData).unwrap();
                setImageUrl(URL.createObjectURL(croppedImage));
                onClose();
            } catch {
                toast(ServerErrorToast);
            }
        }
    };

    const cropSize =
        useBreakpointValue({
            base: 108,
            md: 206,
        }) ?? 206;

    return (
        <Box position='relative' w='128px' h='128px'>
            <Avatar src={buildImageUrl(initialImage || imageUrl)} size='2xl' bg='blackAlpha.400'>
                <IconButton
                    icon={<ImageIcon w='12px' h='10px' />}
                    size='xs'
                    colorScheme='blackAlpha'
                    position='absolute'
                    bottom='5px'
                    right='5px'
                    borderRadius='full'
                    aria-label='Upload image'
                    onClick={() => inputRef.current?.click()}
                    outline='3px solid white'
                    bg='black'
                    color='lime.50'
                    _hover={{ bg: 'gray.700' }}
                />
            </Avatar>
            <Input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                display='none'
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent maxW={{ base: '316px', md: '390px' }} py={4}>
                    <ModalHeader px={{ base: 4, md: 8 }}>
                        <IconButton
                            aria-label='Close modal'
                            icon={<CloseIcon />}
                            position='absolute'
                            minW={6}
                            h={6}
                            top={5}
                            right={6}
                            lineHeight={0}
                            onClick={onClose}
                            variant='unstyled'
                            _hover={{
                                color: 'blackAlpha.700',
                            }}
                        />
                        <Heading as='h2' fontSize='2xl' textAlign='center' flexDirection='column'>
                            Изменить <br />
                            изображение профиля
                        </Heading>
                    </ModalHeader>
                    <ModalBody
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                        overflow='hidden'
                        py={4}
                    >
                        {selectedFile && (
                            <Cropper
                                image={selectedFile}
                                cropShape='round'
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                                showGrid={false}
                                style={{
                                    cropAreaStyle: {
                                        maxWidth: `${cropSize - 20}px`,
                                        maxHeight: `${cropSize - 20}px`,
                                        minWidth: `${cropSize - 20}px`,
                                        minHeight: `${cropSize - 20}px`,
                                        boxShadow: '0 0 0 9999em rgba(45, 177, 0, 0.5)',
                                    },
                                    mediaStyle: {
                                        width: `${cropSize}px`,
                                        height: `${cropSize}px`,
                                        objectFit: 'cover',
                                    },
                                    containerStyle: {
                                        width: `${cropSize}px`,
                                        height: `${cropSize}px`,
                                        position: 'relative',
                                    },
                                }}
                            />
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleCropAndSave} variant='dark' size='lg' w='100%'>
                            Кадрировать и сохранить
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
