# Xiaohongshu Comment Extractor

A Chrome extension that extracts parent-level comments from xiaohongshu.com and displays them in a table format.

## Features

- 🔍 Extracts parent comments (username and content) from xiaohongshu.com pages
- 📊 Displays results in a clean, organized table
- ⚡ Simple one-click operation
- 🎯 Only extracts parent comments (ignores replies)

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top-right corner
3. Click "Load unpacked"
4. Select the folder containing this extension

## Usage

1. Navigate to any xiaohongshu.com page with comments
2. Click the extension icon in your Chrome toolbar
3. Click the "Extract Comments" button
4. View the extracted comments in the table

## Files Structure

```
comment-ext/
├── manifest.json       # Extension configuration
├── popup.html          # Popup UI
├── popup.js            # Popup logic
├── content.js          # DOM extraction logic
├── styles.css          # Styling
├── README.md           # This file
└── ICONS_NEEDED.txt    # Instructions for adding icons (optional)
```

## Technical Details

### DOM Selectors
- Parent comments: `.comments-container .list-container .parent-comment`
- Username: `.author .name`
- Comment content: `.content .note-text span`

### Permissions
- `activeTab`: Access to the current tab
- `scripting`: Ability to inject content script

## Notes

- The extension only works on xiaohongshu.com pages
- Only parent-level comments are extracted (replies are not included)
- The extension requires the page to have loaded completely before extraction
