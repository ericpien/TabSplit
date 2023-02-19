document.getElementById("splitDown").addEventListener("click", splitDown);
document.getElementById("splitRight").addEventListener("click", splitRight);

async function splitDown() {
    const activeTab = await getActiveTab();

    console.log(activeTab.url);

    chrome.scripting.executeScript({
        args: [activeTab.url],
        target: {
            tabId: activeTab.id,
        }, 
        func: getDownHTML,
    });
}

async function splitRight() {
    const activeTab = await getActiveTab();

    console.log(activeTab.url);

    chrome.scripting.executeScript({
        args: [activeTab.url],
        target: {
            tabId: activeTab.id,
        }, 
        func: getRightHTML,
    });
    console.log("here i am");
}

function getDownHTML(url) {
    let data = `<!DOCTYPE html>
    <html>
    <head>
        <title>Two Iframe Windows Example</title>
        <link rel="stylesheet" href="main.css">
    </head>
    <body>
        <iframe class="iframeWindow" src="`+ url +`"></iframe>
        <hr>
        <iframe class="iframeWindow" src="`+ url +`"></iframe>
        <hr>
    </body>
    </html>`

    console.log(data);
    document.write(data);
}

function getRightHTML(url) {
    let data = `<!DOCTYPE html>
    <html>
      <head>
        <title>Two Iframe Windows Example</title>
      <link rel="stylesheet" href="main.css">
      </head>
      <body>
        <iframe class="iframe-window-vertical" src="`+ url +`"></iframe>
        <iframe class="iframe-window-vertical" src="`+ url +`"></iframe>
      </body>
    </html>`

    console.log(data);
    document.write(data);
}

function getActiveTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const activeTab = tabs[0];
            resolve(activeTab);
        });
    });
}