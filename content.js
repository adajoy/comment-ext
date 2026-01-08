// Content script that runs on xiaohongshu.com and douyin.com pages
// Listens for messages from the popup to extract comments

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractComments") {
    try {
      const comments = extractComments();
      sendResponse({ success: true, comments: comments });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // Keep the message channel open for async response
});

function detectPlatform() {
  const url = location.href;
  if (url.includes('douyin.com')) return 'douyin';
  if (url.includes('xiaohongshu.com')) return 'xiaohongshu';
  return null;
}

function extractComments() {
  const platform = detectPlatform();
  
  if (platform === 'xiaohongshu') {
    return extractXiaohongshuComments();
  } else if (platform === 'douyin') {
    return extractDouyinComments();
  } else {
    throw new Error('不支持的平台');
  }
}

function extractXiaohongshuComments() {
  const commentsList = [];
  
  // Find all comment items
  const commentItems = document.querySelectorAll('.comment-item');
  
  if (commentItems.length === 0) {
    throw new Error('未找到评论');
  }
  
  commentItems.forEach((commentElement, index) => {
    try {
      // Extract username from .author .name anchor tag
      const usernameElement = commentElement.querySelector('.author .name');
      const username = usernameElement ? usernameElement.textContent.trim() : '未知用户';
      
      // Extract comment content from .content .note-text span
      const contentElement = commentElement.querySelector('.content .note-text span');
      const content = contentElement ? contentElement.textContent.trim() : '无内容';
      
      // Extract time from .info .date span (first span)
      const timeElement = commentElement.querySelector('.info .date span');
      const time = timeElement ? timeElement.textContent.trim() : '';
      
      commentsList.push({
        username: username,
        content: content,
        time: time
      });
    } catch (error) {
      console.error(`提取评论 ${index} 时出错:`, error);
    }
  });
  
  return commentsList;
}

function extractDouyinComments() {
  const commentsList = [];
  
  // Find all comment items in the comment list
  const commentItems = document.querySelectorAll('[data-e2e="comment-item"]');
  
  if (commentItems.length === 0) {
    throw new Error('未找到评论');
  }
  
  commentItems.forEach((commentElement, index) => {
    try {
      // Extract username from .comment-item-info-wrap anchor or span
      let username = '未知用户';
      const usernameLink = commentElement.querySelector('.comment-item-info-wrap a');
      if (usernameLink) {
        // Try to get text from nested spans
        const usernameSpans = usernameLink.querySelectorAll('span');
        if (usernameSpans.length > 0) {
          // Get the innermost span text
          username = Array.from(usernameSpans).pop().textContent.trim();
        } else {
          username = usernameLink.textContent.trim();
        }
      }
      
      let content = '无内容';
      const contentContainer = commentElement.children[1];
      if (contentContainer) {
        content = contentContainer.children[0].children[1].textContent
      }
      
      const time = contentContainer.children[0].children[2].textContent
      
      commentsList.push({
        username: username,
        content: content,
        time: time
      });
    } catch (error) {
      console.error(`提取评论 ${index} 时出错:`, error);
    }
  });
  
  return commentsList;
}
