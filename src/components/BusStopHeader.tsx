import { MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusStopHeaderProps {
  isLoading: boolean;
  lastUpdated: Date | null;
  onRefresh: () => void;
}

export const BusStopHeader = ({ isLoading, lastUpdated, onRefresh }: BusStopHeaderProps) => {
  return (
    <div className="bg-gradient-primary rounded-2xl p-6 mb-6 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">VivoCity Bus Stop</h1>
            <p className="opacity-90">HarbourFront, Singapore</p>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-white/20 text-primary-foreground hover:bg-white/30 border-0"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Updating...' : 'Refresh'}
        </Button>
      </div>
      {lastUpdated && (
        <div className="mt-4 text-sm opacity-80">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};