import React from "react";
import Gallery from "../components/Gallery";

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">
          Welcome to the{" "}
          <span className="text-purple-600">Virtual Art Gallery</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Explore artworks uploaded by creators.
        </p>
      </div>

      <Gallery />
    </div>
  );
}
