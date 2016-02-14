/*
@ args
*/
var args = arguments[0] || {};

console.log('- - - - - - - -');
console.log('args: ', JSON.stringify(args));
console.log('- - - - - - - -');

/*
@ openWindow
*/
function openWindow(){
  Ti.Platform.openURL('http://www.google.com.br');
}
