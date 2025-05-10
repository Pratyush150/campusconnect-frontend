// src/components/FeedbackSurvey.jsx
import React from 'react';
import { useState } from 'react';
import { Card, Rating, Textarea, Button, Text } from '@mantine/core';

export default function FeedbackSurvey({ onSubmit }) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  return (
    <Card>
      <Text weight={500} mb="sm">We value your feedback!</Text>
      <Rating value={rating} onChange={setRating} />
      <Textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="How was your experience?"
        mt="sm"
      />
      <Button mt="sm" onClick={() => onSubmit({ rating, feedback })} disabled={!rating || !feedback}>
        Submit
      </Button>
    </Card>
  );
}
