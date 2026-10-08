export type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
};

export type Genre = {
    id: number;
    name: string;
};

export type MovieDetails = Movie & {
    release_date: string;
    runtime: number;
    vote_average: number;
    original_language: string;
    genres: Genre[];
    overview: string;
};