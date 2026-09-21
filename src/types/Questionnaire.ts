export type Language = "en" | "nl" | "fr" | "de";

export type Recency = "recent" | "older";

export type Answers = {
    language: Language;
    genreId: number;
    recency: Recency;
};