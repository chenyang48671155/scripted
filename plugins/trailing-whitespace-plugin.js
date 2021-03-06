/*******************************************************************************
 * @license
 * Copyright (c) 2013 VMware, Inc. All Rights Reserved.
 * THIS FILE IS PROVIDED UNDER THE TERMS OF THE ECLIPSE PUBLIC LICENSE
 * ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS FILE
 * CONSTITUTES RECIPIENTS ACCEPTANCE OF THE AGREEMENT.
 * You can obtain a current copy of the Eclipse Public License from
 * http://www.opensource.org/licenses/eclipse-1.0.php
 *
 * Contributors:
 *     Kris De Volder (VMWare) - initial API and implementation
 ******************************************************************************/
define(function(require) {

	//console.log('Trailing white space removal plugin loaded');

	var editorApi = require('scripted/api/editor-extensions');

	function trimLines(text) {
		//This nice line of code:
		//return text.replace(/[\s][\s]*$/gm, "");
		//http://stackoverflow.com/questions/5568797/trim-trailing-spaces-before-newlines-in-a-single-multi-line-string-in-javascript

		//But it looks like that code isn't quite right as
		//it deletes blank lines of text entirely.

		//Fixed version:
		return text.replace(/[ \t][ \t]*$/gm, "");

	}
	editorApi.addSaveTransform(function (editor) {
		var text = editor.getText();
		var enabled = editor.getConfig('plugins.trailing-whitespace');
		var filePath = editor.getFilePath();
		//console.log('whitespace-plugin: '+enabled);
		if (enabled && filePath) {
			//console.log('Trailing ws removal on: '+filePath);
			if (/.*\.js$/.test(filePath)) { //Only .js files
				return trimLines(text);
			}
		}
		//return undefined;
	});
});