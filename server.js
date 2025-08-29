require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const USER_FULL_NAME = (process.env.USER_FULL_NAME || 'john_doe').toLowerCase();
const USER_DOB = process.env.USER_DOB || '17091999';
const USER_EMAIL = process.env.USER_EMAIL || 'john@xyz.com';
const USER_ROLL = process.env.USER_ROLL || 'ABCD123';

function makeUserId() {

  return `${USER_FULL_NAME}_${USER_DOB}`;
}

function processInputArray(data) {
  if (!Array.isArray(data)) throw new Error('data must be an array');

  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = BigInt(0); 
  const letters = []; 

  data.forEach(raw => {
    const s = String(raw);

    if (/^\d+$/.test(s)) {
      const v = BigInt(s);
      sum += v;
      if (v % BigInt(2) === BigInt(0)) {
        even_numbers.push(s); 
      } else {
        odd_numbers.push(s);
      }
    }

    else if (/^[A-Za-z]+$/.test(s)) {
      alphabets.push(s.toUpperCase());

      s.split('').forEach(ch => letters.push(ch.toUpperCase()));
    }
    else {
      special_characters.push(s);
    }
  });

  const rev = letters.reverse();
  const concat_string = rev
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join('');

  return {
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string
  };
}

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body ?? {};
    if (data === undefined) {
      return res.status(400).json({
        is_success: false,
        message: "Request body must contain key 'data' with an array."
      });
    }

    const processed = processInputArray(data);

    const response = {
      is_success: true,
      user_id: makeUserId(),
      email: USER_EMAIL,
      roll_number: USER_ROLL,
      odd_numbers: processed.odd_numbers,
      even_numbers: processed.even_numbers,
      alphabets: processed.alphabets,
      special_characters: processed.special_characters,
      sum: processed.sum,
      concat_string: processed.concat_string
    };

    return res.status(200).json(response);
  } catch (err) {
    // Graceful error response
    return res.status(500).json({
      is_success: false,
      message: err.message || 'Internal server error'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`BFHL API listening on port ${PORT}`);
});
