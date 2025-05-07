// A simple card to display resource info
export default function ResourceCard({ resource }) {
    return (
      <div className="resource-card">
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <p><strong>Type:</strong> {resource.type}</p>
        <p><strong>Semester:</strong> {resource.semester}</p>
        <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">Download</a>
        <p><small>Uploaded by: {resource.uploader?.name}</small></p>
      </div>
    );
  }
  