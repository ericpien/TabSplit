document.getElementById("split").addEventListener("click", split());

async function split() {
    const activeTab = await getActiveTab();

    console.log(activeTab.url);

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
        <iframe class="iframe-window-vertical" src="`+ url +`"></iframe>
        <div class="vr"></div>
        <iframe class="iframe-window-vertical" src="`+ url +`"></iframe>
      </body>
    </html>`

    document.write(data);
}