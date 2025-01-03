function generatePalette(baseHue, numColors = 5) {
    /**
     * Генерує гармонійну палітру кольорів на основі базового відтінку (Hue).
     * @param {number} baseHue - Базовий відтінок (значення 0-360).
     * @param {number} numColors - Кількість кольорів у палітрі.
     * @returns {string[]} - Масив кольорів у форматі HSL.
     */
    const palette = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (baseHue + (360 / numColors) * i) % 360; // Рівномірний інтервал по колірному колу
        palette.push(`hsl(${hue}, 80%, 50%)`); // Насиченість 80%, Яскравість 50%
    }
    return palette;
}

function displayPalette(palette) {
    /**
     * Відображає палітру кольорів у документі.
     * @param {string[]} palette - Масив кольорів у форматі HSL.
     */
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.margin = '20px 0';

    palette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.style.backgroundColor = color;
        colorBox.style.width = '100px';
        colorBox.style.height = '100px';
        colorBox.style.marginRight = '5px';
        container.appendChild(colorBox);
    });

    document.body.appendChild(container);
}

// Використання
const baseHue = 200; // Основний відтінок (наприклад, синій)
const palette = generatePalette(baseHue);
displayPalette(palette);
