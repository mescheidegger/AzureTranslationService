// Translate.js
import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import translateText from './api';
import TranslateForm from './TranslateForm';

function Translate() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');

  const handleTranslate = async (event) => {
    event.preventDefault();
    try {
      const translationResult = await translateText(text, fromLanguage, toLanguage);
      setTranslation(translationResult);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <Container>
      <Card className="custom-card mt-3">
            <Card.Header as="h3">Text Translation</Card.Header>
            <Card.Body>
              <Card.Title>Translate Text:</Card.Title>
              <TranslateForm
                text={text}
                setText={setText}
                fromLanguage={fromLanguage}
                setFromLanguage={setFromLanguage}
                toLanguage={toLanguage}
                setToLanguage={setToLanguage}
                handleTranslate={handleTranslate}
              />
              {translation && (
                <Card.Text className="mt-3">
                  <strong>Translation:</strong> {translation}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
    </Container>
  );
}

export default Translate;
