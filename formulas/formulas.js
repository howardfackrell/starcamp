
function calculateCircle() {
  var radiusStr = document.getElementById("radiusInput").value;
  var radius = Number(radiusStr);

  document.getElementById('radius').innerText=radius;
  document.getElementById('circumference').innerText=circumference(radius);
  document.getElementById('area').innerText=circleArea(radius);
}

function circumference(radius) {
  return 2*Math.PI*radius;
}

function circleArea(radius) {
  return 2*Math.PI*radius*radius;
}


function calculateRectangle() {
  var widthStr = document.getElementById("widthInput").value;
  var width = Number(widthStr);

  var heightStr = document.getElementById("heightInput").value;
  var height = Number(heightStr);

  document.getElementById('width').innerText=width;
  document.getElementById('height').innerText=height;
  document.getElementById('perimeter').innerText=perimeter(width, height);
  document.getElementById('rectangleArea').innerText=rectangleArea(width, height);
}

function perimeter(width, height) {
  return 2*width + 2*height;
}

function rectangleArea(width, height) {
  return width*height;
}

