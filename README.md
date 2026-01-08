# 小红书/抖音评论提取器 + AI分析

A Chrome extension that extracts comments from Xiaohongshu and Douyin platforms, with DeepSeek AI analysis for identifying car-related user intents.

## ✨ Features

- 📱 **Multi-Platform Support**: Extract comments from both Xiaohongshu and Douyin
- 📊 **Table Display**: Clean, organized table view of extracted comments
- 🤖 **AI Analysis**: DeepSeek AI automatically identifies car-related users
- 🎯 **Intent Recognition**: Smart merging of multiple comments from the same user to identify purchase intent
- 🔒 **Secure Storage**: API keys stored locally and securely

## 🚀 Installation

1. Clone or download this repository
```bash
git clone [repository-url]
```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top-right corner

4. Click "Load unpacked"

5. Select the folder containing this extension

## 🔑 Configure DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com)
2. Register and login to your account
3. Create a new API Key in the API Keys page
4. Click the "⚙️ Settings" button in the extension
5. Enter your API Key and save

## 📖 Usage

### Extract Comments
1. Navigate to a Xiaohongshu or Douyin page with comments
2. Click the extension icon in your Chrome toolbar
3. Click the "Extract Comments" button
4. View the extracted comments in the table

### AI Analysis
1. After extracting comments, click the "🤖 AI Analysis" button
2. AI will automatically analyze and identify car-related users
3. View the analysis results with usernames and merged intent content

## 🎯 AI Analysis Capabilities

The AI identifies the following types of car-related content:

### A. Explicit Car-Related Content
- Cars, vehicles, models, engines, driving, maintenance, modification

### B. Transaction Intents
- Buying or selling cars
- Price mentions or offers (e.g. "6800我要了", "5万收", "这个价出吗")

### C. Brand/Model Inquiries
- Automobile brand or model names
- Combined with availability phrases (e.g. "有长安没", "比亚迪能上吗")

### D. Price Inquiries (Livestream Slang)
- "多少米", "多少钱", "多少", "啥价", "几万"

## 🛠️ Tech Stack

- **Frontend**: HTML/CSS/JavaScript
- **Framework**: Chrome Extension Manifest V3
- **AI Service**: DeepSeek Chat API
- **Storage**: Chrome Storage API

## 📁 File Structure

```
comment-ext/
├── manifest.json       # Extension configuration
├── content.js          # Content script for comment extraction
├── background.js       # Service worker for AI API calls
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── options.html        # Settings page
├── options.js          # Settings page logic
├── styles.css          # Styling
└── README.md           # This file
```

## 🔐 Privacy & Security

- API Key is only stored locally in your browser, never uploaded to any server
- Comment data is only sent to DeepSeek API for analysis
- No personal information is collected or stored

## ⚠️ Notes

- Only supports Chrome Manifest V3
- Must be used on Xiaohongshu or Douyin websites
- Requires a valid DeepSeek API Key for AI analysis features
- DOM selectors may change when websites update and will need to be updated
- AI analysis consumes DeepSeek API call credits

## 🐛 Troubleshooting

If you encounter issues, please check:
1. Are you on the correct website (Xiaohongshu or Douyin)?
2. Is your API Key correctly configured?
3. Are there any errors in the browser console?
4. Is your network connection stable?

## 📝 Changelog

### v1.1 - 2026-01-08
- ✨ Added DeepSeek AI analysis feature
- 🎯 Smart identification of car-related users and intents
- ⚙️ Added settings page for API Key management
- 🎨 Improved UI with multiple action buttons

### v1.0
- 🎉 Initial release
- 📱 Support for Xiaohongshu and Douyin comment extraction
- 📊 Table display of comment content
