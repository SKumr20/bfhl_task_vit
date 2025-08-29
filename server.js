const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Your personal details from environment variables
const USER_DETAILS = {
    user_id: process.env.USER_ID || "john_doe_17091999", // Format: firstname_lastname_ddmmyyyy
    email: process.env.USER_EMAIL || "john@xyz.com", // Your email
    roll_number: process.env.ROLL_NUMBER || "ABCD123" // Your college roll number
};

// Helper function to check if a character is a number
const isNumber = (char) => /^\d+$/.test(char);

// Helper function to check if a character is an alphabet
const isAlphabet = (char) => /^[a-zA-Z]+$/.test(char);

// Helper function to check if a character is a special character
const isSpecialChar = (char) => !/^[a-zA-Z0-9]+$/.test(char);

// Main processing function
const processData = (data) => {
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const allAlphabets = [];

    data.forEach(item => {
        const str = item.toString();
        
        if (isNumber(str)) {
            const num = parseInt(str);
            if (num % 2 === 0) {
                evenNumbers.push(str);
            } else {
                oddNumbers.push(str);
            }
            sum += num;
        } else if (isAlphabet(str)) {
            alphabets.push(str.toUpperCase());
            // Collect all alphabetical characters for concatenation
            for (let char of str) {
                if (isAlphabet(char)) {
                    allAlphabets.push(char);
                }
            }
        } else if (isSpecialChar(str)) {
            specialCharacters.push(str);
        } else {
            // Handle mixed strings (like "ABcD")
            for (let char of str) {
                if (isAlphabet(char)) {
                    allAlphabets.push(char);
                } else if (isSpecialChar(char)) {
                    specialCharacters.push(char);
                }
            }
            if (str.match(/[a-zA-Z]/)) {
                alphabets.push(str.toUpperCase());
            }
        }
    });

    // Create concatenation string with alternating caps in reverse order
    let concatString = '';
    const reversedAlphabets = allAlphabets.reverse();
    reversedAlphabets.forEach((char, index) => {
        if (index % 2 === 0) {
            concatString += char.toUpperCase();
        } else {
            concatString += char.toLowerCase();
        }
    });

    return {
        is_success: true,
        ...USER_DETAILS,
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(),
        concat_string: concatString
    };
};

// GET route for basic testing
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// POST route for main functionality
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input. 'data' should be an array."
            });
        }

        // Process the data
        const result = processData(data);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// Health check route
app.get('/', (req, res) => {
    res.json({
        message: "VIT Full Stack API is running!",
        endpoints: {
            GET: "/bfhl - Get operation code",
            POST: "/bfhl - Process data array"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

// Handle 404
app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;