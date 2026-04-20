"use client";

import { useStadiumData, ZoneData, ZoneStatus } from "@/context/StadiumContext";
import { useState } from "react";

export default function Queues() {
  const { zones } = useStadiumData();
  const [filter, setFilter] = useState("All");

  const getStatusColor = (status: ZoneStatus) => {
    switch (status) {
      case "Normal": return "text-[#00ff94] bg-[#00ff94]/10 border-[#00ff94]/20";
      case "Busy": return "text-tertiary bg-tertiary/10 border-tertiary/20";
      case "Critical Capacity Breach": return "text-error bg-error/10 border-error/20";
      case "Increasing Density": return "text-tertiary bg-tertiary/10 border-tertiary/20";
      default: return "text-outline bg-surface-container-highest border-outline/20";
    }
  };

  const getStatusLabel = (status: ZoneStatus) => {
    if (status === "Critical Capacity Breach") return "Avoid";
    if (status === "Normal") return "Open";
    return status;
  };

  const getBorderColor = (status: ZoneStatus) => {
    switch (status) {
      case "Normal": return "border-[#00ff94]";
      case "Busy": return "border-tertiary";
      case "Critical Capacity Breach": return "border-error";
      case "Increasing Density": return "border-tertiary";
      default: return "border-outline";
    }
  };

  const getBarColor = (status: ZoneStatus) => {
    switch (status) {
      case "Normal": return "bg-gradient-to-r from-primary to-[#00ff94]";
      case "Busy": return "bg-tertiary";
      case "Critical Capacity Breach": return "bg-error shadow-[0_0_12px_#ffb4ab]";
      case "Increasing Density": return "bg-tertiary";
      default: return "bg-outline";
    }
  };

  const getIcon = (category: string) => {
    switch(category) {
        case "gate": return "gate";
        case "food": return "fastfood";
        case "wc": return "wc";
        case "store": return "shopping_bag";
        default: return "place";
    }
  }

  const filters = ["All", "Gates", "Food", "Store", "WC"];
  const filterCategoryMap: Record<string, string> = {
    Gates: "gate",
    Food: "food",
    Store: "store",
    WC: "wc",
  };
  const displayZones = zones.filter(z => filter === "All" || z.category === filterCategoryMap[filter]);

  return (
    <main className="pt-24 px-6 max-w-2xl mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ffb59d] animate-pulse"></div>
          <span className="font-label text-xs font-bold tracking-[0.2em] text-tertiary uppercase">Live Stadium Status</span>
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tight text-on-background mb-4">Queues & Flow</h1>
        <p className="font-body text-on-surface-variant leading-relaxed">Real-time capacity tracking across all stadium sectors. Plan your movement to avoid peak congestion.</p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
        {filters.map(f => (
          <button 
             key={f}
             onClick={() => setFilter(f)}
             className={`whitespace-nowrap px-5 py-2 rounded-full font-label text-xs font-extrabold tracking-widest uppercase transition-all active:scale-95 ${
               filter === f ? "bg-primary-container text-on-primary-container" : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
             }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Scrollable Cards List */}
      <div className="space-y-4">
        {displayZones.map((zone) => (
          <div key={zone.id} className={`bg-surface-container-low rounded-xl p-5 group transition-all hover:bg-surface-container border-l-4 ${getBorderColor(zone.status)}`}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center shadow-inner ${zone.status === 'Critical Capacity Breach' ? 'text-error' : zone.status === 'Busy' || zone.status === 'Increasing Density' ? 'text-tertiary' : 'text-primary'}`}>
                  <span className="material-symbols-outlined">{getIcon(zone.category)}</span>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold text-on-background">{zone.name}</h3>
                  <p className="font-label text-[10px] tracking-widest uppercase text-outline">{zone.location}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase border ${getStatusColor(zone.status)}`}>
                {getStatusLabel(zone.status)}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Occupancy</p>
                  <span className="font-headline text-2xl font-black text-on-background">{zone.occupancy}<span className="text-sm font-normal text-outline ml-1">%</span></span>
                </div>
                <div className="text-right">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Wait Time</p>
                  <span className="font-headline text-2xl font-black text-on-background">
                    {zone.waitTime === 0 ? "<1" : zone.waitTime}
                    <span className="text-sm font-normal text-outline ml-1">MIN</span>
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div 
                   className={`h-full rounded-full transition-all duration-1000 ease-in-out ${getBarColor(zone.status)}`} 
                   style={{ width: `${zone.occupancy}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Hint Widget */}
      <div className="relative h-48 rounded-xl overflow-hidden mt-8">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt="Heatmap view"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6Zkx_5XpRg5vdwSaTcT7Xj_3pOrwxhXAoN3j9RBIvISqm226DilvBmw32VaYWD-kpnZf9xshBvmR1HzwUsqZp2yykV43caQlAAxx6oIzLWOjeI2z7FKK1CNIVbwsYqKr3t40_xig17QvzlX1I1Lsth636oD9OrRvLB5Xf-QgsoBM0PHsCtpiw64D-TPJX2rjmocKB-KD8CrCmfZyltQRshHP-zjCMn2SU6Q17I3UO9XdSrGrXj_-qY0oAsF2mBzmaiffbDGtoEBI"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
          <div>
            <p className="font-label text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Spatial Awareness</p>
            <h4 className="font-headline text-lg font-bold text-on-background">Switch to Heatmap</h4>
          </div>
          <button className="bg-primary-container p-3 rounded-xl text-on-primary-container scale-100 active:scale-95 transition-all">
            <span className="material-symbols-outlined material-symbols-outlined-filled">map</span>
          </button>
        </div>
      </div>
    </main>
  );
}
