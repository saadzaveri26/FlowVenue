"use client";

import { useStadiumData } from "@/context/StadiumContext";

export default function Home() {
  const { globalCapacity } = useStadiumData();

  return (
    <main className="relative h-screen w-full bg-surface overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-[#0a1a30] bg-map-texture flex items-center justify-center">
        {/* Stadium Outline SVG Overlay */}
        <div className="relative w-[90%] max-w-4xl aspect-[4/3] flex items-center justify-center">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            alt="Top down schematic architectural view"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2dpW78a-ISm4jPvcwewYB4FTl6mMBBG9UiXIol9BG2URhPim4sf4PDsBHOferH3FQ5rbzaUqKy2egkA1-X0ftO8M46-LBbR0IvQSuZkr_Xrh2V8BF7bzmxfWfPPZIZMkN5sW4prtH67-6o1Me7vMUU0jWCrukz-Ssauw5Kp0cZb68Kl-sTgxlsmXIYK2-TtubLSjRd1feKt6zHUKwkd-ExMD6bryoMydY0mI_emIrzCQK4GI5BIdFVOobboyDjKNrKpHcjRIyyaM"
          />
          {/* SVG Stadium Schematic Zones */}
          <svg className="w-full h-full relative z-10 drop-shadow-2xl" viewBox="0 0 800 600">
            {/* Outer Ring - North (Green) */}
            <path className="cursor-pointer hover:fill-opacity-30 transition-all" d="M 100 150 Q 400 50 700 150 L 750 180 Q 400 80 50 180 Z" fill="#4ade80" fillOpacity="0.15" stroke="#4ade80" strokeWidth="2"></path>
            {/* Outer Ring - East (Red) */}
            <path className="cursor-pointer hover:fill-opacity-30 transition-all" d="M 700 150 Q 800 300 700 450 L 750 480 Q 850 300 750 120 Z" fill="#f87171" fillOpacity="0.15" stroke="#f87171" strokeWidth="2"></path>
            {/* Outer Ring - South (Yellow) */}
            <path className="cursor-pointer hover:fill-opacity-30 transition-all" d="M 700 450 Q 400 550 100 450 L 50 420 Q 400 520 750 420 Z" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" strokeWidth="2"></path>
            {/* Outer Ring - West (Green) */}
            <path className="cursor-pointer hover:fill-opacity-30 transition-all" d="M 100 450 Q 0 300 100 150 L 50 120 Q -50 300 50 480 Z" fill="#4ade80" fillOpacity="0.15" stroke="#4ade80" strokeWidth="2"></path>
            {/* Inner Pitch Area */}
            <rect fill="none" height="160" opacity="0.4" rx="4" stroke="#0066FF" strokeDasharray="4 4" strokeWidth="1" width="300" x="250" y="220"></rect>
          </svg>
          
          {/* User Location Pulse */}
          <div className="absolute top-[42%] left-[28%] z-20">
            <div className="w-4 h-4 bg-[#0066FF] rounded-full pulse-glow relative">
              <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
            </div>
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="bg-surface-container-high px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter text-secondary">You are here</span>
            </div>
          </div>
          
          {/* POI Markers */}
          <div className="absolute top-[20%] right-[40%] z-20 group">
            <span className="material-symbols-outlined text-white text-xl cursor-pointer drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">fastfood</span>
          </div>
          <div className="absolute bottom-[35%] right-[25%] z-20">
            <span className="material-symbols-outlined text-error text-xl cursor-pointer">warning</span>
          </div>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-24 left-6 z-30 flex flex-col gap-4">
        <div className="bg-surface-container-low/90 backdrop-blur-md p-4 rounded-xl border border-outline-variant/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-2 rounded-full bg-tertiary pulse-glow"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Live Stadium Status</span>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-end mb-1">
                <span className="font-headline font-bold text-2xl">{globalCapacity}%</span>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Capacity</span>
              </div>
              <div className="w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-1000 ease-in-out" style={{ width: `${globalCapacity}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Contextual Info */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40">
        <div className="bg-[#101c2e]/95 backdrop-blur-2xl rounded-2xl p-5 shadow-[0_-12px_48px_rgba(0,0,0,0.4)] border-t border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-surface-container-highest p-3 rounded-xl">
              <span className="material-symbols-outlined text-[#0066FF]">directions_walk</span>
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg leading-tight uppercase tracking-tight">Optimal Routes</h3>
              <p className="text-on-surface-variant text-xs font-medium">Updated 12s ago • Real-time traffic</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container-high/50 p-4 rounded-xl flex flex-col gap-1 border border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">Fast Entry</span>
              <p className="text-sm font-bold">Gate B is 3 min wait</p>
            </div>
            <div className="bg-surface-container-high/50 p-4 rounded-xl flex flex-col gap-1 border border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#fbbf24]">Priority</span>
              <p className="text-sm font-bold">Concession C: 2 min</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-[#0066ff] text-on-primary-container h-14 rounded-xl font-headline font-bold uppercase tracking-widest flex items-center justify-center gap-2 scale-100 active:scale-95 transition-all">
            <span>GET DIRECTIONS</span>
            <span className="material-symbols-outlined">near_me</span>
          </button>
        </div>
      </div>

      {/* FAB (Contextual) */}
      <div className="fixed right-6 bottom-28 z-40">
        <button className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xl scale-100 active:scale-95 transition-all">
          <span className="material-symbols-outlined">my_location</span>
        </button>
      </div>
    </main>
  );
}
