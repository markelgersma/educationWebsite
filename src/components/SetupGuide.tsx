import { CheckCircle2, AlertCircle, FileCode, Play, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SetupGuide = () => {
  const steps = [
    {
      icon: <FileCode className="h-5 w-5" />,
      title: "Open Visual Studio Code",
      description: "Launch VS Code and get ready to create your first Python program"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Create Your Project",
      description: "Click File → Open Folder, create a 'programming' folder in your ICS folder, then create a 'FirstProgram' folder inside it"
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Trust the Folder",
      description: "When prompted, click the option that says 'trust anything' in the parent folder"
    },
    {
      icon: <FileCode className="h-5 w-5" />,
      title: "Create a New Python File",
      description: "Click New File → Python File, then copy and paste the sample code below"
    },
    {
      icon: <Play className="h-5 w-5" />,
      title: "Run Your Program",
      description: "Press the play button (▶) near the top right and save your file as 'Sample' or 'test'"
    },
    {
      icon: <Settings className="h-5 w-5" />,
      title: "Install Pygame",
      description: "If you see an error about pygame, type 'pip install pygame' in the terminal at the bottom"
    },
    {
      icon: <CheckCircle2 className="h-5 w-5" />,
      title: "Select Python Version",
      description: "Click the Python version at the bottom right and choose Python 3.11 (recommended)"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Setting Up Your Development Environment
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Follow these steps to configure Visual Studio Code for Python programming. 
          This setup will enable you to write and run Python programs, including Pygame projects.
        </p>
      </div>

      <Alert className="border-info/50 bg-info/5">
        <AlertCircle className="h-4 w-4 text-info" />
        <AlertDescription className="text-info">
          <strong>First Time Setup:</strong> This guide will help you get everything working properly. 
          Take your time with each step and ask for help if you get stuck!
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {steps.map((step, index) => (
          <Card key={index} className="p-4 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-primary">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};