// controllers.js
const { translateText, detectLanguage, translateTextBatch, getLanguages  } = require('./services');
const NodeCache = require('node-cache');
const translationCache = new NodeCache({ stdTTL: 60 * 60 * 24 }); // Cache TTL set to 24 hours

const translateBatch = async (req, res) => {
  try {
    const { texts, from, to } = req.body; // Expecting an array of texts
    let translations;
    const englishCacheKey = 'en';

    // Check if the English texts are already cached
    let cachedEnglishTexts = translationCache.get(englishCacheKey);

    if (!cachedEnglishTexts) {
      // Cache the English texts if not already cached
      console.log('No cache exists for english.');
      if (from === 'en') {
        cachedEnglishTexts = texts;
      } else {
        cachedEnglishTexts = await translateTextBatch(texts, from, 'en');
      }
      console.log('English Text Cached: ' + cachedEnglishTexts);
      translationCache.set(englishCacheKey, cachedEnglishTexts);
    }

    // Translate from the cached English texts to the target language
    if (to === 'en') {
      translations = cachedEnglishTexts;
      console.log('Cached english copy was returned.');
    } else {
      const toCacheKey = `${to}`;
      translations = translationCache.get(toCacheKey);

      if (!translations) {
        translations = await translateTextBatch(cachedEnglishTexts, 'en', to);
        console.log('New translation requested for: ' + to);
        // Cache the new translations
        translationCache.set(toCacheKey, translations);
      } else {
         console.log('Cached translation returned: ' + toCacheKey);
      }
    }

    res.json({ translations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const translate = async (req, res) => {
  try {
    const { text, from, to } = req.body;
    const translationResult = await translateText(text, from, to);
    const translation = translationResult[0].translations[0].text;
    res.json({ translation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const detect = async (req, res) => {
  try {
    const { text } = req.body;
    const detectionResult = await detectLanguage(text);
    const language = detectionResult[0].language;
    res.json({ language });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupportedLanguages = async (req, res) => {
  try {
    const languages = await getLanguages();
    const translationLanguages = languages.translation;
    const languagesArray = Object.entries(translationLanguages);
    res.json(languagesArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { translate, detect, translateBatch, getSupportedLanguages };
