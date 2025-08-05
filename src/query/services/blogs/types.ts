import { Recipe } from '../recipes/types';

export type BlogsBody = {
    currentUserId: string;
    limit?: string;
};

export type Note = {
    date: string;
    text: string;
    _id: string;
};

export type BlogUser = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
    firstNoteText?: string;
    photoLink?: string;
};

export type BloggerInfo = {
    bloggerInfo: {
        _id: string;
        email: string;
        login: string;
        firstName: string;
        lastName: string;
        recipesIds: string[];
        drafts: never[];
        subscribers: string[];
        photoLink?: string;
    };
    totalSubscribers: number;
    totalBookmarks: number;
    isFavorite: boolean;
};

export type BlogsResponse = {
    favorites: BlogUser[];
    others: BlogUser[];
};

export type RecipesByUserIdResponse = {
    recipes: Recipe[];
    notes: Note[];
    totalBookmarks: number;
    totalSubscribers: number;
    myBookmarks?: Recipe[];
};
