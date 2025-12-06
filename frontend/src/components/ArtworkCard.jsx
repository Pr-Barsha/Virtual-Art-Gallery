import React, { useState } from "react";
import ArtworkModal from "./ArtworkModal";

export default function ArtworkCard({ art }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded shadow overflow-hidden"
      >
        <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          {art.images && art.images[0] ? (
            <img
              src={art.images[0].url}
              alt={art.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-500">No Image</div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-bold">{art.title}</h3>
          <p className="text-sm text-gray-500 truncate">{art.artist}</p>
        </div>
      </div>
      {open && <ArtworkModal art={art} onClose={() => setOpen(false)} />}
    </>
  );
}
