import { useState, useRef, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PygameSimulatorProps {
  type: 'basic' | 'textbox';
  title?: string;
}

export const PygameSimulator = ({ type, title = "Pygame Simulation" }: PygameSimulatorProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  // Textbox state
  const [textboxes, setTextboxes] = useState([
    { x: 200, y: 200, width: 140, height: 32, text: "", active: false },
    { x: 400, y: 200, width: 140, height: 32, text: "", active: false }
  ]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs to avoid stale state inside animation loop
  const textboxesRef = useRef(textboxes);
  const mousePosRef = useRef(mousePos);
  const isRunningRef = useRef(isRunning);

  useEffect(() => { textboxesRef.current = textboxes; }, [textboxes]);
  useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);
  useEffect(() => { isRunningRef.current = isRunning; }, [isRunning]);

  const startSimulation = () => {
    setIsRunning(true);
    setShowCanvas(true);
    // Focus canvas soon after it mounts for keyboard input
    setTimeout(() => {
      canvasRef.current?.focus();
    }, 0);
  };

  const stopSimulation = () => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetSimulation = () => {
    stopSimulation();
    setShowCanvas(false);
    setTextboxes([
      { x: 200, y: 200, width: 140, height: 32, text: '', active: false },
      { x: 400, y: 200, width: 140, height: 32, text: '', active: false }
    ]);
    setMousePos({ x: 0, y: 0 });
  };

  const runBasicSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      // Fill screen with purple (like in the Python code)
      ctx.fillStyle = '#800080';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some visual feedback that it's running
      const time = Date.now() / 1000;
      const alpha = Math.sin(time * 2) * 0.3 + 0.7;
      ctx.fillStyle = `rgba(128, 0, 128, ${alpha})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add text showing it's running
      ctx.fillStyle = 'white';
      ctx.font = '24px Inter';
      ctx.textAlign = 'center';
      ctx.fillText('Pygame Window Running!', canvas.width / 2, canvas.height / 2 - 20);
      ctx.font = '16px Inter';
      ctx.fillText('Purple background with 60 FPS game loop', canvas.width / 2, canvas.height / 2 + 20);

      if (isRunningRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const runTextboxSimulation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale coordinates to match canvas size vs display size
    const scaleX = canvas.width / canvas.offsetWidth;
    const scaleY = canvas.height / canvas.offsetHeight;

    const animate = () => {
      // Clear and fill screen with purple
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#800080';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw textboxes - use latest state via refs
      const boxes = textboxesRef.current;
      boxes.forEach((textbox, index) => {
        // Draw textbox background
        ctx.fillStyle = textbox.active ? '#9696FA' : '#969696';
        ctx.fillRect(textbox.x, textbox.y, textbox.width, textbox.height);
        
        // Draw border for better visibility
        ctx.strokeStyle = textbox.active ? '#FFFFFF' : '#CCCCCC';
        ctx.lineWidth = 2;
        ctx.strokeRect(textbox.x, textbox.y, textbox.width, textbox.height);

        // Draw text
        if (textbox.text) {
          ctx.fillStyle = 'white';
          ctx.font = '14px monospace';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(textbox.text, textbox.x + 5, textbox.y + textbox.height / 2);
        }
        
        // Draw placeholder text if empty
        if (!textbox.text && !textbox.active) {
          ctx.fillStyle = '#CCCCCC';
          ctx.font = '12px Inter';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(`Textbox ${index + 1}`, textbox.x + 5, textbox.y + textbox.height / 2);
        }
      });

      // Show mouse position
      const mp = mousePosRef.current;
      ctx.fillStyle = 'white';
      ctx.font = '14px Inter';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(`Mouse: x=${mp.x}, y=${mp.y}`, 10, 10);
      
      // Instructions
      ctx.fillText('Click on the gray rectangles to activate them', 10, canvas.height - 60);
      ctx.fillText('Type to add text when a rectangle is active (highlighted)', 10, canvas.height - 40);
      ctx.fillText('Active rectangles turn blue and get a white border', 10, canvas.height - 20);

      if (isRunningRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (type !== 'textbox' || !isRunning) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    console.log('Canvas clicked at:', { x, y });
    setMousePos({ x: Math.floor(x), y: Math.floor(y) });

    // Focus canvas to ensure keyboard input works after click
    canvasRef.current?.focus();

    // Check if click is inside any textbox
    setTextboxes(prev => prev.map((textbox, index) => {
      const isInside = x >= textbox.x && x <= textbox.x + textbox.width &&
                      y >= textbox.y && y <= textbox.y + textbox.height;
      console.log(`Textbox ${index + 1} clicked:`, isInside, { textbox: textbox, clickPos: { x, y } });
      return {
        ...textbox,
        active: isInside
      };
    }));
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;
    setMousePos({ x: Math.floor(x), y: Math.floor(y) });
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (type !== 'textbox' || !isRunningRef.current) return;
    const activeIndex = textboxesRef.current.findIndex(t => t.active);
    if (activeIndex === -1) return;

    setTextboxes(prev => prev.map((textbox, index) => {
      if (index !== activeIndex) return textbox;
      if (event.key === 'Backspace') {
        return { ...textbox, text: textbox.text.slice(0, -1) };
      } else if (event.key.length === 1 && textbox.text.length < 15) {
        return { ...textbox, text: textbox.text + event.key };
      }
      return textbox;
    }));
  };

  // Start the correct simulation after canvas is mounted and state is set
  useEffect(() => {
    if (!showCanvas || !isRunning) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Prevent multiple loops
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    if (type === 'basic') {
      runBasicSimulation();
    } else if (type === 'textbox') {
      runTextboxSimulation();
    }

    // Ensure keyboard focus for typing
    canvasRef.current?.focus();
  }, [showCanvas, isRunning, type]);

  return (
    <Card className="mt-4 border border-border/50">
      <div className="p-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-foreground">{title}</h4>
          <div className="flex gap-2">
            <Button
              onClick={startSimulation}
              disabled={isRunning}
              size="sm"
              className="h-8"
            >
              <Play className="h-3 w-3 mr-1" />
              Run Simulation
            </Button>
            <Button
              onClick={stopSimulation}
              disabled={!isRunning}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <Square className="h-3 w-3 mr-1" />
              Stop
            </Button>
            <Button
              onClick={resetSimulation}
              variant="outline"
              size="sm"
              className="h-8"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-[hsl(var(--code-bg))]">
        {showCanvas ? (
          <div className="space-y-2">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="border border-border/30 bg-purple-600 cursor-pointer w-full focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ maxWidth: '640px', height: 'auto' }}
              onClick={handleCanvasClick}
              onMouseMove={handleMouseMove}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            />
            <p className="text-xs text-muted-foreground">
              {type === 'basic' 
                ? 'This simulates the purple Pygame window that would appear when running the code.'
                : 'Click on rectangles to activate them, then type to simulate text input. (In real Pygame, this would be a 1280x720 window)'
              }
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="mb-2">Click "Run Simulation" to see what this Pygame code does</p>
            <p className="text-xs">This shows a visual representation of the game window</p>
          </div>
        )}
      </div>
    </Card>
  );
};