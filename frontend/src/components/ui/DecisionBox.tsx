import React, { useState } from "react";

export default function DecisionBox() {
  const [age, setAge] = useState(45);
  const [yearsWorked, setYearsWorked] = useState(20);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ age, years_worked: yearsWorked }),
      });
      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setResult("Fehler beim Abruf der Vorhersage.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 16, borderRadius: 8 }}>
      <h2 style={{ fontWeight: "bold", marginBottom: 12 }}>📊 Rentennähe vorhersagen - Decisiontree</h2>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="ageInput" style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}>
          Alter (Jahre)
        </label>
        <input
          id="ageInput"
          type="number"
          value={age}
          onChange={(e) => setAge(parseInt(e.target.value))}
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor="workInput" style={{ display: "block", fontWeight: "bold", marginBottom: 4 }}>
          Berufsjahre
        </label>
        <input
          id="workInput"
          type="number"
          value={yearsWorked}
          onChange={(e) => setYearsWorked(parseInt(e.target.value))}
          style={{ width: "100%", padding: 8, borderRadius: 4 }}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Wird berechnet..." : "Vorhersage abrufen"}
      </button>
      {result && <p style={{ marginTop: 12, fontWeight: "bold" }}>Ergebnis: {result}</p>}
    </div>
  );
}
