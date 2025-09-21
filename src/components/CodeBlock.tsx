import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PyodideRunner } from './PyodideRunner';

interface CodeBlockProps {
  code: string;
  title?: string;
  language?: string;
  runnable?: boolean;
  runnableType?: 'python' | 'pygame-basic' | 'pygame-textbox';
}

export const CodeBlock = ({ 
  code, 
  title, 
  language = "python", 
  runnable = false,
  runnableType = 'python' 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] rounded-lg overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-primary/10 border-b border-[hsl(var(--code-border))] flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{language}</span>
        </div>
      )}
      
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono">
          <code className="text-foreground leading-relaxed">{code}</code>
        </pre>
        
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 h-8 w-8"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          )}
        </Button>
      </div>
      
      {runnable && runnableType === 'python' && (
        <PyodideRunner 
          code={code}
          title={`${title || 'Code'} - Interactive Output`}
        />
      )}
    </div>
  );
};