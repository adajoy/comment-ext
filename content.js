// Content script that runs on xiaohongshu.com pages
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

function extractComments() {
  const commentsList = [];
  
  // Find all parent comments
  const parentComments = document.querySelectorAll('.comments-container .list-container .parent-comment');
  
  if (parentComments.length === 0) {
    throw new Error('No comments found on this page');
  }
  
  parentComments.forEach((commentElement, index) => {
    try {
      // Extract username from .author .name anchor tag
      const usernameElement = commentElement.querySelector('.author .name');
      const username = usernameElement ? usernameElement.textContent.trim() : 'Unknown User';
      
      // Extract comment content from .content .note-text span
      const contentElement = commentElement.querySelector('.content .note-text span');
      const content = contentElement ? contentElement.textContent.trim() : 'No content';
      
      commentsList.push({
        username: username,
        content: content
      });
    } catch (error) {
      console.error(`Error extracting comment ${index}:`, error);
    }
  });
  
  return commentsList;
}
