import React from "react";

export default function ArtworkModal({ art, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded max-w-4xl w-[90%] flex"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 p-4">
          {art.images && art.images[0] ? (
            <img
              src={art.images[0].url}
              alt={art.title}
              className="w-full h-[500px] object-contain"
            />
          ) : (
            <div>No Image</div>
          )}
        </div>
        <div className="w-96 p-6">
          <h2 className="text-2xl font-bold">{art.title}</h2>
          <p className="text-gray-500">
            {art.artist} • {art.year}
          </p>
          <p className="mt-4 text-gray-700">{art.description}</p>
          <button
            onClick={onClose}
            className="mt-6 bg-black text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
