import { useState } from "react";

const apiUrl = "http://localhost:5000/api";

const AIDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState('https://images.pexels.com/photos/31256342/pexels-photo-31256342.jpeg?cs=srgb&dl=pexels-optical-chemist-340351297-31256342.jpg&fm=jpg');
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);

    const res = await fetch(`${apiUrl}/image/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setImage(data.imageUrl);
    setVideo(null);
    setLoading(false);
  };

  const generateVideo = async () => {
    setLoading(true);

    const res = await fetch(`${apiUrl}/video/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, imageUrl: image }),
    });

    const data = await res.json();
    setVideo(data.videoUrl);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 p-4 text-center text-lg font-semibold">
        AI Image → Video Generator
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-3xl space-y-6">
          
          {/* Prompt Box */}
          <div className="bg-gray-800 rounded-xl p-4 shadow">
            <textarea
              className="w-full bg-transparent resize-none outline-none text-gray-100 placeholder-gray-400"
              rows="3"
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={generateImage}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-md text-sm font-medium"
              >
                Generate Image
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-400 animate-pulse">
              AI is thinking...
            </div>
          )}

          {/* Image Preview */}
          {image && (
            <div className="bg-gray-800 rounded-xl p-4 shadow space-y-4">
              <img
                src={image}
                alt="Generated"
                className="rounded-lg max-h-[400px] mx-auto"
              />

              <div className="text-center">
                <button
                  onClick={generateVideo}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Generate Video
                </button>
              </div>
            </div>
          )}

          {/* Video Preview */}
          {video && (
            <div className="bg-gray-800 rounded-xl p-4 shadow">
              <video
                src={video}
                controls
                className="rounded-lg w-full"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4">
        Built with React, Node.js & AI
      </footer>
    </div>
  );
};

export default AIDashboard;
