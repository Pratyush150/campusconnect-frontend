import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getResources, uploadResource } from '../api/resources';
import ResourceCard from '../components/ResourceCard';

// Helper: Validate form fields before upload
const validateForm = (form, file) => {
  if (!form.title.trim()) return "Title is required.";
  if (!form.description.trim()) return "Description is required.";
  if (!file) return "File is required.";
  if (file.size > 10 * 1024 * 1024) return "File size must be under 10MB.";
  return null;
};

export default function Resources() {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'NOTES',
    semester: '',
    subject: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch resources with optional search/filter
  const fetchResources = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      // Pass search and type as query parameters
      const params = {};
      if (search) params.q = search;
      if (filterType) params.type = filterType;
      const data = await getResources(token, params);
      setResources(data);
    } catch (err) {
      setError('Failed to fetch resources');
    }
    setLoading(false);
  };

  // Fetch on mount and when search/filter changes
  useEffect(() => {
    fetchResources();
    // eslint-disable-next-line
  }, [search, filterType]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle upload form submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationMsg = validateForm(form, file);
    if (validationMsg) {
      setError(validationMsg);
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      formData.append('file', file);
      await uploadResource(formData, token);
      setSuccess('Resource uploaded!');
      setForm({ title: '', description: '', type: 'NOTES', semester: '', subject: '' });
      setFile(null);
      fetchResources(); // Refresh resource list after upload
    } catch (err) {
      setError('Upload failed');
    }
    setLoading(false);
  };

  return (
    <div className="resources-page">
      <h2>Resource Library</h2>

      {/* Search and Filter Controls */}
      <div className="search-filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by title or description..."
          style={{ flex: 1 }}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="NOTES">Notes</option>
          <option value="ASSIGNMENT">Assignment</option>
          <option value="LAB">Lab File</option>
          <option value="PYQ">PYQ</option>
        </select>
        <button onClick={fetchResources}>Search</button>
      </div>

      {/* Upload Form */}
      <form className="upload-form" onSubmit={handleSubmit} encType="multipart/form-data" style={{ marginBottom: '2rem' }}>
        <h3>Upload a Resource</h3>
        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
        {success && <p className="success" style={{ color: 'green' }}>{success}</p>}
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="NOTES">Notes</option>
          <option value="ASSIGNMENT">Assignment</option>
          <option value="LAB">Lab File</option>
          <option value="PYQ">PYQ</option>
        </select>
        <input name="semester" value={form.semester} onChange={handleChange} placeholder="Semester" />
        <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />
        <input type="file" accept="application/pdf,image/*" onChange={handleFileChange} required />
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload Resource"}</button>
      </form>

      {/* Resource List */}
      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div className="resource-list" style={{ display: 'grid', gap: '1rem' }}>
          {resources.length === 0 && <p>No resources found.</p>}
          {resources.map(resource => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}

