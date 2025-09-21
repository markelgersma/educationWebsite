import { ExternalLink, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  isDownload?: boolean;
  icon?: React.ReactNode;
}

export const ResourceCard = ({ title, description, url, isDownload = false, icon }: ResourceCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-border/50 card-gradient">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        {isDownload ? <Download className="h-5 w-5 text-muted-foreground" /> : <ExternalLink className="h-5 w-5 text-muted-foreground" />}
      </div>
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
      
      <Button 
        asChild 
        variant={isDownload ? "secondary" : "default"}
        className="w-full"
      >
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2"
        >
          {isDownload ? (
            <>
              <Download className="h-4 w-4" />
              Download
            </>
          ) : (
            <>
              <ExternalLink className="h-4 w-4" />
              Open Resource
            </>
          )}
        </a>
      </Button>
    </Card>
  );
};