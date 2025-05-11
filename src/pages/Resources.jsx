import React, { useEffect, useState } from 'react';
import {
  Container, Title, Card, TextInput, Select, FileInput, Button,
  Grid, Group, Stack, Text, LoadingOverlay, Paper
} from '@mantine/core';
import { IconUpload, IconSearch } from '@tabler/icons-react';
import { getResources, uploadResource } from '../api/resources';
import ResourceCard from '../components/ResourceCard';
import { showNotification } from '@mantine/notifications';

const validateForm = (form, file) => {
  if (!form.title.trim()) return "Title is required.";
  if (!form.description.trim()) return "Description is required.";
  if (!file) return "File is required.";
  if (file.size > 10 * 1024 * 1024) return "File size must be under 10MB.";
  return null;
};

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'NOTES',
    semester: '',
    subject: ''
  });
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch resources with optional search/filter
  const fetchResources = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {};
      if (search) params.q = search;
      if (filterType) params.type = filterType;
      const data = await getResources(token, params);
      setResources(data);
    } catch (err) {
      showNotification({ color: 'red', message: 'Failed to fetch resources' });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line
  }, [search, filterType]);

  // Handle form field changes
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // Handle upload form submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMsg = validateForm(form, file);
    if (validationMsg) {
      showNotification({ color: 'red', message: validationMsg });
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('file', file);
      await uploadResource(formData, token);
      showNotification({ color: 'green', message: 'Resource uploaded!' });
      setForm({ title: '', description: '', type: 'NOTES', semester: '', subject: '' });
      setFile(null);
      fetchResources(); // Refresh resource list after upload
    } catch (err) {
      showNotification({ color: 'red', message: 'Upload failed' });
    }
    setLoading(false);
  };

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="xl">Resource Library</Title>

      {/* Search & Filter */}
      <Paper withBorder shadow="sm" mb="xl" p="md">
        <Group spacing="md">
          <TextInput
            icon={<IconSearch size={16} />}
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1 }}
          />
          <Select
            data={[
              { value: '', label: 'All Types' },
              { value: 'NOTES', label: 'Notes' },
              { value: 'ASSIGNMENT', label: 'Assignment' },
              { value: 'LAB', label: 'Lab File' },
              { value: 'PYQ', label: 'PYQ' }
            ]}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by type"
            style={{ width: 180 }}
          />
          <Button onClick={fetchResources} variant="light">Search</Button>
        </Group>
      </Paper>

      {/* Upload Form */}
      <Paper withBorder shadow="sm" mb="xl" p="md">
        <Title order={4} mb="md">Upload New Resource</Title>
        <form onSubmit={handleSubmit}>
          <Grid gutter="md">
            <Grid.Col span={6}>
              <TextInput
                label="Title"
                value={form.title}
                onChange={handleChange('title')}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Type"
                data={[
                  { value: 'NOTES', label: 'Notes' },
                  { value: 'ASSIGNMENT', label: 'Assignment' },
                  { value: 'LAB', label: 'Lab File' },
                  { value: 'PYQ', label: 'PYQ' }
                ]}
                value={form.type}
                onChange={(value) => setForm({ ...form, type: value })}
                required
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Semester"
                value={form.semester}
                onChange={handleChange('semester')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Subject"
                value={form.subject}
                onChange={handleChange('subject')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <TextInput
                label="Description"
                value={form.description}
                onChange={handleChange('description')}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <FileInput
                label="File Upload"
                accept="application/pdf,image/*"
                icon={<IconUpload size={14} />}
                onChange={setFile}
                required
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Group position="right">
                <Button type="submit" loading={loading}>
                  Upload Resource
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Paper>

      {/* Resource List */}
      <LoadingOverlay visible={loading} />
      <Grid>
        {resources.length === 0 && (
          <Grid.Col span={12}>
            <Text align="center" color="dimmed">No resources found.</Text>
          </Grid.Col>
        )}
        {resources.map((resource) => (
          <Grid.Col key={resource.id} span={4}>
            <ResourceCard resource={resource} />
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}

