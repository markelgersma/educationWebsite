import { Gamepad2, Play, Eye, MousePointer } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CodeBlock } from './CodeBlock';
import { PygameSimulator } from './PygameSimulator';

export const PygameTutorials = () => {
  const basicGameLoop = `# Example file showing a basic pygame "game loop"
import pygame

# pygame setup
pygame.display.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    # RENDER YOUR GAME HERE

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()`;

  const textboxExample = `# Example file showing a basic pygame "game loop"
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

# basic font for user typed
base_font = pygame.font.Font(None, 32)
user1_text = ''
user2_text = ''
# create rectangle
input1_rect = pygame.Rect(200, 200, 140, 32)
input2_rect = pygame.Rect(400, 200, 140, 32)

active1 = False
active2 = False
while running:

    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        if event.type == pygame.KEYDOWN:
            # Check for backspace
            if event.key == pygame.K_BACKSPACE:
                # get text input from 0 to -1 i.e. end.
                if(active1):
                    user_text1 = user1_text[:-1]
                if(active2):
                    user_text2 = user2_text[:-1]
            # Unicode standard is used for string
            # formation
            else:
                if(active1):
                    user1_text += event.unicode
                if(active2):
                    user2_text += event.unicode
        if event.type == pygame.MOUSEBUTTONDOWN:
            if input1_rect.collidepoint(event.pos):
                active1 = True
            else:
                active1 = False
            if input2_rect.collidepoint(event.pos):
                active2 = True
            else:
                active2 = False
            #print(pygame.mouse.get_pos())
            print("x=" + str(pygame.mouse.get_pos()[0]))
            print("y=" + str(pygame.mouse.get_pos()[1]))
    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")
    # RENDER YOUR GAME HERE
    if active1:
        pygame.draw.rect(screen, (150,150,250), input1_rect)
    else:
        pygame.draw.rect(screen, (150, 150, 150), input1_rect)
    pygame.draw.rect(screen, (150, 150, 150), input2_rect)
    text1_surface = base_font.render(user1_text, True, (255, 255, 255))
    text2_surface = base_font.render(user2_text, True, (255, 255, 255))

    # render at position stated in arguments
    screen.blit(text1_surface, (input1_rect.x + 5, input1_rect.y + 5))
    screen.blit(text2_surface, (input2_rect.x + 5, input2_rect.y + 5))

    # set width of textfield so that text cannot get
    # outside of user's text input
    input1_rect.w = max(100, text1_surface.get_width() + 10)
    input2_rect.w = max(100, text2_surface.get_width() + 10)

    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()`;

  const tutorials = [
    {
      title: "Basic Game Loop",
      description: "Your first Pygame program! This creates a simple purple window that responds to events. This is the foundation for all Pygame games.",
      code: basicGameLoop,
      icon: <Play className="h-5 w-5" />,
      concepts: ["Game loop", "Event handling", "Display", "Clock/FPS"]
    },
    {
      title: "Text Input System",
      description: "Learn how to create interactive text boxes where users can type. This example shows mouse interaction, keyboard input, and visual feedback.",
      code: textboxExample,
      icon: <MousePointer className="h-5 w-5" />,
      concepts: ["User input", "Mouse events", "Keyboard events", "Text rendering", "Collision detection"]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Pygame Game Development
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn to create interactive programs and games using Pygame. These examples will teach you 
          the fundamentals of game programming, from basic windows to user interaction.
        </p>
      </div>

      <div className="space-y-8">
        {tutorials.map((tutorial, index) => (
          <Card key={index} className="p-6 border border-border/50 card-gradient">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {tutorial.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {tutorial.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {tutorial.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {tutorial.concepts.map((concept, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
            
            <CodeBlock 
              code={tutorial.code}
              title={`${tutorial.title} Example`}
              language="python"
            />
            
            <PygameSimulator 
              type={index === 0 ? 'basic' : 'textbox'}
              title={`${tutorial.title} - Visual Simulation`}
            />
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-info/5 border-info/20">
        <div className="flex items-start gap-3">
          <Eye className="h-5 w-5 text-info mt-0.5" />
          <div>
            <h4 className="font-semibold text-info mb-2">What You'll See</h4>
            <p className="text-info/80 text-sm leading-relaxed">
              When you run these programs successfully, you'll see a 1280x720 purple window. 
              The first example just shows the window, while the second example lets you click on 
              gray rectangles to type in them. The mouse position will be printed to the console when you click.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};