var eyes;
var tents;

function setup() {
	print(random(0, 5));
	createCanvas(windowWidth, windowHeight);
	background(100);
	tents = [];
	//New Tentacle Bois
	tents.push(new Tentacle(-100, -100, 400, rand(4,6), random(2, 3), true, .85));
	tents.push(new Tentacle(windowWidth/4, -100, 200, rand(3,4), random(2, 3), true, .95));
	tents.push(new Tentacle(windowWidth/2, -100, 150, rand(3,4), random(2, 3), true, .95));
	tents.push(new Tentacle(3 *windowWidth/4, -100, 200, rand(3,4), random(2, 3), true, .95));
	tents.push(new Tentacle(windowWidth + 100, -100, 400, rand(4,6), random(2, 3), true, .85));
	//Side ones
	//tents.push(new Tentacle(-100, windowHeight/2, 200, rand(4,6), random(2, 3), true, .85));
	tents.push(new Tentacle(-100, windowHeight/3, 200, rand(4,6), random(2, 3), true, .85));
	tents.push(new Tentacle(-100, 2 * windowHeight/3, 200, rand(4,6), random(2, 3), true, .85));
	//tents.push(new Tentacle(windowWidth + 100, windowHeight/2, 200, rand(4,6), random(2, 3), true, .85));
	tents.push(new Tentacle(windowWidth + 100, windowHeight/3, 200, rand(4,6), random(2, 3), true, .85));
	tents.push(new Tentacle(windowWidth + 100, 2 * windowHeight/3, 200, rand(4,6), random(2, 3), true, .85));
	eyes = [];
	eyes.push(new Eye(windowWidth/2, windowHeight/2, 300, false, 1));
	for (var i = 0; i < 150; i++)
	{
		var newEye;
		if (i < 10)
		{
			var newEye = new Eye(rand(100, windowWidth - 100), rand(100, windowHeight - 100), rand(200, 300), false, random(4, 5));
		}
		else
		{
			var newEye = new Eye(rand(100, windowWidth - 100), rand(100, windowHeight - 100), rand(10, 40), true, random(5, 7));
		}
		var okay = true;
		for (var j = 0; j < eyes.length; j++)
		{
			if (newEye.overlaps(eyes[j]))
			{
				okay = false;
			}
		}
		if (okay)
		{
			eyes.push(newEye);
		}
	}
	eyes.shift();
}

function draw() {
	background(0);
	for (var i = 0; i < eyes.length; i++)
	{
		eyes[i].draw(mouseX, mouseY);
	}

	if (millis() < 4000)
	{
		fill(millis()/4000 * 255);
		textAlign(CENTER, CENTER);
		textSize(60);
		text('Welcome', windowWidth/2, windowHeight/2);
	}
	else
	{
		fill(255);
		textAlign(CENTER, CENTER);
		textSize(60);
		text('Welcome', windowWidth/2, windowHeight/2);
		
		//Draw the tentacles
		if (millis() > 7000)
		{
			for (var i = 0; i < tents.length; i++)
			{
				tents[i].draw(mouseX, mouseY, true);
			}
		}
	}
}

class Eye
{
  constructor(x, y, diameter, hides, delay)
  {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
		this.hides = hides;
		this.delay = delay * 1000;
  }
  
  draw(mx, my)
	{
		if (millis() < this.delay)
		{
			return;			
		}
		noStroke();
    var angle = atan2(my - this.y, mx - this.x);
    var dista = dist(this.x, this.y, mx, my);
    push();
    translate(this.x, this.y);
    if (dista < this.diameter && this.hides)
    {
      if (dista > this.diameter/2)
      {
        fill(255 * (dista - this.diameter/2)/(this.diameter/2));
        ellipse(0, 0, this.diameter, this.diameter);
        rotate(angle);
        fill(0);
        ellipse(this.diameter/4, 0, this.diameter/2, this.diameter/2);
      }
    }
    else
    {
      fill(255);
      ellipse(0, 0, this.diameter, this.diameter);
      rotate(angle);
      fill(0);
      ellipse(this.diameter/4, 0, this.diameter/2, this.diameter/2);
    }
    pop();
    
  }
	
	overlaps(other)
	{
		var dis = dist(this.x, this.y, other.x, other.y)
		return (dis < this.diameter || dis < other.diameter);
	}
}

function rand(low, high)
{
	return Math.floor(random(low, high));
}

function cosNum(per)
  {
    var seconds = millis();
    seconds = seconds / 1000; //Accurate enough score of time)
    seconds = seconds * TAU; //Gets all the way around in 1 second;
    seconds = seconds / per; //Gets us all the way around in 1 periods;
    return cos(seconds);
  }

class Tentacle
{
  
	constructor(x, y, length, period, period2, shifts, percentTouch)
  {
    this.x = x;
    this.y = y;
    this.length = 0;
    this.max = length;
    this.period = period;
    this.period2 = period2;
    this.shifts = shifts;
    this.percentTouch = percentTouch;
		print("New Tentacle: " + period + " " + period2);
  }
  
  draw(mx, my, shift)
  {
    //println("Drawing eye at " + x + ", " + y + " with diameter " + diameter);
    if (shift)
    {
      var lengthGoal = dist(this.x, this.y, mx, my) * this.percentTouch;
      if (lengthGoal - this.length < 10)
      {
        this.length = lengthGoal;
      }
      else
      {
        this.length += (lengthGoal - this.length) * .005;
      }
      if (this.length > this.max)
      {
        this.length = this.max;
      }
    }
    var angle = atan2(my - this.y, mx - this.x);
    push();
    translate(this.x, this.y);
    rotate(angle);
    fill(139, 0, 139);
    /*
    curve(0,30, length/3, period * 40 * cosNum(period) + 30, 2 * length/3, period * -20 * cosNum(period) + 30, length, 0);
    curve(0,-30, length/3, period * 40 * cosNum(period) - 30, 2 * length/3, period * -20 * cosNum(period) - 30, length, 0);
    */
    beginShape();
    vertex(this.length + (this.length / 20 * cosNum(this.period)), this.length / 10 * cosNum(this.period2));
    bezierVertex(2 * this.length/3, this.length/10 * cosNum(this.period) - 30, this.length/3, -this.length/10 * cosNum(this.period2) - 30, 0, -30);
    
    vertex(0, 30);
    //vertex(length, 0);
    bezierVertex(this.length/3, -this.length/10 * cosNum(this.period2) + 30, 2 * this.length/3, this.length/10 * cosNum(this.period) + 30, this.length + (this.length / 20 * cosNum(this.period)), this.length / 10 * cosNum(this.period2));
    endShape();
    //ellipse(2 * length /3, 30 * cosNum(period) - 30, 10, 10);
    //ellipse(2 * length /3, 30 * cosNum(period) + 30, 10, 10);
    pop();
  }
  /*
  draw(mx, my)
  {
    draw(mx, my, shifts);
  }
	*/
  
}
