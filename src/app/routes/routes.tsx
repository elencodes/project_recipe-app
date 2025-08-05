import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

import { clearStateLoader } from '~/app/routes/utils/clear-state-loader.ts';
import { AuthLayout } from '~/layouts/auth-layout/auth-layout.tsx';
import { MainLayout } from '~/layouts/main-layout/main-layout.tsx';
import { ProtectedLayout } from '~/layouts/protected-layout/protected-layout.tsx';
import { JuiciestPage, MainPage, NotFoundPage, RecipeDetailsPage } from '~/pages';
import { BloggerPage } from '~/pages/blogger-page/blogger-page';
import { BlogsPage } from '~/pages/blogs-page/blogs-page';
import { CategoryPage } from '~/pages/category-page/category-page.tsx';
import { EditDraftPage } from '~/pages/edit-draft-page/edit-draft-page.tsx';
import { EditRecipePage } from '~/pages/edit-recipe-page/edit-recipe-page.tsx';
import { NewRecipePage } from '~/pages/new-recipe-page/new-recipe-page.tsx';
import { ProfilePage } from '~/pages/profile-page/profile-page.tsx';
import { RecoveryPage } from '~/pages/recovery-page/recovery-page.tsx';
import { SettingsPage } from '~/pages/settings-page/settings-page.tsx';
import { SignInPage } from '~/pages/sign-in-page/sign-in-page.tsx';
import { SignUpPage } from '~/pages/sign-up-page/sign-up-page.tsx';
import { VerifyEmailPage } from '~/pages/verify-email-page/verify-email-page.tsx';

import { PATHS } from './paths';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<ProtectedLayout />}>
                <Route element={<MainLayout />}>
                    <Route path={PATHS.ROOT} element={<MainPage />} loader={clearStateLoader} />
                    <Route
                        path={PATHS.JUICIEST}
                        element={<JuiciestPage />}
                        loader={clearStateLoader}
                    />
                    <Route
                        path={PATHS.CATEGORY_SUBCATEGORY}
                        element={<CategoryPage />}
                        loader={clearStateLoader}
                    />
                    <Route path={PATHS.RECIPE_DETAILS} element={<RecipeDetailsPage />} />
                    <Route path={PATHS.NEW_RECIPE} element={<NewRecipePage />} />
                    <Route path={PATHS.EDIT_RECIPE} element={<EditRecipePage />} />
                    <Route path={PATHS.EDIT_DRAFT} element={<EditDraftPage />} />
                    <Route path={PATHS.BLOGS} element={<BlogsPage />} />
                    <Route path={PATHS.BLOGGER} element={<BloggerPage />} />
                    <Route path={PATHS.PROFILE} element={<ProfilePage />} />
                    <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
                    <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
                    <Route path={PATHS.ERROR} element={<Navigate to={PATHS.NOT_FOUND} replace />} />
                </Route>
            </Route>
            <Route element={<AuthLayout />}>
                <Route path={PATHS.SIGN_IN} element={<SignInPage />}>
                    <Route path={PATHS.RECOVERY} element={<RecoveryPage />} />
                </Route>
                <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
                <Route path={PATHS.VERIFICATION} element={<VerifyEmailPage />} />
            </Route>
        </>,
    ),
    {
        basename: import.meta.env.BASE_URL,
    },
);

export default router;
