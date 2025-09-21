import { ExternalLink, Trophy, Star, Code2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const HackerRankExercises = () => {
  const exercises = [
    {
      title: "Say 'Hello, World!' With Python",
      url: "https://www.hackerrank.com/challenges/py-hello-world/problem?isFullScreen=true",
      concepts: ["print command", "quotes", "brackets"],
      difficulty: "Beginner",
      description: "Learn the basics of Python syntax with your first program"
    },
    {
      title: "Arithmetic Operators",
      url: "https://www.hackerrank.com/challenges/python-arithmetic-operators/problem?isFullScreen=true",
      concepts: ["casting", "types", "*,+,- operators", "input command"],
      difficulty: "Beginner",
      description: "Master basic mathematical operations in Python"
    },
    {
      title: "Python: Division",
      url: "https://www.hackerrank.com/challenges/python-division/problem?isFullScreen=true",
      concepts: ["integer vs float division"],
      difficulty: "Beginner",
      description: "Understand the difference between different division types"
    },
    {
      title: "Python If-Else",
      url: "https://www.hackerrank.com/challenges/py-if-else/problem?isFullScreen=true",
      concepts: ["conditional statements", "mod (%) operator"],
      difficulty: "Intermediate",
      description: "Learn conditional logic - can be tricky, learn modulo first!"
    },
    {
      title: "What's Your Name?",
      url: "https://www.hackerrank.com/challenges/whats-your-name/problem?isFullScreen=true",
      concepts: ["string concatenation", "functions"],
      difficulty: "Beginner",
      description: "Work with strings and understand function parameters"
    },
    {
      title: "Print Function",
      url: "https://www.hackerrank.com/challenges/python-print/problem?isFullScreen=true",
      concepts: ["for/while loops"],
      difficulty: "Intermediate",
      description: "Master basic loops for repetitive tasks"
    },
    {
      title: "Write a function",
      url: "https://www.hackerrank.com/challenges/write-a-function/problem?isFullScreen=true",
      concepts: ["custom functions"],
      difficulty: "Intermediate",
      description: "Create your own functions - this can be tricky!"
    },
    {
      title: "Lists",
      url: "https://www.hackerrank.com/challenges/python-lists/problem?isFullScreen=true",
      concepts: ["lists", "data structures"],
      difficulty: "Intermediate",
      description: "Working with lists takes time - be patient"
    },
    {
      title: "Find the Runner-Up Score!",
      url: "https://www.hackerrank.com/challenges/find-second-maximum-number-in-a-list/problem?isFullScreen=true",
      concepts: ["list manipulation"],
      difficulty: "Intermediate",
      description: "Apply your list knowledge to solve problems"
    },
    {
      title: "sWAP cASE",
      url: "https://www.hackerrank.com/challenges/swap-case/problem?isFullScreen=true",
      concepts: ["string manipulation", "upper()", "lower()"],
      difficulty: "Beginner",
      description: "Learn string transformation methods"
    },
    {
      title: "String Split and Join",
      url: "https://www.hackerrank.com/challenges/python-string-split-and-join/problem?isFullScreen=true",
      concepts: ["string split()"],
      difficulty: "Beginner",
      description: "Break apart and rebuild strings"
    },
    {
      title: "Mutations",
      url: "https://www.hackerrank.com/challenges/python-mutations/problem?isFullScreen=true",
      concepts: ["string slicing"],
      difficulty: "Intermediate",
      description: "String slicing - check the example in problem definition"
    },
    {
      title: "Find a string",
      url: "https://www.hackerrank.com/challenges/find-a-string/problem?isFullScreen=true",
      concepts: ["substring search", "'in' operator"],
      difficulty: "Intermediate",
      description: "Search for patterns within strings"
    },
    {
      title: "Minion Game",
      url: "https://www.hackerrank.com/challenges/the-minion-game/problem?isFullScreen=true",
      concepts: ["string practice"],
      difficulty: "Advanced",
      description: "Advanced string manipulation practice"
    },
    {
      title: "DSBN Codes Shape Math",
      url: "https://www.hackerrank.com/contests/dsbn-codes-week-1-fall-2023/challenges/dsbn-codes-week-1-fall-2023",
      concepts: ["math practice", "competition"],
      difficulty: "Competition",
      description: "Math practice - sign up as needed for the competition"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success border-success/20";
      case "Intermediate": return "bg-warning/10 text-warning border-warning/20";
      case "Advanced": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Competition": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Python Practice Exercises
          </h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Progressive exercises from HackerRank to build your Python skills step by step. 
          Start from the beginning and work your way through each challenge.
        </p>
      </div>

      <div className="grid gap-4">
        {exercises.map((exercise, index) => (
          <Card key={index} className="p-4 border border-border/50 hover:border-primary/30 transition-all duration-300 card-gradient">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{exercise.title}</h3>
                  <Badge className={getDifficultyColor(exercise.difficulty)}>
                    {exercise.difficulty}
                  </Badge>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 ml-11">
              {exercise.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4 ml-11">
              {exercise.concepts.map((concept, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  <Code2 className="h-3 w-3 mr-1" />
                  {concept}
                </Badge>
              ))}
            </div>
            
            <div className="ml-11">
              <Button asChild size="sm" className="w-full sm:w-auto">
                <a 
                  href={exercise.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <Star className="h-4 w-4" />
                  Start Challenge
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};