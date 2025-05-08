// src/components/MetaTags.jsx
import { Helmet } from 'react-helmet-async';

export default function MetaTags({ title, description }) {
  return (
    <Helmet>
      <title>{title || 'CampusConnect'}</title>
      <meta name="description" content={description || 'Mentorship platform'} />
    </Helmet>
  );
}
