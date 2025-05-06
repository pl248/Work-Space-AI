// === KLUCZ API ===
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // ← tu wklej swój prawdziwy klucz

// === Główna funkcja zapytań do OpenAI ===
async function openAIRequest(prompt) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4", // lub "gpt-3.5-turbo" jeśli nie masz GPT-4
      messages: [
        { role: "system", content: "Jesteś pomocnym asystentem e-commerce." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7
    })
  });

  const data = await response.json();

  if (data.error) {
    console.error(data.error);
    return "❌ Error generating content. Check your API key or input.";
  }

  return data.choices[0].message.content;
}

// === Obsługa generatora opisów produktów ===
document.getElementById('generate-desc-btn').addEventListener('click', async () => {
  const link = document.getElementById('product-link').value;
  const output = document.getElementById('desc-output');
  
  if (!link) {
    output.textContent = 'Please enter a product link';
    return;
  }

  output.textContent = 'Generating description...';

  const prompt = `Stwórz krótki, atrakcyjny opis produktu na podstawie tego linku lub nazwy: ${link}. 
Uwzględnij najważniejsze cechy i zalety.`;
  const description = await openAIRequest(prompt);
  output.textContent = description;
});

// === Obsługa generatora e-booków ===
document.getElementById('generate-ebook-btn').addEventListener('click', async () => {
  const topic = document.getElementById('ebook-topic').value;
  const output = document.getElementById('ebook-output');
  
  if (!topic) {
    output.textContent = 'Please enter a topic';
    return;
  }

  output.textContent = 'Generating e-book outline...';

  const prompt = `Przygotuj konspekt krótkiego e-booka na temat: "${topic}". 
Uwzględnij wstęp, główne rozdziały oraz zakończenie.`;
  const ebookContent = await openAIRequest(prompt);
  output.textContent = ebookContent;
});

// === Obsługa generatora ofert sprzedażowych ===
document.getElementById('generate-offer-btn').addEventListener('click', async () => {
  const input = document.getElementById('offer-link').value;
  const output = document.getElementById('offer-output');
  
  if (!input) {
    output.textContent = 'Please enter a product name or link';
    return;
  }

  output.textContent = 'Generating sales offer...';

  const prompt = `Stwórz gotową ofertę sprzedażową produktu "${input}" do użycia w sklepie internetowym lub ogłoszeniu.
Zawiera:
- chwytliwy nagłówek
- krótki opis korzyści
- listę cech
- wezwanie do działania (CTA)
Tekst ma być formatowany i gotowy do wklejenia.`;
  const offerContent = await openAIRequest(prompt);
  output.textContent = offerContent;
});
