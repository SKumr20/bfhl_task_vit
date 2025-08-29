# Bajaj Finserv Health Task VIT
# 22BEE1311 Satyam Kumar

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

