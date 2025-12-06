import React, { useEffect, useState } from "react";
import API from "../services/api";
import ArtworkCard from "./ArtworkCard";

export default function Gallery() {
  const [artworks, setArtworks] = useState([]);
  const [theme, setTheme] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/artworks", { params: { theme } });
        setArtworks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [theme]);

  return (
    <div className="min-h-screen px-4">
      <div className="flex justify-center mb-6">
        <select
          onChange={(e) => setTheme(e.target.value)}
          className="p-3 border rounded"
        >
          <option value="">All Themes</option>
          <option value="modern">Modern</option>
          <option value="classical">Classical</option>
          <option value="photography">Photography</option>
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-60 bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.length === 0 ? (
            <p className="col-span-full text-center">No artworks</p>
          ) : (
            artworks.map((a) => <ArtworkCard key={a._id} art={a} />)
          )}
        </div>
      )}
    </div>
  );
}
