# Home Assignment

At Walnut, we provide a platform for sales teams to easily create & manage demo environments without any coding skills, all by themselves. We’re doing this by providing them a WYSIWYG editor + chrome extension that allows them to capture their production env and transform it to a fully usable demo environment. Our target audience isn’t technical and sees tools as a means for a goal (e.g. they’re happy with processes that drive sales deals) but is highly organized into hierarchical process oriented structures.

## The task

For this task you'll implement a simple Walnut editor, it'll contain two parts: a recorder and an editor.

### Recorder

In the project root, you'll find a `page.html` file, this file contains everything you need to get started, it includes a reference to `js/recorder.js`
where you should write the serializer code.
The other part is the server, which you can find at `server.js` in root, in general, it's a simple express server. you might need to fixup the server a bit, but no heavy lifting should be needed.
The recorder should simply serialize the page structure and push that to the server using a json format(but feel free to think about the data representation).

### The Editor

The editor should display the serialized page, without any scripts and with all JS interactions disabled (imagine we need to capture a page, with a button on it that deletes the production db - we dont want that to happen, but we still want to be able to change the text of the button. this applies to all JS that might be on the page).
- On hover it should mark the element I'm hovering (same as in chrome devtools, but the style is less important).
- When selecting an element it should allow me to modify the innerText of the element (either via a prompt, inline, however you would like. UX is less important).
- After I'm done with the modifications, I should be able to save them (the point here isn't to actually save, but to think about the data structure on how to send this according to the future requirments), while designing this, your design should be able to easily support these future requirements:
  - We want to be able to revert all edits done to an element
  - We want to see a list of all edits to a page
  - We'll record more pages, we would want to apply edits from one page on similar elements on another page.

#### General guidelines

- The serializer should just start on page load, e.g no need to wait for any action.
- The server uses a simple in-memory storage (e.g. a var :) ). meaning all state is lost on restart. just a FYI.
- Please write the Recorder using simple vanilla JS and avoid adding libraries.
- Feel free to target latest and greatest browser.
- Please write the editor in vanilla JS and avoid adding libraries.

#### Things we care about

- Code readability/style
- Architecture - We'll question your design decisions and are interested in the thought process that led to specific design decisions.
- Your code should run without any runtime exceptions
- Communication - Feel free to ask questions, this exercise should emulate actual work. As such, we value communications.

#### Things we don't care about

- Language/ tech stack - Feel free to write in whichever language you choose if you feel it'll help you.
- Dont bother with CI/CD or any kind of automation

## License

At CodeScreen, we strongly value the integrity and privacy of our assessments. As a result, this repository is under exclusive copyright, which means you **do not** have permission to share your solution to this test publicly (i.e., inside a public GitHub/GitLab repo, on Reddit, etc.). <br>

## Submitting your solution

Please push your changes to the `main branch` of this repository. You can push one or more commits. <br>

Once you are finished with the task, please click the `Complete task` link on <a href="https://app.codescreen.com/candidate/077c9c6a-02aa-476a-83d7-1c061fd741a4" target="_blank">this screen</a>.