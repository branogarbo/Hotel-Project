for (i=1;i<=6;i++) {
  eval(`
    var room${i} = new Object();
    room${i}.guests = [];
    room${i}.locked = false;
  `);
  
  // y aint this workin :/

  addel('#roomcont','div',`
    <div id="room${i}" class="room">
      <img src="unlocked-padlock.svg" onclick="roomlock('room${i}')">
      <h2>Room ${i}</h2>
      <input type="text" onkeypress="entercheck('room${i}',event)" placeholder="Check guests here">
      <button onmousedown="check('room${i}')">Check In/Out</button>
      <ol></ol>
    </div>
  `);
}

var masterlog = [];

function currtime() {
  return new Date().toUTCString();
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

function entercheck(room,event) {
  if (event.key == "Enter") {
    check(room);
  }
}

function check(room) {
  if (qs(`#${room} input`).value == "") {
    flash(`#${room} button`);
  }
  else if (qs(`#${room} input`).value.includes(',')) {
    var indentry = qs(`#${room} input`).value.split(',');
    for (i=0;i<indentry.length;i++) {
      if (!isNaN(Number(indentry[i]))) {
        indentry[i] = indentry[i]-i;
        qs(`#${room} input`).value = indentry[i];
        check(room);
      }
      else {
        qs(`#${room} input`).value = indentry[i];
        check(room);
      }
    }
  }
  else if (isNaN(Number(qs(`#${room} input`).value)) && qs(`#${room} input`).value != "$all") {
    checkin(room);
  }
  else {
    checkout(room);
  }
  qs(`#${room} input`).value = "";
}

function checkin(room) {
  if (eval(room).guests.length == 4) {
    flash(`#${room} button`);
  }
  else {
    eval(room).guests.push(qs(`#${room} input`).value);
    addel(`#${room} ol`,'li',qs(`#${room} input`).value);
    qs(`#${room} input`).placeholder = "Guests appear below";
    masterlog.push([room,qs(`#${room} input`).value,currtime()]);
    if (eval(room).guests.length == 4) {
      qs(`#${room} input`).placeholder = "Enter number to check out";
    }
  }
  console.clear();
  console.log(masterlog);
}

function checkout(room) {
  if (qs(`#${room} input`).value == "$all" && eval(room).guests.length != 0) {
    eval(room).guests = [];
    remel(`#${room} ol`);
    addel(`#${room}`,'ol','');
    qs(`#${room} input`).placeholder = "Check guests here";
  }
  else if (qs(`#${room} input`).value < 1 || qs(`#${room} input`).value > eval(room).guests.length || eval(room).guests.length == 0)  {
    flash(`#${room} button`);
    qs(`#${room} input`).placeholder = "Check guests here";
  }
  else {
    eval(room).guests.splice(qs(`#${room} input`).value-1,1);
    remel(`#${room} li:nth-of-type(${qs(`#${room} input`).value})`);
    qs(`#${room} input`).placeholder = "Check guests here";
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
    qs(`#${room} button`).disabled = true;
  }
  else {
    eval(room).locked = false;
    qs(`#${room}`).style = "background:#e0e7f0;";
    qs(`#${room} img`).src = "unlocked-padlock.svg";
    qs(`#${room} input`).placeholder = "Check guests here";
    qs(`#${room} input`).disabled = false;
    qs(`#${room} button`).disabled = false;
  }
}