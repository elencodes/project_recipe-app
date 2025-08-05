import { Note } from '~/query/services/blogs/types.ts';
import { Recipe } from '~/query/services/recipes/types.ts';

type MeasureUnits = {
    _id: string;
    name: string;
};

export type MeasureUnitsResponse = MeasureUnits[];

export type UserInfoResponse = {
    _id: string;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    recipesIds: string[];
    drafts: Partial<Recipe>[];
    subscriptions: string[];
    subscribers: string[];
    notes: Note[];
    totalSubscribers: number;
    photoLink?: string;
};

export type UserAllResponse = {
    id: string;
    login: string;
    firstName: string;
    lastName: string;
    photo: string;
};

export type StatisticItem = {
    date: string;
    count: number;
};

export type StatisticResponse = {
    likes: StatisticItem[];
    bookmarks: StatisticItem[];
    recommendationsCount: number;
    recipesWithRecommendations: Recipe[];
    totalLikes: number;
    totalBookmarks: number;
};

export type CreateNoteRequest = {
    text: string;
};

export type DeleteNoteResponse = {
    _id: string;
};

export type UpdateUserName = {
    firstName: string;
    lastName: string;
};

export type UpdatePasswordRequest = {
    password: string;
    newPassword: string;
};
