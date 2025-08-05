import { BlogsResponse, BlogUser, Note } from '~/query/services/blogs/types';

type RawNote = Note & { _id?: unknown };
type RawBlogUser = Omit<BlogUser, 'notes' | 'firstNoteText'> & { notes?: RawNote[] };
export type RawBlogsResponse = {
    favorites?: RawBlogUser[];
    others?: RawBlogUser[];
};

export function transformBlogsResponse(response: RawBlogsResponse): BlogsResponse {
    const cleanUser = (user: RawBlogUser): BlogUser => {
        const cleanedNotes: Note[] =
            user.notes?.map(({ text, date, _id }) => ({ text, date, _id })) ?? [];

        return {
            ...user,
            notes: cleanedNotes,
            firstNoteText: cleanedNotes[0]?.text || '',
        };
    };

    return {
        favorites: (response.favorites ?? []).map(cleanUser),
        others: (response.others ?? []).map(cleanUser),
    };
}
