import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router';

import router from '~/app/routes/routes.tsx';
import mainTheme from '~/styles/theme';

export const App: React.FC = () => (
    <ChakraProvider theme={mainTheme}>
        <RouterProvider router={router} />
    </ChakraProvider>
);
