"use client";

import { useStadiumData } from "@/context/StadiumContext";

export default function Staff() {
  const { zones } = useStadiumData();

  const criticalZ = zones.find(z => z.status === "Critical Capacity Breach");
  const warnings = zones.filter(z => z.status === "Increasing Density" || z.status === "Busy");
  const normals = zones.filter(z => z.status === "Normal");

  // Sum capacities
  const totalOccupancy = zones.reduce((acc, z) => acc + z.occupancy, 0);
  const avgOccupancy = Math.floor(totalOccupancy / zones.length);

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen">
      {/* Dashboard Header & Global Controls */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${criticalZ ? 'bg-error shadow-[0_0_8px_#ffb4ab]' : 'bg-tertiary shadow-[0_0_8px_#ffb59d]'} animate-pulse`}></div>
            <span className={`font-label text-xs font-bold tracking-[0.2em] uppercase ${criticalZ ? 'text-error' : 'text-tertiary'}`}>
               {criticalZ ? 'Critical Alert Protocol Active' : 'Live System Active'}
            </span>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter text-on-background">STAFF COMMAND</h1>
          <p className="font-body text-on-surface-variant mt-2 max-w-md">Real-time zone monitoring and crowd density management across the stadium perimeter.</p>
        </div>
        <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-xl">
          <span className="font-label text-[10px] font-extrabold uppercase tracking-widest px-4 text-outline">Threshold Mode</span>
          <div className="flex bg-surface-container-highest rounded-lg p-1">
            <button className="px-4 py-2 bg-primary-container text-on-primary-container rounded-md text-xs font-bold uppercase tracking-wider transition-all">Standard</button>
            <button className="px-4 py-2 text-outline-variant text-xs font-bold uppercase tracking-wider hover:text-on-surface transition-all">Strict</button>
          </div>
        </div>
      </header>

      {/* Zone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Zone 1: High Alert */}
        {criticalZ && (
          <div className="md:col-span-8 group relative overflow-hidden bg-surface-container rounded-xl border-2 border-transparent red-alert-pulse p-8 transition-all">
            <div className="absolute top-0 right-0 p-6">
              <span className="material-symbols-outlined text-error text-4xl filled-icon">warning</span>
            </div>
            <div className="flex flex-col h-full justify-between gap-12 relative z-10">
              <div>
                <h3 className="font-headline text-5xl font-black tracking-tighter text-on-background mb-1">{criticalZ.name.toUpperCase()}</h3>
                <p className="font-label text-sm font-bold tracking-widest text-error uppercase">Critical Capacity Breach</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-end">
                <div className="col-span-1">
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Occupancy</p>
                  <p className="font-headline text-4xl font-bold text-on-background">{criticalZ.occupancy}<span className="text-lg font-medium text-outline">%</span></p>
                </div>
                <div className="col-span-1">
                  <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Wait Time</p>
                  <p className="font-headline text-4xl font-bold text-on-background">{criticalZ.waitTime}<span className="text-lg font-medium text-outline">m</span></p>
                </div>
                <div className="col-span-2">
                  <button className="w-full bg-error-container text-on-error-container h-14 rounded-lg font-headline font-bold uppercase tracking-tighter flex items-center justify-center gap-2 hover:bg-error transition-colors active:scale-95">
                    <span className="material-symbols-outlined">campaign</span>
                    Broadcast Alert
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Status Normal Zones Overview */}
        <div className="md:col-span-4 bg-surface-container-low rounded-xl p-6 flex flex-col justify-between border border-outline-variant/20">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-headline text-2xl font-bold tracking-tight text-on-background">GENERAL STATUS</h3>
              {normals.length > 0 ? (
                 <span className="px-2 py-1 bg-[#00ff94]/10 text-[#00ff94] text-[10px] font-black rounded uppercase tracking-widest">Normal</span>
              ) : (
                 <span className="px-2 py-1 bg-tertiary/10 text-tertiary text-[10px] font-black rounded uppercase tracking-widest">Busy</span>
              )}
            </div>
            <div className="h-32 w-full bg-surface-container-lowest rounded-lg mb-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container/20 to-transparent"></div>
              <img className="w-full h-full object-cover opacity-40 mix-blend-luminosity" alt="CCTV" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUanVyvkK_5ncZiU3JVX9phH3YxuuCxWSceQE5PvzYQPSeUabbEsS83VRc2m6kTc1yOHkZIk7R4dACYEIiHm2QYF26OuV3phSkTboen4rC_0t09SZGCKbD_9AS-Ak55DL7p_pKIv3AW6t9zVP7335kfD1N4956__kSvzKfN5lAPfFrI9gN1Cj653MgMwTmoyFUKofQBzbRG3rZaKI4XvH6IOuxE4C0A2TFfYjM74vHlLru5VTh7kCdJ_b88V2L8YsPoZrRtdZyPf4"/>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <span className="font-label text-[10px] text-outline uppercase tracking-widest">Avg Occupancy</span>
              <span className="font-headline text-2xl font-bold">{avgOccupancy}%</span>
            </div>
            <button className="w-full h-12 bg-surface-container-highest border border-outline-variant/30 text-on-surface font-label text-xs font-bold uppercase tracking-widest hover:bg-secondary-container transition-all active:scale-95">
              Review Cameras
            </button>
          </div>
        </div>

        {/* Warning Zones */}
        {warnings.map((w, idx) => (
           <div key={`warn-${idx}`} className="md:col-span-4 bg-surface-container-low rounded-xl p-6 border border-outline-variant/20">
             <div className="flex justify-between items-start mb-6">
               <div>
                 <h3 className="font-headline text-2xl font-bold tracking-tight text-on-background">{w.name.toUpperCase()}</h3>
                 <p className="font-label text-[10px] text-tertiary font-bold uppercase tracking-widest mt-1">Increasing Density</p>
               </div>
               <span className="material-symbols-outlined text-tertiary filled-icon">trending_up</span>
             </div>
             <div className="flex items-center gap-4 mb-8">
               <div className="flex-1 bg-surface-container-highest h-2 rounded-full overflow-hidden">
                 <div className="bg-tertiary h-full shadow-[0_0_12px_rgba(255,181,157,0.4)] transition-all duration-1000" style={{ width: `${w.occupancy}%`}}></div>
               </div>
               <span className="font-headline text-xl font-bold text-on-background">{w.occupancy}%</span>
             </div>
             <button className="w-full h-12 bg-surface-container-highest border border-outline-variant/30 text-on-surface font-label text-xs font-bold uppercase tracking-widest hover:bg-tertiary-container hover:text-white transition-all active:scale-95">
               Broadcast Alert
             </button>
           </div>
        ))}

        {/* Zone 4: Staff Positioning */}
        <div className="md:col-span-4 bg-surface-container-highest rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 text-primary/5 select-none">
            <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'wght' 700" }}>group</span>
          </div>
          <h3 className="font-headline text-2xl font-bold tracking-tight text-on-background mb-6">STAFF DEPLOYMENT</h3>
          <div className="space-y-3 relative z-10">
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <span className="font-label text-xs font-bold text-on-surface-variant">Security Lvl 1</span>
              <span className="font-headline text-lg font-bold text-primary">12 Units</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <span className="font-label text-xs font-bold text-on-surface-variant">Medical Response</span>
              <span className="font-headline text-lg font-bold text-primary">04 Units</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
              <span className="font-label text-xs font-bold text-on-surface-variant">Guest Services</span>
              <span className="font-headline text-lg font-bold text-primary">08 Units</span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Broadcast Overlay FAB */}
      <div className="fixed right-8 bottom-28 z-50">
        <button className="w-16 h-16 bg-primary-container rounded-2xl shadow-[0_24px_48px_rgba(0,102,255,0.3)] flex items-center justify-center text-on-primary-container hover:scale-105 active:scale-90 transition-all group">
          <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">emergency_share</span>
        </button>
      </div>
    </main>
  );
}
