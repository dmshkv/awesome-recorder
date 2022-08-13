const domReady = (callBack) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callBack);
    }
    else {
        callBack();
    }
}

const buildHTML = element => {
    if (!element.tagName) {
        return element;
    }

    const tagName = element.tagName.toLowerCase();

    console.log(element.attrs);

    const attributes = (element.attrs || []).map(({name, value}) => `${name}="${value}"`).join(' ')

    if (element.selfClosed) {
        return `<${tagName} ${attributes} />`
    }

    const openTag = `<${tagName} ${attributes}>`
    const closeTag = `</${tagName}>`
    let innerPart;

    if (element.children.length > 0) {
        innerPart = element.children.map(child => buildHTML(child)).join('');
    }

    return `${openTag}${innerPart}${closeTag}`;
}

domReady(() => {
    const iframeElement = document.getElementsByTagName('iframe')[0];

    fetch('http://localhost:3000/data', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            const responseHtmlString = buildHTML(data);
            console.log(responseHtmlString);
            document.getElementById('output_iframe').src = "data:text/html;charset=utf-8," + escape(responseHtmlString);

        });
})
