// Popup script for handling UI and communication with content script

document.addEventListener('DOMContentLoaded', function() {
  const extractBtn = document.getElementById('extractBtn');
  const statusDiv = document.getElementById('status');
  const tableBody = document.getElementById('tableBody');
  const tableContainer = document.getElementById('tableContainer');
  
  extractBtn.addEventListener('click', extractComments);
  
  async function extractComments() {
    // Clear previous results
    tableBody.innerHTML = '';
    statusDiv.textContent = '提取评论中...';
    statusDiv.className = 'status-loading';
    tableContainer.style.display = 'none';
    
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on xiaohongshu.com or douyin.com
      if (!tab.url.includes('xiaohongshu.com') && !tab.url.includes('douyin.com')) {
        throw new Error('请先访问小红书或抖音');
      }
      
      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'extractComments' }, (response) => {
        if (chrome.runtime.lastError) {
          statusDiv.textContent = '错误: ' + chrome.runtime.lastError.message;
          statusDiv.className = 'status-error';
          return;
        }
        
        if (response && response.success) {
          displayComments(response.comments);
        } else {
          statusDiv.textContent = '错误: ' + (response?.error || '未知错误');
          statusDiv.className = 'status-error';
        }
      });
    } catch (error) {
      statusDiv.textContent = '错误: ' + error.message;
      statusDiv.className = 'status-error';
    }
  }
  
  function displayComments(comments) {
    if (!comments || comments.length === 0) {
      statusDiv.textContent = '未找到评论';
      statusDiv.className = 'status-error';
      return;
    }
    
    statusDiv.textContent = `找到 ${comments.length} 条评论`;
    statusDiv.className = 'status-success';
    
    // Generate table rows
    comments.forEach((comment, index) => {
      const row = document.createElement('tr');
      
      const cellNo = document.createElement('td');
      cellNo.textContent = index + 1;
      
      const cellUsername = document.createElement('td');
      cellUsername.textContent = comment.username;
      
      const cellContent = document.createElement('td');
      cellContent.textContent = comment.content;
      
      const cellTime = document.createElement('td');
      cellTime.textContent = comment.time || '-';
      
      row.appendChild(cellNo);
      row.appendChild(cellUsername);
      row.appendChild(cellContent);
      row.appendChild(cellTime);
      tableBody.appendChild(row);
    });
    
    tableContainer.style.display = 'block';
  }
});
