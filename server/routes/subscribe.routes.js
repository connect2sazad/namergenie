const express = require("express");
const router = express.Router();
const { isValidEmail } = require("../utils/validators");

// Fake in-memory DB (replace with real DB later)
const subscribedEmails = new Set();

router.post("/", (req, res) => {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address." });
    }

    if (subscribedEmails.has(email)) {
        return res.status(409).json({ success: false, message: "Email already subscribed." });
    }

    subscribedEmails.add(email);
    return res.status(200).json({ success: true, message: "Successfully subscribed!" });
});

module.exports = router;
