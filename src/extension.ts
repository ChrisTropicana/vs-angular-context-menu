// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

let terminal = vscode.window.createTerminal('angular-cli');
let workspacePath = vscode.workspace.rootPath;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "angular-context" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('createComponent', (uri) => {
		// The code you place here will be executed every time your command is executed
		if (typeof uri === 'undefined') {
			if (vscode.window.activeTextEditor) {
				uri = vscode.window.activeTextEditor.document.uri;
			}
		}
		if (!uri) {
			vscode.window.showErrorMessage('Cannot copy relative path, as there appears no file is opened (or it is very large');
			return;
		}
		var folderPath = vscode.workspace.asRelativePath(uri);
		folderPath = folderPath.replace(/\\/g, '/');
		const box = vscode.window.createInputBox();
		box.show();
		box.onDidAccept(() => {
			console.log(box.value);

			box.hide();
			terminal.show();
			uri = path.normalize(folderPath);
			terminal.sendText(`cd ${workspacePath}`);
			terminal.sendText(`cd ${uri}`);
			terminal.sendText(`ng g c ${box.value}`);
		});
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
