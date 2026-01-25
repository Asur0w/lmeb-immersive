import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Check, Sunrise, Sun, Moon, Star, Utensils, Wifi, Gift, Palette, LayoutTemplate, Droplets, Monitor, Users, Loader, Send, FileText, Share2, Sparkles, Minus, Plus } from 'lucide-react';

// --- CONFIGURATION EMAIL ---
const EMAILJS_SERVICE_ID = "service_z8iw21s"; 
const EMAILJS_TEMPLATE_ADMIN_ID = "template_3i47cv7"; 
const EMAILJS_TEMPLATE_CLIENT_ID = "template_2keg8go"; 
const EMAILJS_PUBLIC_KEY = "s1sthtiZPEDfGRote"; 

// --- DATA ---
const TIME_SLOTS = [
  { id: 'matin', label: '06H — 12H', title: 'Matinée', icon: <Sunrise size={24} />, price: 150, image: 'https://www.lemonde-enbouteille.be/web/image/16055-76e0b5e2/105-DSC09413.webp' },
  { id: 'aprem', label: '12H — 18H', title: 'Après-midi', icon: <Sun size={24} />, price: 200, image: 'https://www.lemonde-enbouteille.be/web/image/16058-be08a656/86-DSC09383.webp' },
  { id: 'soiree', label: '18H — 02H', title: 'Soirée', icon: <Moon size={24} />, price: 300, image: 'https://www.lemonde-enbouteille.be/web/image/16057-9de877a5/83-DSC09379.webp' },
  { id: '24h', label: '24 HEURES', title: 'Totale', icon: <Star size={24} />, price: 550, image: 'https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp' }
];

