import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setLoading(true);
    setError('');
    setImageUrl('');

    try {
      const response = await axios.post('/api/generate-image', { prompt });
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      setError('Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt to generate image"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={generateImage} style={{ padding: '10px', marginLeft: '10px' }}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <div><img src={imageUrl} alt="Generated" style={{ marginTop: '20px', width: '50%' }} /></div>}
    </div>
  );
}
