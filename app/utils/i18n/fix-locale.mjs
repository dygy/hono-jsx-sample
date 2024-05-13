import * as fs from "node:fs";

function getTranslation(langCode) {
    const fileData = fs
        .readFileSync(`./app/utils/i18n/dict/${langCode}.json`)
        .toString();
    return JSON.parse(fileData);
}

function setTranslation(langCode, translations) {
    fs.writeFileSync(
        `./app/utils/i18n/dict/${langCode}.json`,
        `${JSON.stringify(translations, void 0, 4)} \n`,
    );
}

function pickUtilityKeys(translation) {
    const res = {};

    for (const key of Object.keys(translation)) {
        if (key.startsWith("__")) res[key] = translation[key];
    }

    return res;
}

function processLanguages(path, obj, sourceLang = {}, keysCache = {}) {
    const result = pickUtilityKeys(sourceLang);

    // caching all keys from the sourceLang to restore it in case path was changed
    for (const key of Object.keys(sourceLang)) {
        if (typeof sourceLang[key] === "string") {
            keysCache[key] = sourceLang[key];
        }
    }

    for (const key of Object.keys(obj)
      .sort()) {
          const pathWithSep = path ? `${path}.` : "";
          const fullPath = `${pathWithSep}${key}`;
          if (Array.isArray(obj[key])) {
              result[key] = obj[key];
          } else if (typeof obj[key] === "object") {
              result[key] = processLanguages(
                  fullPath,
                  obj[key],
                  sourceLang[key],
                  keysCache,
              );
          } else {
              if (sourceLang[key] === void 0) {
                  console.log("key not found", fullPath, obj[key]);
              }
              result[key] =
                  (sourceLang[key]) ?? obj[key];
          }
      }

    return result;
}

function fixNamespace() {
    const files = fs.readdirSync("./app/utils/i18n/dict")
    const keysCache = {};
    for (const el of files) {
        keysCache[el.replace(".json", "")] = {}
    }

    const translationByLang = {};

    for (const lang of Object.keys(keysCache)) {
        translationByLang[lang] = getTranslation(lang)
    }

    if (!translationByLang.en) {
        throw new Error("ENGLISH PLS")
    }

    for (const lang of Object.keys(translationByLang)) {
        console.log(`ordering ${lang} keys`);
        const newLang = processLanguages(
          "",
          translationByLang.en,
          translationByLang[lang],
          keysCache[lang],
        );
        console.log(`${lang} keys ordered`);
        setTranslation(lang, newLang);
    }
}

fixNamespace();
