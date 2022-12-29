function dragElement(elmnt) {
  var posx = 0, posy = 0, distX = 0, distY = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup: 
    posx = e.clientX;
    posy = e.clientY;
    distX = elmnt.offsetLeft - posx;
    distY = elmnt.offsetTop - posy;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    posx = e.clientX + distX;
    posy = e.clientY + distY;
    // posx = Math.round(posx / 210) * 210 + 10;
    // set the element's new position:
    elmnt.style.top = (posy) + "px";
    elmnt.style.left = (posx) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    posx = Math.round(posx / 210) * 210 + 10;
    elmnt.style.left = (posx) + "px";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}