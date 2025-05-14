import { useState } from 'react';
import { ActionIcon, Modal, TextInput, Button } from '@mantine/core';
import { IconShare } from '@tabler/icons-react';

export default function ShareButton({ postId }) {
  const [opened, setOpened] = useState(false);
  const shareUrl = `${window.location.origin}/post/${postId}`;

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Check this post!',
        url: shareUrl
      });
    } catch (err) {
      setOpened(true);
    }
  };

  return (
    <>
      <ActionIcon onClick={handleShare}>
        <IconShare size={18} />
      </ActionIcon>

      <Modal opened={opened} onClose={() => setOpened(false)} title="Share Post">
        <TextInput value={shareUrl} readOnly mb="md" />
        <Button 
          onClick={() => navigator.clipboard.writeText(shareUrl)}
          fullWidth
        >
          Copy Link
        </Button>
      </Modal>
    </>
  );
}
