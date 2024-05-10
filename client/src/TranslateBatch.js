// TranslateBatch.js
import React, { useState } from 'react';
import { Button, Form, Container, Card } from 'react-bootstrap';
import { translateBatch } from './api';
import { useLanguages } from './LanguageContext';

function TranslateBatch() {
  const [language, setLanguage] = useState('en');
  const [froLang, setFroLang] = useState('en');
  const { languages } = useLanguages();

  const handleTranslate = async () => {
    const elements = document.querySelectorAll('.translatable');
    const texts = Array.from(elements).map(element => element.textContent);

    try {
      const translations = await translateBatch(texts, froLang, language);
      elements.forEach((element, index) => {
        element.textContent = translations[index];
      });
      setFroLang(language);
    } catch (error) {
      console.error('Error translating batch:', error);
    }
  };

  return (
    <Container>
      <Card className="custom-card mt-3">
        <Card.Header as="h5">
          <Form>
              <Form.Group className="mb-3" controlId="languageSelect">
                <Form.Label>Select Language</Form.Label>
                <Form.Select value={language} onChange={e => setLanguage(e.target.value)} style={{ width: '150px' }}>
                {Array.isArray(languages) && languages.map(language => (
                  <option key={language.code} value={language.code}>
                    {language.name}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>
              <Button className="button-normal mt3" onClick={handleTranslate}>Translate</Button>
            </Form>
        </Card.Header>
        <Card.Body>
          <Card.Text className="translatable"></Card.Text>
          <Card.Text className="translatable">Welcome to our website!</Card.Text>
          <Card.Text className="translatable">Below you will find a short story demonstrating a batch translation using MS Azure Translation Services.</Card.Text>
          <Card.Text>Here is an Example of calling out a specific element which should NOT be translated.</Card.Text>
        </Card.Body>
      </Card>
      <Card className="custom-card mt-3">
        <Card.Body>
        <Card.Header as="h3" className="translatable">The Magical Rainbow Bridge</Card.Header>
        
        <Card.Text className="translatable">Once upon a time, in a colorful village named Rainbowville, there was a curious little girl named Lily. Lily had big, bright eyes and hair as golden as the sun. She loved exploring the wonders of her village, but there was one place she had never been – the mysterious forest at the edge of Rainbowville.
          One sunny morning, Lily decided it was time for an adventure. She put on her favorite rainbow-colored boots and set off towards the forest. As she approached, she noticed something unusual – a shimmering bridge made entirely of rainbows! </Card.Text>

          <Card.Text className="translatable">Lily couldn't believe her eyes. She had heard legends about the magical rainbow bridge but never thought it was real. Without a second thought, she stepped onto the bridge and felt a tingling sensation. The colors of the rainbow seemed to dance around her, filling her with joy and wonder.
          As she reached the other side, she found herself in a part of the forest she had never seen before. It was even more beautiful than she had imagined, with flowers that sparkled like gems and trees that whispered secrets in the wind.</Card.Text>

          <Card.Text className="translatable">Lily wandered deeper into the forest, marveling at its beauty. Suddenly, she heard a soft whimpering sound. Following the sound, she found a small, scared unicorn trapped in a thicket of thorny bushes.
          Without hesitation, Lily helped the unicorn free itself. The unicorn, grateful for her kindness, revealed that it was the guardian of the rainbow bridge. It explained that the bridge was a gateway to the magical part of the forest, which could only be seen by those with pure hearts.</Card.Text>

          <Card.Text className="translatable">The unicorn then offered to show Lily around the magical forest. Together, they explored enchanted meadows, danced with fairies, and even flew on the back of the unicorn over sparkling waterfalls.
          As the day came to an end, the unicorn led Lily back to the rainbow bridge. Before saying goodbye, the unicorn gave Lily a small rainbow-colored gem as a token of their friendship.</Card.Text>

          <Card.Text className="translatable">Lily returned home, her heart full of joy and her mind filled with wonderful memories. She knew that the magical rainbow bridge and the enchanted forest would always be there, waiting for her next adventure.
          From that day on, Lily often visited her unicorn friend, and they had many more magical adventures together. And the villagers of Rainbowville would often see a happy little girl with a rainbow-colored gem, reminding them of the magic that exists just beyond the edge of their village.
          And so, Lily and the unicorn lived happily ever after, in a world where magic was just a rainbow bridge away.</Card.Text>

          <Card.Text className="translatable">The end.</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TranslateBatch;
