import type { Recency } from "../types/Questionnaire";

export function invertRecency(recency: Recency) {
    const year = new Date().getFullYear();
    const cutoff = `${year - 5}-01-01`;

    if (recency === "recent") {
        return { lte: cutoff };
    }

    return { gte: cutoff };
}