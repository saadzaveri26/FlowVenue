"use client";

import { useState, useRef, useEffect } from "react";
import { useStadiumData } from "@/context/StadiumContext";

interface Message {
  id: number;
  sender: "ai" | "user";
  text: string;
  time: string;
  isVisual?: boolean;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      text: "Welcome back! I'm monitoring live stadium flows. Currently, the North Plaza is experiencing lower traffic. How can I assist your journey today?",
      time: "19:42"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { zones } = useStadiumData();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create context string from live stadium data to pass to Gemini
      const contextStr = zones.map(z => `${z.name} (${z.category}): ${z.occupancy}% full, ${z.waitTime} mins wait, Status: ${z.status}`).join(" | ");
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text, stadiumContext: contextStr })
      });
      
      const data = await response.json();
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: data.reply || "I'm having trouble connecting to my central protocol. Please try again.",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        isVisual: (data.reply?.includes("Baseline Grill") || data.reply?.includes("meters")) ? true : false // Simulation of visual response detection
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Error connecting to AI.",
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-24 pb-32 px-4 md:px-8 max-w-5xl mx-auto w-full flex flex-col h-[100dvh]">
      {/* AI Assistant Header Section */}
      <header className="mb-8 flex-shrink-0 relative">
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#ffb59d]"></span>
              <span className="text-label text-tertiary text-[10px] uppercase tracking-[0.2em] font-bold">Live AI Protocol</span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface">
              Your Venue{" "}
              <span style={{ background: "linear-gradient(135deg, #0066ff 0%, #b3c5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Co-pilot</span>
            </h1>
          </div>
          <div className="hidden md:block bg-surface-container-high rounded-xl p-4 border border-outline-variant/20">
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Response Latency</p>
            <p className="font-headline text-xl font-bold text-on-surface">12ms</p>
          </div>
        </div>
      </header>

      {/* Chat Conversation */}
      <div className="flex-grow space-y-6 mb-4 overflow-y-auto pr-2 custom-scrollbar">
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
             <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${msg.sender === 'user' ? 'bg-surface-container-highest' : 'bg-primary-container'}`}>
               <span className={`material-symbols-outlined ${msg.sender !== 'user' ? 'text-on-primary-container filled-icon' : 'text-secondary'}`}>
                 {msg.sender === 'user' ? 'person' : 'smart_toy'}
               </span>
             </div>
             
             <div className={`space-y-2 ${msg.sender === 'user' ? 'text-right' : ''}`}>
               <div className={`p-4 shadow-sm ${
                 msg.sender === 'user' 
                  ? 'message-gradient text-on-primary-container rounded-2xl rounded-tr-none shadow-xl' 
                  : 'bg-surface-container-high text-on-surface rounded-2xl rounded-tl-none'
               }`}>
                 <p className={`text-sm ${msg.sender === 'user' ? 'font-medium' : 'leading-relaxed'}`}>{msg.text}</p>
                 
                 {/* Visual simulation for specific response */}
                 {msg.isVisual && msg.sender === 'ai' && (
                    <div className="rounded-xl overflow-hidden relative h-32 w-full bg-surface-container-low group mt-4">
                      <img 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
                        alt="Location view" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxO7e-mo9feleVtvqM7irqA66FGTsB5hlteYfmoNmnnTmfg43mY9KgXIWRL41gsBBX4cSYfY8re5asJ1OoDtx8B0SosL8QNg7gV-mhyHRrMlJZGBqiysID73FX5RsAum5v-u11ORQd0K6oqrNIv3gu6QQ8FhnD8eYlWAGv9_MkbTVU9GYrbBCygd8VNAUYRLySpEehYYseWPS0d6mbIeDWlYKS-NbVREnfFkq3p-AuZnOGQiFBrAL6eoHUZa9nr9kSKuGytK9MyOM" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent"></div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-2">
                        <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-1 rounded font-bold">GATE 12</span>
                        <span className="text-on-surface font-bold text-xs uppercase tracking-tight">The Baseline Grill</span>
                      </div>
                    </div>
                 )}
               </div>
               <span className="text-[10px] text-outline font-bold uppercase tracking-widest mx-1">
                 {msg.sender === 'user' ? 'You' : 'Assistant'} • {msg.time}
               </span>
             </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-4 max-w-[85%]">
             <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
               <span className="material-symbols-outlined text-on-primary-container filled-icon animate-pulse">smart_toy</span>
             </div>
             <div className="bg-surface-container-high p-4 rounded-2xl rounded-tl-none flex items-center">
                <span className="text-on-surface text-sm animate-pulse">Analyzing live flow...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips & Input */}
      <div className="flex-shrink-0 w-full space-y-4">
        {/* Suggestion Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button onClick={() => setInput("Best time to grab food?")} className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95">
            Best time to grab food?
          </button>
          <button onClick={() => setInput("Quickest exit?")} className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95">
            Quickest exit?
          </button>
          <button onClick={() => setInput("Closest toilet?")} className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/30 text-xs font-bold text-on-surface hover:bg-surface-container-high transition-colors active:scale-95">
            Closest toilet?
          </button>
        </div>

        {/* Input Bar */}
        <div className="relative group">
          <div className="absolute inset-0 message-gradient opacity-20 blur-xl rounded-2xl group-focus-within:opacity-40 transition-opacity"></div>
          <div className="relative flex items-center bg-surface-container-highest rounded-2xl p-2 border border-outline-variant/20">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-outline/60 px-4 font-medium outline-none" 
              placeholder="Ask your co-pilot..." 
              type="text" 
            />
            <button 
              onClick={handleSend}
              className="w-12 h-12 rounded-xl message-gradient flex items-center justify-center text-on-primary-container shadow-lg hover:shadow-primary/20 transition-all active:scale-90"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
