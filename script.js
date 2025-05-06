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
// Wspólna funkcja dla obu generatorów
async function generateContent(type, input, outputId) {
  const outputElement = document.getElementById(outputId);
  outputElement.textContent = "Generuję...";

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, data: input })
    });
    const result = await response.json();
    outputElement.textContent = result.result || result.error;
  } catch (error) {
    outputElement.textContent = "Błąd: " + error.message;
  }
}

// Podpięcie przycisków
document.getElementById("generate-desc-btn").addEventListener("click", () => {
  const link = document.getElementById("product-link").value;
  if (!link) return alert("Wpisz link produktu!");
  generateContent("description", link, "desc-output");
});

document.getElementById("generate-ebook-btn").addEventListener("click", () => {
  const topic = document.getElementById("ebook-topic").value;
  if (!topic) return alert("Wpisz temat e-booka!");
  generateContent("ebook", topic, "ebook-output");
});