import 'swiper/css';
import 'swiper/css/navigation';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { PropsWithChildren } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { DATA_TEST_ID } from '~/constants/data-test-ids';

export const Carousel = ({ children }: PropsWithChildren) => {
    const swiperRef = useRef<SwiperRef>(null);

    const cardWidth = useBreakpointValue({
        base: '158px',
        md: '277px',
        xl: '322px',
    });

    const scrollLeft = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    const scrollRight = () => {
        swiperRef.current?.swiper.slideNext();
    };

    return (
        <Box
            width={{ base: '95%', sm: '100%' }}
            px={{ base: 0, xl: '10px' }}
            position={{ base: 'absolute', sm: 'relative' }}
        >
            <Swiper
                data-test-id={DATA_TEST_ID.CAROUSEL}
                ref={swiperRef}
                modules={[Navigation]}
                loop={true}
                navigation={false}
                speed={100}
                breakpoints={{
                    350: {
                        spaceBetween: 12,
                        slidesPerView: 'auto',
                    },
                    1560: {
                        spaceBetween: 24,
                        slidesPerView: 'auto',
                    },
                    1920: {
                        spaceBetween: 24,
                        slidesPerView: 4,
                    },
                }}
            >
                {children.map((child, idx) => (
                    <SwiperSlide
                        style={{
                            maxWidth: cardWidth,
                            height: 'auto',
                        }}
                        key={idx}
                        data-test-id={`${DATA_TEST_ID.CAROUSEL_CARD}${idx}`}
                    >
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
            <>
                <IconButton
                    display={{ base: 'none', md: 'block' }}
                    aria-label='Scroll left'
                    data-test-id={DATA_TEST_ID.CAROUSEL_BACK}
                    icon={<ArrowBackIcon color='white' />}
                    onClick={scrollLeft}
                    position='absolute'
                    fontSize='20px'
                    left='0'
                    top='40%'
                    transform='translateY(-50%)'
                    zIndex='1'
                    bg='black'
                    boxShadow='md'
                    borderLeftRadius={{ base: 0, '2xl': '6px' }}
                    borderRightRadius='0'
                    _hover={{ bg: 'gray.700' }}
                />
                <IconButton
                    display={{ base: 'none', md: 'block' }}
                    aria-label='Scroll right'
                    data-test-id={DATA_TEST_ID.CAROUSEL_FORWARD}
                    icon={<ArrowForwardIcon color='white' />}
                    onClick={scrollRight}
                    position='absolute'
                    fontSize='20px'
                    right='0'
                    top='40%'
                    transform='translateY(-50%)'
                    zIndex='1'
                    bg='black'
                    boxShadow='md'
                    borderRightRadius={{ base: 0, '2xl': '6px' }}
                    borderLeftRadius='0'
                    _hover={{ bg: 'gray.700' }}
                />
            </>
        </Box>
    );
};
