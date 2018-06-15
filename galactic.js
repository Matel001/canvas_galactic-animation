const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let currentAngle = 0;
let angleFactor = 0.000005;
let staph;
let bgcArray = [
    "rgba(18, 18, 18, 1.00)",
    "rgba(18, 18, 18, 0.01)"
]
let a = 0.05;
let char = 1;
let bgColor = bgcArray[0];

addEventListener("resize", function(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    starArray=[];
    init();
})

let mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
    if(mousedownID==-1){  //Prevent multiple loops
        clearInterval(staph);
        //bgColor= bgcArray[0];
        //a= 0.05;
        //char = 1;
        mousedownID = setInterval(whilemousedown, 75);
  }
}
function mouseup(event) {
   if(mousedownID!=-1) {  //stop if exists
        clearInterval(mousedownID);
        mousedownID=-1;
        a= 0.01;
        char = 0.01;
        if(angleFactor > 0.000005){
            staph = setInterval(stopping, 75);
        }
       //a= 0.05;
       //char = 1;
   }

}
function whilemousedown() {
//tutaj turbo
    //ctx.clearRect(0,0,canvas.width, canvas.height);
    console.log(a);
    console.log(char.toFixed(2));
    if(char > 0.10){
        a = 0.05;
        bgColor = bgColor.replace(char.toFixed(2), (char-a).toFixed(2));
        char-=a;
    }
    else if(char > 0.01){
            a = 0.01;
            bgColor = bgColor.replace(char.toFixed(2), (char-a).toFixed(2));
            char-=a;
    }
    else{
        bgColor = bgcArray[1];
        char = 0.01;
    }
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fill();
    if(angleFactor < 0.000005 * 10){
        angleFactor = angleFactor + 0.000005/2;
    }
    
}
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);


function stopping(){
    if(char < 0.10){
        a=0.01;
        bgColor = bgColor.replace(char.toFixed(2), (char+a).toFixed(2));
        char+=a;
    }
    else if(char < 1){
        a = 0.05;
        bgColor = bgColor.replace(char.toFixed(2), (char+a).toFixed(2));
        char+=a;
    }
    else{
        bgColor = bgcArray[0];
        char = 1;
        a=0.05;
    }
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fill();
    
    angleFactor = angleFactor - 0.000005/2;
    if(angleFactor < 0.000005){
        angleFactor = 0.000005;
        clearInterval(staph);
        char = 1;
        a = 0.05;
        bgColor = bgcArray[0];
    }
    
    
}
function randomFrom(min, max){
    return Math.random()*(max-min)+min;
}

function Star(x,y,radius,color,glimmerColor){
    this.x = x;
    this.y = y;
    this.radius= radius;
    this.color = color;
    this.glimmerColor = glimmerColor;
    
    this.update = function(){

        
        currentAngle += angleFactor;
        if(currentAngle>360){
            currentAngle-=360;
        }
        
        ctx.translate(canvas.width/2, canvas.height/2);
        ctx.rotate(currentAngle);
        
        this.draw();
        ctx.rotate(-currentAngle);
        //ctx.rotate(-Math.PI/180);
        ctx.translate(-canvas.width/2, -canvas.height/2)
    }
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.glimmerColor;
        ctx.lineWidth = this.radius*5;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.stroke();
        ctx.fill();    
        ctx.closePath();
    }
}


let starArray=[]

let colorArray=[
    "rgba(232,217,149,1)",
    "rgba(252,248,217,1)",
    "rgba(255,255,255,1)",
    "rgba(110,197,255,1)",
    "rgba(6,86,255,1)"
];

function init(){
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fill();
    for(let i = 0; i<250; i++){
        let colors = Math.round(randomFrom(0,4));
        let x = randomFrom(-canvas.width/2, canvas.width/2);
        let y = randomFrom(-canvas.width/2, canvas.width/2);
        let radius = randomFrom(0.1, 2);
        let color = colorArray[colors];
        let glimmerColor = color;
        glimmerColor = glimmerColor.replace("1)", "0.08)");
        starArray.unshift(new Star(x,y,radius,color,glimmerColor));     
   }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.beginPath();
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    for(let i=0; i<starArray.length; i++){
        starArray[i].update();
    }
}

init();
animate();
