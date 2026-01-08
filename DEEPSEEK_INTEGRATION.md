# DeepSeek Integration Documentation

## Overview

This extension now integrates DeepSeek AI to analyze extracted comments and identify car-related user intents from Chinese live stream comments.

## Architecture

### Files Added/Modified

1. **background.js** (NEW)
   - Service worker for handling DeepSeek API calls
   - Manages asynchronous AI analysis requests
   - Handles API authentication and error handling

2. **options.html** (NEW)
   - Settings page UI for API key configuration
   - Clean, user-friendly interface
   - Includes helpful instructions

3. **options.js** (NEW)
   - Manages API key storage using chrome.storage.local
   - Handles save/load operations

4. **manifest.json** (UPDATED)
   - Added "storage" permission
   - Added host permissions for DeepSeek API
   - Registered service worker (background.js)
   - Added options_page

5. **popup.html** (UPDATED)
   - Added AI Analysis button
   - Added Settings button
   - Added AI results table section

6. **popup.js** (UPDATED)
   - Added analyzeComments() function
   - Added displayAiResults() function
   - Manages communication with background script

7. **styles.css** (UPDATED)
   - Styled new buttons (AI Analysis, Settings)
   - Styled AI results section
   - Added button group layout

## API Integration Details

### Endpoint
```
POST https://api.deepseek.com/chat/completions
```

### Request Format
```javascript
{
  messages: [
    {
      role: "system",
      content: "你是一个专门分析汽车直播间评论的助手，严格按照要求输出JSON格式。"
    },
    {
      role: "user",
      content: prompt
    }
  ],
  model: "deepseek-chat",
  temperature: 0.1,
  top_p: 0.95,
  max_tokens: 2000,
  response_format: { type: "json_object" }
}
```

### Authentication
```javascript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${deepseekApiKey}`
}
```

### Response Format
```json
[
  {
    "name": "username",
    "content": "combined car-related content"
  }
]
```

## AI Analysis Logic

The AI identifies car-related comments based on:

1. **Explicit car-related keywords**
   - 汽车, 车辆, 车型, etc.

2. **Transaction intents**
   - Price mentions: "6800我要了", "5万收"
   - Sale inquiries: "这个价出吗"

3. **Brand/model availability**
   - "有长安没", "比亚迪能上吗"

4. **Price inquiries (livestream slang)**
   - "多少米", "多少钱", "啥价", "几万"

### Features:
- Merges multiple comments from the same user
- Filters non-car-related content
- Returns consolidated user intent

## Testing the Integration

### Step 1: Load the Extension
```bash
1. Open chrome://extensions/
2. Enable Developer Mode
3. Load unpacked extension
```

### Step 2: Configure API Key
```bash
1. Click extension icon
2. Click "⚙️ 设置" button
3. Enter DeepSeek API Key
4. Click "保存设置"
```

### Step 3: Extract Comments
```bash
1. Go to xiaohongshu.com or douyin.com
2. Navigate to a page with comments
3. Click extension icon
4. Click "提取评论"
```

### Step 4: Run AI Analysis
```bash
1. After comments are extracted
2. Click "🤖 AI 分析" button
3. Wait for analysis (3-10 seconds)
4. View results in AI results table
```

## Error Handling

### API Key Not Configured
```
Error: 请先在设置中配置 DeepSeek API Key
```
**Solution**: Go to settings and add API key

### Network Error
```
Error: DeepSeek API error: [status code] - [error text]
```
**Solution**: Check network connection and API key validity

### JSON Parse Error
```
Console: error parsing json: [error]
Returns: [] (empty array)
```
**Solution**: Usually handled gracefully, returns empty results

## Security Considerations

1. **API Key Storage**: Stored locally using chrome.storage.local (encrypted by Chrome)
2. **Data Privacy**: Comments only sent to DeepSeek API, not stored elsewhere
3. **HTTPS Only**: All API calls use HTTPS
4. **Permission Scoping**: Minimal required permissions

## Code Comparison

### Original TypeScript Version
```typescript
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function aiAnalyze(str: string) {
  // ... analysis code
}
```

### Chrome Extension Version
```javascript
async function aiAnalyze(comments) {
  const { deepseekApiKey } = await chrome.storage.local.get('deepseekApiKey');
  
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${deepseekApiKey}`
    },
    body: JSON.stringify({...})
  });
  // ... analysis code
}
```

### Key Differences
1. No npm package - using native `fetch` API
2. No `process.env` - using `chrome.storage.local`
3. Service worker instead of Node.js module
4. Browser-compatible syntax and APIs

## Future Enhancements

Potential improvements:
1. Add loading indicators with progress
2. Cache results to avoid duplicate API calls
3. Export AI results to CSV
4. Support custom prompts/analysis types
5. Batch processing for large comment sets
6. Add retry logic for failed API calls
7. Support for other AI providers

## API Cost Estimation

Based on DeepSeek pricing:
- Input: ~$0.14 per 1M tokens
- Output: ~$0.28 per 1M tokens

Typical usage:
- 100 comments ≈ 500-1000 input tokens
- AI response ≈ 200-500 output tokens
- Cost per analysis: ~$0.0001-0.0003

## Troubleshooting

### Issue: AI button stays disabled
**Check**: Are comments successfully extracted?

### Issue: Analysis takes too long
**Check**: Network speed and API response time

### Issue: Empty results
**Check**: Are comments actually car-related?

### Issue: Settings not saving
**Check**: Chrome storage permissions in manifest.json

