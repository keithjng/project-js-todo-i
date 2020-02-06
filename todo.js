const fs = require('fs');

let currentList = fs.readFileSync('todos.txt', 'utf-8');
let command = process.argv[2];
let input = process.argv[3];

function seeList() {
  if (command === 'list') {
    console.log(fs.readFileSync('todos.txt', 'utf-8'));
  }
}

function addTo() {
  if (command === 'add') {
    console.log('Adding "' + input + '" to TODO list.');
    fs.writeFileSync('todos.txt', currentList + '[ ] ' + input + '\n');
  }
}

function takeAway() {
  if (command === 'delete') {
    let listArray = currentList.split('\n');
    let place = listArray[input - 1];
    let item = place.slice(4, place.length);
    console.log('Removing "' + item + '" from TODO list.');
    let lines = currentList.split('\n');
    lines.splice(input - 1, 1);
    let newList = lines.join('\n');
    fs.writeFileSync('todos.txt', newList);
  }
}

function checkmark() {
  if (command === 'complete') {
    let listArray = currentList.split('\n');
    let place = listArray[input - 1];
    let item = place.slice(4, place.length);
    console.log('Marking "' + item + '" as complete!');
    let markedBox = place.replace('[ ]', '[X]');
    let lines = currentList.split('\n');
    let lines2 = currentList.split('\n');
    let sectOne = lines.splice(0, input - 1);
    let sectTwo = lines2.splice(input, lines.length);
    let space = (sectOne + ',' + markedBox + ',' + sectTwo);
    let newList = space.replace(/,/g, '\n');
    fs.writeFileSync('todos.txt', newList);
  }
}

seeList();
addTo();
takeAway();
checkmark();
