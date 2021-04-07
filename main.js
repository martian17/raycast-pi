var Sim = function(canvas){
    var width = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext("2d");
    
    var pow = function(x,p){//inefficient but also a part of the challenge
        //could do a log(n) improvement but nor reasonable with lower constants
        var o = 1;
        for(var i = 0; i < p; i++){
            o *= x;
        }
        return o;
    };
    
    
    var sin = function(x){//yes I use my own sin function
        var fact = 1;
        var result = 0;
        for(var i = 0; i < 20; i++){
            result += -((i&1)*2-1)*pow(x,i*2+1)/fact;
            fact*=((i*2)+2)*((i*2)+3);
        }
        return result;
    };
    
    var cos = function(x){
        var fact = 2;
        var result = 1;
        for(var i = 0; i < 20; i++){
            result += ((i&1)*2-1)*pow(x,i*2+2)/fact;
            fact*=((i*2)+3)*((i*2)+4);
        }
        return result;
    };
    
    var randomVector = function(){
        var x = Math.random()*2-1;
        var y = Math.random()*2-1;
        while(x*x+y*y > 1){
            x = Math.random()*2-1;
            y = Math.random()*2-1;
        }
        var r = Math.sqrt(x*x+y*y);
        return [x/r,y/r];//maybe implement inverse sqrt function
    };

    
    var sin05 = sin(0.5);
    var cos05 = cos(0.5);
    var tan05 = sin05/cos05;
    console.log(sin05,cos05,tan05);
    this.pi = 4;
    this.tan05 = tan05;
    
    var ox = 400;
    var oy = 200;
    
    var hitrays = 0;
    var allrays = 0;
    this.castRay = function(){
        var [x,y] = randomVector();
        var hit = false;
        if(x < 0){
            if(-tan05 < y/x && y/x < tan05){
                hitrays++;
                hit = true;
            }
        }
        allrays++;
        this.pi = allrays/2/hitrays;
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "destination-in";
        var fade = 0.99;
        ctx.fillStyle = "rgba(0, 0, 0, "+fade+")";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        //ray
        ctx.beginPath();
        ctx.moveTo(ox,oy);
        ctx.lineTo(ox+x*500,oy+y*500);
        ctx.strokeStyle = "#ff0";
        if(hit)ctx.strokeStyle = "#f00";
        ctx.stroke();
    };
};



var width = 500;
var height = 400;
var canvas = document.getElementById("canvas");
canvas.width = width;
canvas.height = height;
var sim = new Sim(canvas);


var canvas1 = document.getElementById("canvas1");
canvas1.width = width;
canvas1.height = height;
var ctx = canvas1.getContext("2d");

var animate = function(t){
    for(var i = 0; i < 50; i++){
        sim.castRay();
    }
    //the wall
    ctx.clearRect(0,0,width,height);
    ctx.beginPath();
    ctx.moveTo(100,200+300*sim.tan05);
    ctx.lineTo(100,200-300*sim.tan05);
    ctx.strokeStyle = "#002";
    ctx.stroke();
    
    ctx.font = "30px Serif";
    ctx.fillStyle = "#000";
    ctx.fillText("π="+sim.pi,10,30);
    
    ctx.font = "20px Serif";
    ctx.fillText("angle=1rad",130,170);
    ctx.fillText("τ=all_rays/hit_rays",130,200);
    ctx.fillText("π=τ/2",130,230);
    
    requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
