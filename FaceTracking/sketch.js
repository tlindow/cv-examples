// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var capture;
var tracker
var w = 640,
  h = 480;
var img1;
var img2;

function preload() {
  img1 = loadImage('banana.png');
  img2 = loadImage('banana.png')
}

function setup() {
  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);

  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);
}

function draw() {
  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);
  beginShape();
  for (var i = 0; i < positions.length; i++) {
    vertex(positions[i][0], positions[i][1]);
  }
  endShape();

  noStroke();
  for (var i = 0; i < positions.length; i++) {
    fill(map(i, 0, positions.length, 0, 360), 50, 100);
    ellipse(positions[i][0], positions[i][1], 4, 4);
    text(i, positions[i][0], positions[i][1]);
  }

  if (positions.length > 0) {
    var mouthLeft = createVector(positions[44][0], positions[44][1]);
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    var mouthTop = createVector(positions[47][0], positions[47][1]);
    var mouthBottom = createVector(positions[53][0], positions[53][1])
    var smile = mouthLeft.dist(mouthRight);
    var mouthOpen = mouthTop.dist(mouthBottom);
    var count = 0;
    if (mouthOpen > 50) {
      if (count % 2 == 1) {
        image(img1, positions[60][0] - 100, positions[60][1] - 100, 200, 200);
      } else {
        image(img2, positions[60][0] - 100, positions[60][1] - 100, 200, 200);
      }
      console.log(count);
    } else {
      count++;
    }
    // uncomment the line below to show an estimate of amount "smiling"
    rect(20, 20, smile * 3, 20);

    //        noStroke();
    //        fill(0, 255, 255);
    //        ellipse(positions[62][0], positions[62][1], 50, 50);
  }
}