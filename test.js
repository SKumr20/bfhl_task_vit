// Simple test file to verify the API logic locally
const express = require('express');
const app = require('./server');

// Test data from the examples
const testCases = [
    {
        name: "Example A",
        data: ["a","1","334","4","R", "$"],
        expected: {
            odd_numbers: ["1"],
            even_numbers: ["334","4"],
            alphabets: ["A","R"],
            sum: "339"
        }
    },
    {
        name: "Example B", 
        data: ["2","a", "y", "4", "&", "-", "*", "5","92","b"],
        expected: {
            odd_numbers: ["5"],
            even_numbers: ["2","4","92"],
            alphabets: ["A", "Y", "B"],
            sum: "103"
        }
    },
    {
        name: "Example C",
        data: ["A","ABcD","DOE"],
        expected: {
            odd_numbers: [],
            even_numbers: [],
            alphabets: ["A","ABCD","DOE"],
            sum: "0"
        }
    }
];

console.log("Running local tests...\n");

// You can run this file with: node test.js
// This will help you verify your logic before deployment

testCases.forEach((testCase, index) => {
    console.log(`Test ${index + 1}: ${testCase.name}`);
    console.log(`Input: ${JSON.stringify(testCase.data)}`);
    console.log(`Expected sum: ${testCase.expected.sum}`);
    console.log("---");
});

console.log("\nTo test the API:");
console.log("1. Run: npm start");
console.log("2. Use Postman or curl to test POST /bfhl");
console.log("\nExample curl command:");
console.log(`curl -X POST http://localhost:3000/bfhl \\
  -H "Content-Type: application/json" \\
  -d '{"data": ["a","1","334","4","R","$"]}'`);