// Przełączanie zakładek
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const selectedTab = e.target.dataset.tab;
    
    // Ukryj wszystkie sekcje
    document.querySelectorAll('.tool-card').forEach(section => {
      section.style.display = 'none';
    });

    // Pokaż wybraną sekcję
    document.getElementById(selectedTab).style.display = 'block';

    // Aktualizuj aktywny przycisk
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
  });
});

// Ustawienie domyślnie widocznej zakładki
document.querySelector('.tab-button').click();
