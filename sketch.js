let time;
let frameCountBuffer = 0;
let fps = 0;

const CANVAS_W = 640;
const CANVAS_H = 480;
const GRID_SIZE = 64;

const BUTTON_OFFSET = 8;
const BUTTON_W = GRID_SIZE*4;
const BUTTON_H = GRID_SIZE*3;
const BUTTON_X = GRID_SIZE*2;
const BUTTON_Y = GRID_SIZE*2;
const BUTTON_M = 24;

const FRAMERATE_SETTING = [
	30,
	45,
	60,
	75,
	90,
	120
];
let fSelect;

const DEBUG = true;
const DEBUG_VIEW_X = 40;
const DEBUG_VIEW_Y = 20;
const DEBUG_VIEW_H = 20;

function preload() {
}
function getFn() {
	const val = +fSelect.value();
	console.log(val);
	frameRate(val);
}
function setup() {
	createCanvas(CANVAS_W, CANVAS_H);
	time = millis();
	rectMode(CENTER);

	getButton = buttonInit('set', BUTTON_W, BUTTON_H, BUTTON_X, BUTTON_Y);
	getButton.mousePressed(getFn);
	fSelect = createSelect();
	for (let i=0; i<FRAMERATE_SETTING.length; i++){
		fSelect.option('fps:'+FRAMERATE_SETTING[i], FRAMERATE_SETTING[i]);
	}
	fSelect.size(GRID_SIZE*2);
	fSelect.style('font-size', '32px');
	textAlign(CENTER,CENTER);
}
function buttonInit(text, w, h, x, y) {
	let button = createButton(text);
	button.size(w,h);
	button.position(x+BUTTON_OFFSET,y+BUTTON_OFFSET);
	button.style('font-size', '48px');
	return button;
}
function draw() {
	background(48);
	let current = millis();
	if ( (current-time)>=1000 ){
		time += 1000;
		fps = frameCount - frameCountBuffer;
		frameCountBuffer = frameCount;
	}
	if (DEBUG){
		stroke(128);
		strokeWeight(1);
		for (let i=0; i<CANVAS_H/GRID_SIZE; i++){
			line(0, i*GRID_SIZE, CANVAS_W, i*GRID_SIZE);
		}
		for (let i=0; i<CANVAS_W/GRID_SIZE; i++){
			line(i*GRID_SIZE, 0, i*GRID_SIZE, CANVAS_H);
		}
	}
	fill(255);
	stroke(255);
	textSize(16);
	strokeWeight(1);
	let debugY = DEBUG_VIEW_Y;
	text('fps:'+fps, DEBUG_VIEW_X, debugY);
	debugY += DEBUG_VIEW_H;
}
function touchMoved() {
	return false;
}