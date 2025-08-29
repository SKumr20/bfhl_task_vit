# VIT Full Stack API

A REST API built for VIT's full stack assignment that processes arrays and returns categorized data.

## Features

- **POST /bfhl**: Processes an array and returns:
  - Even and odd numbers
  - Alphabetical characters (uppercase)
  - Special characters
  - Sum of all numbers
  - Concatenated alphabets in reverse order with alternating caps

- **GET /bfhl**: Returns operation code for testing

## API Documentation

### Endpoint: `POST /bfhl`

**Request Body:**
```json
{
  "data": ["a","1","334","4","R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd vit-fullstack-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update your details in server.js:**
   ```javascript
   const USER_DETAILS = {
       user_id: "your_name_ddmmyyyy", // Update with your details
       email: "your@email.com",
       roll_number: "YOUR123"
   };
   ```

4. **Run the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

5. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data": ["a","1","334","4","R","$"]}'
   ```

## Deployment

This API is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Hosting:** Vercel
- **Version Control:** Git/GitHub

## Project Structure

```
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── test.js           # Local testing utilities
└── README.md         # Project documentation
```

## Error Handling

The API includes comprehensive error handling for:
- Invalid input data
- Missing required fields
- Server errors
- Route not found (404)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request