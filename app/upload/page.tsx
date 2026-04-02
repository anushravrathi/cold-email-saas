"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    setData(result.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Upload Contacts</h1>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Upload CSV
      </button>

      {/* Preview */}
      <div className="mt-6">
        {data.map((row, i) => (
          <div key={i} className="text-sm">
            {row.name} - {row.email} - {row.company}
          </div>
        ))}
      </div>
    </div>
  );
}