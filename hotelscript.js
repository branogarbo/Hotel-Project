var masterlog = [];

function currtime() {
  return new Date().toUTCString();
}

for (i=1;i<=6;i++) {
  eval(`
    var room${i} = new Object();
    room${i}.guests = [];
    room${i}.locked = false;
  `);
}

function qs(sel) {
  return document.querySelector(sel);
}

function flash(sel) {
  for (i=0;i<3;i++) {
    eval(`
      setTimeout(()=>{qs(sel).style = "color:yellow;"}, ${120*i+60});
      setTimeout(()=>{qs(sel).style = "color:red;"}, ${120*(i+1)});
    `);
  }
  setTimeout(()=>{qs(sel).style = `color:#31393C`}, 420);
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
  if (eval(room).guests.length == 4) {
    flash(`#${room} .checkbttn`);
    qs(`#${room} input`).placeholder = "Enter number to check out";
  }
  else {
    eval(room).guests.push(qs(`#${room} input`).value);
    addel(`#${room} ol`,'li',qs(`#${room} input`).value);
    qs(`#${room} input`).placeholder = "Guests appear below";
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
    qs(`#${room} input`).placeholder = "Check guests here";
  }
  else if (qs(`#${room} input`).value < 1 || qs(`#${room} input`).value > eval(room).guests.length || eval(room).guests.length == 0)  {
    flash(`#${room} .checkbttn`);
    qs(`#${room} input`).placeholder = "Check guests here";
  }
  else {
    eval(room).guests.splice(qs(`#${room} input`).value-1,1);
    remel(`#${room} li:nth-of-type(${qs(`#${room} input`).value})`);
    if (eval(room).guests.length == 3) {
      qs(`#${room} input`).placeholder = 'Enter "$all" to clear room';
    }
  }
}

function roomlock(room) {
  if (eval(room).guests.length != 0) {
    qs(`#${room} img`).style = "animation-play-state:running";
    setTimeout(()=>{qs(`#${room} img`).style = "animation-play-state:paused";},390);
  }
  else if (eval(room).locked == false) {
    eval(room).locked = true;
    qs(`#${room}`).style = "background:#ff9bab;";
    qs(`#${room} img`).src = "locked-padlock.svg";
    qs(`#${room} input`).placeholder = "This room is locked!";
    qs(`#${room} input`).style = "background:#ffffff;";
    qs(`#${room} input`).disabled = true;
    qs(`.checkbttn`).disabled = true;
  }
  else {
    eval(room).locked = false;
    qs(`#${room}`).style = "background:#e0e7f0;";
    qs(`#${room} img`).src = "unlocked-padlock.svg";
    qs(`#${room} input`).placeholder = "Check guests here";
    qs(`#${room} input`).disabled = false;
    qs(`.checkbttn`).disabled = false;
  }
}