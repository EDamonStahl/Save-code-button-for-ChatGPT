let extensionPairs = [];

chrome.storage.sync.get('extensionPairs', function(data) {
  if (data.extensionPairs) {
    extensionPairs = data.extensionPairs;
  }
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace === 'sync' && changes.extensionPairs) {
    extensionPairs = changes.extensionPairs.newValue;
  }
});

const observer = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      setTimeout(checkAndAddButton, 1000);
    }
  });
});

const targetNode = document.querySelector('body');
const config = { attributes: false, childList: true, subtree: true };
observer.observe(targetNode, config);

function checkAndAddButton() {
  const containers = document.querySelectorAll('.flex.items-center.relative.text-gray-200.bg-gray-800.px-4.py-2.text-xs.font-sans.justify-between.rounded-t-md');
  containers.forEach(container => {
    if (container.querySelector('#saveFileButton')) return;

    const span = container.querySelector('span');
    span.style.width = '66%';

    const button = document.createElement('button');
    button.className = 'flex ml-auto gap-2';
    button.id = 'saveFileButton';
    button.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" />
    <path d="M17.5 15V21M17.5 21L15 18.5M17.5 21L20 18.5" />
    </svg>Save code`;

    const copyButton = container.querySelector('.flex.ml-auto.gap-2');

    button.addEventListener('click', async () => {
      copyButton.click();

      try {
        const code = await navigator.clipboard.readText();
        const span = container.querySelector('span');
        const lang = span.textContent.toLowerCase();
        let ext = '.txt';  // Default to .txt
        const pair = extensionPairs.find(pair => pair.lang === lang);
        if (pair) {
          ext = pair.ext;
        }

        downloadFile(code, `code${ext}`);
      } catch (error) {
        console.error('Failed to read clipboard:', error);
      }
    });

    const copyButtonNode = container.querySelector('.flex.ml-auto.gap-2');
    container.insertBefore(button, copyButtonNode);
  });
}

function downloadFile(content, filename) {
  const blob = new Blob([content], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

setInterval(checkAndAddButton, 3000);
