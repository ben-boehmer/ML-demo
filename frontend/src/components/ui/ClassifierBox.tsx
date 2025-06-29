import React, { useState } from "react";

export default function ClassifierBox() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  }

  async function handleClassify() {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data.label);
    } catch (err) {
      setResult("Fehler bei der Klassifikation.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 12 }}>🐶🐱 Bildklassifikation - CNN</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && (
        <div style={{ marginTop: 12 }}>
          <img
            src={preview}
            alt="Vorschau"
            style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
          />
        </div>
      )}
      <button
        onClick={handleClassify}
        disabled={!image || loading}
        style={{ marginTop: 12 }}
      >
        {loading ? "Klassifiziere..." : "Katze oder Hund?"}
      </button>
      {result && (
        <p style={{ marginTop: 12, fontWeight: "bold" }}>
          Ergebnis: {result}
        </p>
      )}
    </div>
  );
}
