// Detect.js
import React, { useState } from 'react';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';
import { detectLanguage } from './api';

function Detect() {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('');

    const handleDetect = async () => {
        if (text.length === 0) {
            setLanguage('');
            return;
        }
        try {
            const detectedLanguage = await detectLanguage(text);
            setLanguage(detectedLanguage);
        } catch (error) {
            console.error('Error detecting language:', error);
        }
    };

    return (
        <Container>
            <Card className="custom-card mt-3">
                        <Card.Header as="h3">Language Detection</Card.Header>
                        <Card.Body>
                            <Card.Title>Type text to detect its language</Card.Title>
                            <Form>
                                <Form.Group className="mb-3" controlId="formText">
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="button-normal" variant="primary" onClick={handleDetect}>
                                    Detect
                                </Button>
                            </Form>
                            {language && (
                                <Alert variant="success" className="mt-3">
                                    Detected Language: <strong>{language}</strong>
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
        </Container>
    );
}

export default Detect;
