import { Code, BookOpen, Terminal } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative overflow-visible bg-gradient-to-br from-primary/20 via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJoc2woMjAwIDk4JSAzOSUgLyAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center items-center gap-3 mb-8">
          <div className="p-3 bg-primary/20 rounded-full">
            <Code className="h-8 w-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-[1.25] pb-1 md:pb-2">
              Mr. Elgersma's
            </h1>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90 mb-6">
          Coding Classroom
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          Welcome to your gateway into the world of programming! Here you'll find everything you need 
          to master Python, create games with Pygame, and build your coding skills step by step.
        </p>
        
        <div className="flex justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Python Fundamentals</span>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>Pygame Development</span>
          </div>
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Hands-on Practice</span>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-muted-foreground/70">
          Last updated: September 15, 2025
        </div>
      </div>
    </header>
  );
};