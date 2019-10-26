function qs(sel) {
  return document.querySelector(sel);
}

function test(rom) {
  console.log(qs(`#${rom} input`).value);
}

function flash(sel) {
  setTimeout(()=>{sel.style = "color:yellow;"}, 60);
  setTimeout(()=>{sel.style = "color:red;"}, 120);
  setTimeout(()=>{sel.style = "color:yellow;"}, 180);
  setTimeout(()=>{sel.style = "color:red;"}, 240);
  setTimeout(()=>{sel.style = "color:yellow;"}, 300);
  setTimeout(()=>{sel.style = "color:red;"}, 360);
}

var room1 = new Object();
var room2 = new Object();
var room3 = new Object();
var room4 = new Object();
var room5 = new Object();
var room6 = new Object();

room1.guests = [];
room1.iscleaning = false;

room2.guests = [];
room2.cleaning = false;

room3.guests = [];
room3.cleaning = false;

room4.guests = [];
room4.cleaning = false;

room5.guests = [];
room5.cleaning = false;

room6.guests = [];
room1.cleaning = false;

function checkin(room) {
  if (room.guests.length == 4) {
    flash(qs(`#${room} .bttn1`));
  }
  else {
    room.guests.push(qs(`#${room} input`).value);
    console.log(room.guests);
  }
}