for (i=1;i<7;i++) {
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
  var originalcolor = sel.getComputedStyle;
  
  // try make for loop //

  for (i=0;i<3;i++) {
    eval(`
      setTimeout(()=>{sel.style = "color:yellow;"}, ${120*i+60});
      setTimeout(()=>{sel.style = "color:red;"}, ${120*(i+1)});
    `);
  }
  setTimeout(()=>{sel.style = `color:${originalcolor};`}, 420);
}

function checkin(room) {
  if (eval(room).guests.length == 4) {
    flash(qs(`#${room} .bttn1`));
  }
  else {
    eval(room).guests.push(qs(`#${room} input`).value);
    console.log(eval(room).guests);
  }
  qs(`#${room} input`).value = "";
}

function checkout(room) {
  if (eval(room).guests.length == 0) {
    flash(qs(`#${room} .bttn2`));
  }
  else if (qs(`#${room} input`).value == '$all') {
    eval(room).guests = [];
    console.log(eval(room).guests);
  }
  else {
    eval(room).guests.splice((qs(`#${room} input`).value)-1,1);
    console.log(eval(room).guests);
  }
  qs(`#${room} input`).value = "";
}