document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('#saveButton').addEventListener('click', saveOptions);
document.querySelector('#defaultButton').addEventListener('click', setDefaultOptions);
document.querySelector('#addPairButton').addEventListener('click', () => addPair());

loadOptions();

function restoreOptions() {
  chrome.storage.sync.get('extensionPairs', (data) => {
    if (!chrome.runtime.error) {
      let pairs = data.extensionPairs;
      if (pairs) {
        pairs.forEach(pair => addPair(pair));
      } else {
        setDefaultOptions();
      }

      loadOptions();
    }
  });
}

function loadOptions() {
  chrome.storage.sync.get('extensionPairs', function(data) {
    if (!chrome.runtime.error) {
      let pairs = data.extensionPairs;
      const container = document.querySelector('#extensionPairsContainer');

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      if (pairs) {
        pairs.forEach(pair => addPair(pair));
      }
    }
  });
}

function saveOptions() {
  const langInputs = document.querySelectorAll('.langInput');
  const extInputs = document.querySelectorAll('.extInput');
  
  let pairs = [];
  for(let i = 0; i < langInputs.length; i++) {
    pairs.push({lang: langInputs[i].value, ext: extInputs[i].value});
  }

  chrome.storage.sync.set({'extensionPairs': pairs}, () => {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });

  loadOptions();
}

function setDefaultOptions() {
  let defaultPairs = [
    {lang: 'python', ext: '.py'},
    {lang: 'javascript', ext: '.js'},
    {lang: 'js', ext: '.js'},
    {lang: 'java', ext: '.java'},
    {lang: 'cpp', ext: '.cpp'},
    {lang: 'c', ext: '.c'},
    {lang: 'php', ext: '.php'},
    {lang: 'swift', ext: '.swift'},
    {lang: 'csharp', ext: '.cs'},
    {lang: 'ruby', ext: '.rb'},
    {lang: 'go', ext: '.go'},
    {lang: 'rust', ext: '.rs'},
    {lang: 'typescript', ext: '.ts'},
    {lang: 'kotlin', ext: '.kt'},
    {lang: 'scala', ext: '.scala'},
    {lang: 'r', ext: '.r'},
    {lang: 'perl', ext: '.perl'},
    {lang: 'matlab', ext: '.m'},
    {lang: 'lua', ext: '.lua'},
    {lang: 'groovy', ext: '.groovy'},
    {lang: 'dart', ext: '.dart'},
    {lang: 'julia', ext: '.jl'},
    {lang: 'shell', ext: '.sh'},
    {lang: 'powershell', ext: '.ps1'},
    {lang: 'objc', ext: '.m'},
    {lang: 'haskell', ext: '.hs'},
    {lang: 'bash', ext: '.bash'},
    {lang: 'sql', ext: '.sql'},
    {lang: 'racket', ext: '.rkt'},
    {lang: 'fsharp', ext: '.fs'},
    {lang: 'ada', ext: '.adb'},
    {lang: 'fortran', ext: '.f90'},
    {lang: 'elixir', ext: '.exs'},
    {lang: 'cobol', ext: '.cbl'},
    {lang: 'prolog', ext: '.pl'},
    {lang: 'erlang', ext: '.erl'},
    {lang: 'clojure', ext: '.clj'},
    {lang: 'lisp', ext: '.lisp'},
    {lang: 'scheme', ext: '.scm'},
    {lang: 'asm', ext: '.asm'},
    {lang: 'vbnet', ext: '.vb'},
    {lang: 'd', ext: '.d'},
    {lang: 'coffeescript', ext: '.coffee'},
    {lang: 'pascal', ext: '.pas'},
    {lang: 'delphi', ext: '.pas'},
    {lang: 'crystal', ext: '.cr'},
    {lang: 'elm', ext: '.elm'},
    {lang: 'apex', ext: '.cls'},
    {lang: 'hack', ext: '.hh'},
    {lang: 'ocaml', ext: '.ml'},
    {lang: 'groovy', ext: '.groovy'},
    {lang: 'tcl', ext: '.tcl'},
    {lang: 'vbscript', ext: '.vbs'},
    {lang: 'ahk', ext: '.ahk'},
    {lang: 'html', ext: '.html'},
    {lang: 'css', ext: '.css'},
    {lang: 'json', ext: '.json'},
    {lang: 'xml', ext: '.xml'},
    {lang: 'yaml', ext: '.yaml'},
    {lang: 'ini', ext: '.ini'},
    {lang: 'svg', ext: '.svg'},
    {lang: 'csv', ext: '.csv'}
  ];

  let container = document.querySelector('#extensionPairsContainer');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  defaultPairs.forEach(pair => addPair(pair));

  saveOptions();
}

function addPair(pair) {
  const container = document.querySelector('#extensionPairsContainer');
  const pairContainer = document.createElement('div');
  pairContainer.className = 'pairContainer';

  let langInput = document.createElement('input');
  langInput.type = "text";
  langInput.className = "langInput";
  langInput.placeholder = "Code language";
  if (pair && pair.lang) {
    langInput.value = pair.lang;
  }
  
  let extInput = document.createElement('input');
  extInput.type = "text";
  extInput.className = "extInput";
  extInput.placeholder = ".ext";
  if (pair && pair.ext) {
    extInput.value = pair.ext;
  }

  let removeButton = document.createElement('button');
  removeButton.type = "button";
  removeButton.className = "removePairButton";
  removeButton.innerText = "Remove";
  removeButton.addEventListener('click', function() {
    container.removeChild(pairContainer);
  });

  pairContainer.appendChild(langInput);
  pairContainer.appendChild(extInput);
  pairContainer.appendChild(removeButton);
  container.appendChild(pairContainer);

  const addPairButton = document.querySelector('#addPairButton');
  if (addPairButton && addPairButton === document.activeElement) {
    pairContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
}
