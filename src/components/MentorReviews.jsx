import React, { useState, useEffect } from 'react';
import { Rating, Textarea, Button, Group, Card, Text, Stack, Divider } from '@mantine/core';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

export default function MentorReviews({ mentorId }) {
  const [reviews, setReviews] = useState([]);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/mentor/${mentorId}/reviews`)
      .then(res => setReviews(res.data))
      .catch(() => showNotification({ color: 'red', message: 'Failed to load reviews' }));
  }, [mentorId]);

  const submitReview = async () => {
    try {
      setLoading(true);
      await axios.post(`/api/mentor/${mentorId}/reviews`, { rating: value, comment });
      setReviews([...reviews, { rating: value, comment }]);
      setValue(0);
      setComment('');
      showNotification({ color: 'green', message: 'Review submitted' });
    } catch {
      showNotification({ color: 'red', message: 'Failed to submit review' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card mt="lg" shadow="sm" radius="md">
      <Text size="xl" weight={600} mb="md">Reviews</Text>
      
      {reviews.length === 0 && (
        <Text color="dimmed" mb="md">No reviews yet. Be the first to share your experience!</Text>
      )}

      <Stack spacing="md">
        {reviews.map((r, i) => (
          <div key={i}>
            <Group>
              <Rating value={r.rating} readOnly />
              <Text weight={500}>{r.rating}/5</Text>
            </Group>
            <Text mt="xs">{r.comment}</Text>
            {i < reviews.length - 1 && <Divider my="md" />}
          </div>
        ))}
      </Stack>

      <Stack mt="xl">
        <Rating value={value} onChange={setValue} size="lg" />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          minRows={3}
        />
        <Button 
          onClick={submitReview} 
          disabled={!value || !comment}
          loading={loading}
        >
          Submit Review
        </Button>
      </Stack>
    </Card>
  );
}

