import { CodeBlock } from './CodeBlock';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export const InteractiveExamples = () => {
  const pythonExamples = [
    {
      title: "Hello World Example",
      code: `# Your first Python program
print("Hello, World!")
print("Welcome to programming!")

# Try changing the message
name = "Student"
print(f"Hello, {name}!")`,
      description: "Try running this basic Python example to see how print statements work."
    },
    {
      title: "Math Operations",
      code: `# Basic arithmetic in Python
a = 10
b = 3

print(f"Addition: {a} + {b} = {a + b}")
print(f"Subtraction: {a} - {b} = {a - b}")
print(f"Multiplication: {a} * {b} = {a * b}")
print(f"Division: {a} / {b} = {a / b}")
print(f"Integer Division: {a} // {b} = {a // b}")
print(f"Modulo: {a} % {b} = {a % b}")

# Try changing the values!`,
      description: "Experiment with different numbers to see how Python handles math operations."
    },
    {
      title: "User Input Simulation",
      code: `# Simulate user input (normally uses input() function)
name = "Alex"  # This would be input("What's your name? ")
age = 16       # This would be int(input("How old are you? "))

print(f"Hi {name}!")
print(f"You are {age} years old.")

if age >= 18:
    print("You are an adult!")
else:
    years_left = 18 - age
    print(f"You have {years_left} years until you're an adult.")`,
      description: "This shows how conditionals and variables work together. In VS Code, you'd use input() to get real user input."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Interactive Python Examples
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Run these Python examples right in your browser to see how the code works!
        </p>
      </div>

      <Card className="p-6 bg-info/5 border-info/20 mb-8">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-info mt-0.5" />
          <div>
            <h4 className="font-semibold text-info mb-2">How This Works</h4>
            <p className="text-info/80 text-sm leading-relaxed">
              These examples run real Python code in your browser using Pyodide. 
              You can modify the code and run it to see different results. This is perfect for 
              experimenting and learning how Python works before you set up VS Code!
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        {pythonExamples.map((example, index) => (
          <Card key={index} className="p-6 border border-border/50 card-gradient">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {example.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {example.description}
              </p>
            </div>
            
            <CodeBlock 
              code={example.code}
              title={example.title}
              language="python"
              runnable={true}
              runnableType="python"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};