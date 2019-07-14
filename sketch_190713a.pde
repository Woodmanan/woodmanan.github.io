ArrayList<Eye> eyes;
ArrayList<Tentacle> tents;

void setup()
{
  fullScreen();
  eyes = new ArrayList<Eye>();
  eyes.add(new Eye(700,400,200));
  eyes.add(new Eye(1600,400,400));
  eyes.add(new Eye(1600,800,100));
  eyes.add(new Eye(800,1000,400));
  
  tents = new ArrayList<Tentacle>();
  tents.add(new Tentacle(-100, -100, 600, random(4,6), random(2,3)));
  tents.add(new Tentacle(width + 100, -100, 600, random(4,6), random(2,3)));
  tents.add(new Tentacle(width + 100, height + 100, 600, random(4,6), random(2,3)));
  tents.add(new Tentacle(-100, height + 100, 600, random(4,6), random(2,3)));
  
  
  tents.add(new Tentacle(width/2, -100, 300, random(4,6), random(2, 3)));
  tents.add(new Tentacle(width/2, height + 100, 300, random(4,6), random(2, 3)));
  
  tents.add(new Tentacle(-100, height/2, 300, random(4,6), random(2, 3)));
  tents.add(new Tentacle(width + 100, height/2, 300, random(4,6), random(2, 3)));
  
}

void draw()
{
  clear();
  background(0);
  for (int i = 0; i < eyes.size(); i++)
  {
    eyes.get(i).draw(mouseX, mouseY);
  }
  for (int i = 0; i < tents.size(); i++)
  {
    tents.get(i).draw(mouseX, mouseY);
  }
}
