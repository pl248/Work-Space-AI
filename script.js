// Mock funkcji AI (docelowo zastąpisz prawdziwym API)
const mockAI = {
  generateDescription: (link) => {
    return `🚀 Generated product description for: ${link}\n\n` +
      "🔹 High-quality material\n🔹 Fast shipping worldwide\n🔹 Dropshipping-friendly\n\n" +
      "📌 SEO-optimized description:\n" +
      "This premium product is perfect for your online store...";
  },

  generateEbook: (topic) => {
    return `📚 Generated ebook outline: "${topic}"\n\n` +
      "1. Introduction\n2. Key Concepts\n3. Practical Examples\n4. Conclusion\n\n" +
      "Word count: 1500 | Estimated pages: 10";
  }
};

// Obsługa przycisków
document.getElementById("generate-desc-btn").addEventListener("click", () => {
  const link = document.getElementById("product-link").value;
  if (!link) return alert("Please enter product link!");
  document.getElementById("desc-output").textContent = mockAI.generateDescription(link);
});

document.getElementById("generate-ebook-btn").addEventListener("click", () => {
  const topic = document.getElementById("ebook-topic").value;
  if (!topic) return alert("Please enter ebook topic!");
  document.getElementById("ebook-output").textContent = mockAI.generateEbook(topic);
});
/* Dodaj to na końcu pliku */
.tool-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

textarea {
  min-height: 100px;
  resize: vertical;
}