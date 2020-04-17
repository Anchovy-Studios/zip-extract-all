// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { extract } = require('@anchovy_studios/extract-all-zip');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('zip-extract-all extensions activated...');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let extractCommand = vscode.commands.registerCommand('zip-extract-all.extract', async function () {
		// The code you place here will be executed every time your command is executed
		const start = new Date().getTime();
		
		try {
			const folder_path = vscode.workspace.workspaceFolders[0].uri.fsPath;
			let files = await extract(folder_path);
			const end = new Date().getTime();
			// Display a message box to the user
			vscode.window.showInformationMessage('Finish extracting ' + files.length + ' file(s) in ' + (end-start) + ' ms');
		} catch(err) {
			vscode.window.showErrorMessage(err);
		}
	});

	context.subscriptions.push(extractCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
