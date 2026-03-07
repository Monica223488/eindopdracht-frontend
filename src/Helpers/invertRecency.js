export function invertRecency(recency) {
    const year = new Date().getFullYear();
    const cutoff = `${year - 5}-01-01`;

    if (recency === "recent") {
        return { lte: cutoff };
    }

    return { gte: cutoff };
}