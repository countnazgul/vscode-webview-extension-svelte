# VSCode Extension WebView example (with Svelte)

## Running the example

- Clone this repo
- open it in VS Code 1.46+
- `npm install`
- `npm run watch` or `npm run compile`
- `F5` to start debugging

## Making changes

The project register one command - `showWebView`

- to change the command name

  - open `package.json`
  - edit the only entry for `activationEvents` (which function to be called)
  - edit the only entry `contributes` -> `commands` (how the command will be displayed in the dropdown)

- to change the title of the webview tab
  - open `extension.ts`
  - change `viewingType` variable (optional)
  - change `webViewTitle` variable (this is the actual title)

## Webview

To show the webview:

- press `Ctrl + Shift + P`
- type `custom webview`
- press `Enter`

## Events

The Svelte app is sending message to the extension when the only button is pressed. Follow the logic to understand how messages are passed between the webview and the extension. (the extension is listener is in `extensions.ts` in `webviewPanel.webview.onDidReceiveMessage ...` section)

## Refreshing

Every time change is made - press `Ctrl + Shift + F5` to refresh the extension instance window and start the webview again (see `Webview` section above)

## Debugging the Webview

- once the webview is visible
- press `Ctrl + Shift + P` and search for `Developer: Open Webview Developer tools`
- this will show the (familiar) `Chrome Dev Tools`
