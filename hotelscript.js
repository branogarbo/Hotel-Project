var masterlog = [];
var currtime = new Date().toUTCString();

for (i=1;i<=6;i++) {
  eval(`
    var room${i} = new Object();
    room${i}.guests = [];
    room${i}.cleaning = false;
  `);
}

function qs(sel) {
  return document.querySelector(sel);
}

function flash(sel) {
  var originalcolor = window.getComputedStyle(sel,null).getPropertyValue('color');
  
  for (i=0;i<3;i++) {
    eval(`
      setTimeout(()=>{sel.style = "color:yellow;"}, ${120*i+60});
      setTimeout(()=>{sel.style = "color:red;"}, ${120*(i+1)});
    `);
  }
  setTimeout(()=>{sel.style = `color:${originalcolor};`}, 420);
}

// Cant assign these to variables because it messes the code up:

// eval(room).guests = array of guests checked in to that room.
// qs(`#${room} input`) = input field of that room by which you check in and out guests with.

function addel(position,element,content) {
  var newitem = document.createElement(element);
  var newtext = document.createTextNode(content);

  newitem.appendChild(newtext);
  qs(position).appendChild(newitem);
}

function remel(position) {
  var child = qs(position);
  var parent = child.parentNode;

  parent.removeChild(child);
}

function checkin(room) {
  if (eval(room).guests.length == 4 || eval(room).cleaning == true || qs(`#${room} input`).value == "" || !isNaN(parseInt(qs(`#${room} input`).value))) {
    flash(qs(`#${room} .bttn1`));
  }
  else {
    eval(room).guests.push(qs(`#${room} input`).value);
    addel(`#${room} ol`,'li',qs(`#${room} input`).value);
    masterlog.push([room,qs(`#${room} input`).value,currtime]);
  }
  qs(`#${room} input`).value = "";
}

function checkout(room) {
  if (qs(`#${room} input`).value == '$all') {
    eval(room).guests = [];
    remel(`#${room} ol`);
    addel(`#${room}`,'ol','');
  }
  else if (qs(`#${room} input`).value < 1 || qs(`#${room} input`).value > 4 || qs(`#${room} input`).value == "" || eval(room).guests.length == 0 || isNaN(parseInt(qs(`#${room} input`).value)))  {
    flash(qs(`#${room} .bttn2`));
  }
  else {
    eval(room).guests.splice(qs(`#${room} input`).value-1,1);
    remel(`#${room} li:nth-of-type(${qs(`#${room} input`).value})`)
  }
  qs(`#${room} input`).value = "";
}
