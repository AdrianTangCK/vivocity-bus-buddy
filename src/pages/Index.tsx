import { BusArrivalCard } from "../components/BusArrivalCard";
import { BusStopHeader } from "../components/BusStopHeader";
import { useBusArrivals } from "../hooks/useBusArrivals";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const Index = () => {
  const { services, isLoading, error, lastUpdated, refetch } = useBusArrivals();

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <BusStopHeader 
          isLoading={isLoading}
          lastUpdated={lastUpdated}
          onRefresh={refetch}
        />

        {error && (
          <Alert className="mb-6 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {services.length > 0 ? (
            services.map((service) => (
              <BusArrivalCard key={service.ServiceNo} service={service} />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-full text-center py-12">
                <div className="text-muted-foreground">
                  No bus services available at the moment.
                </div>
              </div>
            )
          )}
        </div>

        {isLoading && services.length === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-card rounded-lg p-4 shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-muted rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-muted rounded w-12"></div>
                      <div className="h-4 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-16 bg-muted rounded-lg"></div>
                    <div className="h-16 bg-muted rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Real-time bus arrival information for VivoCity</p>
          <p className="mt-1">Data updates every 30 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
