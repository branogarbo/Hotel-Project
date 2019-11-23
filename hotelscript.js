var masterlog = [];

function currtime() {
  return new Date().toUTCString();
}

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
  var originalcolor = window.getComputedStyle(qs(sel),null).getPropertyValue('color');
  
  for (i=0;i<3;i++) {
    eval(`
    setTimeout(()=>{qs(sel).style = "color:yellow;"}, ${120*i+60});
    setTimeout(()=>{qs(sel).style = "color:red;"}, ${120*(i+1)});
    `);
  }
  setTimeout(()=>{qs(sel).style = `color:${originalcolor};`}, 420);
}

function addel(position,element,content) {
  var newel = document.createElement(element);
  var newcont = document.createTextNode(content);
  
  newel.appendChild(newcont);
  qs(position).appendChild(newel);
}

function remel(position) {
  var elem = qs(position);
  var parent = elem.parentNode;
  
  parent.removeChild(elem);
}

function check(room) {
  if (qs(`#${room} input`).value == "") {
    flash(`#${room} .checkbttn`);
  }
  else if (isNaN(parseInt(qs(`#${room} input`).value)) && qs(`#${room} input`).value != '$all') {
    checkin(room);
  }
  else {
    checkout(room);
  }
  qs(`#${room} input`).value = "";
}

function checkin(room) {
  if (eval(room).guests.length == 4 || eval(room).cleaning == true) {
    flash(`#${room} .checkbttn`);
  }
  else {
    eval(room).guests.push(qs(`#${room} input`).value);
    addel(`#${room} ol`,'li',qs(`#${room} input`).value);
    masterlog.push([room,qs(`#${room} input`).value,currtime()]);
  }
  console.clear();
  console.log(masterlog);
}

function checkout(room) {
  if (qs(`#${room} input`).value == '$all' && eval(room).guests.length != 0) {
    eval(room).guests = [];
    remel(`#${room} ol`);
    addel(`#${room}`,'ol','');
  }
  else if (qs(`#${room} input`).value < 1 || qs(`#${room} input`).value > eval(room).guests.length || eval(room).guests.length == 0)  {
    flash(`#${room} .checkbttn`);
  }
  else {
    eval(room).guests.splice(qs(`#${room} input`).value-1,1);
    remel(`#${room} li:nth-of-type(${qs(`#${room} input`).value})`);
  }
}

room2.cleaning = true;

function roomclean(room) {
  if (eval(room).cleaning == false) {
    eval(room).cleaning = true;
    qs(`#${room}`).style = "background:#f1f4f8;";
  }
  else {
    eval(room).cleaning = false;
    qs(`#${room}`).style = "background:#ff9bab;";
  }
}