import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { PATHS } from '~/app/routes/paths.ts';
import { ResponsiveRecipeGrid, SectionWrapper } from '~/components';
import { DATA_TEST_ID } from '~/constants/data-test-ids';
import { TOAST_MESSAGES } from '~/constants/toast-messages.ts';
import { useCustomToast } from '~/hooks/use-custom-toast.tsx';
import { JUICIEST_PARAMS } from '~/query/constants/recipe-consts.ts';
import { useGetRecipesQuery } from '~/query/services/recipes/recipes-api.ts';
import { arrayHasItems } from '~/utils/array-has-items';

const { SearchErrorToast } = TOAST_MESSAGES;

export const JuiciestSection = () => {
    const navigate = useNavigate();
    const { toast } = useCustomToast();
    const { data, isError } = useGetRecipesQuery(JUICIEST_PARAMS);
    const juiciestItems = data?.data;

    const handleNavigate = () => {
        navigate(PATHS.JUICIEST);
    };

    useEffect(() => {
        if (isError) {
            toast(SearchErrorToast);
        }
    }, [isError, toast]);

    return arrayHasItems(juiciestItems) ? (
        <SectionWrapper
            title='Самое сочное'
            buttonLabel='Вся подборка'
            onButtonClick={handleNavigate}
            dataTestId={DATA_TEST_ID.JUICIEST_LINK}
            dataTestIdMob={DATA_TEST_ID.JUICIEST_LINK_MOB}
            isJuiciest
        >
            <ResponsiveRecipeGrid recipes={juiciestItems} />
        </SectionWrapper>
    ) : null;
};
