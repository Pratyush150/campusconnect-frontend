// src/components/AdvancedUpload.jsx
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloudinary } from '@cloudinary/url-gen';

export default function AdvancedUpload() {
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async ([file]) => {
    // Generate preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'campusconnect_uploads');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: 'POST',
        body: formData,
        onUploadProgress: (progress) => {
          setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
        }
      }
    );
    
    const data = await response.json();
    console.log('Uploaded URL:', data.secure_url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
      <input {...getInputProps()} />
      
      {preview ? (
        <img src={preview} alt="Preview" className="preview-image" />
      ) : (
        <div className="upload-prompt">
          {isDragActive ? (
            <p>Drop files here!</p>
          ) : (
            <p>Drag & drop files here, or click to select</p>
          )}
          {uploadProgress > 0 && (
            <div className="progress-bar">
              <div style={{ width: `${uploadProgress}%` }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
