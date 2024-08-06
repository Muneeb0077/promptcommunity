"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (promptId) {
      const getUserPrompt = async () => {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch prompt');
          }
          const data = await response.json();
          if (data && data.prompt && data.tag) {
            setPost({
              prompt: data.prompt,
              tag: data.tag,
            });
          } else {
            throw new Error('Invalid prompt data');
          }
        } catch (error) {
          console.error('Error fetching prompt:', error);
          setError('Failed to fetch prompt. Please try again.');
        }
      };
      getUserPrompt();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      setError('Prompt ID not found');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to update prompt');
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setError('Failed to update prompt. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p className="error-text">{error}</p>}
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default UpdatePrompt;
