import { Box, CloseButton, Flex, Text, useToast, UseToastOptions } from '@chakra-ui/react';

import { DATA_TEST_ID } from '~/constants/data-test-ids.ts';
import { Statuses } from '~/query/constants/status-codes';
import { getToastBackgroundColor } from '~/utils/get-toast-background-color.ts';
import { getToastIcon } from '~/utils/get-toast-icon.tsx';

export const useCustomToast = () => {
    const toast = useToast();

    const baseToast = (options: UseToastOptions, centered = true, toastDuration = 15000) => {
        if (options.id && !toast.isActive(options.id)) {
            toast({
                status: Statuses.ERROR,
                duration: toastDuration,
                isClosable: true,
                position: 'bottom',
                containerStyle: {
                    width: '100%',
                    maxW: 424,
                    marginBottom: 20,
                    paddingX: 4,
                    mr: { base: 0, lg: centered ? 0 : '50%' },
                },
                render: ({ title, status = Statuses.ERROR, description, onClose }) => (
                    <Box
                        data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION}
                        bg={getToastBackgroundColor(status as Statuses)}
                        color='white'
                        p={3}
                        role='alert'
                    >
                        <Flex justify='space-between' gap={2}>
                            <Flex align='start' gap={4}>
                                <Box alignSelf='center' mb={1}>
                                    {getToastIcon(status as Statuses)}
                                </Box>
                                <Box>
                                    {title && (
                                        <Text
                                            data-test-id={DATA_TEST_ID.ERROR_NOTIFICATION_TITLE}
                                            fontWeight='bold'
                                        >
                                            {title}
                                        </Text>
                                    )}
                                    {description && (
                                        <Text
                                            data-test-id={
                                                DATA_TEST_ID.ERROR_NOTIFICATION_DESCRIPTION
                                            }
                                        >
                                            {description}
                                        </Text>
                                    )}
                                </Box>
                            </Flex>
                            <CloseButton
                                data-test-id={DATA_TEST_ID.CLOSE_ALERT_BUTTON}
                                size='sm'
                                onClick={onClose}
                            />
                        </Flex>
                    </Box>
                ),
                ...options,
            });
        }
    };

    baseToast.isActive = toast.isActive;

    return {
        toast: baseToast,
    };
};
