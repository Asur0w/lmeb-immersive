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
  { id: 'none', title: 'Location Sèche', price: 0, sub: 'L\'espace nu', description: "Mise à disposition exclusive de l'espace. Idéal pour vos réunions autonomes ou présentations.", image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop' },
  { id: 'world', title: 'Tour du Monde', price: 40, sub: 'Dégustation 5 vins', description: "Une exploration sensorielle guidée à travers 5 vins d'exception. Le format classique et élégant pour découvrir nos pépites du terroir.", image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop' },
  { id: 'casino', title: 'Casino du Vin', price: 46, sub: 'Animation Ludique', description: "L'ambiance feutrée de la Black List. Dégustation à l'aveugle, tables de jeu, jetons et enchères. Misez sur vos sens dans ce format participatif.", image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2940&auto=format&fit=crop' },
  { id: 'gastro', title: 'Instant Gourmand', price: -1, sub: 'Repas', description: "Une immersion autour de la gastronomie. Quiz culinaire interactif, découverte d'ingrédients mystères et accords mets-vins sur mesure.", image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop' }
];

const SERVICES = [
  { id: 'tech', title: 'Pack Tech & Connectivité', price: 0, fakePrice: 100, icon: <Wifi size={20}/>, desc: 'Écrans, Son, Wifi HD.', category: 'tech' },
  { id: 'host', title: 'Maître de Maison', price: 150, icon: <Users size={20}/>, desc: 'Service et gestion.', category: 'staff' },
  { id: 'branding', title: 'Corporate Branding', price: 40, icon: <Monitor size={20}/>, desc: "Votre logo, marque d'identité et mise en avant sur nos écrans.", category: 'tech' },
  { id: 'softs', title: 'Forfait Softs', price: 'dynamic', icon: <Droplets size={20}/>, desc: 'Eaux et softs à discrétion.', category: 'food' },
  { id: 'food_light', title: 'Grignotage', price: 25, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Planches fromages/charcuteries.', category: 'food' },
  { id: 'food_full', title: 'Repas', price: -1, isPerHead: true, icon: <Utensils size={20}/>, desc: 'Préparation culinaire sur-mesure.', category: 'food' },
  { id: 'deco', title: 'Décoration', price: 100, icon: <Palette size={20}/>, desc: "Création d'une ambiance.", category: 'deco' },
  { id: 'gift', title: 'Coffret Souvenir', price: 15, isPerHead: true, icon: <Gift size={20}/>, desc: 'Cadeau invité.', category: 'gift' }
];

// --- COMPONENTS ---
const ProgressBar = ({ current, total }) => (
  <div className="absolute top-0 left-0 h-1 bg-amber-600 transition-all duration-1000 z-50 print:hidden" style={{ width: `${(current / total) * 100}%` }}></div>
);

const BackButton = ({ onClick }) => (
  <button onClick={onClick} className="absolute bottom-8 left-8 z-40 flex items-center gap-2 text-neutral-500 hover:text-white uppercase text-[10px] tracking-widest font-mono print:hidden group">
    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Retour
  </button>
);

const StepIndicator = ({ step, setStep }) => (
  <div className="hidden md:flex flex-col justify-between w-20 border-r border-white/5 bg-[#0a0a0a] z-20 py-8 items-center h-full print:hidden">
    <div className="font-serif font-bold text-xl cursor-pointer text-amber-600" onClick={() => setStep(0)}>L.</div>
    <div className="flex flex-col gap-6 items-center">
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <button key={s} disabled={step < s} onClick={() => setStep(s)} className={`text-[10px] font-mono transition-all ${step === s ? 'text-white font-bold scale-125' : 'text-neutral-700 hover:text-neutral-400'}`}>0{s}</button>
      ))}
    </div>
    <div className="text-[9px] text-neutral-700 rotate-180 writing-vertical tracking-widest uppercase">Namur</div>
  </div>
);

const MobileStepIndicator = ({ step }) => (
  <div className="md:hidden absolute top-4 left-4 z-40 flex items-center gap-2 print:hidden">
      <div className="text-amber-600 font-serif font-bold text-lg">L.</div>
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-l border-white/20 pl-2">{step === 0 ? 'Accueil' : `Étape 0${step}/07`}</div>
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
  const [isAgreed, setIsAgreed] = useState(false);

  // Admin Stats
  const [secretClicks, setSecretClicks] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [stats, setStats] = useState({ visits: 0, finalStep: 0, leads: 0, choices: {} });

  // TRACKING
  useEffect(() => {
    if (!sessionStorage.getItem('has_visited')) {
       fetch('https://api.counterapi.dev/v1/lmeb-immersive/visits/up').catch(console.error);
       sessionStorage.setItem('has_visited', 'true');
    }
  }, []);

  // ADMIN TRIGGER (5 clics sécurisés)
  const handleLogoClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    const newCount = secretClicks + 1;
    setSecretClicks(newCount);
    if (newCount >= 5) {
        Promise.all([
            fetch('https://api.counterapi.dev/v1/lmeb-immersive/visits').then(r => r.json()),
            fetch('https://api.counterapi.dev/v1/lmeb-immersive/finalstep').then(r => r.json()),
            fetch('https://api.counterapi.dev/v1/lmeb-immersive/leads').then(r => r.json()),
            fetch('https://api.counterapi.dev/v1/lmeb-immersive/choice_casino').then(r => r.json()),
            fetch('https://api.counterapi.dev/v1/lmeb-immersive/choice_world').then(r => r.json())
        ]).then(([d1, d2, d3, d4, d5]) => {
            setStats({ 
                visits: d1.count || 0, finalStep: d2.count || 0, leads: d3.count || 0, 
                choices: { casino: d4.count || 0, world: d5.count || 0 } 
            });
            setShowAdmin(true); setSecretClicks(0);
        }).catch(() => { setShowAdmin(true); setSecretClicks(0); });
    }
    setTimeout(() => { if(newCount < 5) setSecretClicks(0); }, 5000);
  };

  const trackExperienceChoice = (expId) => {
      fetch(`https://api.counterapi.dev/v1/lmeb-immersive/choice_${expId}/up`).catch(console.error);
  };

  const handleSaveTheDate = () => {
    const text = `M O N D E  E N  B O U T E I L L E\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nI N V I T A T I O N  P R I V É E\n\nVous êtes attendu(e) pour vivre une expérience singulière.\n\nDATE\n${data.date} ${data.endDate ? '— ' + data.endDate : ''}\n\nLIEU\nL'Immersive, Namur\n(Accès confidentiel)\n\nTHÈME\n${data.experience.title}\n\n"Le temps s'arrête là où l'expérience commence."\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\nhttps://www.lemonde-enbouteille.be/salle`;
    navigator.clipboard.writeText(text);
    alert("Invitation copiée dans le presse-papier.");
  };

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
    return { total, custom };
  };

  const { total: totalAmount, custom: isCustom } = calculateTotal();

  const toggleService = (id) => {
    const current = data.selectedServices; let newServices = [...current];
    if (newServices.includes(id)) newServices = newServices.filter(x => x !== id);
    else newServices.push(id);
    setData({...data, selectedServices: newServices});
  };

  const goToStep = (target) => { 
    if (!isAnimating) { setIsAnimating(true); setStep(target); setTimeout(() => setIsAnimating(false), 800); } 
  };
  const autoNext = (target) => goToStep(target);
  const goBack = () => { if (step > 0) goToStep(step - 1); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.contact.email || !data.contact.name || !data.contact.phone) { alert("Merci de compléter vos coordonnées."); return; }
    if (!isAgreed) { alert("Merci d'accepter les conditions pour continuer."); return; }
    setIsSending(true);
    // @ts-ignore
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN_ID, { ...data, total: totalAmount }, EMAILJS_PUBLIC_KEY);
    // @ts-ignore
    window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT_ID, { ...data, total: totalAmount }, EMAILJS_PUBLIC_KEY).then(() => {
        fetch('https://api.counterapi.dev/v1/lmeb-immersive/leads/up').catch(console.error);
        setIsSending(false); setIsSent(true);
    });
  };

  // --- RENDER ---
  if (isSent) {
    return (
      <div className="relative h-[100dvh] w-full bg-[#050505] flex flex-col items-center justify-center p-6 text-white text-center print:hidden">
           <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center blur-sm mix-blend-overlay"></div>
           <Sparkles className="text-amber-600 mb-8 opacity-50 relative z-10" size={48} />
           <h2 className="text-4xl font-serif mb-6 relative z-10">Demande Transmise</h2>
           <p className="text-neutral-400 font-light mb-12 max-w-sm relative z-10">Votre vision a été capturée. Nous reviendrons vers vous sous 24h.</p>
           <div className="flex flex-col gap-4 relative z-10">
              <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest hover:bg-amber-600 transition-all">Retour</button>
              <button onClick={handleSaveTheDate} className="text-[10px] font-mono text-neutral-500 hover:text-white flex items-center justify-center gap-2 uppercase tracking-widest transition-colors"><Share2 size={12}/> Copier l'invitation prestige</button>
           </div>
      </div>
    );
  }

  if (step === 0) {
    return (
      <div className="relative h-[100dvh] w-full bg-[#050505] overflow-hidden print:hidden text-white font-sans flex flex-col">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
        <div className="absolute inset-0 z-0 opacity-60 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center mix-blend-overlay"></div>
        
        {/* CONTAINER PRINCIPAL CENTRÉ ET SURÉLEVÉ */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-6 pb-20"> 
          
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-600 to-transparent mb-6"></div>
          
          {/* LOGO & TITRE */}
          <div onClick={handleLogoClick} className="cursor-pointer select-none relative z-[100] group text-center mb-8">
            <img src="https://www.lemonde-enbouteille.be/web/image/26768-edef09a5/LOGO%20l%27immersive-24.png" alt="Logo" className="w-40 md:w-48 mx-auto mb-6 opacity-90 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105" />
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400 leading-none mb-4">L'IMMERSIVE</h1>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.6em] text-amber-500">Le Monde en Bouteille</p>
          </div>

          <div className="border-l border-amber-600/30 pl-6 text-left max-w-xl backdrop-blur-sm py-2 mb-10">
             <p className="text-neutral-300 font-light text-xs md:text-sm leading-relaxed">Une adresse confidentielle à Namur. <br className="hidden md:block"/><strong>Un espace événementiel privatif alliant architecture de caractère et équipements connectés.</strong></p>
          </div>
          
          <button onClick={() => goToStep(1)} className="group relative px-10 py-5 bg-white/5 border border-white/10 hover:border-amber-600/50 transition-all duration-500 w-full md:w-auto">
             <div className="absolute inset-0 bg-amber-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
             <span className="relative font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 text-white group-hover:text-amber-500 transition-colors">Composer mon événement <ArrowRight size={14} /></span>
          </button>
        </div>

        {/* FOOTER FIXE EN BAS */}
        <div className="absolute bottom-8 left-0 w-full flex flex-col items-center gap-4 z-50 animate-fade-in-up delay-500">
             <div className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <div className="h-px w-10 bg-white/20"></div>
                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-neutral-400">Confiance : Entreprises & Privés</p>
                <div className="h-px w-10 bg-white/20"></div>
             </div>
             <a href="https://www.lemonde-enbouteille.be/salle" target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-neutral-500 hover:text-amber-500 uppercase tracking-widest transition-colors border-b border-transparent hover:border-amber-500 pb-1">www.lemonde-enbouteille.be</a>
        </div>

        {/* PANNEAU ADMIN */}
        {showAdmin && (
          <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6" onClick={() => setShowAdmin(false)}>
            <div className="max-w-sm w-full bg-[#111] border border-white/10 p-10 text-center shadow-2xl" onClick={e => e.stopPropagation()}>
               <div className="text-[10px] font-mono tracking-[0.3em] text-amber-600 mb-10 uppercase">Admin Data</div>
               <div className="space-y-4 text-left">
                  <div className="flex justify-between"><span className="text-xs text-neutral-500">Visiteurs</span><span className="text-white font-mono">{stats.visits}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-neutral-500">Step 7</span><span className="text-white font-mono">{stats.finalStep}</span></div>
                  <div className="flex justify-between"><span className="text-xs text-neutral-500">Leads</span><span className="text-amber-500 font-mono">{stats.leads}</span></div>
                  <div className="border-t border-white/10 my-4 pt-4">
                      <div className="flex justify-between"><span className="text-xs text-neutral-500">Casino</span><span className="text-white font-mono">{stats.choices?.casino}</span></div>
                      <div className="flex justify-between"><span className="text-xs text-neutral-500">World</span><span className="text-white font-mono">{stats.choices?.world}</span></div>
                  </div>
               </div>
               <button onClick={() => setShowAdmin(false)} className="w-full mt-8 py-3 bg-white text-black font-mono text-xs uppercase hover:bg-neutral-200">Fermer</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-[100dvh] w-full bg-[#080808] text-white overflow-hidden flex flex-col md:flex-row">
      
      {/* --------------------
          PDF MANIFESTE LUXURY (PRINT) - VERSION IMMERSIVE ULTIME
          -------------------- */}
      <div className="hidden print:block fixed inset-0 z-[9999] bg-white text-black p-0 m-0 w-full h-full overflow-hidden">
         <div className="w-[210mm] h-[297mm] relative flex flex-col justify-between">
             
             {/* HEADER AVEC ESPACE IMMERSIF */}
             <div className="px-[20mm] pt-[20mm]">
                 <div className="flex justify-between items-start border-b-[2px] border-black pb-8">
                     <div>
                         <h1 className="text-7xl font-serif tracking-tighter text-black mb-2">L'IMMERSIVE</h1>
                         <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-500">Le Monde en Bouteille — Namur</p>
                     </div>
                     <div className="text-right flex flex-col items-end pt-4">
                        <div className="font-mono text-[9px] uppercase tracking-[0.2em] mb-1 bg-black text-white px-2 py-1">Document Officiel</div>
                        <div className="font-mono text-xs text-neutral-600">REF-{new Date().getFullYear()}-{(new Date().getMonth()+1).toString().padStart(2,'0')}{new Date().getDate().toString().padStart(2,'0')}</div>
                     </div>
                 </div>
             </div>

             {/* CORPS PRINCIPAL : NARRATIF & TECHNIQUE */}
             <div className="flex-1 flex px-[20mm] py-16 gap-16">
                 
                 {/* COLONNE GAUCHE : L'HISTOIRE */}
                 <div className="w-[55%] flex flex-col pr-8 border-r border-black/10">
                     <div className="mb-20">
                         <div className="flex items-center gap-3 mb-8">
                             <div className="w-8 h-[1px] bg-amber-600"></div>
                             <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500">Bénéficiaire : {data.contact.name}</p>
                         </div>
                         <p className="font-serif text-5xl leading-[1.1] text-black italic">
                             "Une parenthèse hors du temps, où l'architecture de caractère rencontre l'art de recevoir."
                         </p>
                     </div>

                     <div className="mt-auto">
                         <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-6">Paramètres de l'événement</p>
                         <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                             <div>
                                 <span className="block font-serif text-2xl mb-1">{data.date}</span>
                                 <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Date Sélectionnée</span>
                             </div>
                             <div>
                                 <span className="block font-serif text-2xl mb-1">{data.timeSlot?.label}</span>
                                 <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Créneau</span>
                             </div>
                             <div>
                                 <span className="block font-serif text-2xl mb-1">{data.pax} Personnes</span>
                                 <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Audience</span>
                             </div>
                             <div>
                                 <span className="block font-serif text-2xl mb-1">{data.eventType?.title}</span>
                                 <span className="block font-mono text-[10px] text-neutral-500 uppercase tracking-wider">Format</span>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* COLONNE DROITE : LES DÉTAILS */}
                 <div className="w-[45%] flex flex-col space-y-16 pt-4">
                     <div>
                         <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-4">
                             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Atmosphère</p>
                             <div className="w-2 h-2 bg-black rounded-full"></div>
                         </div>
                         <p className="font-serif text-3xl mb-2">{data.format?.title}</p>
                         <p className="text-xs text-neutral-600 leading-relaxed font-light">{data.format?.desc}</p>
                     </div>

                     <div>
                         <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-4">
                             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Expérience</p>
                             <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                         </div>
                         <p className="font-serif text-3xl mb-2">{data.experience.title}</p>
                     </div>

                     <div>
                         <div className="flex items-center justify-between border-b border-black/10 pb-2 mb-4">
                             <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400">Inclusions & Services</p>
                             <Plus size={10} className="text-black"/>
                         </div>
                         <ul className="space-y-3">
                             {data.selectedServices.map(id => (
                                 <li key={id} className="flex items-baseline gap-3">
                                     <div className="w-1 h-1 bg-neutral-300 rounded-full"></div>
                                     <span className="font-mono text-[10px] uppercase tracking-widest text-black">{SERVICES.find(s => s.id === id)?.title}</span>
                                 </li>
                             ))}
                         </ul>
                     </div>
                 </div>
             </div>

             {/* PIED DE PAGE : TOTAL MASSIP (Black Block) */}
             <div className="w-full bg-[#050505] text-white px-[20mm] py-[15mm] flex justify-between items-center">
                 <div>
                     <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-500 mb-2">Investissement Global Estimé</p>
                     <p className="font-serif text-7xl leading-none">{totalAmount} € <span className="text-lg font-sans text-neutral-500 font-normal ml-2">TVAC</span></p>
                 </div>
                 
                 <div className="flex gap-12">
                     <div className="text-right">
                         <div className="w-48 h-16 border border-white/20 mb-3 bg-white/5"></div>
                         <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-neutral-500">Signature Client</p>
                     </div>
                     <div className="text-right">
                         <div className="w-48 h-16 border border-white/20 mb-3 flex items-center justify-center bg-white/5">
                             <span className="font-serif italic text-neutral-600 text-sm">L'Immersive</span>
                         </div>
                         <p className="font-mono text-[7px] uppercase tracking-[0.2em] text-neutral-500">Pour Accord</p>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      <div className="hidden md:flex flex-col justify-between w-20 border-r border-white/5 bg-[#0a0a0a] z-20 py-8 items-center h-full print:hidden">
        <div className="font-serif font-bold text-xl cursor-pointer text-amber-600" onClick={() => setStep(0)}>L.</div>
        <div className="flex flex-col gap-6 items-center">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <button key={s} disabled={step < s} onClick={() => setStep(s)} className={`text-[10px] font-mono transition-all ${step === s ? 'text-white font-bold scale-125' : 'text-neutral-700 hover:text-neutral-400'}`}>0{s}</button>
          ))}
        </div>
        <div className="text-[9px] text-neutral-700 rotate-180 writing-vertical tracking-widest uppercase">Namur</div>
      </div>

      <div className="flex-1 relative flex flex-col h-full overflow-hidden print:hidden">
        {step > 0 && <button onClick={goBack} className="absolute bottom-8 left-8 z-40 flex items-center gap-2 text-neutral-500 hover:text-white uppercase text-[10px] tracking-widest font-mono print:hidden"><ChevronLeft size={16}/> Retour</button>}
        <div className="absolute top-0 left-0 h-1 bg-amber-600 transition-all duration-1000 z-50 print:hidden" style={{ width: `${(step/7)*100}%` }}></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50 pointer-events-none">
           <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 md:px-6 md:py-3 flex flex-col items-end shadow-2xl pointer-events-auto">
             <div className="font-mono text-[8px] md:text-[10px] uppercase text-neutral-400 tracking-widest mb-1">Budget Estimé</div>
             <div className="font-serif text-lg md:text-2xl text-white tracking-tight flex items-baseline gap-2"><span className={isCustom ? "text-amber-500" : "text-white"}>{totalAmount} €</span>{isCustom && <span className="text-[8px] md:text-[10px] font-sans text-neutral-400 border border-neutral-600 px-1 rounded">+ Devis</span>}</div>
           </div>
        </div>

        {/* STEP 1: TEMPORALITE */}
        {step === 1 && (
          <div className="flex-1 flex flex-col h-full animate-fade-in duration-700 relative">
            <div className="absolute top-0 left-0 p-6 md:p-12 z-50 pointer-events-none bg-gradient-to-b from-black/80 to-transparent w-full">
               <div className="mt-16 md:mt-16 pointer-events-auto"><span className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2 block">01 — Temporalité</span><h2 className="text-3xl md:text-5xl font-serif text-white leading-none">Le Moment<br/>du Choix</h2></div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row h-full pt-32 md:pt-0 overflow-y-auto md:overflow-hidden">
              {TIME_SLOTS.map((slot) => (
                <div key={slot.id} onMouseEnter={() => setHoveredTime(slot.id)} onMouseLeave={() => setHoveredTime(null)} onClick={() => { setData({...data, timeSlot: slot}); autoNext(2); }} className={`relative w-full md:w-auto flex-shrink-0 md:flex-1 h-64 md:h-full border-b md:border-b-0 md:border-r border-white/5 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group overflow-hidden ${hoveredTime === slot.id ? 'md:flex-[1.5] lg:flex-[2]' : 'md:flex-1 opacity-100 md:opacity-80 md:hover:opacity-100'}`}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110 group-hover:scale-100" style={{ backgroundImage: `url(${slot.image})` }} />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 w-full p-4 md:p-6 bg-gradient-to-t from-black to-transparent z-20 flex flex-row md:flex-col justify-between md:justify-center items-center md:pb-12">
                     <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90 bg-black/40 px-3 py-1 rounded-full border border-white/10 mb-0 md:mb-2">{slot.label}</div>
                     <div className="text-amber-500 font-serif text-lg md:text-xl">{slot.price}€</div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 z-30">
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-amber-600/20 items-center justify-center text-amber-500 mb-4 backdrop-blur-md border border-amber-600/50 scale-0 group-hover:scale-100 transition-transform duration-500">{slot.icon}</div>
                    <h3 className="text-3xl md:text-3xl font-serif text-white mb-0 md:mb-2 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-black drop-shadow-lg">{slot.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: INTENTION */}
        {step === 2 && (
          <div className="flex-1 p-6 md:p-16 flex flex-col justify-center animate-fade-in-right duration-500 overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full">
               <div className="mb-6 md:mb-8 border-b border-white/10 pb-6 mt-16 md:mt-0"><span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2 block">02 — Intention</span><h2 className="text-3xl md:text-4xl font-serif text-white">L'Énergie du Moment</h2></div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                 {EVENT_TYPES.map((type) => (
                   <button key={type.id} onClick={() => { setData({...data, eventType: type}); autoNext(3); }} className="group relative h-96 w-full rounded-sm overflow-hidden border border-white/5 hover:border-amber-600/50 transition-all duration-300 text-left">
                     <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-80" style={{ backgroundImage: `url(${type.image})` }} />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                     <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{type.title}</h3>
                        <div className="text-amber-500 text-[10px] md:text-xs font-mono uppercase tracking-wider mb-2 opacity-80 group-hover:opacity-100">{type.subtitle}</div>
                        <p className="text-xs text-neutral-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">{type.desc}</p>
                     </div>
                   </button>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* STEP 3: ARCHITECTURE */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-center p-6 md:p-16 animate-fade-in-right duration-500 overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full flex flex-col h-full justify-center">
               <div className="mb-6 md:mb-8 border-b border-white/10 pb-6 mt-16 md:mt-0"><span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2 block">03 — Architecture</span><h2 className="text-3xl md:text-4xl font-serif text-white">Configuration de l'Espace</h2></div>
               <div className="flex flex-col gap-4 md:gap-6">
                  {FORMATS.map((f) => (
                    <button key={f.id} onClick={() => { setData({...data, format: f}); autoNext(4); }} className="group relative flex-1 min-h-[160px] border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 flex items-center overflow-hidden hover:border-amber-600/30">
                       <div className="w-1/3 h-full relative overflow-hidden"><div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:grayscale-0" style={{ backgroundImage: `url(${f.image})` }} /></div>
                       <div className="flex-1 p-8 text-left flex items-center justify-between">
                          <div><h3 className="text-3xl font-serif text-white mb-2 group-hover:text-amber-500 transition-colors">{f.title}</h3><p className="text-xs text-neutral-400 font-light leading-relaxed max-w-md">{f.desc}</p></div>
                          <ArrowRight size={24} className="text-white/20 group-hover:text-amber-600 transition-colors transform group-hover:translate-x-2 duration-300 ml-8"/>
                       </div>
                    </button>
                  ))}
               </div>
             </div>
          </div>
        )}

        {/* STEP 4: CALIBRAGE */}
        {step === 4 && (
          <div className="flex-1 flex flex-col animate-fade-in-right duration-500 justify-center overflow-y-auto">
             <div className="max-w-4xl mx-auto w-full p-6 md:p-8 mt-16 md:mt-0">
                <div className="text-center mb-10 md:mb-16"><span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-4 block">04 — Calibrage</span><h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">L'Horizon</h3><p className="text-neutral-500 max-w-md mx-auto text-sm">Combien d'invités pour ce moment ?</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div className="flex flex-col items-center gap-6 p-8 border border-white/10 bg-white/[0.02]">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Volume Invités</span>
                        <div className="flex items-center gap-6 md:gap-8">
                           <button onClick={() => setData({...data, pax: Math.max(1, data.pax-1)})} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Minus size={18}/></button>
                           <span className="text-6xl font-serif text-white w-24 text-center">{data.pax}</span>
                           <button onClick={() => setData({...data, pax: Math.min(50, data.pax+1)})} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Plus size={18}/></button>
                        </div>
                   </div>
                   <div className="flex flex-col items-center gap-6 p-8 border border-white/10 bg-white/[0.02] relative">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">{isMultiDay ? 'Dates (Début - Fin)' : 'Date Cible'}</span>
                        <div className="w-full flex flex-col gap-4">
                          <input type="date" min={new Date().toISOString().split('T')[0]} onChange={(e) => setData({...data, date: e.target.value})} className="bg-transparent text-2xl font-serif text-white w-full outline-none border-b border-white/10 pb-4 text-center uppercase [color-scheme:dark]" />
                          {isMultiDay && (<input type="date" min={data.date || new Date().toISOString().split('T')[0]} onChange={(e) => setData({...data, endDate: e.target.value})} className="bg-transparent text-2xl font-serif text-amber-500 w-full outline-none border-b border-white/10 pb-4 text-center uppercase [color-scheme:dark] animate-fade-in-up" />)}
                        </div>
                        <div className="absolute bottom-2 right-2"><button onClick={() => setIsMultiDay(!isMultiDay)} className={`text-[10px] uppercase tracking-widest px-2 py-1 border transition-colors ${isMultiDay ? 'bg-amber-600 border-amber-600 text-white' : 'border-white/20 text-neutral-500 hover:border-white'}`}>{isMultiDay ? '- 1 jour' : '+ Jours'}</button></div>
                   </div>
                </div>
                <div className="mt-12 md:mt-16 text-center pb-20"><button onClick={() => goToStep(5)} className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 md:px-12 md:py-4 hover:bg-amber-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest shadow-lg rounded-sm w-full md:w-auto justify-center">Valider le Calibrage <ArrowRight size={14}/></button></div>
             </div>
          </div>
        )}

        {/* STEP 5: IMMERSION */}
        {step === 5 && (
          <div className="flex-1 flex flex-col animate-fade-in-right duration-500 overflow-y-auto scrollbar-hide">
             <div className="max-w-6xl mx-auto w-full p-6 md:p-16 mt-16 md:mt-0">
                <div className="mb-8 md:mb-10"><span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-4 block">05 — Immersion</span><h3 className="text-3xl md:text-4xl font-serif mb-2">Niveau d'Expérience</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                   <button onClick={() => { setIsDryHire(true); setData({...data, experience: EXPERIENCES[0]}); }} className={`p-6 md:p-8 border text-left transition-all duration-300 group ${isDryHire ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30 bg-[#0a0a0a]'}`}>
                      <LayoutTemplate size={28} className={`mb-4 ${isDryHire ? 'text-black' : 'text-neutral-500'}`} /><h4 className="text-xl md:text-2xl font-serif mb-2">Location Sèche</h4><p className={`text-xs md:text-sm ${isDryHire ? 'text-neutral-700' : 'text-neutral-400'}`}>Mise à disposition de l'espace uniquement.</p>
                   </button>
                   <button onClick={() => { setIsDryHire(false); setData({...data, experience: EXPERIENCES[1]}); }} className={`p-6 md:p-8 border text-left transition-all duration-300 group ${!isDryHire ? 'border-amber-600 bg-amber-600 text-white' : 'border-white/10 hover:border-amber-600/50 bg-[#0a0a0a]'}`}>
                      <div className="flex items-center gap-3 mb-2"><Sparkles size={20} className={!isDryHire ? 'text-white' : 'text-amber-500'} /><h4 className="text-xl md:text-2xl font-serif">Expérience Immersive</h4></div><p className={`text-xs md:text-sm ${!isDryHire ? 'text-white/90' : 'text-neutral-400'}`}>Une animation sensorielle incluse (Vin, Casino, Gastronomie).</p>
                   </button>
                </div>
                {!isDryHire && (
                  <div className="animate-fade-in-up pb-20 md:pb-0">
                     <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Sélectionnez l'expérience</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {EXPERIENCES.filter(e => e.id !== 'none').map((exp) => (
                           <div key={exp.id} onClick={() => { setData({...data, experience: exp}); trackExperienceChoice(exp.id); }} className={`relative h-64 md:h-80 border cursor-pointer transition-all duration-300 group overflow-hidden ${data.experience.id === exp.id ? 'border-amber-600 shadow-[0_0_30px_-10px_rgba(217,119,6,0.3)]' : 'border-white/10 hover:border-white/30'}`}>
                              <div className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${data.experience.id === exp.id ? 'opacity-30 scale-105' : 'opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-30'}`} style={{ backgroundImage: `url(${exp.image})` }} />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                 <div className="text-[10px] font-mono text-amber-500 uppercase tracking-widest mb-2">{exp.sub}</div>
                                 <div className={`text-2xl font-serif leading-tight mb-3 ${data.experience.id === exp.id ? 'text-white' : 'text-neutral-200'}`}>{exp.title}</div>
                                 {exp.description && (<p className="text-xs text-neutral-400 leading-relaxed mb-4 opacity-80 max-w-[90%]">{exp.description}</p>)}
                                 <div className={`text-lg font-mono ${data.experience.id === exp.id ? 'text-amber-500' : 'text-white'}`}>{exp.price > 0 ? `${exp.price}€` : 'Sur Devis'}</div>
                              </div>
                              {data.experience.id === exp.id && (<div className="absolute top-4 right-4 bg-amber-600 text-white p-1 rounded-full animate-in zoom-in duration-300"><Check size={14}/></div>)}
                           </div>
                        ))}
                     </div>
                  </div>
                )}
                <div className="mt-12 flex justify-end pb-24 md:pb-0"><button onClick={() => goToStep(6)} className="flex items-center justify-center gap-3 bg-white text-black px-10 py-4 hover:bg-amber-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest shadow-lg w-full md:w-auto">Valider <ArrowRight size={14}/></button></div>
             </div>
          </div>
        )}

        {/* STEP 6: SERVICES & FINITIONS */}
        {step === 6 && (
          <div className="flex-1 p-6 md:p-16 overflow-y-auto scrollbar-hide animate-fade-in-right duration-500">
             <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6 mt-16 md:mt-0"><div><span className="text-amber-600 font-mono text-xs uppercase tracking-widest">06 — Services & Exclusivités</span><h2 className="text-3xl md:text-4xl font-serif text-white mt-2">Finitions</h2></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-24 md:pb-12">
                   {SERVICES.map(srv => {
                     const isSelected = data.selectedServices.includes(srv.id);
                     let priceDisplay = ''; let subDisplay = '';
                     if (srv.id === 'softs') { priceDisplay = `+${getSoftsPrice(data.pax)}€`; subDisplay = '(Forfait Total)'; } else if (srv.price === 0) { priceDisplay = 'OFFERT'; } else if (srv.price === -1) { priceDisplay = 'SUR DEVIS'; } else { priceDisplay = `+${srv.price}€`; if (srv.isPerHead) subDisplay = '/Pers'; }
                     return (
                       <button key={srv.id} onClick={() => toggleService(srv.id)} className={`relative p-6 border transition-all duration-300 text-left hover:bg-white/5 ${isSelected ? 'border-amber-600 bg-white/5' : 'border-white/10'}`}>
                         <div className="flex justify-between items-start mb-4"><div className={`p-2 rounded-full ${isSelected ? 'bg-amber-600 text-white' : 'bg-white/10 text-neutral-400'}`}>{srv.icon}</div>{isSelected && <Check size={16} className="text-amber-600"/>}</div>
                         <h4 className={`text-lg font-serif mb-2 ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{srv.title}</h4>
                         <p className="text-xs text-neutral-500 mb-4 h-8">{srv.desc}</p>
                         <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                            {srv.fakePrice && <span className="text-xs text-neutral-600 line-through decoration-amber-600/50">{srv.fakePrice}€</span>}
                            <span className={`font-mono text-sm ${srv.fakePrice ? 'text-white' : 'text-amber-500'}`}>{priceDisplay}</span>
                            {subDisplay && <span className="text-[10px] text-neutral-600 uppercase">{subDisplay}</span>}
                         </div>
                       </button>
                     );
                   })}
                </div>
                <div className="flex justify-end pb-24 md:pb-0"><button onClick={() => goToStep(7)} className="bg-white text-black px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl w-full md:w-auto">Générer la vision</button></div>
             </div>
          </div>
        )}

        {/* ÉTAPE 7 : FINAL */}
        {step === 7 && (
          <div className="flex-1 flex items-center justify-center p-0 md:p-6 animate-in zoom-in-95 duration-700 relative overflow-hidden h-full">
             <div className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110" style={{ backgroundImage: `url(${data.timeSlot?.image})` }}></div>
             <div className="w-full max-w-5xl flex flex-col md:flex-row bg-[#0a0a0a]/95 md:bg-[#0a0a0a]/90 border-0 md:border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 rounded-none md:rounded-sm overflow-hidden h-full md:h-[85vh]">
                <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col relative overflow-y-auto scrollbar-hide pt-20 md:pt-10 max-h-[50vh] md:max-h-full">
                   <div className="absolute top-0 right-0 p-6 opacity-30"><Sparkles className="text-amber-600 w-12 h-12" /></div>
                   <div className="flex-1">
                      <div className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-4 md:mb-6">Récapitulatif Détaillé</div>
                      <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">{data.eventType?.title}</h2>
                      <div className="text-neutral-400 font-mono text-xs mb-8 flex items-center gap-4"><span>{data.date}{data.endDate ? ` — ${data.endDate}` : ''}</span><span className="w-1 h-1 bg-neutral-600 rounded-full"></span><span>{data.pax} Invités</span></div>
                      <div className="space-y-4 text-xs md:text-sm border-t border-white/10 pt-6">
                        <div className="flex justify-between items-center group"><div><div className="text-white font-medium">Location — {data.timeSlot?.title}</div><div className="text-xs text-neutral-500">{data.timeSlot?.label}</div></div><div className="font-mono text-neutral-300">{data.timeSlot?.price} €</div></div>
                        {!isDryHire && data.experience && (<div className="flex justify-between items-center group"><div><div className="text-white font-medium">{data.experience.title}</div><div className="text-[10px] md:text-xs text-neutral-500">{data.experience.price > 0 ? `${data.experience.price}€ x ${data.pax} invités` : 'Inclus'}</div></div><div className="font-mono text-neutral-300">{data.experience.price === -1 ? 'Devis' : `${data.experience.price * data.pax} €`}</div></div>)}
                        {data.selectedServices.length > 0 && (<div className="pt-4 mt-4 border-t border-white/5 space-y-4">{data.selectedServices.map(id => { const srv = SERVICES.find(s => s.id === id); let priceStr = ''; let calcDetail = ''; if (srv.id === 'softs') { priceStr = `${getSoftsPrice(data.pax)} €`; calcDetail = 'Forfait Global'; } else if (srv.price === -1) { priceStr = 'Devis'; } else if (srv.price === 0) { priceStr = 'Offert'; } else { priceStr = srv.isPerHead ? `${srv.price * data.pax} €` : `${srv.price} €`; if (srv.isPerHead) calcDetail = `${srv.price}€ x ${data.pax}`; } return (<div key={id} className="flex justify-between items-center"><div><div className="text-white font-medium">{srv.title}</div>{calcDetail && <div className="text-[10px] text-neutral-500">{calcDetail}</div>}</div><div className="font-mono text-neutral-300">{priceStr}</div></div>); })}</div>)}
                      </div>
                   </div>
                   <div className="pt-8 mt-12 border-t border-white/10 text-center pb-8 md:pb-0">
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Total Estimé TVAC</div>
                      <div className="flex items-baseline justify-center gap-3"><span className="text-4xl md:text-5xl font-serif text-amber-500">{totalAmount} €</span>{isCustom && <span className="text-sm font-sans text-neutral-400 border border-neutral-600 px-2 py-0.5 rounded">+ Devis</span>}</div>
                      <button onClick={() => window.print()} className="mt-6 flex items-center justify-center gap-2 w-full text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"><FileText size={12} /> Télécharger la Note d'Intention</button>
                   </div>
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-black/40 relative overflow-y-auto">
                   <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Finaliser l'Accord</h3>
                   <p className="text-xs text-neutral-500 mb-8 font-mono">Ceci est une pré-réservation. Aucun paiement immédiat.</p>
                   <form className="space-y-4 md:space-y-6 pb-20 md:pb-0" onSubmit={handleSubmit}>
                      <div className="group relative"><input type="text" required placeholder="NOM / ENTREPRISE" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} /></div>
                      <div className="group relative"><input type="email" required placeholder="EMAIL PROFESSIONNEL" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm" onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} /></div>
                      <div className="group relative"><input type="tel" required placeholder="TÉLÉPHONE" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm" onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} /></div>
                      <div className="group relative"><textarea rows="3" placeholder="MESSAGE (Allergies, horaires...)" className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm resize-none" onChange={e => setData({...data, contact: {...data.contact, message: e.target.value}})} ></textarea></div>
                      
                      {/* CHECKBOX GDPR */}
                      <div className="flex items-start gap-3 mt-6 mb-8 group cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
                          <div className={`w-4 h-4 min-w-[16px] border transition-all duration-300 flex items-center justify-center ${isAgreed ? 'border-amber-600 bg-amber-600' : 'border-white/20 group-hover:border-white/50'}`}>
                              {isAgreed && <Check size={10} className="text-white" />}
                          </div>
                          <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider leading-relaxed select-none">
                              J'accepte que mes données soient traitées pour cette demande. <br/>
                              <span className="opacity-50">(Ceci n'est pas un engagement contractuel ferme).</span>
                          </p>
                      </div>

                       <button type="submit" disabled={isSending} className="mt-8 mb-20 md:mb-0 w-full bg-white text-black py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                          {isSending ? (<><Loader className="animate-spin" size={16} /> Envoi en cours...</>) : (<><Send size={16} /> Envoyer la demande</>)}
                       </button>
                   </form>
                </div>
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
            body * { visibility: hidden; background: white !important; color: black !important; }
            .print\\:block, .print\\:block * { visibility: visible; }
            .print\\:block { position: absolute; left: 0; top: 0; width: 100%; height: auto; padding: 0; margin: 0; }
            .print\\:hidden { display: none !important; }
            @page { size: A4; margin: 0; }
        }
      `}} />
    </div>
  );
}