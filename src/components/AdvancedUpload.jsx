// src/components/AdvancedUpload.jsx
import React from 'react';
import { useState } from 'react';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { Button, Group, Text, Image, Loader } from '@mantine/core';
import { IconUpload, IconPhoto } from '@tabler/icons-react';

export default function AdvancedUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDrop = (files) => {
    setFile(files[0]);
    setPreview(URL.createObjectURL(files[0]));
  };

  const handleUpload = async () => {
    setLoading(true);
    await onUpload(file);
    setLoading(false);
    setFile(null);
    setPreview('');
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={[MIME_TYPES.pdf, MIME_TYPES.png, MIME_TYPES.jpeg]}
        maxSize={10 * 1024 * 1024}
        multiple={false}
      >
        {(status) => (
          <Group position="center" spacing="xl" style={{ minHeight: 120, pointerEvents: 'none' }}>
            <IconUpload size={40} />
            <div>
              <Text size="xl" inline>
                Drag file here or click to select
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                PDF, PNG, JPG up to 10MB
              </Text>
            </div>
          </Group>
        )}
      </Dropzone>
      {preview && (
        <Image src={preview} alt="preview" width={200} mt="md" />
      )}
      {file && (
        <Button onClick={handleUpload} loading={loading} mt="md">
          Upload
        </Button>
      )}
    </div>
  );
}
