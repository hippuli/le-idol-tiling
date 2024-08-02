(()=>{"use strict";function e(e){return e.shape.reduce((function(e,n){return e+n.length}),0)}function n(e,n,r,t){for(var o=0;o<n.shape.length;o++)for(var c=0;c<n.shape[o].length;c++)if(1===n.shape[o][c]){var a=r+o,i=t+c;if(a>=e.length||i>=e[0].length)return!1;if(0!==e[a][i])return!1}return!0}function r(e,n,r,t,o){for(var c=0;c<n.shape.length;c++)for(var a=0;a<n.shape[c].length;a++)if(1===n.shape[c][a]){if(0!==e[r+c][t+a])throw new Error("Trying to place piece on occupied cell");e[r+c][t+a]=o}}function t(e,n,r,t,o){for(var c=0;c<n.shape.length;c++)for(var a=0;a<n.shape[c].length;a++)if(1===n.shape[c][a]){if(e[r+c][t+a]!==o)throw new Error("Trying to remove piece from unoccupied cell");e[r+c][t+a]=0}}var o=[[-1,0,0,0,-1],[0,0,0,0,0],[0,0,-1,0,0],[0,0,0,0,0],[-1,0,0,0,-1]],c=o.reduce((function(e,n){return e+n.filter((function(e){return 0===e})).length}),0),a={},i=function(){return i=Object.assign||function(e){for(var n,r=1,t=arguments.length;r<t;r++)for(var o in n=arguments[r])Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o]);return e},i.apply(this,arguments)},l={piece1x1:{shape:[[1]]},piece1x2:{shape:[[1],[1]]},piece2x1:{shape:[[1,1]]},piece2x2:{shape:[[1,1],[1,1]]},piece1x3:{shape:[[1],[1],[1]]},piece3x1:{shape:[[1,1,1]]},piece1x4:{shape:[[1],[1],[1],[1]]},piece4x1:{shape:[[1,1,1,1]]}};function u(e,o,c){var i;if(void 0===c&&(c=0),c>=o.length)return!0;for(var l=o[c],s=null!==(i=l.name)&&void 0!==i?i:"",f=0,d=a[s];f<d.length;f++){var p=d[f],h=p[0],v=p[1];if(n(e,l,h,v)){if(r(e,l,h,v,c+1),u(e,o,c+1))return!0;t(e,l,h,v,c+1)}}return!1}document.addEventListener("DOMContentLoaded",(function(){var r;!function(e){var n=document.querySelector(".grid");if(n){n.innerHTML="";for(var r=0;r<e.length;r++)for(var t=0;t<e[r].length;t++){var o=document.createElement("div");o.className="cell",e[r][t]<0&&o.classList.add("blocked"),n.appendChild(o)}}}(o),function(e){var n=document.querySelector(".pieces");if(n){n.innerHTML="";for(var r=1,t=0,o=Object.entries(e);t<o.length;t++){var c=o[t],a=c[0],i=(c[1],document.createElement("div"));i.className="piece-container";var l=document.createElement("label"),u=document.createElement("span");u.className="piece ".concat(a);var s=document.createElement("input");s.type="number",s.min="0",s.value="0",s.className="piece-quantity",s.id="".concat(a,"-qty"),s.tabIndex=r++,l.appendChild(u),l.appendChild(s),i.appendChild(l),n.appendChild(i)}}}(l),function(e){console.log("initializing lookup tables");for(var r=0,t=Object.entries(e);r<t.length;r++){for(var c=t[r],i=c[0],l=c[1],u=[],s=0;s<o.length;s++)for(var f=0;f<o[s].length;f++)n(o,l,s,f)&&u.push([s,f]);a[i]=u}}(l),null===(r=document.getElementById("solve-btn"))||void 0===r||r.addEventListener("click",(function(){var n,r;console.log("solving..."),function(){for(var e=0;e<o.length;e++)for(var n=0;n<o[e].length;n++)o[e][n]>0&&(o[e][n]=0)}(),(n=document.querySelector(".grid"))&&n.querySelectorAll(".cell").forEach((function(e){var n=e.querySelector(".cell-content");n&&e.removeChild(n)}));try{var t=(r=function(){for(var n=[],r=0,t=0,o=Object.entries(l);t<o.length;t++){var a=o[t],i=a[0],u=a[1],s=document.getElementById("".concat(i,"-qty")),f=parseInt(s.value,10);if((r+=e(u)*f)>c)throw new Error("Total size of pieces exceeds grid size");for(var d=0;d<f;d++)n.push(u)}return n.sort((function(n,r){return e(r)-e(n)})),n}(),r.map((function(e){var n=JSON.stringify(e.shape),r=Object.keys(l).find((function(e){return JSON.stringify(l[e].shape)===n}));if(r)return i(i({},e),{name:r});throw new Error("No matching piece found for shape: ".concat(n))})));u(o,t)?(function(){var e=document.querySelector(".grid");if(e)for(var n=e.querySelectorAll(".cell"),r=0;r<o.length;r++)for(var t=0;t<o[r].length;t++){var c=n[r*o[r].length+t];if(o[r][t]>0){var a=document.createElement("span");a.className="cell-content",a.innerHTML=o[r][t].toString(),c.appendChild(a)}}}(),document.getElementById("message").innerHTML="Solution found"):(console.log("No solution found"),document.getElementById("message").innerHTML="No Solution found")}catch(e){console.error(e);var a=e instanceof Error?e.message:"An unexpected error occurred";return void(document.getElementById("message").innerHTML="Error: ".concat(a))}}))}))})();