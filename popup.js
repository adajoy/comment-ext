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
    statusDiv.textContent = 'Extracting comments...';
    statusDiv.className = 'status-loading';
    tableContainer.style.display = 'none';
    
    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Check if we're on xiaohongshu.com
      if (!tab.url.includes('xiaohongshu.com')) {
        throw new Error('Please navigate to xiaohongshu.com first');
      }
      
      // Send message to content script
      chrome.tabs.sendMessage(tab.id, { action: 'extractComments' }, (response) => {
        if (chrome.runtime.lastError) {
          statusDiv.textContent = 'Error: ' + chrome.runtime.lastError.message;
          statusDiv.className = 'status-error';
          return;
        }
        
        if (response && response.success) {
          displayComments(response.comments);
        } else {
          statusDiv.textContent = 'Error: ' + (response?.error || 'Unknown error');
          statusDiv.className = 'status-error';
        }
      });
    } catch (error) {
      statusDiv.textContent = 'Error: ' + error.message;
      statusDiv.className = 'status-error';
    }
  }
  
  function displayComments(comments) {
    if (!comments || comments.length === 0) {
      statusDiv.textContent = 'No comments found on this page';
      statusDiv.className = 'status-error';
      return;
    }
    
    statusDiv.textContent = `Found ${comments.length} comment(s)`;
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
      
      row.appendChild(cellNo);
      row.appendChild(cellUsername);
      row.appendChild(cellContent);
      tableBody.appendChild(row);
    });
    
    tableContainer.style.display = 'block';
  }
});
