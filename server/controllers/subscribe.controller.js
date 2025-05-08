// controllers/subscribe.controller.js
const Subscription = require('../models/subscription.model');

exports.subscribeUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const newSub = new Subscription({ email });
    await newSub.save();

    res.status(201).json({ message: 'Subscribed successfully', email });
  } catch (err) {
    console.error('Subscribe Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.showSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscription.find();
    res.status(200).json(subscribers);
  } catch (err) {
    console.error('Show Subscribers Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}