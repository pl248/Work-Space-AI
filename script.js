import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Klucz w zmiennych środowiskowych Vercel
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Tylko POST!" });
  }

  try {
    const { product, descriptionParams, ebookParams } = req.body;

    // 1. Generator ofert
    const salesOffer = await generateSalesOffer(product);
    
    // 2. Optymalizator cen
    const pricing = optimizePrice(product);
    
    // 3. Generator opisów produktów
    const productDescription = await generateProductDescription(product, descriptionParams);
    
    // 4. Generator eBooków
    const ebookContent = await generateEbook(ebookParams);

    res.status(200).json({ salesOffer, pricing, productDescription, ebookContent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Funkcje pomocnicze (te same co wcześniej)
async function generateSalesOffer(product) {
  const prompt = `Stwórz ofertę sprzedażową dla ${product.name}. Cechy: ${product.features?.join(", ") || "brak"}.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}

function optimizePrice(product) {
  const avgPrice = product.competitorPrices?.reduce((a, b) => a + b, 0) / product.competitorPrices?.length || 0;
  return {
    suggestedPrice: Math.max(avgPrice * 0.95, product.cost * 1.2).toFixed(2),
  };
}

async function generateProductDescription(product, params) {
  const prompt = `Napisz opis produktu ${product.name} (kategoria: ${params?.category || "inne"}). Słowa kluczowe: ${params?.keywords || "brak"}.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}

async function generateEbook(params) {
  const prompt = `Stwórz wstęp do eBooka "${params?.topic || "Brak tematu"}". Rozdziały: ${params?.chapters?.join(", ") || "brak"}. Ton: ${params?.tone || "neutralny"}.`;
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}