// Додайте цей код до вашої компоненти або сторінки, де ви хочете показати результат
async function fetchData() {
    try {
      const response = await fetch('/api/data/route'); // Ваш новий шлях для API маршруту
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Data from API:', data);
  
      // Додаємо до DOM або виводимо інакше
      const resultElement = document.getElementById('apiResult');
      if (resultElement) {
        resultElement.textContent = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Викликаємо функцію при загрузці сторінки або події
  fetchData();
  