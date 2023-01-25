var numRows=4; 
var numCols=3;

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

function selectTile(elt) {
   elt.innerHTML = `${parseInt(elt.getAttribute('ca_r'))*parseInt(elt.getAttribute('ca_c'))}`;
   saveTileStatus();
}

function createBaseGrid() {
   const node = document.querySelector('.tile');
   [...Array((numRows*numCols)-1)].forEach(_ => node.parentNode.insertBefore(node.cloneNode(true), node));
}

function setTileAttrs(elt, r, c) {
   elt.innerHTML = `${r*numCols+c}`; 
   elt.setAttribute('id', `r${r}c${c}`);
   elt.setAttribute('ca_r', `${r}`);
   elt.setAttribute('ca_c', `${c}`);
}

function game() {
   var [r,c] = [0,0];
   setGridSizeCSS(4,3);
   createBaseGrid();
   [...document.querySelectorAll('.tile')].forEach((elt) => { 
      setTileAttrs(elt,r+1,c+1);
      elt.addEventListener("click", ()=>{ selectTile(elt); }, false);
      c = (c+1) % numCols; if (c==0) r++; 
   });
}
