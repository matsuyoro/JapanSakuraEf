var canvas, ctx;
var particles = [];
var isMSIE = /*@cc_on!@*/
false;
if (isMSIE) {
    var NUM_PARTICLES = 20;
}
else {
    var NUM_PARTICLES = 50;
}
function Particle()
{
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5;
    this.color = Math.random() * 255;
    this.xvel = Math.random() * 1;
    this.yvel = Math.random() * 1.5;
}
Particle.prototype.update = function ()
{
    this.y += this.yvel;
    this.x += this.xvel;
    if ((this.y % 50 | 0) > 25) {
        if (this.xvel < 2) {
            this.xvel += 0.2;
        }
    }
    else {
        if (this.xvel > -2) {
            this.xvel -= 0.2;
        }
    }
    if (this.y > canvas.height) {
        this.y -= canvas.height;
        this.x = Math.random() * canvas.width;
        this.xvel = 0;
    }
}
function loop()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < NUM_PARTICLES; i++)
    {
        particles[i].update();
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255,200,255)";
        ctx.lineWidth = particles[i].size;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[i].x - particles[i].xvel, particles[i].y - particles[i].yvel);
        ctx.stroke();
        ctx.closePath();
    }
    setTimeout(loop, 30);
}
function load()
{
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    for (var i = 0; i < NUM_PARTICLES; i++) {
        particles[i] = new Particle();
    }
    loop();
}
window.onload = function ()
{
    load();
}
