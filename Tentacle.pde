public class Tentacle
{
  int x, y;
  float length;
  float max;
  float width;
  float period;
  float period2;
  boolean shifts;
  float percentTouch;
  
  
  public Tentacle(int x, int y, float length, float period, float period2, boolean shifts, float percentTouch)
  {
    this.x = x;
    this.y = y;
    this.length = length;
    max = length;
    this.period = period;
    this.period2 = period2;
    this.shifts = shifts;
    this.percentTouch = percentTouch;
    println("Making new Tentacle at " + x + ", " + y);
  }
  
  public Tentacle(int x, int y, float length, float period, float period2)
  {
    this(x, y, length, period, period2, true, .75);
  }
  
  public void draw(int mx, int my, boolean shift)
  {
    //println("Drawing eye at " + x + ", " + y + " with diameter " + diameter);
    if (shift)
    {
      float lengthGoal = dist(x, y, mx, my) * percentTouch;
      if (lengthGoal - length < 10)
      {
        length = lengthGoal;
      }
      else
      {
        length += (lengthGoal - length) * .005;
      }
      if (length > max)
      {
        length = max;
      }
    }
    float angle = atan2(my - y, mx - x);
    pushMatrix();
    translate(x, y);
    rotate(angle);
    fill(139, 0, 139);
    /*
    curve(0,30, length/3, period * 40 * cosNum(period) + 30, 2 * length/3, period * -20 * cosNum(period) + 30, length, 0);
    curve(0,-30, length/3, period * 40 * cosNum(period) - 30, 2 * length/3, period * -20 * cosNum(period) - 30, length, 0);
    */
    beginShape();
    vertex(length + (length / 20 * cosNum(period)), length / 10 * cosNum(period2));
    bezierVertex(2 * length/3, length/10 * cosNum(period) - 30, length/3, -length/10 * cosNum(period2) - 30, 0, -30);
    
    vertex(0, 30);
    //vertex(length, 0);
    bezierVertex(length/3, -length/10 * cosNum(period2) + 30, 2 * length/3, length/10 * cosNum(period) + 30, length + (length / 20 * cosNum(period)), length / 10 * cosNum(period2));
    endShape();
    //ellipse(2 * length /3, 30 * cosNum(period) - 30, 10, 10);
    //ellipse(2 * length /3, 30 * cosNum(period) + 30, 10, 10);
    popMatrix();
  }
  
  public void draw(int mx, int my)
  {
    draw(mx, my, shifts);
  }
  
  public float cosNum(float per)
  {
    float seconds = (float) millis();
    seconds = seconds / 1000; //Accurate enough score of time)
    seconds = seconds * 2 * PI; //Gets all the way around in 1 second;
    seconds = seconds / per; //Gets us all the way around in 1 periods;
    return cos(seconds);
  }
  
}
