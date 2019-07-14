public class Eye
{
  int x, y;
  float diameter;
  
  public Eye(int x, int y, float diameter)
  {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    println("Making new Eye");
  }
  
  public void draw(int mx, int my)
  {
    noStroke();
    float angle = atan2(my - y, mx - x);
    float dist = dist(x, y, mx, my);
    pushMatrix();
    translate(x, y);
    if (dist <  diameter)
    {
      if (dist > diameter/2)
      {
        fill(255 * (dist - diameter/2)/(diameter/2));
        ellipse(0, 0, diameter, diameter);
        rotate(angle);
        fill(0);
        ellipse(diameter/4, 0, diameter/2, diameter/2);
      }
    }
    else
    {
      fill(255);
      ellipse(0, 0, diameter, diameter);
      rotate(angle);
      fill(0);
      ellipse(diameter/4, 0, diameter/2, diameter/2);
    }
    popMatrix();
    
  }
}
