export function invertLanguage(lang) {
    const alternatives = {
        en: ["fr", "es", "it", "de", "ko", "ja"],
        nl: ["en", "fr", "es"],
        fr: ["en", "es", "de"],
    };

    return alternatives[lang] ?? ["en"];
}