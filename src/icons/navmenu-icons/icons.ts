import { ComponentWithAs, IconProps } from '@chakra-ui/react';

import { DessertsIcon } from './desserts-icon.tsx';
import { DrinksIcon } from './drinks-icon.tsx';
import { FirstCoursesIcon } from './first-courses-icon.tsx';
import { GrilsIcon } from './grils-icon.tsx';
import { KidsCoursesIcon } from './kids-courses-icon.tsx';
import { NationalIcon } from './national-icon.tsx';
import { PreparationsIcon } from './preparations-icon.tsx';
import { SaladsIcon } from './salads-icon.tsx';
import { SaucesIcon } from './sauces-icon.tsx';
import { SecondCoursesIcon } from './second-courses-icon.tsx';
import { SnacksIcon } from './snacks-icon.tsx';
import { TherapeuticNutritionIcon } from './therapeutic-nutrition-icon.tsx';
import { VeganIcon } from './vegan-icon.tsx';

export const icons: Record<string, ComponentWithAs<'svg', IconProps>> = {
    desserts: DessertsIcon,
    drinks: DrinksIcon,
    'main-dishes': SecondCoursesIcon,
    grill: GrilsIcon,
    child: KidsCoursesIcon,
    national: NationalIcon,
    preparations: PreparationsIcon,
    salads: SaladsIcon,
    sauces: SaucesIcon,
    soups: FirstCoursesIcon,
    snaks: SnacksIcon,
    health: TherapeuticNutritionIcon,
    vegan: VeganIcon,
} as const;

export type IconKey = keyof typeof icons;
