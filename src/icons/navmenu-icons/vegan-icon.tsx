import { createIcon } from '@chakra-ui/react';

export const VeganIcon = createIcon({
    displayName: 'VeganIcon',
    path: (
        <>
            <rect width='24' height='24' fill='url(#pattern0_5011_9515)' />
            <defs>
                <pattern
                    id='pattern0_5011_9515'
                    patternContentUnits='objectBoundingBox'
                    width='1'
                    height='1'
                >
                    <use
                        xlinkHref='#image0_5011_9515'
                        transform='translate(0.125 0.125) scale(0.0078125)'
                    />
                </pattern>
                <image
                    id='image0_5011_9515'
                    width='96'
                    height='96'
                    preserveAspectRatio='none'
                    xlinkHref='data:image/png;base64,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'
                />
            </defs>
        </>
    ),
    defaultProps: {
        viewBox: '0 0 24 24',
        width: '24px',
        height: '24px',
    },
});
