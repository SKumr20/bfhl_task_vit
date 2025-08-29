export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      operation_code: 1,
    });
  }

  if (req.method === "POST") {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ error: "Invalid input, expected array" });
    }

    const numbers = data.filter((item) => !isNaN(item));
    const alphabets = data.filter((item) => /^[a-zA-Z]$/.test(item));

    // highest alphabet by ASCII (case-sensitive, 'Z' > 'A')
    const highestAlphabet =
      alphabets.length > 0
        ? [alphabets.reduce((a, b) => (a.toLowerCase() > b.toLowerCase() ? a : b))]
        : [];

    return res.status(200).json({
      is_success: true,
      user_id: "satyam_kumar_123", // change to your format
      email: "satyam@example.com",
      roll_number: "22BCS1234",
      numbers,
      alphabets,
      highest_alphabet: highestAlphabet,
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
