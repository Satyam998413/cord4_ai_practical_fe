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
      const res = await axios.get(`${apiUrl}/about`,{data});
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 text-white flex flex-col animate-fadeIn">

      {/* Header */}
      <header className="backdrop-blur-lg bg-white/10 border-b border-white/20 p-5 text-center text-xl font-semibold tracking-wide shadow-lg">
        🚀 AI Image → Video Generator
      </header>

      {/* Main */}
      <main className="flex-1 flex justify-center px-4 py-12">
        <div className="w-full max-w-3xl space-y-8">

          {/* Prompt Card */}
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 transition-all duration-500 hover:scale-[1.01]">

            <textarea
              className="w-full bg-transparent resize-none outline-none text-white placeholder-blue-200 text-lg"
              rows="3"
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={generateImage}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-400 transition-all duration-300 px-6 py-2 rounded-xl font-semibold shadow-lg disabled:opacity-50 hover:scale-105"
              >
                Generate Image
              </button>
            </div>
          </div>

          {/* Loading Animation */}
          {loading && (
            <div className="flex justify-center items-center space-x-3 animate-pulse">
              <div className="w-4 h-4 bg-blue-300 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
            </div>
          )}

          {/* Image Preview */}
          {image && (
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 space-y-6 animate-slideUp">
              <img
                src={image}
                alt="Generated"
                className="rounded-2xl max-h-[400px] mx-auto shadow-xl transition-all duration-500 hover:scale-105"
              />

              <div className="text-center">
                <button
                  onClick={generateVideo}
                  disabled={loading}
                  className="bg-indigo-500 hover:bg-indigo-400 transition-all duration-300 px-6 py-2 rounded-xl font-semibold shadow-lg disabled:opacity-50 hover:scale-105"
                >
                  Generate Video
                </button>
              </div>
            </div>
          )}

          {/* Video Preview */}
          {video && (
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 animate-fadeIn">
              <video
                src={video}
                controls
                className="rounded-2xl w-full shadow-lg"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-blue-200 py-6 border-t border-white/20 backdrop-blur-lg bg-white/10">
        Built with React, Node.js & AI ✨
        {/* <div className="mt-2 text-xs opacity-70">
          Data: {JSON.stringify(data)}
        </div> */}
      </footer>
    </div>
  );
};

export default AIDashboard;
