// src/components/MentorReviews.jsx
import { useState, useEffect } from 'react';
import { Rating, Textarea, Button, Group, Card, Text } from '@mantine/core';
import axios from 'axios';

export default function MentorReviews({ mentorId }) {
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/api/mentor/${mentorId}/reviews`).then(res => setReviews(res.data));
  }, [mentorId]);

  const submitReview = async () => {
    await axios.post(`/api/mentor/${mentorId}/reviews`, { rating: value, comment });
    setReviews([...reviews, { rating: value, comment }]);
    setValue(0);
    setComment('');
  };

  return (
    <Card mt="lg">
      <Text weight={500}>Reviews</Text>
      {reviews.map((r, i) => (
        <Group key={i} mt="sm">
          <Rating value={r.rating} readOnly />
          <Text>{r.comment}</Text>
        </Group>
      ))}
      <Group mt="md">
        <Rating value={value} onChange={setValue} />
        <Textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Leave a review..." />
        <Button onClick={submitReview} disabled={!value || !comment}>Submit</Button>
      </Group>
    </Card>
  );
}
