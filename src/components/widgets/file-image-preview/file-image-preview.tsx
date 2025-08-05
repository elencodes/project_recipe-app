import { Box, Image, useDisclosure } from '@chakra-ui/react';

import { FileUploadModal } from '~/components/widgets/file-upload-modal/file-upload-modal.tsx';
import { ImageIcon } from '~/icons/recipe-page-icons/image-icon';
import { buildImageUrl } from '~/utils/build-image-url.ts';

type FileImagePreviewProps = {
    value: string;
    onChange: (url: string) => void;
    dataTestId: string;
    dataTestIdModal: string;
} & Partial<{
    dataTestIdImage: string;
    isInvalid: boolean;
    isCardPreview: boolean;
}>;

export const FileImagePreview = ({
    value,
    onChange,
    isInvalid,
    isCardPreview,
    dataTestId,
    dataTestIdModal,
    dataTestIdImage,
}: FileImagePreviewProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUploadSuccess = (uploadedUrl: string) => {
        onChange(uploadedUrl);
    };

    const handleDeleteImage = () => {
        onChange('');
    };

    return (
        <>
            <Box
                h={isCardPreview ? { base: '160px', sm: '100%' } : { base: '224px', md: '410px' }}
                w={
                    isCardPreview
                        ? '100%'
                        : { base: '328px', sm: '232px', md: '353px', xl: '553px' }
                }
                bg='blackAlpha.200'
                rounded='md'
                display='flex'
                alignItems='center'
                justifyContent='center'
                cursor='pointer'
                onClick={onOpen}
                _hover={{ bg: 'blackAlpha.300' }}
                position='relative'
                border={isInvalid ? '2px' : undefined}
                borderColor={isInvalid ? 'red.500' : undefined}
                data-test-id={dataTestId}
            >
                {value ? (
                    <Image
                        src={buildImageUrl(value)}
                        alt='Preview'
                        objectFit='cover'
                        w='100%'
                        h='100%'
                        rounded='md'
                        data-test-id={dataTestIdImage}
                    />
                ) : (
                    <Box textAlign='center'>
                        <ImageIcon width='33px' height='28px' />
                    </Box>
                )}
            </Box>
            <FileUploadModal
                dataTestId={dataTestIdModal}
                isOpen={isOpen}
                onClose={onClose}
                onUploadSuccess={handleUploadSuccess}
                onDeleteImage={handleDeleteImage}
                imageSrc={value}
            />
        </>
    );
};
