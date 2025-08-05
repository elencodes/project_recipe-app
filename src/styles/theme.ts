import { extendTheme } from '@chakra-ui/react';

type ThemeApp = ReturnType<typeof extendTheme>;

const breakpoints = {
    base: '0em', // 0px
    sm: '47.5em', // 768px
    md: '89.94em', // 1440px
    xl: '115em', // 1920px
};

const fonts = {
    inter: `'Inter', sans-serif`,
};

const fontSizes = {
    '12': '12px',
    '14': '14px',
    '16': '16px',
    '18': '18px',
    '20': '20px',
    '24': '24px',
    '30': '30px',
    '36': '36px',
    '48': '48px',
};

const fontWeights = {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
};

const lineHeights = {
    normal: 'normal',
    base: '143%',
};

const mainTheme: ThemeApp = extendTheme({
    colors: {
        lime: {
            50: '#FFFFD3',
            100: '#EAFFC7',
            150: '#D7FF94',
            300: '#C4FF61',
            400: '#B1FF2E',
            500: '#B1FF2E',
            600: '#2DB100',
            700: '#207E00',
            800: '#134B00',
        },
        progress: {
            500: '#C4FF61',
        },
    },
    breakpoints,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    styles: {
        global: {
            'html, body': {
                fontFamily: 'inter',
                color: 'black',
            },
            ':root': {
                fontSynthesis: 'none',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
            },
            '*, *::before, *::after': {
                boxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                MozOsxBoxSizing: 'border-box',
                padding: '0',
                margin: '0',
                border: '0',
            },
            html: {
                scrollBehavior: 'smooth',
            },
            a: {
                backgroundColor: 'transparent',
                textDecoration: 'none',
                _hover: {
                    textDecoration: 'none',
                },
            },
            'nav, main, footer, header, aside': {
                display: 'block',
            },
            'section, article': {
                mb: { base: '2rem', lg: '2.5rem' },
            },
        },
    },
    components: {
        Switch: {
            baseStyle: {
                track: {
                    bg: 'blackAlpha.300',
                    _checked: {
                        bg: 'lime.400',
                    },
                },
            },
        },
        Checkbox: {
            baseStyle: {
                control: {
                    borderColor: 'lime.150',
                    _checked: {
                        bg: 'lime.400',
                        color: 'black',
                        border: 'none',
                        _hover: { bg: 'lime.400' },
                    },
                },
                label: {
                    fontSize: 'xs',
                },
            },
        },
        Input: {
            baseStyle: {
                field: {
                    color: 'lime.800',
                    _placeholder: {
                        color: 'lime.800',
                    },
                    _focus: {
                        borderColor: 'lime.600',
                        boxShadow: 'none',
                    },
                    _invalid: {
                        borderColor: 'red.500',
                    },
                },
            },
            variants: {
                auth: {
                    field: {
                        bgColor: 'white',
                        border: '1px solid',
                        borderColor: 'lime.150',
                        color: 'lime.800',
                        _focus: {
                            borderColor: 'lime.700',
                        },
                        _placeholder: {
                            color: 'lime.800',
                        },
                        _invalid: {
                            borderColor: 'red.500',
                            boxShadow: '0 0 0 1px red.500',
                        },
                    },
                },
            },
        },
        Button: {
            variants: {
                dark: {
                    bgColor: 'blackAlpha.900',
                    fontWeight: 500,
                    color: 'white',
                    _hover: {
                        bgColor: 'blackAlpha.800',
                        _disabled: {
                            opacity: 0.8,
                            bgColor: 'blackAlpha.800',
                        },
                    },
                    _disabled: {
                        opacity: 0.8,
                        bgColor: 'blackAlpha.800',
                    },
                },
            },
        },
    },
});

export default mainTheme;
