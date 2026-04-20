"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ZoneStatus = "Normal" | "Increasing Density" | "Busy" | "Critical Capacity Breach";

export interface ZoneData {
  id: string;
  name: string;
  category: "gate" | "food" | "wc" | "store";
  location: string;
  occupancy: number; // percentage
  waitTime: number; // in minutes
  status: ZoneStatus;
  trend: "up" | "down" | "stable";
}

interface StadiumContextType {
  zones: ZoneData[];
  globalCapacity: number;
}

const defaultZones: ZoneData[] = [
  {
    id: "g1",
    name: "North Plaza Gate 4",
    category: "gate",
    location: "Main Entry Point",
    occupancy: 24,
    waitTime: 2,
    status: "Normal",
    trend: "stable",
  },
  {
    id: "f1",
    name: "Victory Brews & Grill",
    category: "food",
    location: "Section 112 • Level 1",
    occupancy: 78,
    waitTime: 14,
    status: "Busy",
    trend: "up",
  },
  {
    id: "w1",
    name: "Restrooms West",
    category: "wc",
    location: "Near Sector B",
    occupancy: 12,
    waitTime: 0,
    status: "Normal",
    trend: "stable",
  },
  {
    id: "s1",
    name: "Official Fan Store",
    category: "store",
    location: "Concourse A",
    occupancy: 95,
    waitTime: 28,
    status: "Critical Capacity Breach",
    trend: "up",
  },
  {
    id: "g2",
    name: "West Ramp B",
    category: "gate",
    location: "Level 2 Access",
    occupancy: 92,
    waitTime: 20,
    status: "Critical Capacity Breach",
    trend: "up",
  },
  {
    id: "f2",
    name: "The Baseline Grill",
    category: "food",
    location: "Section 204",
    occupancy: 30,
    waitTime: 3,
    status: "Normal",
    trend: "down",
  }
];

const StadiumContext = createContext<StadiumContextType>({
  zones: defaultZones,
  globalCapacity: 84,
});

export const StadiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zones, setZones] = useState<ZoneData[]>(defaultZones);
  const [globalCapacity, setGlobalCapacity] = useState(84);

  useEffect(() => {
    // Simulate real-time DB updates by varying occupancy slightly every 3 seconds
    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => {
        const change = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2
        let newOccupancy = zone.occupancy + change;
        if (newOccupancy < 0) newOccupancy = 0;
        if (newOccupancy > 100) newOccupancy = 100;
        
        let newWaitTime = zone.waitTime + (change > 0 ? (Math.random() > 0.5 ? 1 : 0) : (Math.random() > 0.5 ? -1 : 0));
        if (newWaitTime < 0) newWaitTime = 0;

        let status: ZoneStatus = "Normal";
        if (newOccupancy > 85) status = "Critical Capacity Breach";
        else if (newOccupancy > 70) status = "Busy";
        else if (newOccupancy > 50) status = "Increasing Density";

        let trend: "up" | "down" | "stable" = "stable";
        if (change > 0) trend = "up";
        else if (change < 0) trend = "down";

        return {
          ...zone,
          occupancy: newOccupancy,
          waitTime: newWaitTime,
          status,
          trend
        };
      }));

      setGlobalCapacity(prev => {
         const change = Math.floor(Math.random() * 3) - 1;
         let next = prev + change;
         if (next > 100) next = 100;
         if (next < 50) next = 50;
         return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StadiumContext.Provider value={{ zones, globalCapacity }}>
      {children}
    </StadiumContext.Provider>
  );
};

export const useStadiumData = () => useContext(StadiumContext);
