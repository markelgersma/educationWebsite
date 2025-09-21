import { ExternalLink, FileText, Settings, Gamepad2, Code } from 'lucide-react';
import { Header } from '@/components/Header';
import { ResourceCard } from '@/components/ResourceCard';
import { SetupGuide } from '@/components/SetupGuide';
import { PygameTutorials } from '@/components/PygameTutorials';
import { HackerRankExercises } from '@/components/HackerRankExercises';
import { InteractiveExamples } from '@/components/InteractiveExamples';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const resources = [
    {
      title: "Notepad++ Version 8",
      description: "A powerful text editor for coding. Download the latest version to have a reliable backup editor for your programming projects.",
      url: "https://markelgersma.com/downloads/npp.zip",
      isDownload: true,
      icon: <FileText className="h-5 w-5 text-primary" />
    },
    {
      title: "W3Schools HTML Tutorial", 
      description: "Comprehensive HTML learning resource. Essential for understanding web development fundamentals alongside your Python studies.",
      url: "https://www.w3schools.com/html/default.asp",
      icon: <ExternalLink className="h-5 w-5 text-primary" />
    },
    {
      title: "Python Tutorial (W3Schools)",
      description: "Complete Python learning resource covering all the basics you need. Perfect companion to your classroom learning.",
      url: "https://www.w3schools.com/python/",
      icon: <ExternalLink className="h-5 w-5 text-primary" />
    },
    {
      title: "Pygame Documentation",
      description: "Official Pygame documentation. Your go-to reference for game development functions, classes, and advanced techniques.",
      url: "https://www.pygame.org/docs/",
      icon: <Gamepad2 className="h-5 w-5 text-primary" />
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        
        {/* Quick Resources Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Essential Resources
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quick access to the tools and documentation you'll need throughout the course.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </section>

        {/* Main Content Tabs */}
        <section>
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="setup" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Setup Guide
              </TabsTrigger>
              <TabsTrigger value="interactive" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Try Python
              </TabsTrigger>
              <TabsTrigger value="pygame" className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Pygame Tutorials
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Practice Exercises
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="setup">
              <Card className="p-6">
                <SetupGuide />
              </Card>
            </TabsContent>
            
            <TabsContent value="interactive">
              <InteractiveExamples />
            </TabsContent>
            
            <TabsContent value="pygame">
              <PygameTutorials />
            </TabsContent>
            
            <TabsContent value="exercises">
              <HackerRankExercises />
            </TabsContent>
          </Tabs>
        </section>
        
      </main>
      
      <footer className="border-t border-border/50 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Mr. Elgersma's Coding Classroom</strong> - High School Computer Science Resources
            </p>
            <p>
              Built for students learning Python programming and game development
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;