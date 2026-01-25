import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, Check, Clock, Calendar, Users, Briefcase, Wine, Coffee, Music, Monitor, Minus, Plus, Sparkles, Sun, Moon, Sunrise, Star, Utensils, Wifi, Gift, Palette, LayoutTemplate, Droplets, Map, Mail, Loader, Send, Activity, Printer, Share2, FileText } from 'lucide-react';

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
  { id: 'standard', title: 'L\'Immersive', subtitle: 'Standard', desc: 'Disposition signature. Équilibrée & chaleureuse.', setupFee: 0, image: 'https://www.lemonde-enbouteille.be/web/image/26813-d579cd53/104-DSC09412.webp' },
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
  { id: 'food_light', title: 'Grignotage', price: 25, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Planches fromages/charcuteries.' },
  { id: 'food_full', title: 'Repas', price: -1, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Préparation culinaire sur-mesure.' }
];

// --- UI COMPONENTS ---
const ProgressBar = ({ current, total }) => (
  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-700 to-amber-500 transition-all duration-700 ease-out z-50 print:hidden" style={{ width: `${(current / total) * 100}%` }} />
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="absolute bottom-8 left-6 md:left-8 z-40 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-mono group mix-blend-difference bg-black/20 p-2 rounded backdrop-blur-sm md:bg-transparent md:p-0 cursor-pointer print:hidden">
    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour
  </button>
);

const StepIndicator = ({ step, setStep }) => (
  <div className="hidden md:flex flex-col justify-between w-20 border-r border-white/5 bg-[#0a0a0a] z-20 py-8 items-center h-full print:hidden">
    <div className="font-serif font-bold text-xl cursor-pointer text-amber-600 hover:scale-110 transition-transform" onClick={() => setStep(0)}>L.</div>
    <div className="flex flex-col gap-6 items-center w-full">
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <button key={s} disabled={step < s} onClick={() => setStep(s)} className={`relative w-full text-center py-2 text-[10px] font-mono transition-all duration-300 group ${step === s ? 'text-white font-bold' : step > s ? 'text-neutral-500 hover:text-white cursor-pointer' : 'text-neutral-800 cursor-not-allowed'}`}>
          {step === s && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-600 rounded-r-full"></div>} 0{s}
        </button>
      ))}
    </div>
    <div className="text-[10px] text-neutral-700 writing-vertical rotate-180 tracking-widest">LE MONDE EN BOUTEILLE</div>
  </div>
);

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
  const [stats, setStats] = useState({ visits: 0, finalStep: 0, leads: 0 });

  // Navigation Débuggée
  const goToStep = (target) => { if (!isAnimating) { setIsAnimating(true); setStep(target); setTimeout(() => setIsAnimating(false), 800); } };
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
                setStats({ visits: d1.count || 0, finalStep: 0, leads: d2.count || 0 });
                setShowAdmin(true);
            });
            return 0;
        }
        return val;
    });
  };

  const handlePrint = () => window.print();
  
  const handleSaveTheDate = () => {
      const text = `✨ L'IMMERSIVE — NAMUR\n_________________________________\n\nVous êtes convié(e) à une expérience hors du temps.\n\n📅 Date : ${data.date} ${data.endDate ? 'au ' + data.endDate : ''}\n📍 Lieu : Le Monde en Bouteille, Namur\n🍷 Expérience : ${data.experience.title}\n\n"Le luxe est une affaire de détails."\n\nDécouvrir : https://www.lemonde-enbouteille.be/salle`;
      navigator.clipboard.writeText(text);
      alert("L'invitation de prestige a été copiée.");
  };

  const getSoftsPrice = (pax) => (pax <= 8 ? 20 : pax <= 16 ? 30 : pax <= 30 ? 40 : 45);

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
          if (srv.id === 'softs') total += getSoftsPrice(data.pax);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    // @ts-ignore
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN_ID, { ...data, total: totalAmount }, EMAILJS_PUBLIC_KEY).then(() => {
        setIsSending(false); setIsSent(true);
    });
  };

  // --- RENDU LANDING ---
  if (step === 0) {
    return (
      <div className="relative h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center p-6 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center h-full">
          <div className="w-px h-12 md:h-20 bg-gradient-to-b from-transparent via-amber-600 to-transparent mb-8"></div>
          <div className="animate-fade-in-up cursor-pointer" onClick={handleLogoClick}>
            <img src="https://www.lemonde-enbouteille.be/web/image/26768-edef09a5/LOGO%20l%27immersive-24.png" alt="Logo" className="w-28 md:w-40 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 leading-none mb-3 uppercase italic">L'IMMERSIVE</h1>
            <p className="font-mono text-[9px] uppercase tracking-[0.6em] text-amber-500 mb-10">Le Monde en Bouteille</p>
          </div>
          <div className="border-l border-amber-600/30 pl-6 text-left max-w-lg mx-auto backdrop-blur-sm py-2 mb-12">
             <p className="text-neutral-400 font-light text-xs md:text-sm leading-relaxed italic">Architecture de caractère et équipements connectés. <br/>Réunions, séminaires ou soirées : ne louez pas une salle, vivez une expérience.</p>
          </div>
          <button onClick={() => goToStep(1)} className="group relative px-10 py-5 bg-white/5 border border-white/10 hover:border-amber-600/50 transition-all duration-500 w-full md:w-auto">
            <span className="relative font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4">Composer mon événement <ArrowRight size={14} /></span>
          </button>
        </div>
        {showAdmin && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setShowAdmin(false)}>
            <div className="max-w-sm w-full bg-[#111] border border-white/10 p-8 text-center" onClick={e => e.stopPropagation()}>
               <div className="text-[10px] font-mono tracking-[0.3em] text-amber-600 mb-8 uppercase italic">DATA FLUX</div>
               <div className="space-y-6">
                  <div className="flex justify-between items-baseline"><span className="text-xs text-neutral-500 uppercase tracking-widest">Trafic</span><span className="text-2xl font-serif">{stats.visits}</span></div>
                  <div className="flex justify-between items-baseline border-t border-white/5 pt-6"><span className="text-xs text-amber-500 uppercase font-bold tracking-widest">Leads</span><span className="text-4xl font-serif text-amber-500">{stats.leads}</span></div>
               </div>
               <button onClick={() => setShowAdmin(false)} className="w-full mt-10 text-[10px] uppercase py-3 border border-white/10 hover:bg-white hover:text-black transition-all font-mono tracking-widest">Fermer</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full bg-[#080808] text-white overflow-hidden font-sans flex flex-col md:flex-row print:bg-white print:text-black print:h-auto print:overflow-visible">
      <ProgressBar current={step} total={7} />
      <StepIndicator step={step} setStep={goToStep} />

      {/* SECTION PRINT : LUXE PDF */}
      <div className="hidden print:block p-20 w-full max-w-5xl mx-auto bg-white text-black font-serif">
          <div className="flex justify-between items-start mb-32 border-b border-black/5 pb-12">
            <div><h1 className="text-3xl tracking-[0.2em] mb-2 uppercase">L'IMMERSIVE</h1><p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400">Namur — Belgique</p></div>
            <div className="text-right"><p className="text-[10px] font-mono tracking-widest uppercase mb-1">Note d'Intention</p><p className="text-sm italic">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p></div>
          </div>
          <div className="mb-24 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-600 mb-6 italic">Privilège</p>
            <h2 className="text-4xl mb-8 leading-tight">Pour {data.contact.name || 'votre événement'}</h2>
            <p className="text-lg leading-relaxed text-neutral-600 italic">"Certains lieux ne se contentent pas d'accueillir vos moments, ils les transcendent."</p>
          </div>
          <div className="grid grid-cols-2 gap-20 mb-24 border-t border-neutral-100 pt-12">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 tracking-[0.2em]">CONFIGURATION</p>
              <div className="space-y-4 text-sm italic">
                <div className="flex justify-between"><span>Espace</span><span>{data.timeSlot?.title}</span></div>
                <div className="flex justify-between"><span>Audience</span><span>{data.pax} Invités</span></div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4 tracking-[0.2em]">EXPÉRIENCE</p>
              <div className="text-sm italic mb-4">{data.experience.title}</div>
              <div className="space-y-1">{data.selectedServices.map(id => (<div key={id} className="text-[10px] text-neutral-500 uppercase tracking-wider">+ {SERVICES.find(s => s.id === id)?.title}</div>))}</div>
            </div>
          </div>
          <div className="border-t-2 border-black pt-12 flex justify-between items-end">
            <div><p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Investissement estimé</p><p className="text-5xl">{totalAmount} € <span className="text-lg text-neutral-400">TVAC</span></p></div>
            <div className="text-right text-[10px] font-mono uppercase tracking-[0.5em] text-neutral-300 italic">L'Immersive — Technologie & Terroir</div>
          </div>
      </div>

      {/* CONTENU WEB */}
      <div className="flex-1 relative flex flex-col z-10 w-full h-full overflow-hidden print:hidden">
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
           <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 flex flex-col items-end">
             <div className="font-mono text-[8px] md:text-[10px] uppercase text-neutral-400 tracking-widest mb-1">Budget Estimé</div>
             <div className="font-serif text-lg md:text-2xl text-white tracking-tight flex items-baseline gap-2">
                <span className={isCustom ? "text-amber-500" : "text-white"}>{totalAmount} €</span>
                {isCustom && <span className="text-[8px] font-sans text-neutral-400 border border-neutral-600 px-1 rounded">+ Devis</span>}
             </div>
           </div>
        </div>
        
        {step > 0 && <BackButton onClick={goBack} />}

        {step === 1 && (
          <div className="flex-1 flex flex-col h-full animate-fade-in duration-700 relative">
            <div className="absolute top-0 left-0 p-6 md:p-12 z-50 bg-gradient-to-b from-black/80 to-transparent w-full">
               <div className="mt-16"><span className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2 block italic">01 — Temporalité</span><h2 className="text-3xl md:text-5xl font-serif text-white italic leading-none">Le Moment<br/>du Choix</h2></div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row h-full pt-32 md:pt-0">
              {TIME_SLOTS.map((slot) => (
                <div key={slot.id} onClick={() => { setData({...data, timeSlot: slot}); goToStep(2); }} className="relative w-full md:w-auto flex-shrink-0 md:flex-1 h-64 md:h-full border-b md:border-b-0 md:border-r border-white/5 cursor-pointer group overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110 group-hover:scale-100" style={{ backgroundImage: `url(${slot.image})` }} />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all"></div>
                  <div className="absolute bottom-0 w-full p-6 z-20 flex flex-col justify-center items-center">
                     <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 bg-black/40 px-3 py-1 rounded-full border border-white/10 mb-2">{slot.label}</div>
                     <h3 className="text-2xl font-serif text-white italic">{slot.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 p-6 md:p-24 flex flex-col justify-center animate-fade-in-right overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full">
               <div className="mb-12 border-b border-white/10 pb-8 mt-16 md:mt-0 italic"><span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2 block">02 — Intention</span><h2 className="text-4xl font-serif text-white">L'Énergie du Moment</h2></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {EVENT_TYPES.map((type) => (
                   <button key={type.id} onClick={() => { setData({...data, eventType: type}); goToStep(3); }} className="group relative h-96 w-full overflow-hidden border border-white/5 hover:border-amber-600/50 transition-all text-left">
                     <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: `url(${type.image})` }} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-8 flex flex-col justify-end">
                        <h3 className="text-2xl font-serif text-white italic mb-1 uppercase tracking-tighter">{type.title}</h3>
                        <p className="text-xs text-neutral-300 font-light italic leading-relaxed">{type.desc}</p>
                     </div>
                   </button>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* ÉTAPES 3 À 6 (Condensées pour la fluidité) */}
        {step >= 3 && step <= 6 && (
           <div className="flex-1 p-6 md:p-24 flex flex-col justify-center max-w-4xl mx-auto w-full animate-fade-in">
              {step === 3 && (
                <>
                  <h2 className="text-4xl font-serif italic mb-12">Configuration de l'Espace</h2>
                  <div className="flex flex-col gap-4">
                    {FORMATS.map(f => (
                      <button key={f.id} onClick={() => { setData({...data, format: f}); goToStep(4); }} className="flex items-center gap-8 p-6 border border-white/5 hover:border-amber-600/50 transition-all text-left bg-white/[0.02]">
                        <div className="w-24 h-24 bg-cover bg-center grayscale" style={{backgroundImage: `url(${f.image})`}}></div>
                        <div><h3 className="text-xl font-serif italic">{f.title}</h3><p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">{f.subtitle}</p></div>
                        <ArrowRight className="ml-auto opacity-20" size={20}/>
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {step === 4 && (
                <div className="text-center">
                   <h2 className="text-5xl font-serif italic mb-16 uppercase">L'Horizon</h2>
                   <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
                      <div className="p-10 border border-white/10 bg-white/[0.02] w-full">
                         <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em] mb-8 italic">Volume d'invités</p>
                         <div className="flex items-center justify-center gap-8">
                            <button onClick={() => setData({...data, pax: Math.max(1, data.pax-1)})} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black"><Minus size={14}/></button>
                            <span className="text-6xl font-serif italic">{data.pax}</span>
                            <button onClick={() => setData({...data, pax: data.pax+1})} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black"><Plus size={14}/></button>
                         </div>
                      </div>
                      <div className="p-10 border border-white/10 bg-white/[0.02] w-full relative">
                         <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-[0.3em] mb-8 italic">Date</p>
                         <input type="date" min={new Date().toISOString().split('T')[0]} onChange={(e) => setData({...data, date: e.target.value})} className="bg-transparent text-xl font-serif text-white w-full border-b border-white/20 outline-none pb-2 text-center [color-scheme:dark]" />
                         <button onClick={() => setIsMultiDay(!isMultiDay)} className="absolute bottom-2 right-2 text-[8px] uppercase tracking-widest text-amber-600">{isMultiDay ? '1 Jour' : '+ Jours'}</button>
                         {isMultiDay && <input type="date" onChange={(e) => setData({...data, endDate: e.target.value})} className="bg-transparent text-xl font-serif text-white w-full border-b border-white/20 outline-none pb-2 text-center [color-scheme:dark] mt-4 animate-fade-in-up" />}
                      </div>
                   </div>
                   <button onClick={() => goToStep(5)} className="mt-16 bg-white text-black px-12 py-4 uppercase font-mono text-xs tracking-[0.3em] hover:bg-amber-600 transition-all italic">Valider la mesure</button>
                </div>
              )}

              {step === 5 && (
                <>
                  <h2 className="text-4xl font-serif italic mb-12 uppercase tracking-tighter">Niveau d'Immersion</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                     <button onClick={() => { setIsDryHire(true); setData({...data, experience: EXPERIENCES[0]}); }} className={`p-8 border ${isDryHire ? 'border-amber-600 bg-amber-600/5' : 'border-white/5'} text-left transition-all italic`}>Location Exclusive</button>
                     <button onClick={() => { setIsDryHire(false); setData({...data, experience: EXPERIENCES[1]}); }} className={`p-8 border ${!isDryHire ? 'border-amber-600 bg-amber-600/5' : 'border-white/5'} text-left transition-all italic`}>Expérience Sensorielle</button>
                  </div>
                  {!isDryHire && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {EXPERIENCES.filter(e => e.id !== 'none').map(exp => (
                        <button key={exp.id} onClick={() => setData({...data, experience: exp})} className={`p-6 border ${data.experience.id === exp.id ? 'border-amber-600 text-amber-500' : 'border-white/5 text-neutral-500'} transition-all text-sm italic uppercase tracking-widest`}>{exp.title}</button>
                      ))}
                    </div>
                  )}
                  <button onClick={() => goToStep(6)} className="mt-12 bg-white text-black py-4 uppercase font-mono text-xs tracking-[0.4em] italic">Étape Finale</button>
                </>
              )}

              {step === 6 && (
                <>
                  <h2 className="text-4xl font-serif italic mb-12">Finitions & Services</h2>
                  <div className="grid grid-cols-2 gap-4 mb-12">
                    {SERVICES.map(s => (
                      <button key={s.id} onClick={() => toggleService(s.id)} className={`p-6 border text-left flex justify-between items-center transition-all ${data.selectedServices.includes(s.id) ? 'border-amber-600 bg-amber-600/5' : 'border-white/5 text-neutral-500'}`}>
                        <span className="text-xs uppercase tracking-[0.2em] italic">{s.title}</span>
                        {data.selectedServices.includes(s.id) && <Check size={14} className="text-amber-500"/>}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => goToStep(7)} className="bg-white text-black py-5 uppercase font-mono text-xs tracking-[0.5em] italic shadow-2xl">Révéler la vision</button>
                </>
              )}
           </div>
        )}

        {/* ÉTAPE FINAL */}
        {step === 7 && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
             <div className="flex-1 p-10 md:p-24 overflow-y-auto scrollbar-hide italic">
                <div className="max-w-xl animate-fade-in">
                   <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-amber-600 mb-8 italic font-bold">PROJET EXCEPTIONNEL</h2>
                   <div className="space-y-12">
                      <div className="border-b border-white/5 pb-12">
                        <p className="text-5xl font-serif mb-4">{data.eventType?.title || 'Votre Événement'}</p>
                        <p className="text-neutral-400 font-light leading-relaxed">Conçu pour une assemblée de {data.pax} personnes.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                         <div><p className="text-[8px] font-mono text-neutral-600 uppercase mb-4 tracking-[0.3em]">CONFIGURATION</p><p className="text-sm">{data.format?.title || 'Signature'}</p></div>
                         <div><p className="text-[8px] font-mono text-neutral-600 uppercase mb-4 tracking-[0.3em]">EXPÉRIENCE</p><p className="text-sm">{data.experience.title}</p></div>
                      </div>
                      <div className="pt-12 border-t border-white/5">
                        <div className="flex justify-between items-baseline"><span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest font-bold">INVESTISSEMENT ESTIMÉ</span><span className="text-5xl font-serif text-amber-500">{totalAmount} €</span></div>
                      </div>
                   </div>
                </div>
             </div>
             <div className="w-full md:w-[480px] bg-[#0c0c0c] p-10 md:p-20 flex flex-col justify-center border-l border-white/5 shadow-2xl z-20">
                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
                   <h3 className="text-xl font-serif italic mb-8 text-neutral-300">Sceller cette intention</h3>
                   <input type="text" placeholder="NOM COMPLET" required className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] font-mono uppercase tracking-[0.2em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} />
                   <input type="email" placeholder="EMAIL PROFESSIONNEL" required className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] font-mono uppercase tracking-[0.2em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
                   <input type="tel" placeholder="TÉLÉPHONE" required className="w-full bg-transparent border-b border-white/10 py-4 text-[10px] font-mono uppercase tracking-[0.2em] outline-none focus:border-amber-600 transition-all placeholder:text-neutral-800" onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
                   <button type="submit" disabled={isSending} className="w-full py-6 bg-white text-black text-[10px] font-mono uppercase tracking-[0.5em] hover:bg-amber-600 hover:text-white transition-all shadow-xl font-bold">{isSending ? "Transmission..." : "Envoyer ma demande"}</button>
                   <div className="flex flex-col gap-4 mt-8">
                      <button type="button" onClick={handlePrint} className="flex items-center gap-3 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-[0.3em] transition-all italic"><FileText size={12}/> Télécharger la Note d'Intention</button>
                      <button type="button" onClick={handleSaveTheDate} className="flex items-center gap-3 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-[0.3em] transition-all italic"><Share2 size={12}/> Partager l'invitation prestige</button>
                   </div>
                </form>
             </div>
          </div>
        )}
      </div>

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
            body * { visibility: hidden; background: white !important; }
            .print\\:block, .print\\:block * { visibility: visible; }
            .print\\:block { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
        }
      `}} />
    </div>
  );
}