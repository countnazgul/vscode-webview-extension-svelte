import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
	const viewingType: string = "vscodeTest";
	const webViewTitle: string = "VSCode webview";

	const vscodeDisposable = vscode.commands.registerCommand(
		"showWebView",
		() => {
			const webviewPanel = vscode.window.createWebviewPanel(
				viewingType,
				webViewTitle,
				vscode.ViewColumn.One,
				{
					enableScripts: true,
				}
			);
			webviewPanel.webview.onDidReceiveMessage(
				(message) => {
					switch (message.command) {
						case "sendingFromWebView":

							console.log(message.text)
							webviewPanel.webview.postMessage({
								command: "sendingToWebView",
								test: { a: "some text to send To WebView" },
							});
							return;
					}
				},
				undefined,
				context.subscriptions
			);
			setHtmlContent(webviewPanel.webview, context);
		}
	);
	context.subscriptions.push(vscodeDisposable);
}

function getNonce() {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

function setHtmlContent(
	webview: vscode.Webview,
	extensionContext: vscode.ExtensionContext
) {
	const scriptUri = webview.asWebviewUri(
		vscode.Uri.file(
			path.join(extensionContext.extensionPath, "out", "compiled/bundle.js")
		)
	);
	const styleResetUri = webview.asWebviewUri(
		vscode.Uri.file(
			path.join(extensionContext.extensionPath, "out", "compiled/bundle.css")
		)
	);

	// Use a nonce to whitelist which scripts can be run
	const nonce = getNonce();

	let htmlContent = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<link href="${styleResetUri}" rel="stylesheet" />

				<title>Cat Scratch</title>
			</head>
			<body>
			<script nonce="${nonce}">
			const vscode = acquireVsCodeApi();
		</script>

				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;

	webview.html = htmlContent;
}

export function deactivate() { }
