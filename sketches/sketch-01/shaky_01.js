  if (messageText == 'shaky') {
    // var mouse = robot.getMousePos();
    // var x = mouse.x;
    // var y = mouse.y;
    // console.log('shaky mouse!');
    timer = setInterval(shakeMouse, 100);
    sendTextMessage(senderID, 'shaky mouse');
  }
  if (messageText == 'stop') {
    // console.log('stop shaking!');
    clearInterval(timer);
    sendTextMessage(senderID, 'stop shaking');
  }
function shakeMouse(){
  var mouse = robot.getMousePos();
  x = mouse.x;
  y = mouse.y;
  robot.moveMouseSmooth(mouse.x+5, mouse.y+5);
  mouse = robot.getMousePos();
  robot.moveMouseSmooth(mouse.x-10, mouse.y-10);
  mouse = robot.getMousePos();
  robot.moveMouseSmooth(mouse.x+5, mouse.y+5);
}