import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SubscriptionsState = {
    subscriptions: Record<string, boolean>;
};

const initialState: SubscriptionsState = {
    subscriptions: {},
};

export const subscriptionsSlice = createSlice({
    name: 'subscriptions',
    initialState,
    reducers: {
        toggleSubscription: (state, action: PayloadAction<string>) => {
            const userId = action.payload;
            state.subscriptions[userId] = !state.subscriptions[userId];
        },
        setSubscription: (
            state,
            {
                payload: { userId, isSubscribed },
            }: PayloadAction<{ userId: string; isSubscribed: boolean }>,
        ) => {
            state.subscriptions[userId] = isSubscribed;
        },
    },
    selectors: {
        selectSubscriptions: (state) => state.subscriptions,
    },
});

export const { toggleSubscription, setSubscription } = subscriptionsSlice.actions;
export const { selectSubscriptions } = subscriptionsSlice.selectors;
export const subscriptionsReducer = subscriptionsSlice.reducer;
