import {
    Heading,
    IconButton,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Stack,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { CloseIcon } from '~/icons/auth-icons/close-icon';

export type ResultModalProps = PropsWithChildren &
    ModalProps &
    Partial<{
        title: string;
        imageUrl: string;
        isClosable: boolean;
        dataTestId: string;
    }>;

export const ResultModal = ({
    children,
    title,
    imageUrl,
    onClose,
    isClosable = true,
    dataTestId,
    ...props
}: ResultModalProps) => (
    <Modal isCentered {...{ onClose }} {...props}>
        <ModalOverlay />
        <ModalContent
            data-test-id={dataTestId}
            maxW={{ base: '316px', md: '400px' }}
            py={4}
            borderRadius='16px'
        >
            <ModalHeader>
                {isClosable && (
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
                        data-test-id={DATA_TEST_ID.MODAL_CLOSE_BUTTON}
                    />
                )}

                <Stack align='center' gap={8}>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={title}
                            boxSize={{ base: '108px', md: '206px' }}
                        />
                    )}
                    {title && (
                        <Heading
                            as='h2'
                            fontSize='2xl'
                            textAlign='center'
                            flexDirection='column'
                            maxW='312px'
                            mt={imageUrl ? 0 : 5}
                        >
                            {title}
                        </Heading>
                    )}
                </Stack>
            </ModalHeader>
            {children}
        </ModalContent>
    </Modal>
);
