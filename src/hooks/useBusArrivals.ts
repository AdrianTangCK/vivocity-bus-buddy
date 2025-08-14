import { useState, useEffect, useCallback } from 'react';

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

interface BusArrivalResponse {
  Services: BusService[];
}

// VivoCity bus stop code - this is a common bus stop code near VivoCity
const BUS_STOP_CODE = '14229';

export const useBusArrivals = () => {
  const [services, setServices] = useState<BusService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBusArrivals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Note: This is a demo implementation. In a real app, you would need:
      // 1. LTA DataMall API key
      // 2. Backend endpoint to proxy the API call (due to CORS)
      // 3. Proper error handling for API rate limits
      
      // For demo purposes, we'll use mock data
      const mockData: BusArrivalResponse = {
        Services: [
          {
            ServiceNo: "10",
            NextBus: {
              EstimatedArrival: new Date(Date.now() + 3 * 60000).toISOString(),
              Load: "SEA",
              Feature: "WAB",
              Type: "SD"
            },
            NextBus2: {
              EstimatedArrival: new Date(Date.now() + 8 * 60000).toISOString(),
              Load: "SDA",
              Feature: "",
              Type: "DD"
            }
          },
          {
            ServiceNo: "30",
            NextBus: {
              EstimatedArrival: new Date(Date.now() + 1 * 60000).toISOString(),
              Load: "LSD",
              Feature: "",
              Type: "SD"
            },
            NextBus2: {
              EstimatedArrival: new Date(Date.now() + 12 * 60000).toISOString(),
              Load: "SEA",
              Feature: "WAB",
              Type: "DD"
            }
          },
          {
            ServiceNo: "57",
            NextBus: {
              EstimatedArrival: new Date(Date.now() + 5 * 60000).toISOString(),
              Load: "SEA",
              Feature: "",
              Type: "SD"
            },
            NextBus2: {
              EstimatedArrival: new Date(Date.now() + 15 * 60000).toISOString(),
              Load: "SDA",
              Feature: "",
              Type: "SD"
            }
          },
          {
            ServiceNo: "65",
            NextBus: {
              EstimatedArrival: new Date(Date.now() + 2 * 60000).toISOString(),
              Load: "SDA",
              Feature: "",
              Type: "DD"
            },
            NextBus2: {
              EstimatedArrival: new Date(Date.now() + 18 * 60000).toISOString(),
              Load: "SEA",
              Feature: "WAB",
              Type: "SD"
            }
          }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setServices(mockData.Services);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch bus arrivals. Please try again.');
      console.error('Error fetching bus arrivals:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusArrivals();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchBusArrivals, 30000);
    
    return () => clearInterval(interval);
  }, [fetchBusArrivals]);

  return {
    services,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchBusArrivals,
  };
};