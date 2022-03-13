var numRows=12; 
var numCols=12;

function setGridSizeCSS(nr,nc) {
   numRows = nr;
   numCols = nc;

   var styles = `
      .wrapper {
         grid-template-columns: repeat(${numCols}, 1fr);
         grid-template-rows: repeat(${numRows}, 1fr);
      }
   `;
   var styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   styleSheet.innerText = styles;
   document.head.appendChild(styleSheet);
}

function loadTileStatus(s) {
   if (s==null || s == "") return;
   for (var i=0;i<s.length;i++) {
      var elt = document.getElementById(`r${(~~(i/numCols))+1}c${(i%numCols)+1}`);
      if (s.charAt(i)=='1') {
         selectTile(elt);
      } 
   }
}

function isSelected(elt) { 
   return elt.className.includes(" selected");
}

function encodeTileStatus() {
   var s = "";
   [...document.querySelectorAll('.tile')].forEach((elt) => { 
         s += isSelected(elt) ? '1' : '0';
   });
   return s;
}

function saveTileStatus() {
   setCookie("flipped", encodeTileStatus(), 365);
}

function resetTileStatus() {
   [...document.querySelectorAll('.tile')].forEach(
      (elt) => { 
         if (isSelected(elt)) {
            unselectTile(elt);
         }
   });
   saveTileStatus();
}

function unselectTile(elt) {
   elt.className=elt.className.replace(" selected","");
   elt.innerHTML = elt.getAttribute('ca_r')+'x'+
      elt.getAttribute('ca_c');
   saveTileStatus();
}

function selectTile(elt) {
   elt.className+=" selected";
   elt.innerHTML = `${parseInt(elt.getAttribute('ca_r'))*parseInt(elt.getAttribute('ca_c'))}`;
   saveTileStatus();
}

function checkCookie() {
  var flipped = getCookie("flipped");
  if (flipped != "") {
      loadTileStatus(flipped);
  } else {
      saveTileStatus();
  }
}

function createBaseGrid() {
   const node = document.querySelector('.tile');
   [...Array((numRows*numCols)-1)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
}

function toggleSelectedTile(elt) {
   if (!isSelected(elt)) {
      selectTile(elt);
   } else {
      unselectTile(elt);
   }
}

function setTileAttrs(elt, r, c) {
   elt.innerHTML = `${r}x${c}`; 
   elt.setAttribute('id', `r${r}c${c}`);
   elt.setAttribute('ca_r', `${r}`);
   elt.setAttribute('ca_c', `${c}`);
}

function game(nr, nc) {
   var [r,c] = [0,0];
   setGridSizeCSS(nr,nc);
   createBaseGrid();
   [...document.querySelectorAll('.tile')].forEach((elt) => { 
      setTileAttrs(elt,r+1,c+1);
      elt.addEventListener("click", ()=>{ toggleSelectedTile(elt); }, false);
      c = (c+1) % numCols; if (c==0) r++; 
   });
   checkCookie();
}
