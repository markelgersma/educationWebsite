import { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PyodideRunnerProps {
  code: string;
  title?: string;
}

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

export const PyodideRunner = ({ code, title = "Python Output" }: PyodideRunnerProps) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        if (!window.pyodide) {
          // Load Pyodide script
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = async () => {
            window.pyodide = await window.loadPyodide({
              indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
            });
            setPyodideReady(true);
          };
          document.head.appendChild(script);
        } else {
          setPyodideReady(true);
        }
      } catch (error) {
        console.error('Error loading Pyodide:', error);
        setOutput('Error: Could not load Python interpreter');
      }
    };

    initPyodide();
  }, []);

  const runCode = async () => {
    if (!pyodideReady || !window.pyodide) {
      setOutput('Python interpreter not ready yet...');
      return;
    }

    setIsRunning(true);
    setOutput('Running...');

    try {
      // Capture print output
      window.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Run the user code
      window.pyodide.runPython(code);

      // Get the output
      const result = window.pyodide.runPython('sys.stdout.getvalue()');
      
      setOutput(result || 'Code executed successfully (no output)');
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput('');
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <Card className="mt-4 border border-border/50">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <div className="flex gap-2">
            <Button
              onClick={runCode}
              disabled={isRunning || !pyodideReady}
              size="sm"
              className="h-8"
            >
              {isRunning ? (
                <Square className="h-3 w-3 mr-1" />
              ) : (
                <Play className="h-3 w-3 mr-1" />
              )}
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button
              onClick={clearOutput}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        ref={outputRef}
        className="p-4 bg-[hsl(var(--code-bg))] text-sm font-mono min-h-[120px] max-h-[300px] overflow-y-auto"
      >
        {!pyodideReady ? (
          <div className="text-muted-foreground italic">Loading Python interpreter...</div>
        ) : output ? (
          <pre className="text-foreground whitespace-pre-wrap">{output}</pre>
        ) : (
          <div className="text-muted-foreground italic">Click "Run Code" to see the output</div>
        )}
      </div>
    </Card>
  );
};