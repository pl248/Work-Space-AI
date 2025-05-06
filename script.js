document.addEventListener('DOMContentLoaded', function() {
  // Tab switching
  document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all tabs and buttons
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
      
      // Add active class to clicked button and corresponding tab
      button.classList.add('active');
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Language switching
  document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      // Here you would add language switching logic
      console.log('Switched language to:', button.getAttribute('data-lang'));
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const text = document.getElementById(targetId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    });
  });

  // Export buttons (simplified)
  document.querySelectorAll('.export-btn').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const text = document.getElementById(targetId).innerText;
      console.log('Would export to PDF:', text);
      alert('In a real implementation, this would export to PDF:\n\n' + text.substring(0, 100) + '...');
    });
  });

  // API Integration
  async function callAI(endpoint, data) {
    try {
      // In a real implementation, this would call your Vercel API endpoint
      console.log('Calling AI with:', { endpoint, data });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock responses based on endpoint
      switch(endpoint) {
        case 'generate-offer':
          return mockSalesOffer(data);
        case 'generate-shop-offer':
          return mockShopOffer(data);
        case 'generate-description':
          return mockProductDescription(data);
        case 'generate-ebook':
          return mockEbook(data);
        default:
          return "AI-generated content based on your request.";
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Mock response functions
  function mockSalesOffer(data) {
    return `🌟 **Special Offer: ${data.name || 'Your Product'}** 🌟

✅ Key Features:
${data.features ? data.features.split(',').map(f => `- ${f.trim()}`).join('\n') : '- High-quality materials\n- 2-year warranty\n- Free shipping'}

💡 Why choose us?
1. Best price guarantee
2. 30-day return policy
3. 24/7 customer support

🛒 Order now and get 15% OFF with code: WORKSPACE15`;
  }

  function mockShopOffer(data) {
    return `🛍️ **Complete Shop Offer for Product at ${data.link || 'Your Link'}**

📌 Product Highlights:
- Premium quality materials
- Competitive pricing (suggested: $${Math.floor(Math.random() * 50) + 50}.99)
- Fast delivery options

📦 Package Includes:
1. Main product
2. Accessories
3. User manual

💰 Pricing Strategy:
- MSRP: $${Math.floor(Math.random() * 100) + 100}.99
- Your price: $${Math.floor(Math.random() * 80) + 60}.99 (${Math.floor(Math.random() * 15) + 15}% margin)
- Suggested promotion: "Buy 2, Get 10% Off"

📢 Marketing Copy:
"Upgrade your experience with our top-rated product! Limited stock available at this exclusive price."`;
  }

  function mockProductDescription(data) {
    return `📝 **Professional Product Description**

${data.name || 'This product'} is designed to meet all your needs with exceptional quality and performance. 

🔹 Features:
- Durable ${data.category || 'high-quality'} construction
- User-friendly design
- Multi-functional use

💎 Benefits:
- Saves time and effort
- Enhances productivity
- Cost-effective solution

${data.keywords ? `🔎 SEO Keywords: ${data.keywords.split(',').join(', ')}` : ''}

Perfect for both professionals and home users looking for reliable performance. Order yours today!`;
  }

  function mockEbook(data) {
    return `📚 **E-book Outline: ${data.topic || 'Your Topic'}**

📖 Introduction:
Overview of the topic and why it matters.

${data.chapters ? data.chapters.split(',').map((chapter, i) => 
  `📌 Chapter ${i+1}: ${chapter.trim()}\n- Key concepts\n- Examples\n- Case studies`
).join('\n\n') : '📌 Chapter 1: Fundamentals\n- Key concepts\n- Examples\n- Case studies'}

🎯 Conclusion:
Summary and next steps for the reader.`;
  }

  // Event listeners for generate buttons
  document.getElementById('generate-offer-btn').addEventListener('click', async () => {
    const name = document.getElementById('offer-name').value;
    const features = document.getElementById('offer-features').value;
    
    if (!name) {
      alert('Please enter a product name');
      return;
    }
    
    const loadingElement = document.getElementById('offer-loading');
    const outputElement = document.getElementById('offer-output');
    
    loadingElement.style.display = 'block';
    outputElement.textContent = '';
    
    try {
      const result = await callAI('generate-offer', { name, features });
      outputElement.textContent = result;
    } catch (error) {
      outputElement.textContent = 'Error generating offer. Please try again.';
      console.error(error);
    } finally {
      loadingElement.style.display = 'none';
    }
  });

  // Shop offer generator
  document.getElementById('generate-shop-offer-btn').addEventListener('click', async () => {
    const link = document.getElementById('shop-link').value;
    
    if (!link) {
      alert('Please paste a product link');
      return;
    }
    
    const loadingElement = document.getElementById('shop-offer-loading');
    const outputElement = document.getElementById('shop-offer-output');
    
    loadingElement.style.display = 'block';
    outputElement.textContent = '';
    
    try {
      const result = await callAI('generate-shop-offer', { link });
      outputElement.textContent = result;
    } catch (error) {
      outputElement.textContent = 'Error generating shop offer. Please try again.';
      console.error(error);
    } finally {
      loadingElement.style.display = 'none';
    }
  });

  // Product description generator
  document.getElementById('generate-desc-btn').addEventListener('click', async () => {
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const keywords = document.getElementById('product-keywords').value;
    
    if (!name) {
      alert('Please enter a product name');
      return;
    }
    
    const loadingElement = document.getElementById('desc-loading');
    const outputElement = document.getElementById('desc-output');
    
    loadingElement.style.display = 'block';
    outputElement.textContent = '';
    
    try {
      const result = await callAI('generate-description', { name, category, keywords });
      outputElement.textContent = result;
    } catch (error) {
      outputElement.textContent = 'Error generating description. Please try again.';
      console.error(error);
    } finally {
      loadingElement.style.display = 'none';
    }
  });

  // E-book generator
  document.getElementById('generate-ebook-btn').addEventListener('click', async () => {
    const topic = document.getElementById('ebook-topic').value;
    const chapters = document.getElementById('ebook-chapters').value;
    
    if (!topic) {
      alert('Please enter an ebook topic');
      return;
    }
    
    const loadingElement = document.getElementById('ebook-loading');
    const outputElement = document.getElementById('ebook-output');
    
    loadingElement.style.display = 'block';
    outputElement.textContent = '';
    
    try {
      const result = await callAI('generate-ebook', { topic, chapters });
      outputElement.textContent = result;
    } catch (error) {
      outputElement.textContent = 'Error generating e-book. Please try again.';
      console.error(error);
    } finally {
      loadingElement.style.display = 'none';
    }
  });
});
