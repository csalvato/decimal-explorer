document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const decimalInput = document.getElementById('decimal-input');
  const visualizeBtn = document.getElementById('visualize-btn');
  const displayNumber = document.getElementById('display-number');
  const onesContainer = document.getElementById('ones-container');
  const tenthsContainer = document.getElementById('tenths-container');
  const hundredthsContainer = document.getElementById('hundredths-container');
  const thousandthsContainer = document.getElementById('thousandths-container');
  const explanationText = document.getElementById('explanation-text');

  // Initialize with default value
  visualizeDecimal(parseFloat(decimalInput.value));

  // Add event listeners
  visualizeBtn.addEventListener('click', () => {
    const decimalValue = parseFloat(decimalInput.value);
    visualizeDecimal(decimalValue);
  });

  // Also update on input change
  decimalInput.addEventListener('input', () => {
    if (decimalInput.value) {
      const decimalValue = parseFloat(decimalInput.value);
      if (!isNaN(decimalValue)) {
        visualizeDecimal(decimalValue);
      }
    }
  });

  function visualizeDecimal(number) {
    // Limit to 3 decimal places for visualization purposes
    const limitedNumber = parseFloat(number.toFixed(3));
    displayNumber.textContent = limitedNumber;

    // Clear previous visualization
    onesContainer.innerHTML = '';
    tenthsContainer.innerHTML = '';
    hundredthsContainer.innerHTML = '';
    thousandthsContainer.innerHTML = '';

    // Break down the number
    const wholePart = Math.floor(limitedNumber);

    // Extract place values more accurately
    // Get a string representation to handle decimal place correctly
    const numberStr = limitedNumber.toFixed(3);
    const parts = numberStr.split('.');

    // Extract each decimal digit
    const tenths = parts.length > 1 && parts[1].length >= 1 ? parseInt(parts[1][0]) : 0;
    const hundredths = parts.length > 1 && parts[1].length >= 2 ? parseInt(parts[1][1]) : 0;
    const thousandths = parts.length > 1 && parts[1].length >= 3 ? parseInt(parts[1][2]) : 0;

    // Create visual elements for whole units
    for (let i = 0; i < wholePart; i++) {
      const wholeElement = document.createElement('div');
      wholeElement.className = 'whole-piece';
      wholeElement.title = '1 whole (100% of the unit)';
      onesContainer.appendChild(wholeElement);
    }

    // Create a container specifically for the tenths to align them without gaps
    const tenthsGroup = document.createElement('div');
    tenthsGroup.className = 'tenths-group';

    // Only create the number of tenth pieces that exist in the number
    for (let i = 0; i < tenths; i++) {
      const tenthElement = document.createElement('div');
      tenthElement.className = 'tenth-piece';
      tenthElement.title = '0.1 (one tenth) - exactly 1/10th the width of a whole';
      tenthsGroup.appendChild(tenthElement);
    }

    tenthsContainer.appendChild(tenthsGroup);

    // Create visual elements for hundredths
    const hundredthsGroup = document.createElement('div');
    hundredthsGroup.className = 'hundredths-group';

    for (let i = 0; i < hundredths; i++) {
      const hundredthElement = document.createElement('div');
      hundredthElement.className = 'hundredth-piece';
      hundredthElement.title = '0.01 (one hundredth) - exactly 1/100th the size of a whole';
      hundredthsGroup.appendChild(hundredthElement);
    }

    hundredthsContainer.appendChild(hundredthsGroup);

    // Create visual elements for thousandths
    for (let i = 0; i < thousandths; i++) {
      const thousandthElement = document.createElement('div');
      thousandthElement.className = 'thousandth-piece';
      thousandthElement.title = '0.001 (one thousandth) - exactly 1/1000th the size of a whole';
      thousandthsContainer.appendChild(thousandthElement);
    }

    // Update explanation text
    generateExplanation(wholePart, tenths, hundredths, thousandths);
  }

  function generateExplanation(ones, tenths, hundredths, thousandths) {
    let explanation = '';

    explanation += `<p>Your number <strong>${ones}.${tenths}${hundredths}${thousandths}</strong> can be broken down like this:</p>`;
    explanation += '<ul>';

    if (ones > 0) {
      explanation += `<li><strong>${ones}</strong> whole${ones !== 1 ? 's' : ''} (${ones} × 1)</li>`;
    }

    if (tenths > 0) {
      explanation += `<li><strong>${tenths}</strong> tenth${tenths !== 1 ? 's' : ''} (${tenths} × 0.1) - each tenth is <strong>1/10</strong> the width of a whole</li>`;
    }

    if (hundredths > 0) {
      explanation += `<li><strong>${hundredths}</strong> hundredth${hundredths !== 1 ? 's' : ''} (${hundredths} × 0.01) - each hundredth is <strong>1/100</strong> the size of a whole</li>`;
    }

    if (thousandths > 0) {
      explanation += `<li><strong>${thousandths}</strong> thousandth${thousandths !== 1 ? 's' : ''} (${thousandths} × 0.001) - each thousandth is <strong>1/1000</strong> the size of a whole</li>`;
    }

    explanation += '</ul>';

    explanation += '<p>This means:</p>';
    let calculation = '';

    if (ones > 0) {
      calculation += `(${ones} × 1) `;
    }

    if (tenths > 0) {
      calculation += `+ (${tenths} × 0.1) `;
    }

    if (hundredths > 0) {
      calculation += `+ (${hundredths} × 0.01) `;
    }

    if (thousandths > 0) {
      calculation += `+ (${thousandths} × 0.001) `;
    }

    calculation = calculation.trim();
    if (calculation.startsWith('+')) {
      calculation = calculation.substring(1).trim();
    }

    explanation += `<p>${calculation} = ${ones}.${tenths}${hundredths}${thousandths}</p>`;

    // Add explanation about proportional sizes
    explanation += `<p>Notice how the pieces are proportionally sized:</p>`;
    explanation += `<ul>
      <li>A <strong>tenth</strong> (0.1) is exactly 1/10th the width of a whole</li>
      <li>A <strong>hundredth</strong> (0.01) is exactly 1/100th the area of a whole</li>
      <li>A <strong>thousandth</strong> (0.001) is even smaller, 1/1000th the area of a whole</li>
    </ul>`;

    explanation += `<p>In our place value system, as we move to the right of the decimal point, each position is worth 1/10th of the position to its left.</p>`;

    explanationText.innerHTML = explanation;
  }
});
