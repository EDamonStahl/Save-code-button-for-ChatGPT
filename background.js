chrome.runtime.onInstalled.addListener(function() {
  setDefaultOptions();
});

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

  chrome.storage.sync.get('extensionPairs', function(data) {
    if (!data.extensionPairs) {
      chrome.storage.sync.set({'extensionPairs': defaultPairs}, function() {
        console.log('Default pairs saved in Chrome storage.');
      });
    }
  });
}
