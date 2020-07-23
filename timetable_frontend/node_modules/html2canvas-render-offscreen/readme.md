html2canvas-render-offscreen
===========

#### JavaScript HTML renderer: off-screen support ####

All credit goes to https://github.com/niklasvh/html2canvas.
Suggested solution from the issue here: https://github.com/niklasvh/html2canvas/issues/117, and turned it to an npm module for personal use. Feel free to use

Only change consists of changing

```
return renderDocument(node.ownerDocument, options, node.ownerDocument.defaultView.innerWidth, node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
```
to

```
return renderDocument(node.ownerDocument, options, options.width != undefined ? options.width : node.ownerDocument.defaultView.innerWidth, options.height != undefined ? options.height : node.ownerDocument.defaultView.innerHeight, index).then(function(canvas) {
```

as suggested by @eworksmedia



### Usage ###

```
npm install --save html2canvas-render-offscreen
```

and use it just like the html2canvas
