"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

export default function PDFExtractor({ onExtract }: any) {
  const [error, setError] = useState("");

  async function handleFile(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ") + "\n";
      }

      onExtract(text);
    } catch (err) {
      console.log(err);
      setError("Failed to extract text");
    }
  }

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
