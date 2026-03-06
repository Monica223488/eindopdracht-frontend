import {invertLanguage} from "./invertLanguage.js";
import {invertGenre} from "./invertGenre.js";
import {invertRecency} from "./invertRecency.js";
import {pickRandom} from "./pickRandom.js";

export function invertAnswers(answers) {
    const invertedLanguages = invertLanguage(answers.language);
    const invertedGenres = invertGenre(answers.genreId);
    const invertedRecency = invertRecency(answers.recency);

    return {
        language: pickRandom(invertedLanguages),
        genreId: pickRandom(invertedGenres),
        ...invertedRecency,
    };
}