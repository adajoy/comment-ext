// Options page script for managing API key

document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');
  
  // Load saved API key
  chrome.storage.local.get('deepseekApiKey', function(data) {
    if (data.deepseekApiKey) {
      apiKeyInput.value = data.deepseekApiKey;
    }
  });
  
  // Save API key
  saveBtn.addEventListener('click', function() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('请输入 API Key', 'error');
      return;
    }
    
    chrome.storage.local.set({ deepseekApiKey: apiKey }, function() {
      showStatus('保存成功！', 'success');
    });
  });
  
  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 3000);
  }
});

