export function invertLanguage(lang) {
    const alternatives = {
        en: ["fr", "es", "it", "de", "ko", "ja", "nl"],
        nl: ["en", "fr", "es", "de", "ko", "ja", "it"],
        fr: ["en", "es", "de", "it", "ko", "ja", "nl"],
        de: ["en", "es", "de", "it", "nl", "ko", "ja" ]
    };

    return alternatives[lang] ?? ["en"];
}