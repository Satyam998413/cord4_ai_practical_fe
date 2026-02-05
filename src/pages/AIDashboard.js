import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../const/api";


const AIDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/image/generate`, { prompt });
      setImage(res.data.imageUrl);
      setVideo(null);
    } catch (err) {
      console.error("Error generating image:", err);
    } finally {
      setLoading(false);
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/about`);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const generateVideo = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const res = await axios.post(`${apiUrl}/video/generate`, {
        prompt,
        imageUrl: image,
      });
      setVideo(res.data.videoUrl);
    } catch (err) {
      console.error("Error generating video:", err);
    } finally {
      setLoading(false);
    }
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
              <video src={video} controls className="rounded-lg w-full" />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-4">
        Built with React, Node.js & AI
        <div>Data: {JSON.stringify(data)}</div>
      </footer>
    </div>
  );
};

export default AIDashboard;
