// TRUVRS Unified API Server

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { applyXP } from '../modules/xp/xp_engine.js';
import {
  createProposal,
  castVote,
  tallyVotes,
  closeProposal
} from '../modules/dao/voting_engine.js';

import {
  stakeTokens,
  calculateRewards,
  withdrawStake
} from '../modules/token/staking_engine.js';

import {
  createUser,
  getUser,
  updateXP,
  addItem
} from '../modules/users/user_profile_engine.js';

import {
  createWallet,
  addFunds,
  deductFunds,
  addItemToWallet,
  getWallet
} from '../modules/wallet/wallet_engine.js';

import {
  pushNotification,
  getNotifications,
  markAllAsRead
} from '../modules/notifications/notification_engine.js';

import {
  createEntry,
  getPublicEntries,
  getMyEntries,
  deleteEntry
} from '../modules/vault/vault_engine.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ----- XP Route -----
app.post('/xp/apply', async (req, res) => {
  try {
    const { user, action } = req.body;
    const result = await applyXP(user, action);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- DAO Routes -----
app.post('/dao/proposal', async (req, res) => {
  try {
    const { title, description, createdBy, type, payload } = req.body;
    const result = await createProposal(title, description, createdBy, type, payload);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/dao/vote', async (req, res) => {
  try {
    const { proposalId, userId, voteType } = req.body;
    const result = await castVote(proposalId, userId, voteType);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/dao/tally/:id', async (req, res) => {
  try {
    const result = await tallyVotes(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/dao/close/:id', async (req, res) => {
  try {
    const result = await closeProposal(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
app.post('/user/create', async (req, res) => {
  try {
    const { userId, username } = req.body;
    const user = await createUser(userId, username);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/user/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/user/:id/xp', async (req, res) => {
  try {
    const { xp } = req.body;
    const updated = await updateXP(req.params.id, xp);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ----- Wallet Routes -----
app.post('/wallet/create', async (req, res) => {
  try {
    const result = await createWallet(req.body.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/wallet/add', async (req, res) => {
  try {
    const result = await addFunds(req.body.userId, req.body.amount);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/wallet/deduct', async (req, res) => {
  try {
    const result = await deductFunds(req.body.userId, req.body.amount);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/wallet/:userId', async (req, res) => {
  try {
    const result = await getWallet(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/wallet/item', async (req, res) => {
  try {
    const result = await addItemToWallet(req.body.userId, req.body.item);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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

// ----- Vault Routes -----
app.post('/vault/create', async (req, res) => {
  try {
    const { userId, title, message, visibility, recipient } = req.body;
    const result = await createEntry(userId, title, message, visibility, recipient);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/vault/public', async (req, res) => {
  try {
    const result = await getPublicEntries();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/vault/my/:userId', async (req, res) => {
  try {
    const result = await getMyEntries(req.params.userId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/vault/:entryId', async (req, res) => {
  try {
    const result = await deleteEntry(req.params.entryId);
    res.json({ message: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
