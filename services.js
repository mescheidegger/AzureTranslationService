require('dotenv').config();
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const key = process.env.API_KEY;
const endpoint = process.env.ENDPOINT;
const location = process.env.REGION;

const translateTextBatch = async (texts, from, to) => {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': from,
                'to': to
            },
            data: texts.map(text => ({ text })),
            responseType: 'json'
        });

        return response.data.map(translation => translation.translations[0].text);
    } catch (error) {
        console.error(error);
        throw new Error('Batch translation failed');
    }
};

const translateText = async (text, from, to) => {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': from,
                'to': to
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Translation failed');
    }
};

const detectLanguage = async (text) => {
    try {
        const response = await axios({
            baseURL: endpoint,
            url: '/detect',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
            },
            data: [{
                'text': text
            }],
            responseType: 'json'
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Language detection failed');
    }
};

const getLanguages = async () => {
    try {
      const response = await axios({
        baseURL: endpoint,
        url: '/languages',
        method: 'get',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        },
        params: {
          'api-version': '3.0',
        },
        responseType: 'json'
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve supported languages');
    }
};  

module.exports = { translateText, detectLanguage, translateTextBatch, getLanguages };