const EVENT_TYPES = [
  { id: 'teambuilding', title: 'Team Building', subtitle: 'Cohésion', desc: 'Ressouder les liens.', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop' },
  { id: 'seminaire', title: 'Séminaire', subtitle: 'Stratégie', desc: 'Décisions clés & Conférences.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop' },
  { id: 'afterwork', title: 'Afterwork', subtitle: 'Réseau', desc: 'Décompression.', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2874&auto=format&fit=crop' },
  { id: 'prive', title: 'Privé', subtitle: 'Exception', desc: 'Moments rares.', image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2944&auto=format&fit=crop' }
];

const FORMATS = [
  { id: 'standard', title: 'L\'Immersive', subtitle: 'Standard', desc: 'Notre disposition signature. Équilibrée & chaleureuse.', setupFee: 0, image: 'https://www.lemonde-enbouteille.be/web/image/26813-d579cd53/104-DSC09412.webp' },
  { id: 'cocktail', title: 'Cocktail', subtitle: 'Debout', desc: 'Espace libéré. Mange-debout & circulation fluide.', setupFee: 0, image: 'https://www.lemonde-enbouteille.be/web/image/26780-69c7e9bf/58-DSC00974.webp' },
  { id: 'hybride', title: 'Hybride', subtitle: 'Mixte', desc: 'Zone de confort assises et zone de flux debout.', setupFee: 0, image: 'https://www.lemonde-enbouteille.be/web/image/26807-8f38cf40/31-DSC00898.webp' }
];

const EXPERIENCES = [
  { id: 'none', title: 'Location Sèche', price: 0, sub: 'L\'espace nu', description: "Mise à disposition exclusive de l'espace.", image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop' },
  { id: 'world', title: 'Tour du Monde', price: 40, sub: 'Dégustation 5 vins', description: "Une exploration sensorielle guidée à travers 5 vins d'exception.", image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop' },
  { id: 'casino', title: 'Casino du Vin', price: 46, sub: 'Animation Ludique', description: "Dégustation à l'aveugle, tables de jeu, jetons et enchères.", image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2940&auto=format&fit=crop' },
  { id: 'gastro', title: 'Instant Gourmand', price: -1, sub: 'Repas', description: "Une immersion autour de la gastronomie et accords mets-vins.", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop' }
];

const SERVICES = [
  { id: 'tech', title: 'Pack Tech & Connectivité', price: 0, icon: <Wifi size={20}/>, desc: 'Écrans, Son, Wifi HD.' },
  { id: 'host', title: 'Maître de Maison', price: 150, icon: <Users size={20}/>, desc: 'Service et gestion.' },
  { id: 'softs', title: 'Forfait Softs', price: 'dynamic', icon: <Droplets size={20}/>, desc: 'Eaux et softs à discrétion.' },
  { id: 'food_light', title: 'Restauration : Grignotage', price: 25, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Planches fromages/charcuteries.' },
  { id: 'food_full', title: 'Restauration : Repas', price: -1, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Préparation culinaire sur-mesure.' }
];

export default function App() {
  const [step, setStep] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredTime, setHoveredTime] = useState(null);
  const [isDryHire, setIsDryHire] = useState(true); 
  const [data, setData] = useState({
    timeSlot: null, eventType: null, format: null, pax: 10, date: '', endDate: '',
    experience: EXPERIENCES[0], selectedServices: ['tech'], contact: { name: '', email: '', phone: '', message: '' }
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isMultiDay, setIsMultiDay] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [stats, setStats] = useState({ visits: 0, leads: 0 });

  // Navigation Logic
  const goToStep = (target) => { 
    if (!isAnimating) { 
      setIsAnimating(true); 
      setStep(target); 
      setTimeout(() => setIsAnimating(false), 800); 
    } 
  };
  const autoNext = (target) => goToStep(target);
  const goBack = () => { if (step > 0) goToStep(step - 1); };

  // Admin Logic
  const handleLogoClick = () => {
    setSecretClicks(prev => {
        const val = prev + 1;
        if (val >= 5) {
            Promise.all([
                fetch('https://api.counterapi.dev/v1/lmeb-immersive/visits').then(r => r.json()),
                fetch('https://api.counterapi.dev/v1/lmeb-immersive/leads').then(r => r.json())
            ]).then(([d1, d2]) => {
                setStats({ visits: d1.count || 0, leads: d2.count || 0 });
                setShowAdmin(true);
            });
            return 0;
        }
        return val;
    });
  };

  const calculateTotal = () => {
    let total = 0; let custom = false;
    if (data.timeSlot) total += data.timeSlot.price;
    if (!isDryHire && data.experience) {
        if (data.experience.price === -1) custom = true;
        else total += data.experience.price * data.pax;
    }
    data.selectedServices.forEach(srvId => {
      const srv = SERVICES.find(s => s.id === srvId);
      if (srv) {
          if (srv.id === 'softs') total += (data.pax <= 8 ? 20 : data.pax <= 16 ? 30 : data.pax <= 30 ? 40 : 45);
          else if (srv.price === -1) custom = true;
          else total += srv.isPerHead ? (srv.price * data.pax) : srv.price;
      }
    });
    return { total, custom };
  };

  const { total: totalAmount, custom: isCustom } = calculateTotal();

  const toggleService = (id) => {
    const current = data.selectedServices; let newServices = [...current];
    if (newServices.includes(id)) newServices = newServices.filter(x => x !== id);
    else newServices.push(id);
    setData({...data, selectedServices: newServices});
  };

  if (step === 0) {
    return (
      <div className="relative h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 text-center flex flex-col items-center">
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-amber-600 to-transparent mb-8"></div>
          <div onClick={handleLogoClick} className="cursor-pointer mb-8">
            <img src="https://www.lemonde-enbouteille.be/web/image/26768-edef09a5/LOGO%20l%27immersive-24.png" alt="Logo" className="w-28 mx-auto mb-6" />
            <h1 className="text-7xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 mb-2">L'IMMERSIVE</h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-amber-500">Le Monde en Bouteille</p>
          </div>
          <div className="border-l border-amber-600/30 pl-6 text-left max-w-lg mb-12">
             <p className="text-neutral-400 font-light text-sm leading-relaxed">Une adresse confidentielle à Namur. <br/><strong>Un espace événementiel privatif alliant architecture de caractère et équipements connectés.</strong> <br/>Réunions, séminaires ou soirées : ne louez pas une salle, vivez une expérience.</p>
          </div>
          <button onClick={() => goToStep(1)} className="px-12 py-5 bg-white/5 border border-white/10 hover:border-amber-600 transition-all font-mono text-xs uppercase tracking-widest">Composer mon événement</button>
        </div>
        {showAdmin && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setShowAdmin(false)}>
            <div className="max-w-sm w-full bg-[#111] border border-white/10 p-10 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
               <div className="text-[10px] font-mono tracking-[0.3em] text-amber-600 mb-10 uppercase">Admin Dashboard</div>
               <div className="space-y-8">
                  <div className="flex justify-between items-baseline"><span className="text-xs text-neutral-500 uppercase tracking-widest">Visiteurs</span><span className="text-3xl font-serif">{stats.visits}</span></div>
                  <div className="flex justify-between items-baseline border-t border-white/5 pt-8"><span className="text-xs text-amber-500 uppercase font-bold tracking-widest">Leads</span><span className="text-5xl font-serif text-amber-500">{stats.leads}</span></div>
               </div>
               <button onClick={() => setShowAdmin(false)} className="w-full mt-12 text-[10px] uppercase py-4 border border-white/10 hover:bg-white hover:text-black transition-all">Fermer</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full bg-[#080808] text-white overflow-hidden flex flex-col md:flex-row print:bg-white print:text-black print:h-auto print:overflow-visible">
      {/* SIDEBAR NAVIGATION */}
      <div className="hidden md:flex flex-col justify-between w-20 border-r border-white/5 bg-[#0a0a0a] z-20 py-8 items-center h-full print:hidden">
        <div className="font-serif font-bold text-xl cursor-pointer text-amber-600" onClick={() => setStep(0)}>L.</div>
        <div className="flex flex-col gap-6 items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <button key={s} disabled={step < s} onClick={() => setStep(s)} className={`text-[10px] font-mono transition-all ${step === s ? 'text-white font-bold scale-125' : 'text-neutral-700 hover:text-neutral-400'}`}>0{s}</button>
          ))}
        </div>
        <div className="text-[9px] text-neutral-700 rotate-180 writing-vertical tracking-widest uppercase">Namur</div>
      </div>

      <div className="flex-1 relative flex flex-col h-full overflow-hidden">
        {step > 0 && <button onClick={goBack} className="absolute bottom-8 left-8 z-40 flex items-center gap-2 text-neutral-500 hover:text-white uppercase text-[10px] tracking-widest font-mono print:hidden"><ChevronLeft size={16}/> Retour</button>}
        
        {/* PROGRESS BAR */}
        <div className="absolute top-0 left-0 h-1 bg-amber-600 transition-all duration-1000 z-50 print:hidden" style={{ width: `${(step/7)*100}%` }}></div>

        {/* STEP 1: TEMPORALITE */}
        {step === 1 && (
          <div className="flex-1 flex flex-col md:flex-row h-full animate-fade-in">
             <div className="absolute top-12 left-12 z-50"><h2 className="text-5xl font-serif italic text-white leading-none">Le Moment<br/>du Choix</h2></div>
             {TIME_SLOTS.map((slot) => (
                <div key={slot.id} onClick={() => { setData({...data, timeSlot: slot}); autoNext(2); }} className="relative flex-1 group cursor-pointer overflow-hidden border-r border-white/5">
                  <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: `url(${slot.image})` }} />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center p-8">
                     <span className="text-[10px] font-mono uppercase tracking-[0.4em] mb-4 text-amber-500">{slot.label}</span>
                     <h3 className="text-3xl font-serif italic">{slot.title}</h3>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* STEP 2: INTENTION */}
        {step === 2 && (
          <div className="flex-1 p-24 animate-fade-in overflow-y-auto">
             <div className="max-w-6xl mx-auto">
               <h2 className="text-4xl font-serif italic mb-16 border-b border-white/5 pb-8">L'Énergie du Moment</h2>
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {EVENT_TYPES.map(type => (
                   <button key={type.id} onClick={() => { setData({...data, eventType: type}); autoNext(3); }} className="group relative h-[450px] overflow-hidden border border-white/5 hover:border-amber-600/50 transition-all">
                      <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: `url(${type.image})` }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end text-left">
                         <h3 className="text-2xl font-serif italic mb-2 uppercase">{type.title}</h3>
                         <p className="text-xs text-neutral-400 leading-relaxed font-light">{type.desc}</p>
                      </div>
                   </button>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* STEP 3: ARCHITECTURE (CONFIGURATION) */}
        {step === 3 && (
          <div className="flex-1 p-24 animate-fade-in overflow-y-auto">
             <div className="max-w-5xl mx-auto">
               <h2 className="text-4xl font-serif italic mb-16">Configuration de l'Espace</h2>
               <div className="flex flex-col gap-6">
                  {FORMATS.map(f => (
                    <button key={f.id} onClick={() => { setData({...data, format: f}); autoNext(4); }} className="group relative flex items-center h-40 border border-white/5 bg-white/[0.02] hover:border-amber-600 transition-all overflow-hidden">
                       <div className="w-1/3 h-full overflow-hidden"><div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-60" style={{ backgroundImage: `url(${f.image})` }} /></div>
                       <div className="flex-1 p-10 flex justify-between items-center z-10">
                          <div className="text-left">
                             <h3 className="text-2xl font-serif italic mb-2">{f.title}</h3>
                             <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">{f.desc}</p>
                          </div>
                          <ArrowRight size={20} className="opacity-20 group-hover:translate-x-4 transition-all"/>
                       </div>
                    </button>
                  ))}
               </div>
             </div>
          </div>
        )}

        {/* STEP 4: CALIBRAGE (HORIZON) */}
        {step === 4 && (
          <div className="flex-1 flex flex-col items-center justify-center p-24 animate-fade-in">
             <h2 className="text-6xl font-serif italic mb-20 uppercase tracking-tighter">L'Horizon</h2>
             <div className="flex gap-16 w-full max-w-4xl">
                <div className="flex-1 p-12 border border-white/10 bg-white/[0.02] text-center">
                   <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-10">Audience</p>
                   <div className="flex items-center justify-center gap-8">
                      <button onClick={() => setData({...data, pax: Math.max(1, data.pax-1)})} className="w-12 h-12 rounded-full border border-white/10 hover:bg-white hover:text-black flex items-center justify-center"><Minus size={16}/></button>
                      <span className="text-7xl font-serif italic">{data.pax}</span>
                      <button onClick={() => setData({...data, pax: data.pax+1})} className="w-12 h-12 rounded-full border border-white/10 hover:bg-white hover:text-black flex items-center justify-center"><Plus size={16}/></button>
                   </div>
                </div>
                <div className="flex-1 p-12 border border-white/10 bg-white/[0.02] relative text-center">
                   <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.4em] mb-10 italic">Calendrier</p>
                   <input type="date" min={new Date().toISOString().split('T')[0]} onChange={(e) => setData({...data, date: e.target.value})} className="bg-transparent text-2xl font-serif text-white w-full border-b border-white/10 outline-none pb-4 text-center [color-scheme:dark]" />
                   <div className="mt-8">
                     <button onClick={() => setIsMultiDay(!isMultiDay)} className="text-[9px] uppercase tracking-[0.3em] text-amber-600 border border-amber-600/30 px-4 py-1 hover:bg-amber-600 hover:text-white transition-all">{isMultiDay ? '- Un jour' : '+ Multi-dates'}</button>
                   </div>
                   {isMultiDay && <input type="date" onChange={(e) => setData({...data, endDate: e.target.value})} className="bg-transparent text-2xl font-serif text-white w-full border-b border-white/10 outline-none pb-4 text-center mt-6 [color-scheme:dark] animate-fade-in-up" />}
                </div>
             </div>
             <button onClick={() => goToStep(5)} className="mt-20 bg-white text-black px-16 py-5 uppercase font-mono text-[10px] tracking-[0.4em] hover:bg-amber-600 hover:text-white transition-all italic">Valider la mesure</button>
          </div>
        )}

        {/* STEP 5: IMMERSION */}
        {step === 5 && (
          <div className="flex-1 p-24 animate-fade-in overflow-y-auto">
             <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-serif italic mb-16 border-b border-white/5 pb-8 uppercase">Niveau d'Immersion</h2>
                <div className="grid grid-cols-2 gap-8 mb-12">
                   <button onClick={() => { setIsDryHire(true); setData({...data, experience: EXPERIENCES[0]}); }} className={`p-10 border text-left transition-all italic flex flex-col gap-4 ${isDryHire ? 'border-amber-600 bg-amber-600/5' : 'border-white/5'}`}>
                      <LayoutTemplate size={32} /><h3 className="text-2xl font-serif italic">Location Exclusive</h3><p className="text-xs text-neutral-400">Mise à disposition privative de l'espace.</p>
                   </button>
                   <button onClick={() => { setIsDryHire(false); setData({...data, experience: EXPERIENCES[1]}); }} className={`p-10 border text-left transition-all italic flex flex-col gap-4 ${!isDryHire ? 'border-amber-600 bg-amber-600/5' : 'border-white/5'}`}>
                      <Sparkles size={32} /><h3 className="text-2xl font-serif italic">Expérience Sensorielle</h3><p className="text-xs text-neutral-400">Animation guidée (Vin, Casino ou Gastronomie).</p>
                   </button>
                </div>
                {!isDryHire && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
                    {EXPERIENCES.filter(e => e.id !== 'none').map(exp => (
                      <div key={exp.id} onClick={() => setData({...data, experience: exp})} className={`relative h-96 border cursor-pointer group overflow-hidden transition-all ${data.experience.id === exp.id ? 'border-amber-600' : 'border-white/5'}`}>
                         <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 grayscale opacity-20 group-hover:opacity-40 group-hover:grayscale-0" style={{ backgroundImage: `url(${exp.image})` }} />
                         <div className="absolute inset-0 p-8 flex flex-col justify-end text-left bg-gradient-to-t from-black/90 to-transparent">
                            <span className="text-[10px] font-mono text-amber-500 uppercase mb-2 italic tracking-widest">{exp.sub}</span>
                            <h3 className="text-2xl font-serif italic mb-3">{exp.title}</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed mb-6 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">{exp.description}</p>
                            <div className="text-lg font-mono text-white">{exp.price > 0 ? `${exp.price}€ / pers.` : 'Sur Devis'}</div>
                         </div>
                         {data.experience.id === exp.id && <div className="absolute top-6 right-6 bg-amber-600 p-2 rounded-full"><Check size={14}/></div>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-16 flex justify-end"><button onClick={() => goToStep(6)} className="px-16 py-5 bg-white text-black font-mono text-xs uppercase tracking-[0.4em] italic shadow-2xl">Continuer</button></div>
             </div>
          </div>
        )}

        {/* STEP 6: SERVICES & FINITIONS */}
        {step === 6 && (
          <div className="flex-1 p-24 animate-fade-in overflow-y-auto">
             <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-serif italic mb-16">Services & Finitions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
                   {SERVICES.map(srv => {
                     const isSelected = data.selectedServices.includes(srv.id);
                     let price = srv.id === 'softs' ? (data.pax <= 8 ? 20 : data.pax <= 16 ? 30 : data.pax <= 30 ? 40 : 45) : srv.price;
                     return (
                       <button key={srv.id} onClick={() => toggleService(srv.id)} className={`relative p-8 border text-left flex flex-col transition-all h-64 ${isSelected ? 'border-amber-600 bg-amber-600/5' : 'border-white/5 hover:bg-white/5'}`}>
                         <div className="flex justify-between items-start mb-6"><div className={`p-3 rounded-full ${isSelected ? 'bg-amber-600' : 'bg-white/5'}`}>{srv.icon}</div>{isSelected && <Check size={16} className="text-amber-600"/>}</div>
                         <h4 className="text-lg font-serif italic mb-2">{srv.title}</h4>
                         <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed mb-auto">{srv.desc}</p>
                         <div className="mt-4 pt-4 border-t border-white/5 font-mono text-amber-500 text-sm">{price === 0 ? 'Offert' : price === -1 ? 'Sur Devis' : `+${price}€ ${srv.isPerHead ? '/Pers' : ''}`}</div>
                       </button>
                     );
                   })}
                </div>
                <div className="flex justify-end"><button onClick={() => goToStep(7)} className="px-20 py-6 bg-white text-black font-mono text-xs uppercase tracking-[0.5em] italic hover:bg-amber-600 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]">Révéler la vision</button></div>
             </div>
          </div>
        )}

        {/* STEP 7: RECAP LUXE & CONTACT */}
        {step === 7 && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
             <div className="flex-1 p-10 md:p-24 overflow-y-auto scrollbar-hide italic">
                <div className="max-w-xl animate-fade-in">
                   <h2 className="text-[10px] font-mono uppercase tracking-[0.5em] text-amber-600 mb-10 italic font-bold">VOTRE NOTE D'INTENTION</h2>
                   <div className="space-y-16">
                      <div className="border-b border-white/5 pb-16">
                        <p className="text-6xl font-serif italic mb-6 leading-tight">{data.eventType?.title || 'Votre Projet'}</p>
                        <p className="text-neutral-500 font-light text-xl leading-relaxed">Conçu pour {data.pax} invités, orchestré en {data.timeSlot?.title}.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-16">
                         <div><p className="text-[9px] font-mono text-neutral-600 uppercase mb-4 tracking-[0.4em] font-bold">ATMOSPHÈRE</p><p className="text-sm tracking-widest">{data.format?.title || 'Signature'}</p></div>
                         <div><p className="text-[9px] font-mono text-neutral-600 uppercase mb-4 tracking-[0.4em] font-bold">EXPÉRIENCE</p><p className="text-sm tracking-widest">{data.experience.title}</p></div>
                      </div>
                      <div className="pt-16 border-t border-white/5 flex justify-between items-baseline">
                         <span className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest font-bold">INVESTISSEMENT ESTIMÉ</span>
                         <span className="text-6xl font-serif italic text-amber-500">{totalAmount} €</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="w-full md:w-[500px] bg-[#0c0c0c] p-10 md:p-20 flex flex-col justify-center border-l border-white/5 shadow-2xl z-20">
                <form onSubmit={handleSubmit} className="space-y-10">
                   <h3 className="text-2xl font-serif italic mb-10 text-neutral-300">Sceller cette vision</h3>
                   <input type="text" placeholder="NOM COMPLET" required className="w-full bg-transparent border-b border-white/10 py-5 text-xs font-mono uppercase tracking-[0.3em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} />
                   <input type="email" placeholder="EMAIL PROFESSIONNEL" required className="w-full bg-transparent border-b border-white/10 py-5 text-xs font-mono uppercase tracking-[0.3em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
                   <input type="tel" placeholder="TÉLÉPHONE" required className="w-full bg-transparent border-b border-white/10 py-5 text-xs font-mono uppercase tracking-[0.3em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
                   <button type="submit" disabled={isSending} className="w-full py-7 bg-white text-black text-[10px] font-mono uppercase tracking-[0.5em] hover:bg-amber-600 hover:text-white transition-all shadow-xl font-bold italic">{isSending ? "Transmission..." : "Envoyer ma demande"}</button>
                   <div className="flex flex-col gap-6 mt-12">
                      <button type="button" onClick={() => window.print()} className="flex items-center gap-4 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-[0.4em] transition-all italic"><FileText size={14}/> Télécharger la Note d'Intention (PDF)</button>
                      <button type="button" onClick={handleSaveTheDate} className="flex items-center gap-4 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-[0.4em] transition-all italic"><Share2 size={14}/> Partager l'invitation prestige</button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </div>

      {/* --- STYLE CSS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'Space Grotesk', sans-serif; }
        .writing-vertical { writing-mode: vertical-rl; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in-right { animation: fadeInRight 0.5s ease-out forwards; }
        .animate-fade-in { animation: fadeInUp 0.7s ease-out forwards; }
        @media print {
            body * { visibility: hidden; }
            .print\\:block, .print\\:block * { visibility: visible; background: white !important; color: black !important; }
            .print\\:block { position: absolute; left: 0; top: 0; width: 100%; height: auto; padding: 2cm; }
            .print\\:hidden { display: none !important; }
        }
      `}} />
    </div>
  );
}