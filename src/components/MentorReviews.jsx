import React, { useState, useEffect } from 'react';
import { Rating, Textarea, Button, Card, Text, Stack, LoadingOverlay } from '@mantine/core';
import axios from 'axios';
import { showNotification } from '@mantine/notifications';

const API_URL = import.meta.env.VITE_API_URL;

export default function MentorReviews({ mentorId }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/mentors/${mentorId}/reviews`
        );
        setReviews(data);
      } catch (error) {
        showNotification({
          color: 'red',
          title: 'Error',
          message: 'Failed to load reviews'
        });
      } finally {
        setFetching(false);
      }
    };
    fetchReviews();
  }, [mentorId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/mentors/${mentorId}/reviews`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setReviews([...reviews, { rating, comment }]);
      setRating(0);
      setComment('');
      showNotification({
        color: 'green',
        title: 'Success',
        message: 'Review submitted successfully'
      });
    } catch (error) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Failed to submit review'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card withBorder radius="md" p="lg">
      <LoadingOverlay visible={fetching} />
      <Text size="xl" weight={600} mb="md">
        Mentor Reviews
      </Text>

      <Stack spacing="lg">
        {reviews.map((review, index) => (
          <div key={index}>
            <Rating value={review.rating} readOnly />
            <Text mt="xs">{review.comment}</Text>
          </div>
        ))}
      </Stack>

      <Stack mt="xl">
        <Rating value={rating} onChange={setRating} size="lg" />
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          minRows={3}
        />
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || comment.trim() === ''}
          loading={loading}
        >
          Submit Review
        </Button>
      </Stack>
    </Card>
  );
}

