import React, { useState } from "react";
import API from "../services/api";

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", title);
      form.append("artist", artist);
      form.append("year", year);
      form.append("description", description);
      form.append("theme", theme);
      form.append("tags", tags);
      for (let i = 0; i < files.length; i++) form.append("images", files[i]);

      await API.post("/artworks/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Uploaded Successfully!");
      // reset
      setTitle("");
      setArtist("");
      setYear("");
      setDescription("");
      setTheme("");
      setTags("");
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Admin Artwork Upload
      </h1>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <form onSubmit={submit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-3 border rounded"
          />
          <input
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Artist"
            className="w-full p-3 border rounded"
          />
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-full p-3 border rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border rounded"
          ></textarea>
          <input
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Theme"
            className="w-full p-3 border rounded"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tags,comma,separated"
            className="w-full p-3 border rounded"
          />
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded"
          >
            Upload Artwork
          </button>
        </form>
      </div>
    </div>
  );
}
