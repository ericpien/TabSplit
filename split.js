
console.log('foo');

document.getElementById("split").addEventListener("click", split());

async function split() {
    const activeTab = await getActiveTab();

    console.log(activeTab.url);

    var data = `<!DOCTYPE html> <html> <head> <title>Two Iframe Windows Example</title> <link rel="stylesheet" href="main.css"> </head> <body><iframe id="iframe1" src="`+ activeTab.url +`" scrolling="yes"></iframe><iframe id="iframe2" src="`+ activeTab.url +`"></iframe></body></html>`;

    var tester = `<html>
    <head>
      <title>A Simple HTML Document</title>
    </head>
    <body>
      <p>This is a very simple HTML document</p>
      <p>It only has two paragraphs</p>
    </body>
  </html>`;
  

    console.log(tester);

    chrome.scripting.executeScript({
        args: [activeTab.url],
        target: {
            tabId: activeTab.id,
        }, 
        func: getHTML,
    });
}

function getActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            resolve(activeTab);
        });
    });
}

function getHTML(url) {
    let data = `<!DOCTYPE html>
    <html>
    <head>
      <title>Two Iframe Windows Example</title>
      <link rel="stylesheet" href="main.css">
    </head>
    <body>
      <iframe id="iframe1" src="`+ url +`" scrolling="yes"></iframe>
      <iframe id="iframe2" src="`+ url +`"></iframe>
    </body>
    </html>`

    document.write(data);
}