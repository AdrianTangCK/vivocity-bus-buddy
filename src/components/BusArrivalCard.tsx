import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bus, Clock, Users } from "lucide-react";

interface BusArrival {
  EstimatedArrival: string;
  Load: string;
  Feature: string;
  Type: string;
}

interface BusService {
  ServiceNo: string;
  NextBus: BusArrival;
  NextBus2: BusArrival;
}

interface BusArrivalCardProps {
  service: BusService;
}

const getCapacityColor = (load: string) => {
  switch (load.toLowerCase()) {
    case 'sea':
      return 'capacity-high';
    case 'sda':
      return 'capacity-medium';
    case 'lsd':
      return 'capacity-low';
    default:
      return 'muted';
  }
};

const getCapacityText = (load: string) => {
  switch (load.toLowerCase()) {
    case 'sea':
      return 'Seats Available';
    case 'sda':
      return 'Standing Available';
    case 'lsd':
      return 'Limited Standing';
    default:
      return 'Unknown';
  }
};

const formatArrivalTime = (arrivalTime: string) => {
  if (!arrivalTime) return 'No data';
  
  const now = new Date();
  const arrival = new Date(arrivalTime);
  const diffMinutes = Math.floor((arrival.getTime() - now.getTime()) / (1000 * 60));
  
  if (diffMinutes <= 0) return 'Arriving';
  if (diffMinutes === 1) return '1 min';
  return `${diffMinutes} mins`;
};

const getBusTypeIcon = (type: string, feature: string) => {
  if (feature === 'WAB') return '♿';
  if (type === 'DD') return '🚌';
  return '🚐';
};

export const BusArrivalCard = ({ service }: BusArrivalCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-slide-up">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-xl">
              <Bus className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground">{service.ServiceNo}</h3>
              <p className="text-sm text-muted-foreground">Bus Service</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Next Bus */}
          {service.NextBus?.EstimatedArrival && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-transit-blue" />
                <div>
                  <div className="font-semibold text-foreground">
                    {formatArrivalTime(service.NextBus.EstimatedArrival)}
                  </div>
                  <div className="text-xs text-muted-foreground">Next arrival</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {getBusTypeIcon(service.NextBus.Type, service.NextBus.Feature)}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`bg-${getCapacityColor(service.NextBus.Load)} text-white`}
                >
                  <Users className="w-3 h-3 mr-1" />
                  {getCapacityText(service.NextBus.Load)}
                </Badge>
              </div>
            </div>
          )}

          {/* Second Bus */}
          {service.NextBus2?.EstimatedArrival && (
            <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-transit-green" />
                <div>
                  <div className="font-semibold text-foreground">
                    {formatArrivalTime(service.NextBus2.EstimatedArrival)}
                  </div>
                  <div className="text-xs text-muted-foreground">Following bus</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {getBusTypeIcon(service.NextBus2.Type, service.NextBus2.Feature)}
                </span>
                <Badge 
                  variant="secondary" 
                  className={`bg-${getCapacityColor(service.NextBus2.Load)} text-white`}
                >
                  <Users className="w-3 h-3 mr-1" />
                  {getCapacityText(service.NextBus2.Load)}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};