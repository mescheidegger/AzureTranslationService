// TranslateForm.js
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLanguages } from './LanguageContext';

function TranslateForm({ text, setText, fromLanguage, setFromLanguage, toLanguage, setToLanguage, handleTranslate }) {
  const { languages } = useLanguages();
  
  return (
    <Form onSubmit={handleTranslate}>
      <Form.Group className="mb-3" controlId="formFromLanguage">
        <Form.Label>From:</Form.Label>
        <Form.Select
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
        >
          {Array.isArray(languages) && languages.map(language => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formToLanguage">
        <Form.Label>To:</Form.Label>
        <Form.Select
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
        >
          {Array.isArray(languages) && languages.map(language => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formText">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </Form.Group>
      <Button className="button-normal" type="submit">
        Translate
      </Button>
    </Form>
  );
}

export default TranslateForm;
