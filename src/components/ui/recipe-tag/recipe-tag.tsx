import { Image, Tag, TagLabel } from '@chakra-ui/react';
import { ReactNode } from 'react';

type RecipeTagProps = Partial<{
    category: string | number;
    iconSrc: string;
    bgColor: string;
    isIconRound: boolean;
    icon: ReactNode;
}>;

export const RecipeTag = ({
    category,
    iconSrc,
    bgColor = 'lime.150',
    isIconRound = false,
    icon,
}: RecipeTagProps) => (
    <Tag w='max-content' bgColor={bgColor} px={2} py={1} gap={1}>
        {icon}
        {iconSrc && (
            <Image
                src={iconSrc}
                alt={category != null ? String(category) : ''}
                w='17px'
                h='17px'
                rounded={isIconRound ? '50%' : '0'}
            />
        )}
        <TagLabel fontWeight={400} fontSize='sm'>
            {category}
        </TagLabel>
    </Tag>
);
