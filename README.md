# 🛎️ Competitive Programming Notifier Bot

A lightweight Python-based Telegram bot that notifies users about upcoming **Codeforces** and **LeetCode** contests in real-time and via `/start` command on Telegram.

## 📦 Features

- 🔔 Sends automatic notifications for upcoming contests.
- 📅 Fetches contests from Codeforces and LeetCode APIs.
- ⚡ Telegram `/start` command to list upcoming contests manually.
- 🌐 Runs continuously using asyncio and threading.

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/cp-notifier-bot.git
cd cp-notifier-bot
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Your Telegram Bot Token

Replace the value of `BOT_TOKEN` in both:

- `cp1_notifier_bot.py`
- `get_chat_id.py`

> You can get a bot token by talking to [@BotFather](https://t.me/BotFather)

### 4. Get Your Chat ID

Run the following script to get your chat ID:

```bash
python get_chat_id.py
```

Send a message to your bot, then check the terminal output for your chat ID.

Update `CHAT_ID` in `cp1_notifier_bot.py` with that value.

### 5. Run the Bot

```bash
python cp1_notifier_bot.py
```

You'll see:

- `✅ Telegram /start handler is live`
- `🚨 Contest notifier is running...`

You're all set!

## 🛠 Technologies Used

- Python 3.8+
- [python-telegram-bot](https://github.com/python-telegram-bot/python-telegram-bot)
- Codeforces & LeetCode APIs
- AsyncIO and threading

## 🧪 Commands

### `/start`
Returns a Markdown-formatted list of all upcoming contests sorted by date.

## 📁 File Overview

| File                | Description |
|---------------------|-------------|
| `cp1_notifier_bot.py` | Main bot file that fetches and sends contest updates |
| `get_chat_id.py`      | Utility to fetch your Telegram chat ID |
| `requirements.txt`    | Python dependencies |

## 📌 Notes

- This bot is designed for personal use in private chats or small groups.
- Make sure the bot is started once before fetching chat IDs.

## 📝 License

MIT License © 2025 Your Name
