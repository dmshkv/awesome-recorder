const domReady = (callBack) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callBack);
    }
    else {
        callBack();
    }
}

const getAttributes = attributes => Array.from(attributes)
    .filter(({name}) => name !== 'onclick' || name !== 'href')
    .map(({name, value}) => ({name, value}))

const serializeDOM = (element) => {
    const fetchPromises = [];
    const serializeElement = (element) => {
        const {
            attributes,
            tagName,
            nodeValue,
            childNodes
        } = element;

        const selfClosed = !nodeValue && (!childNodes || childNodes.length === 0);

        const attrs = getAttributes(attributes);

        const children = Array.from(childNodes)
            .filter(childNode => childNode.tagName !== 'SCRIPT')
            .map((childNode) => {
                const {
                    nodeType,
                    nodeValue,
                    tagName
                } = childNode;
                if (nodeType === 3) {
                    return nodeValue
                }
                if (tagName === 'LINK' && childNode.getAttribute('rel') === 'stylesheet' && !!childNode.getAttribute('href')) {
                    fetchPromises.push(
                        fetch(
                            new URL(childNode.getAttribute('href'), document.baseURI).href
                        )
                    );

                    return {
                        tagName: 'STYLE',
                        fetchPromiseIndex: fetchPromises.length - 1
                    }
                }
                return serializeElement(childNode)
            })

        return {
            tagName,
            attrs,
            children,
            selfClosed
        }
    }
    return {
        fetchPromises,
        serializedDocument: serializeElement(element)
    }
}

const applyResultsToElement = (el, remoteResults) => {
    if (!el.tagName) {
        return el;
    }
    if (Number.isInteger(el.fetchPromiseIndex)) {
        return {
            ...el,
            children: [
                remoteResults[el.fetchPromiseIndex]
            ]
        }
    }
    return {
        ...el,
        children: el.children.map(child => applyResultsToElement(child, remoteResults))
    }
}

domReady(() => {
    const initElement = document.getElementsByTagName('html')[0];
    const {
        serializedDocument,
        fetchPromises
    } = serializeDOM(initElement);

    Promise.all(fetchPromises)
        .then(results => Promise.all(results.map(r => r.text())) )
        .then(results => applyResultsToElement(serializedDocument, results))
        .then(dataToSend => {
            return fetch('http://localhost:3000/save', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
        })
        .then((response) => console.log('success!', response))
        .catch((err) => console.warn('Something went wrong.', err));
})




