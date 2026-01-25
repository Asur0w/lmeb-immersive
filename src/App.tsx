import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, Check, Sunrise, Sun, Moon, Star, Utensils, Wifi, Gift, Palette, LayoutTemplate, Droplets, Monitor, Users, Loader, Send, FileText, Share2, Sparkles } from 'lucide-react';

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
  { id: 'none', title: 'Location Sèche', price: 0, sub: 'L\'espace nu', description: "Mise à disposition exclusive de l'espace. Idéal pour vos réunions autonomes ou présentations.", image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop' },
  { id: 'world', title: 'Tour du Monde', price: 40, sub: 'Dégustation 5 vins', description: "Une exploration sensorielle guidée à travers 5 vins d'exception. Le format classique et élégant pour découvrir nos pépites du terroir.", image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop' },
  { id: 'casino', title: 'Casino du Vin', price: 46, sub: 'Animation Ludique', description: "L'ambiance feutrée de la Black List. Dégustation à l'aveugle, tables de jeu, jetons et enchères. Misez sur vos sens dans ce format participatif.", image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2940&auto=format&fit=crop' },
  { id: 'gastro', title: 'Instant Gourmand', price: -1, sub: 'Repas', description: "Une immersion autour de la gastronomie. Quiz culinaire interactif, découverte d'ingrédients mystères et accords mets-vins sur mesure.", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop' }
];

const SERVICES = [
  { id: 'tech', title: 'Pack Tech & Connectivité', price: 0, fakePrice: 100, icon: <Wifi size={20}/>, desc: 'Écrans, Son, Wifi HD.', category: 'tech' },
  { id: 'host', title: 'Maître de Maison', price: 150, icon: <Users size={20}/>, desc: 'Service, gestion et animation.', category: 'staff' },
  { id: 'branding', title: 'Corporate Branding', price: 40, icon: <Monitor size={20}/>, desc: "Votre logo, marque d'identité et mise en avant", category: 'tech' },
  { id: 'softs', title: 'Forfait Softs', price: 'dynamic', icon: <Droplets size={20}/>, desc: 'Eaux et softs à discrétion.', category: 'food' },
  { id: 'food_light', title: 'Restauration : Grignotage', price: 25, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Planches fromages/charcuteries avec tous les accompagnements.', category: 'food' },
  { id: 'food_full', title: 'Restauration : Repas', price: -1, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Préparation culinaire sur-mesure.', category: 'food' },
  { id: 'deco', title: 'Décoration Sur-Mesure', price: 100, icon: <Palette size={20}/>, desc: "Création d'une ambiance à l'image de votre évènement", category: 'deco' },
  { id: 'gift', title: 'Coffret Souvenir', price: 15, isPerHead: true, icon: <Gift size={20}/>, desc: 'Laissez une trace de votre évènement pour vos invités.', category: 'gift' }
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
  const [stats, setStats] = useState({ visits: 0, finalStep: 0, leads: 0, choices: {} });

  // --- LOGIQUE ADMIN ---
  const handleLogoClick = (e) => {
    e.preventDefault();
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);
    
    if (newCount >= 5) {
      setSecretClicks(0);
      fetchStats();
    }
    // Reset le compteur si pas de clic pendant 2 secondes
    setTimeout(() => setSecretClicks(0), 2000);
  };

  const fetchStats = async () => {
    try {
      const [d1, d2, d3] = await Promise.all([
        fetch('https://api.counterapi.dev/v1/lmeb-immersive/visits').then(r => r.json()),
        fetch('https://api.counterapi.dev/v1/lmeb-immersive/finalstep').then(r => r.json()),
        fetch('https://api.counterapi.dev/v1/lmeb-immersive/leads').then(r => r.json())
      ]);
      setStats({ visits: d1.count || 0, finalStep: d2.count || 0, leads: d3.count || 0, choices: {} });
      setShowAdmin(true);
    } catch (e) { console.error(e); }
  };

  // --- LOGIQUE INVITATION LUXE ---
  const handleSaveTheDate = () => {
    const inviteText = `
✨ L'IMMERSIVE — NAMUR
_________________________________

Vous êtes convié(e) à une expérience hors du temps.

📅 Date : ${data.date} ${data.endDate ? 'au ' + data.endDate : ''}
📍 Lieu : Le Monde en Bouteille, Namur
🍷 Thème : ${data.experience.title}

"Le luxe est une affaire de détails et d'émotions partagées."

Découvrez le lieu : 
https://www.lemonde-enbouteille.be/salle
_________________________________
    `.trim();
    navigator.clipboard.writeText(inviteText);
    alert("L'invitation de prestige a été copiée.");
  };

  const handlePrint = () => window.print();

  const getSoftsPrice = (pax) => (pax <= 8 ? 20 : pax <= 16 ? 30 : pax <= 30 ? 40 : 45);

  const calculateTotal = () => {
    let total = 0; let custom = false;
    if (data.timeSlot) total += data.timeSlot.price;
    if (data.format) total += data.format.setupFee;
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
    return { total: total, custom };
  };

  const { total: totalAmount, custom: isCustom } = calculateTotal();

  const toggleService = (id) => {
    const current = data.selectedServices; let newServices = [...current];
    if (id === 'food_light' && current.includes('food_full')) newServices = newServices.filter(x => x !== 'food_full');
    if (id === 'food_full' && current.includes('food_light')) newServices = newServices.filter(x => x !== 'food_light');
    if (newServices.includes(id)) newServices = newServices.filter(x => x !== id);
    else newServices.push(id);
    setData({...data, selectedServices: newServices});
  };

  const goToStep = (target) => {
    if (isAnimating) return;
    setIsAnimating(true); setStep(target);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.contact.email || !data.contact.name || !data.contact.phone) { alert("Merci de compléter vos coordonnées."); return; }
    setIsSending(true);
    const templateParams = {
        name: data.contact.name, email: data.contact.email, phone: data.contact.phone, message: data.contact.message,
        date: data.date + (data.endDate ? ` au ${data.endDate}` : ''), pax: data.pax,
        type: data.eventType?.title || "Non défini", time_slot: data.timeSlot?.title || "Non défini", format: data.format?.title || "Non défini",
        experience: isDryHire ? "Location" : data.experience?.title,
        services: data.selectedServices.map(id => SERVICES.find(s => s.id === id)?.title).join(', '),
        total: totalAmount, is_custom: isCustom ? "OUI (Devis requis)" : "NON"
    };
    // @ts-ignore
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN_ID, templateParams, EMAILJS_PUBLIC_KEY);
    // @ts-ignore
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT_ID, templateParams, EMAILJS_PUBLIC_KEY).then(() => {
          setIsSending(false); setIsSent(true);
      });
  };

  // --- RENDER ---

  if (isSent) {
    return (
      <div className="h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center p-6 text-white text-center">
         <div className="max-w-md animate-fade-in-up">
            <Sparkles className="text-amber-600 w-12 h-12 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl font-serif mb-6 italic">L'intention est transmise.</h2>
            <p className="text-neutral-400 font-light mb-12 leading-relaxed">Nous allons étudier votre demande avec l'attention qu'elle mérite. Vous recevrez une réponse sous 24 heures.</p>
            <button onClick={() => window.location.reload()} className="text-[10px] uppercase tracking-[0.3em] text-amber-600 border border-amber-600/30 px-8 py-4 hover:bg-amber-600 hover:text-white transition-all">Retour à l'essentiel</button>
         </div>
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full bg-[#080808] text-white overflow-hidden font-sans flex flex-col print:bg-white print:text-black print:h-auto print:overflow-visible">
      
      {/* SECTION PRINT : DEVIS SILENT LUXURY */}
      <div className="hidden print:block p-20 w-full max-w-5xl mx-auto bg-white text-black font-serif">
          <div className="flex justify-between items-start mb-32">
            <div>
              <h1 className="text-3xl tracking-[0.2em] mb-2">L'IMMERSIVE</h1>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-neutral-400">Namur — Belgique</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono tracking-widest uppercase mb-1">Date d'édition</p>
              <p className="text-sm">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="mb-24 max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-amber-600 mb-6 italic">Note d'intention</p>
            <h2 className="text-4xl mb-8 leading-tight">Pour {data.contact.name || 'votre événement'}</h2>
            <p className="text-lg leading-relaxed text-neutral-600 italic">
              "Certains lieux ne se contentent pas d'accueillir vos événements, ils les transcendent. 
              Voici la vision que nous avons esquissée pour votre passage à L'Immersive."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-20 mb-24 border-t border-neutral-100 pt-12">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4">Configuration</p>
              <div className="space-y-4">
                <div className="flex justify-between text-sm italic"><span>Espace & Temporalité</span><span>{data.timeSlot?.title}</span></div>
                <div className="flex justify-between text-sm italic"><span>Atmosphère</span><span>{data.format?.title}</span></div>
                <div className="flex justify-between text-sm italic"><span>Audience</span><span>{data.pax} Personnes</span></div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-4">Expérience</p>
              <div className="text-sm italic">{data.experience.title}</div>
              <div className="mt-4 space-y-1">
                {data.selectedServices.map(id => (
                  <div key={id} className="text-[10px] text-neutral-500 uppercase tracking-wider">+ {SERVICES.find(s => s.id === id)?.title}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-12 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">Investissement estimé</p>
              <p className="text-5xl">{totalAmount} € <span className="text-lg text-neutral-400">TVAC</span></p>
            </div>
            <div className="text-right text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400">
              {isCustom ? "* Sous réserve de devis final" : "Proposition valable 15 jours"}
            </div>
          </div>

          <div className="mt-40 text-center text-[9px] font-mono uppercase tracking-[0.5em] text-neutral-300">
            L'Immersive — Rue de la Croix, Namur — www.lemonde-enbouteille.be
          </div>
      </div>

      {/* SECTION APP (WEB) */}
      <div className="flex-1 relative flex flex-col z-10 w-full h-full overflow-hidden print:hidden">
        
        {/* BARRE DE PROGRESSION DISCRÈTE */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-50">
          <div className="h-full bg-amber-600 transition-all duration-1000" style={{ width: `${(step/7)*100}%` }}></div>
        </div>

        {/* PANNEAU ADMIN */}
        {showAdmin && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setShowAdmin(false)}>
            <div className="max-w-sm w-full bg-[#111] border border-white/10 p-8 rounded shadow-2xl" onClick={e => e.stopPropagation()}>
               <div className="text-[10px] font-mono tracking-[0.3em] text-amber-600 mb-8 uppercase">Système de Surveillance</div>
               <div className="space-y-6">
                  <div className="flex justify-between items-baseline"><span className="text-xs text-neutral-500 uppercase">Visiteurs</span><span className="text-2xl font-serif">{stats.visits}</span></div>
                  <div className="flex justify-between items-baseline"><span className="text-xs text-neutral-500 uppercase">Intérêts (Step 7)</span><span className="text-2xl font-serif">{stats.finalStep}</span></div>
                  <div className="flex justify-between items-baseline border-t border-white/5 pt-6"><span className="text-xs text-amber-500 uppercase font-bold">Leads Reçus</span><span className="text-4xl font-serif text-amber-500">{stats.leads}</span></div>
               </div>
               <button onClick={() => setShowAdmin(false)} className="w-full mt-10 text-[10px] uppercase py-3 border border-white/10 hover:bg-white hover:text-black transition-all">Fermer</button>
            </div>
          </div>
        )}

        {/* ETAPE 0 : LANDING */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center relative px-6">
             <div className="absolute inset-0 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center opacity-20 grayscale"></div>
             <div className="relative z-10 text-center">
                <div onClick={handleLogoClick} className="cursor-pointer mb-12 transform hover:scale-105 transition-transform duration-700">
                  <img src="https://www.lemonde-enbouteille.be/web/image/26768-edef09a5/LOGO%20l%27immersive-24.png" alt="Logo" className="w-32 mx-auto mb-6 opacity-80" />
                  <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-2 italic">L'Immersive</h1>
                  <p className="text-[10px] font-mono tracking-[0.5em] text-amber-600 uppercase">Le Monde en Bouteille</p>
                </div>
                <p className="text-neutral-400 font-light max-w-md mx-auto mb-12 leading-relaxed italic">"Le luxe ne se crie pas, il se ressent."</p>
                <button onClick={() => goToStep(1)} className="group relative px-12 py-5 border border-white/10 overflow-hidden transition-all hover:border-white/40">
                   <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                   <span className="relative text-[10px] uppercase tracking-[0.3em] font-mono group-hover:text-black transition-colors flex items-center gap-4">Commencer l'expérience <ArrowRight size={12}/></span>
                </button>
             </div>
          </div>
        )}

        {/* ETAPES DE SELECTION (Simplifiées pour l'exemple) */}
        {step > 0 && step < 7 && (
          <div className="flex-1 flex flex-col p-6 md:p-20 animate-fade-in">
             <div className="flex justify-between items-center mb-20">
                <button onClick={() => setStep(step-1)} className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white flex items-center gap-2 transition-colors"><ChevronLeft size={14}/> Retour</button>
                <span className="text-[10px] font-mono text-amber-600 tracking-[0.3em]">Étape 0{step}</span>
             </div>

             {step === 1 && (
               <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
                  <h2 className="text-5xl font-serif mb-12 italic">Quel moment souhaitez-vous capturer ?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {TIME_SLOTS.map(s => (
                      <button key={s.id} onClick={() => { setData({...data, timeSlot: s}); goToStep(2); }} className="group relative h-80 overflow-hidden border border-white/5">
                        <div className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" style={{ backgroundImage: `url(${s.image})` }}></div>
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all"></div>
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                           <span className="text-[10px] font-mono uppercase mb-2">{s.label}</span>
                           <h3 className="text-2xl font-serif italic">{s.title}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
               </div>
             )}

             {step === 2 && (
               <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
                  <h2 className="text-5xl font-serif mb-12 italic">L'énergie de l'événement ?</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {EVENT_TYPES.map(t => (
                      <button key={t.id} onClick={() => { setData({...data, eventType: t}); goToStep(3); }} className="p-8 border border-white/5 hover:border-amber-600/50 transition-all text-left bg-white/[0.02]">
                         <h3 className="text-xl font-serif mb-2 italic">{t.title}</h3>
                         <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-relaxed">{t.desc}</p>
                      </button>
                    ))}
                  </div>
               </div>
             )}

             {/* Raccourci pour l'exemple : saute les autres étapes pour arriver au final */}
             {step >= 3 && (
               <div className="flex-1 flex flex-col items-center justify-center">
                  <p className="text-neutral-500 italic mb-8">Personnalisation en cours...</p>
                  <button onClick={() => goToStep(7)} className="text-[10px] uppercase tracking-[0.3em] px-8 py-4 border border-white/10">Passer à la note d'intention</button>
               </div>
             )}
          </div>
        )}

        {/* ETAPE 7 : FINAL (RÉCAPITULATIF LUXE) */}
        {step === 7 && (
          <div className="flex-1 flex flex-col md:flex-row h-full">
             <div className="flex-1 p-10 md:p-24 overflow-y-auto scrollbar-hide">
                <div className="max-w-xl">
                   <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-amber-600 mb-8 italic">Récapitulatif de votre vision</h2>
                   <div className="space-y-12">
                      <div className="border-b border-white/5 pb-12">
                        <p className="text-4xl font-serif italic mb-4">{data.eventType?.title || 'Événement'}</p>
                        <p className="text-neutral-500 font-light leading-relaxed">
                          Un moment conçu pour {data.pax} personnes, orchestré en {data.timeSlot?.title || 'matinée'}.
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-10">
                         <div>
                            <p className="text-[10px] font-mono text-neutral-600 uppercase mb-4 tracking-widest">Atmosphère</p>
                            <p className="text-sm italic">{data.format?.title || 'Standard'}</p>
                         </div>
                         <div>
                            <p className="text-[10px] font-mono text-neutral-600 uppercase mb-4 tracking-widest">Expérience</p>
                            <p className="text-sm italic">{data.experience.title}</p>
                         </div>
                      </div>
                      <div className="pt-12 border-t border-white/5">
                        <div className="flex justify-between items-baseline">
                           <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest">Investissement Privilégié</span>
                           <span className="text-5xl font-serif italic text-amber-500">{totalAmount} €</span>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="w-full md:w-[450px] bg-[#0c0c0c] p-10 md:p-20 flex flex-col justify-center border-l border-white/5">
                <form onSubmit={handleSubmit} className="space-y-8">
                   <h3 className="text-xl font-serif italic mb-8 text-neutral-300">Sceller cette vision</h3>
                   <input type="text" placeholder="NOM COMPLET" required className="w-full bg-transparent border-b border-white/10 py-4 text-xs font-mono tracking-widest uppercase outline-none focus:border-amber-600 transition-colors" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} />
                   <input type="email" placeholder="ADRESSE EMAIL" required className="w-full bg-transparent border-b border-white/10 py-4 text-xs font-mono tracking-widest uppercase outline-none focus:border-amber-600 transition-colors" onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
                   <input type="tel" placeholder="NUMÉRO DE CONTACT" required className="w-full bg-transparent border-b border-white/10 py-4 text-xs font-mono tracking-widest uppercase outline-none focus:border-amber-600 transition-colors" onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
                   
                   <button type="submit" disabled={isSending} className="w-full py-5 bg-white text-black text-[10px] font-mono uppercase tracking-[0.4em] hover:bg-amber-600 hover:text-white transition-all">
                      {isSending ? "Transmission..." : "Envoyer ma demande"}
                   </button>

                   <div className="flex flex-col gap-4 mt-8">
                      <button type="button" onClick={handlePrint} className="flex items-center gap-3 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"><FileText size={12}/> Télécharger la Note d'Intention (PDF)</button>
                      <button type="button" onClick={handleSaveTheDate} className="flex items-center gap-3 text-[9px] font-mono text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"><Share2 size={12}/> Copier l'invitation de prestige</button>
                   </div>
                </form>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}