// Obsługa generatora opisów
document.getElementById('generate-desc-btn').addEventListener('click', async () => {
  const link = document.getElementById('product-link').value;
  const output = document.getElementById('desc-output');
  
  if (!link) {
    output.textContent = 'Please enter a product link';
    return;
  }

  output.textContent = 'Generating description...';
  
  // Docelowo: Połączenie z OpenAI API
  const description = await mockOpenAIRequest('description', link);
  output.textContent = description;
});

// Funkcja mockująca OpenAI (tymczasowa)
async function mockOpenAIRequest(type, input) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (type === 'description') {
        resolve(`🔍 AI-generated description for: ${input}\n\n` +
                `• Premium quality\n• Fast shipping\n• Dropshipping friendly`);
      } else {
        resolve(`📚 E-book outline about: ${input}\n\n` +
                `1. Introduction\n2. Key Concepts\n3. Examples\n4. Conclusion`);
      }
    }, 1500); // Symulacja opóźnienia API
  });
}