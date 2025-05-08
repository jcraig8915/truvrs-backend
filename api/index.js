// TRUVRS Unified API Server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import modules
const { applyXP } = require('../modules/xp/xp_engine.js');
const { createProposal, castVote, tallyVotes, closeProposal } = require('../modules/dao/voting_engine.js');
const { stakeTokens, calculateRewards, withdrawStake } = require('../modules/token/staking_engine.js');
const { createUser, getUser, updateXP, addItem } = require('../modules/users/user_profile_engine.js');
const { createWallet, addFunds, deductFunds, addItemToWallet, getWallet } = require('../modules/wallet/wallet_engine.js');
const { pushNotification, getNotifications, markAllAsRead } = require('../modules/notifications/notification_engine.js');

// ----- XP Route -----
app.post('/xp/apply', (req, res) => {
  const { user, action } = req.body;
  const result = applyXP(user, action);
  res.json(result);
});

// ----- DAO Routes -----
app.post('/dao/proposal', (req, res) => {
  const { title, description, createdBy, type, payload } = req.body;
  res.json(createProposal(title, description, createdBy, type, payload));
});

app.post('/dao/vote', (req, res) => {
  const { proposalId, userId, voteType } = req.body;
  res.json(castVote(proposalId, userId, voteType));
});

app.get('/dao/tally/:id', (req, res) => {
  res.json(tallyVotes(parseInt(req.params.id)));
});

app.post('/dao/close/:id', (req, res) => {
  res.json(closeProposal(parseInt(req.params.id)));
});

// ----- Staking Routes -----
app.post('/stake', (req, res) => {
  const { userId, amount } = req.body;
  res.json(stakeTokens(userId, amount));
});

app.get('/stake/rewards/:userId', (req, res) => {
  res.json(calculateRewards(req.params.userId));
});

app.post('/stake/withdraw/:userId', (req, res) => {
  res.json(withdrawStake(req.params.userId));
});

// ----- User Profile Routes -----
app.post('/user/create', (req, res) => {
  const { userId, username } = req.body;
  res.json(createUser(userId, username));
});

app.get('/user/:id', (req, res) => {
  res.json(getUser(req.params.id));
});

app.post('/user/:id/xp', (req, res) => {
  const { xp } = req.body;
  res.json(updateXP(req.params.id, xp));
});

// ----- Wallet Routes -----
app.post('/wallet/create', (req, res) => {
  res.json(createWallet(req.body.userId));
});

app.post('/wallet/add', (req, res) => {
  res.json(addFunds(req.body.userId, req.body.amount));
});

app.post('/wallet/deduct', (req, res) => {
  res.json(deductFunds(req.body.userId, req.body.amount));
});

app.get('/wallet/:userId', (req, res) => {
  res.json(getWallet(req.params.userId));
});

app.post('/wallet/item', (req, res) => {
  res.json(addItemToWallet(req.body.userId, req.body.item));
});

// ----- Notification Routes -----
app.post('/notify', (req, res) => {
  const { userId, message, type } = req.body;
  res.json(pushNotification(userId, message, type));
});

app.get('/notify/:userId', (req, res) => {
  res.json(getNotifications(req.params.userId));
});

app.post('/notify/read/:userId', (req, res) => {
  res.json(markAllAsRead(req.params.userId));
});

// ----- Health Check -----
app.get('/ping', (req, res) => {
  res.send("TRUVRS API is alive.");
});

// ----- Server Start -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ TRUVRS API running on http://localhost:${PORT}`);
});

