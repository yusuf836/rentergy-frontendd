require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rule-based logic to generate energy-saving tips
function generateTips(appliances, hours, bill) {
  const tips = [];
  if (appliances > 5) {
    tips.push('You have many appliances; unplug devices not in use to reduce standby power.');
  }
  if (hours > 8) {
    tips.push('Your appliances run for long hours; try running them during off-peak hours to save costs.');
  } else {
    tips.push('Optimize appliance use by scheduling high-energy tasks during off-peak hours.');
  }
  if (bill > 100) {
    tips.push('Your bill is relatively high; switch to LED bulbs to cut lighting costs.');
  } else {
    tips.push('Use LED bulbs and smart power strips to maintain low energy costs.');
  }
  tips.push('Adjust your thermostat by 2°F to save energy without sacrificing comfort.');

  // Format as HTML
  return `<ul>${tips.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
}

// API endpoint to analyze user data and generate tips
app.post('/api/analyze', async (req, res) => {
  const { appliances, hours, bill, email } = req.body;

  // Input validation
  if (!appliances || !hours || !bill || !email) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (isNaN(appliances) || isNaN(hours) || isNaN(bill) || appliances < 0 || hours < 0 || bill < 0 || hours > 24) {
    return res.status(400).json({ error: 'Invalid input values' });
  }

  try {
    const tips = generateTips(appliances, hours, bill);
    res.json({ tips });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
