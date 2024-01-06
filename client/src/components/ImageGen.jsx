
import React, { useState } from 'react';
import api from './api';

const ImageGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${api}`,
          },
          body: JSON.stringify({ inputs: inputText }),
        }
      );

      const blob = await response.blob();
      const imageUrl = window.URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
        background: 'linear-gradient(135deg, #ffffff, #b3e0ff, #ffccff)',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%', // Make the text area and button full width
        }}
      >
        <label
          style={{
            fontSize: '24px', // Adjust the font size as needed
            fontWeight: 'bold',
            marginBottom: '5px',
            color: '#333',
            fontFamily: "'Orbitron', sans-serif",
          }}
          htmlFor="inputText"
        >
          Describe Your Image
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <textarea
            style={{
              margin: '10px 0', // Add margin for better spacing
              padding: '8px',
              fontSize: '16px', // Adjust the font size as needed
              border: '1px solid #333',
              borderRadius: '4px',
              width: '100%', // Make the text area full width
              boxSizing: 'border-box', // Include padding and border in the width
              fontFamily: "'Poppins', sans-serif",
            }}
            id="inputText"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            style={{
              cursor: 'pointer',
              padding: '8px',
              fontSize: '16px', // Adjust the font size as needed
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontFamily: "'Rubik Maps', system-ui",
            }}
            onClick={generateImage}
          >
            Generate Image
          </button>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {loading && <div className="loading-bar"></div>}
        {imageSrc && !loading && (
          <img
            style={{
              width: '100%', // Make the image full width
              maxWidth: '400px', // Limit the maximum width if needed
              height: 'auto', // Maintain aspect ratio
              marginTop: '10px',
              borderRadius: '5px',
            }}
            src={imageSrc}
            alt="Generated Image"
          />
        )}
      </div>

      {/* Add the style tag for the loading bar */}
      <style>
        {`
          .loading-bar {
            width: 100%;
            height: 10px;
            background-color: #ddd;
            border-radius: 5px;
            margin-top: 10px;
            position: relative;
          }

          .loading-bar::after {
            content: '';
            display: block;
            width: 50%;
            height: 100%;
            background-color: #4CAF50;
            border-radius: 5px;
            animation: loadingAnimation 2s infinite;
          }

          @keyframes loadingAnimation {
            0% {
              width: 0%;
            }
            100% {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ImageGenerator;


