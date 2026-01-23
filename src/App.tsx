import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, Check, Clock, Calendar, Users, Briefcase, Wine, Coffee, Music, Monitor, Minus, Plus, Sparkles, Sun, Moon, Sunrise, Star, Utensils, Wifi, Gift, Palette, LayoutTemplate, Droplets, Map, Mail, Loader, Send } from 'lucide-react';

// --- CONFIGURATION EMAIL FINALE ---
const EMAILJS_SERVICE_ID = "service_z8iw21s"; 
const EMAILJS_TEMPLATE_ADMIN_ID = "template_3i47cv7"; // Demande de projet
const EMAILJS_TEMPLATE_CLIENT_ID = "template_2keg8go"; // Accusé réception
const EMAILJS_PUBLIC_KEY = "s1sthtiZPEDfGRote"; 

// --- DATA ---

const TIME_SLOTS = [
  {
    id: 'matin',
    label: '06H — 12H',
    title: 'Matinée',
    icon: <Sunrise size={24} />,
    price: 150,
    image: 'https://www.lemonde-enbouteille.be/web/image/16055-76e0b5e2/105-DSC09413.webp'
  },
  {
    id: 'aprem',
    label: '12H — 18H',
    title: 'Après-midi',
    icon: <Sun size={24} />,
    price: 200,
    image: 'https://www.lemonde-enbouteille.be/web/image/16058-be08a656/86-DSC09383.webp'
  },
  {
    id: 'soiree',
    label: '18H — 02H',
    title: 'Soirée',
    icon: <Moon size={24} />,
    price: 300,
    image: 'https://www.lemonde-enbouteille.be/web/image/16057-9de877a5/83-DSC09379.webp'
  },
  {
    id: '24h',
    label: '24 HEURES',
    title: 'Totale',
    icon: <Star size={24} />,
    price: 550,
    image: 'https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp'
  }
];

const EVENT_TYPES = [
  {
    id: 'teambuilding',
    title: 'Team Building',
    subtitle: 'Cohésion',
    desc: 'Ressouder les liens.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'seminaire',
    title: 'Séminaire/Conférence',
    subtitle: 'Stratégie',
    desc: 'Décisions clés.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'afterwork',
    title: 'Afterwork',
    subtitle: 'Réseau',
    desc: 'Décompression.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?q=80&w=2874&auto=format&fit=crop'
  },
  {
    id: 'prive',
    title: 'Privé',
    subtitle: 'Exception',
    desc: 'Moments rares.',
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?q=80&w=2944&auto=format&fit=crop'
  }
];

const FORMATS = [
  {
    id: 'standard',
    title: 'L\'Immersive',
    subtitle: 'Standard',
    desc: 'Notre disposition signature. Équilibrée & chaleureuse.',
    setupFee: 0,
    image: 'https://www.lemonde-enbouteille.be/web/image/26778-34e20e4e/94-DSC09399.svg'
  },
  {
    id: 'cocktail',
    title: 'Cocktail',
    subtitle: 'Debout',
    desc: 'Espace libéré. Mange-debout & circulation fluide.',
    setupFee: 0,
    image: 'https://www.lemonde-enbouteille.be/web/image/26780-69c7e9bf/58-DSC00974.webp'
  },
  {
    id: 'hybride',
    title: 'Hybride',
    subtitle: 'Mixte',
    desc: 'Zone de confort assises et zone de flux debout.',
    setupFee: 0,
    image: 'https://www.lemonde-enbouteille.be/web/image/26778-34e20e4e/94-DSC09399.svg'
  }
];

const EXPERIENCES = [
  { 
    id: 'none', 
    title: 'Location Sèche', 
    price: 0, 
    sub: 'L\'espace nu',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop'
  },
  { 
    id: 'world', 
    title: 'Tour du Monde', 
    price: 40, 
    sub: 'Dégustation 5 vins',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2940&auto=format&fit=crop'
  },
  { 
    id: 'casino', 
    title: 'Casino du Vin', 
    price: 46, 
    sub: 'Animation Ludique',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=2940&auto=format&fit=crop'
  },
  { 
    id: 'gastro', 
    title: 'Mets & Vins', 
    price: -1, // Sur Devis
    sub: 'Instant Gourmand',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop'
  }
];

const SERVICES = [
  { 
    id: 'tech', 
    title: 'Pack Tech & Connectivité', 
    price: 0, 
    fakePrice: 100, 
    icon: <Wifi size={20}/>, 
    desc: 'Écrans, Son, Wifi HD.',
    category: 'tech'
  },
  { 
    id: 'host', 
    title: 'Maître de Maison / Animation', 
    price: 150, 
    icon: <Users size={20}/>, 
    desc: 'Service, gestion et animation.',
    category: 'staff'
  },
  { 
    id: 'branding', 
    title: 'Corporate Branding', 
    price: 40, 
    icon: <Monitor size={20}/>, 
    desc: 'Votre logo, marque d'identité et mise en avant',
    category: 'tech'
  },
  { 
    id: 'softs', 
    title: 'Forfait Softs', 
    price: 'dynamic', 
    icon: <Droplets size={20}/>, 
    desc: 'Eaux et softs à discrétion.',
    category: 'food'
  },
  { 
    id: 'food_light', 
    title: 'Restauration : Grignotage', 
    price: 25, 
    isPerHead: true, 
    icon: <Utensils size={20}/>, 
    desc: 'Planches fromages/charcuteries.',
    category: 'food'
  },
  { 
    id: 'food_full', 
    title: 'Restauration : Repas', 
    price: -1, 
    isPerHead: true, 
    icon: <Utensils size={20}/>, 
    desc: 'Préparation culianire sur-mesure (Tapas, Menu 2-3-4 Services ou Cuisine conviviale).',
    category: 'food'
  },
  { 
    id: 'deco', 
    title: 'Décoration Sur-Mesure', 
    price: 100, 
    icon: <Palette size={20}/>, 
    desc: 'Création d\'une ambiance à l'image de votre évènement',
    category: 'deco'
  },
  { 
    id: 'gift', 
    title: 'Coffret Souvenir', 
    price: 15, 
    isPerHead: true, 
    icon: <Gift size={20}/>, 
    desc: 'Laissez une trace de votre évènement pour vos invités.',
    category: 'gift'
  }
];

// --- UI COMPONENTS ---

const ProgressBar = ({ current, total }) => (
  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-amber-700 to-amber-500 transition-all duration-700 ease-out z-50" style={{ width: `${(current / total) * 100}%` }} />
);

const BackButton = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute bottom-8 left-6 md:left-8 z-40 flex items-center gap-2 text-neutral-500 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-mono group mix-blend-difference bg-black/20 p-2 rounded backdrop-blur-sm md:bg-transparent md:p-0"
  >
    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
    Retour
  </button>
);

const StepIndicator = ({ step, setStep }) => (
  <div className="hidden md:flex flex-col justify-between w-20 border-r border-white/5 bg-[#0a0a0a] z-20 py-8 items-center h-full">
    <div className="font-serif font-bold text-xl cursor-pointer text-amber-600 hover:scale-110 transition-transform" onClick={() => setStep(0)}>L.</div>
    <div className="flex flex-col gap-6 items-center w-full">
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <button 
          key={s}
          disabled={step < s}
          onClick={() => setStep(s)}
          className={`relative w-full text-center py-2 text-[10px] font-mono transition-all duration-300 group ${
            step === s ? 'text-white font-bold' : 
            step > s ? 'text-neutral-500 hover:text-white cursor-pointer' : 'text-neutral-800 cursor-not-allowed'
          }`}
        >
          {step === s && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-amber-600 rounded-r-full"></div>}
          0{s}
        </button>
      ))}
    </div>
    <div className="text-[10px] text-neutral-700 writing-vertical rotate-180 tracking-widest">LE MONDE EN BOUTEILLE</div>
  </div>
);

// Mobile Step Indicator
const MobileStepIndicator = ({ step }) => (
  <div className="md:hidden absolute top-4 left-4 z-40 flex items-center gap-2">
      <div className="text-amber-600 font-serif font-bold text-lg">L.</div>
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-l border-white/20 pl-2">
         {step === 0 ? 'Accueil' : `Étape 0${step}/07`}
      </div>
  </div>
);

export default function App() {
  const [step, setStep] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredTime, setHoveredTime] = useState(null);
  
  const [isDryHire, setIsDryHire] = useState(true); 
  const [data, setData] = useState({
    timeSlot: null,
    eventType: null,
    format: null,
    pax: 10,
    date: '',
    experience: EXPERIENCES[0],
    selectedServices: ['tech'],
    contact: { name: '', email: '', phone: '', message: '' }
  });

  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!isDryHire && data.experience.id !== 'none') {
        if (!data.selectedServices.includes('host')) {
            setData(prev => ({...prev, selectedServices: [...prev.selectedServices, 'host']}));
        }
    }
  }, [data.experience, isDryHire]);

  const getSoftsPrice = (pax) => {
    if (pax <= 8) return 20;
    if (pax <= 16) return 30;
    if (pax <= 30) return 40;
    return 45;
  };

  const calculateTotal = () => {
    let total = 0;
    let custom = false;

    if (data.timeSlot) total += data.timeSlot.price;
    if (data.format) total += data.format.setupFee;
    
    if (!isDryHire && data.experience) {
        if (data.experience.price === -1) {
            custom = true;
        } else {
            total += data.experience.price * data.pax;
        }
    }
    
    data.selectedServices.forEach(srvId => {
      const srv = SERVICES.find(s => s.id === srvId);
      if (srv) {
          if (srv.id === 'softs') {
              total += getSoftsPrice(data.pax);
          } else if (srv.price === -1) {
              custom = true;
          } else {
              total += srv.isPerHead ? (srv.price * data.pax) : srv.price;
          }
      }
    });

    return { total: total, custom };
  };

  const { total: totalAmount, custom: isCustom } = calculateTotal();

  const toggleService = (id) => {
    const current = data.selectedServices;
    let newServices = [...current];

    if (id === 'food_light' && current.includes('food_full')) {
        newServices = newServices.filter(x => x !== 'food_full');
    }
    if (id === 'food_full' && current.includes('food_light')) {
        newServices = newServices.filter(x => x !== 'food_light');
    }

    if (newServices.includes(id)) {
        newServices = newServices.filter(x => x !== id);
    } else {
        newServices.push(id);
    }
    setData({...data, selectedServices: newServices});
  };

  const goToStep = (target) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStep(target);
    setTimeout(() => setIsAnimating(false), 800);
  };

  const autoNext = (target) => {
      goToStep(target);
  };

  const goBack = () => {
    if (step > 0) goToStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.contact.email || !data.contact.name || !data.contact.phone) {
        alert("Merci de compléter vos coordonnées pour valider la demande.");
        return;
    }

    setIsSending(true);

    const templateParams = {
        name: data.contact.name,
        email: data.contact.email,
        phone: data.contact.phone,
        message: data.contact.message,
        date: data.date || "À définir",
        pax: data.pax,
        type: data.eventType?.title || "Non défini",
        time_slot: data.timeSlot?.title || "Non défini",
        format: data.format?.title || "Non défini",
        experience: isDryHire ? "Location Sèche" : data.experience?.title,
        services: data.selectedServices.map(id => SERVICES.find(s => s.id === id)?.title).join(', '),
        total: totalAmount,
        is_custom: isCustom ? "OUI (Devis requis)" : "NON"
    };

    // --- ENVOI VIA CDN (window.emailjs) ---
    // @ts-ignore
    const sendAdmin = window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN_ID, templateParams, EMAILJS_PUBLIC_KEY);
    // @ts-ignore
    const sendClient = window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENT_ID, templateParams, EMAILJS_PUBLIC_KEY);

    Promise.all([sendAdmin, sendClient])
      .then(() => {
          setIsSending(false);
          setIsSent(true);
      })
      .catch((error) => {
          console.error("Erreur d'envoi", error);
          setIsSending(false);
          alert("Une erreur est survenue lors de l'envoi. Vérifiez votre connexion.");
      });
  };

  if (isSent) {
    return (
      <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-6 text-white">
           {/* 1. FOND TEXTURÉ (Rappel de l'accueil) */}
           <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center blur-sm mix-blend-overlay"></div>

           {/* 2. CARTE "LUXE" CENTRALE */}
           <div className="relative z-10 max-w-xl w-full bg-black/40 backdrop-blur-xl border border-white/10 p-12 md:p-16 flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-700">
              
              {/* Icône animée */}
              <div className="mb-8 relative">
                 <div className="absolute inset-0 bg-amber-600 blur-xl opacity-20 animate-pulse"></div>
                 <div className="w-20 h-20 rounded-full border border-amber-600/50 flex items-center justify-center bg-black/50 relative z-10">
                    <Check size={32} className="text-amber-500" />
                 </div>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-600 mb-4">Confirmation</div>
              
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400">
                Demande Transmise
              </h2>

              <div className="w-12 h-px bg-white/20 mb-8"></div>

              <p className="font-light text-neutral-300 leading-relaxed text-sm mb-10">
                Merci <span className="text-white font-medium">{data.contact.name}</span>. <br/>
                Votre vision a été capturée. Une confirmation vient d'être envoyée à votre adresse email.
                <br/><br/>
                <span className="text-xs font-mono text-neutral-500">Nous reviendrons vers vous sous 24h avec une proposition chiffrée.</span>
              </p>

              <button 
                onClick={() => window.location.reload()} 
                className="group relative px-8 py-4 bg-white/5 border border-white/10 hover:border-amber-600/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-amber-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
                <span className="relative font-mono text-[10px] uppercase tracking-[0.2em] text-white group-hover:text-amber-500 transition-colors">
                  Retour à l'accueil
                </span>
              </button>
           </div>
      </div>
    )
}

  if (step === 0) {
    return (
      <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex flex-col items-center justify-center p-6 md:p-8 text-white">
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.lemonde-enbouteille.be/web/image/16056-b2829e5f/79-DSC09373.webp')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="relative z-10 text-center space-y-8 md:space-y-12 animate-in fade-in zoom-in duration-1000 max-w-4xl mx-auto w-full">
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-amber-600 to-transparent mx-auto"></div>
          
          <div>
            <img 
              src="https://www.lemonde-enbouteille.be/web/image/26768-edef09a5/LOGO%20l%27immersive-24.png" 
              alt="Logo L'Immersive" 
              className="w-32 md:w-48 mx-auto mb-6 opacity-90 drop-shadow-2xl" 
            />
            
            <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-serif tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 leading-none mb-4">
              L'IMMERSIVE
            </h1>
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] text-amber-500">
              Le Monde en Bouteille
            </p>
          </div>

          <div className="border-l border-amber-600/30 pl-6 md:pl-8 text-left max-w-lg mx-auto backdrop-blur-sm py-4">
             <p className="text-neutral-400 font-light leading-relaxed text-xs md:text-sm">
               Une adresse confidentielle à Namur. 
               Ici, la technologie sublime le terroir pour des événements qui marquent.
               Ne louez pas une salle, vivez une expérience.
             </p>
          </div>

          <button 
            onClick={() => goToStep(1)}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-white/5 border border-white/10 hover:border-amber-600/50 transition-all duration-500 w-full md:w-auto"
          >
            <div className="absolute inset-0 bg-amber-600/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out"></div>
            <span className="relative font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 text-white group-hover:text-amber-500 transition-colors">
              Commençons l'expérience <ArrowRight size={14} />
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-[#080808] text-white overflow-hidden font-sans flex flex-col md:flex-row">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <ProgressBar current={step} total={7} />
      <StepIndicator step={step} setStep={goToStep} />
      <MobileStepIndicator step={step} />

      <div className="flex-1 relative flex flex-col z-10 w-full h-full">
        
        {/* HEADER BUDGET */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
           <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg px-4 py-2 md:px-6 md:py-3 flex flex-col items-end shadow-2xl">
             <div className="font-mono text-[8px] md:text-[10px] uppercase text-neutral-400 tracking-widest mb-1">Budget Estimé</div>
             <div className="font-serif text-lg md:text-2xl text-white tracking-tight flex items-baseline gap-2">
                <span className={isCustom ? "text-amber-500" : "text-white"}>{totalAmount} €</span>
                {isCustom && <span className="text-[8px] md:text-[10px] font-sans text-neutral-400 border border-neutral-600 px-1 rounded">+ Devis</span>}
             </div>
           </div>
        </div>

        {step > 1 && <BackButton onClick={goBack} />}

        {/* ÉTAPE 1 : TEMPORALITÉ */}
        {step === 1 && (
          <div className="flex-1 flex flex-col h-full animate-in fade-in duration-700 relative">
            <div className="absolute top-0 left-0 p-6 md:p-12 z-50 pointer-events-none bg-gradient-to-b from-black/80 to-transparent w-full">
               <BackButton onClick={() => goToStep(0)} />
               <div className="mt-16 md:mt-16 pointer-events-auto">
                 <span className="text-amber-500 font-mono text-xs uppercase tracking-widest mb-2 block">01 — Temporalité</span>
                 <h2 className="text-3xl md:text-5xl font-serif text-white leading-none">Le Moment<br/>du Choix</h2>
               </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row h-full pt-32 md:pt-0 overflow-y-auto md:overflow-hidden">
              {TIME_SLOTS.map((slot) => (
                <div 
                  key={slot.id}
                  onMouseEnter={() => setHoveredTime(slot.id)}
                  onMouseLeave={() => setHoveredTime(null)}
                  onClick={() => { setData({...data, timeSlot: slot}); autoNext(2); }}
                  className={`relative w-full md:w-auto flex-shrink-0 md:flex-1 h-64 md:h-full border-b md:border-b-0 md:border-r border-white/5 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group overflow-hidden ${
                    hoveredTime === slot.id ? 'md:flex-[1.5] lg:flex-[2]' : 'md:flex-1 opacity-100 md:opacity-80 md:hover:opacity-100'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-110 group-hover:scale-100"
                    style={{ backgroundImage: `url(${slot.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500"></div>

                  <div className="absolute bottom-0 w-full p-4 md:p-6 bg-gradient-to-t from-black to-transparent z-20 flex flex-row md:flex-col justify-between md:justify-center items-center md:pb-12">
                     <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/90 bg-black/40 px-3 py-1 rounded-full border border-white/10 mb-0 md:mb-2">
                        {slot.label}
                     </div>
                     <div className="text-amber-500 font-serif text-lg md:text-xl">{slot.price}€</div>
                  </div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 z-30">
                    <div className="hidden md:flex w-12 h-12 rounded-full bg-amber-600/20 items-center justify-center text-amber-500 mb-4 backdrop-blur-md border border-amber-600/50 scale-0 group-hover:scale-100 transition-transform duration-500">
                       {slot.icon}
                    </div>
                    <h3 className="text-3xl md:text-3xl font-serif text-white mb-0 md:mb-2 translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-black drop-shadow-lg">{slot.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 : INTENTION */}
        {step === 2 && (
          <div className="flex-1 p-6 md:p-16 flex flex-col justify-center animate-in slide-in-from-right duration-500 overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
               <div className="mb-6 md:mb-8 flex items-end justify-between border-b border-white/10 pb-6 mt-16 md:mt-0">
                 <div>
                   <span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2 block">02 — Intention</span>
                   <h2 className="text-3xl md:text-4xl font-serif text-white">L'Énergie du Moment</h2>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pb-20 md:pb-0">
                 {EVENT_TYPES.map((type) => (
                   <button
                    key={type.id}
                    onClick={() => { setData({...data, eventType: type}); autoNext(3); }}
                    className="group relative h-48 md:h-96 w-full rounded-sm overflow-hidden border border-white/5 hover:border-amber-600/50 transition-all duration-300 text-left"
                   >
                     <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-80"
                        style={{ backgroundImage: `url(${type.image})` }}
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                     <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-1 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{type.title}</h3>
                        <div className="text-amber-500 text-[10px] md:text-xs font-mono uppercase tracking-wider mb-2 md:mb-4 opacity-100 md:opacity-80 group-hover:opacity-100">{type.subtitle}</div>
                        <p className="text-xs md:text-sm text-neutral-300 font-light opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75 leading-relaxed">{type.desc}</p>
                     </div>
                   </button>
                 ))}
               </div>
             </div>
          </div>
        )}

        {/* ÉTAPE 3 : ARCHITECTURE */}
        {step === 3 && (
          <div className="flex-1 flex flex-col justify-center p-6 md:p-16 animate-in slide-in-from-right duration-500 overflow-y-auto">
             <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
               <div className="mb-6 md:mb-8 border-b border-white/10 pb-6 mt-16 md:mt-0">
                 <span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-2 block">03 — Architecture</span>
                 <h2 className="text-3xl md:text-4xl font-serif text-white">Configuration de l'Espace</h2>
               </div>
               
               <div className="flex-1 flex flex-col gap-4 md:gap-6 pb-20 md:pb-0">
                  {FORMATS.map((fmt) => (
                    <button 
                      key={fmt.id}
                      onClick={() => { setData({...data, format: fmt}); autoNext(4); }}
                      className="group relative flex-1 min-h-[120px] md:min-h-0 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 flex items-center overflow-hidden hover:border-amber-600/30"
                    >
                       <div className="w-1/3 h-full relative overflow-hidden">
                         <div 
                           className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:grayscale-0"
                           style={{ backgroundImage: `url(${fmt.image})` }}
                         />
                       </div>

                       <div className="flex-1 p-6 md:p-8 text-left flex items-center justify-between">
                          <div>
                            <h3 className="text-xl md:text-3xl font-serif text-white mb-1 md:mb-2 group-hover:text-amber-500 transition-colors">{fmt.title}</h3>
                            <div className="flex items-center gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-neutral-500">
                               <span>{fmt.subtitle}</span>
                            </div>
                          </div>
                          <div className="text-sm text-neutral-400 font-light leading-relaxed max-w-xs text-right hidden md:block">{fmt.desc}</div>
                          <ArrowRight size={20} className="text-white/20 group-hover:text-amber-600 transition-colors transform group-hover:translate-x-2 duration-300 ml-4 md:ml-8"/>
                       </div>
                    </button>
                  ))}
               </div>
             </div>
          </div>
        )}

        {/* ÉTAPE 4 : CALIBRAGE */}
        {step === 4 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-500 justify-center overflow-y-auto">
             <div className="max-w-4xl mx-auto w-full p-6 md:p-8 mt-16 md:mt-0">
                <div className="text-center mb-10 md:mb-16">
                   <span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-4 block">04 — Calibrage</span>
                   <h3 className="text-4xl md:text-5xl font-serif mb-4 text-white">L'Horizon</h3>
                   <p className="text-neutral-500 max-w-md mx-auto text-sm">Combien d'invités pour ce moment ?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                   <div className="flex flex-col items-center gap-6 p-8 md:p-10 border border-white/10 bg-white/[0.02]">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Volume Invités</span>
                        <div className="flex items-center gap-6 md:gap-8">
                           <button onClick={() => setData({...data, pax: Math.max(2, data.pax - 1)})} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Minus size={18}/></button>
                           <span className="text-5xl md:text-6xl font-serif text-white w-20 md:w-24 text-center">{data.pax}</span>
                           <button onClick={() => setData({...data, pax: Math.min(50, data.pax + 1)})} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Plus size={18}/></button>
                        </div>
                   </div>

                   <div className="flex flex-col items-center gap-6 p-8 md:p-10 border border-white/10 bg-white/[0.02]">
                        <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Date Cible</span>
                        <div className="w-full">
                          <input 
                            type="date" 
                            onChange={(e) => setData({...data, date: e.target.value})}
                            className="bg-transparent text-2xl md:text-3xl text-center font-serif text-white w-full outline-none border-b border-white/10 pb-4 focus:border-amber-600 transition-colors uppercase [color-scheme:dark]"
                          />
                        </div>
                   </div>
                </div>

                <div className="mt-12 md:mt-16 text-center pb-20 md:pb-0">
                  <button 
                    onClick={() => goToStep(5)}
                    className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 md:px-12 md:py-4 hover:bg-amber-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest shadow-lg rounded-sm w-full md:w-auto justify-center"
                  >
                    Valider le Calibrage <ArrowRight size={14}/>
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* ÉTAPE 5 : IMMERSION */}
        {step === 5 && (
          <div className="flex-1 flex flex-col animate-in slide-in-from-right duration-500 overflow-y-auto scrollbar-hide">
             <div className="max-w-6xl mx-auto w-full p-6 md:p-16 mt-16 md:mt-0">
                <div className="mb-8 md:mb-10">
                   <span className="text-amber-600 font-mono text-xs uppercase tracking-widest mb-4 block">05 — Immersion</span>
                   <h3 className="text-3xl md:text-4xl font-serif mb-2">Niveau d'Expérience</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                   <button 
                     onClick={() => { setIsDryHire(true); setData({...data, experience: EXPERIENCES[0]}); }}
                     className={`p-6 md:p-8 border text-left transition-all duration-300 group ${isDryHire ? 'border-white bg-white text-black' : 'border-white/10 hover:border-white/30 bg-[#0a0a0a]'}`}
                   >
                      <LayoutTemplate size={28} className={`mb-4 ${isDryHire ? 'text-black' : 'text-neutral-500'}`} />
                      <h4 className="text-xl md:text-2xl font-serif mb-2">Location</h4>
                      <p className={`text-xs md:text-sm ${isDryHire ? 'text-neutral-700' : 'text-neutral-400'}`}>
                        Mise à disposition de l'espace. 
                      </p>
                   </button>

                   <button 
                     onClick={() => { setIsDryHire(false); setData({...data, experience: EXPERIENCES[1]}); }}
                     className={`p-6 md:p-8 border text-left transition-all duration-300 group ${!isDryHire ? 'border-amber-600 bg-amber-600 text-white' : 'border-white/10 hover:border-amber-600/50 bg-[#0a0a0a]'}`}
                   >
                      <div className="flex items-center gap-3 mb-2">
                         <Sparkles size={20} className={!isDryHire ? 'text-white' : 'text-amber-500'} />
                         <h4 className="text-xl md:text-2xl font-serif">Expérience Immersive</h4>
                      </div>
                      <p className={`text-xs md:text-sm ${!isDryHire ? 'text-white/90' : 'text-neutral-400'}`}>
                        Une animation sensorielle incluse (Vin, Casino, Gastronomie).
                      </p>
                   </button>
                </div>

                {!isDryHire && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 md:pb-0">
                     <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-6">Sélectionnez l'expérience</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {EXPERIENCES.filter(e => e.id !== 'none').map((exp) => (
                           <div 
                             key={exp.id}
                             onClick={() => setData({...data, experience: exp})}
                             className={`relative h-48 md:h-64 border cursor-pointer transition-all duration-300 group overflow-hidden ${
                                data.experience.id === exp.id 
                                ? 'border-amber-600 shadow-[0_0_30px_-10px_rgba(217,119,6,0.3)]' 
                                : 'border-white/10 hover:border-white/30'
                             }`}
                           >
                              <div 
                                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${data.experience.id === exp.id ? 'opacity-40 scale-105' : 'opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-30'}`}
                                style={{ backgroundImage: `url(${exp.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                                 <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">{exp.sub}</div>
                                 <div className={`text-xl font-serif leading-tight mb-2 ${data.experience.id === exp.id ? 'text-white' : 'text-neutral-300'}`}>{exp.title}</div>
                                 <div className={`text-lg font-mono ${data.experience.id === exp.id ? 'text-amber-500' : 'text-neutral-500'}`}>
                                    {exp.price > 0 ? `${exp.price}€` : 'Sur Devis'}
                                 </div>
                              </div>
                              
                              {data.experience.id === exp.id && (
                                 <div className="absolute top-4 right-4 bg-amber-600 text-white p-1 rounded-full"><Check size={14}/></div>
                              )}
                           </div>
                        ))}
                     </div>
                  </div>
                )}

                <div className="mt-12 flex justify-end pb-24 md:pb-0">
                  <button 
                    onClick={() => goToStep(6)}
                    className="flex items-center justify-center gap-3 bg-white text-black px-10 py-4 hover:bg-amber-500 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest shadow-lg w-full md:w-auto"
                  >
                    Valider <ArrowRight size={14}/>
                  </button>
                </div>
             </div>
          </div>
        )}

        {/* ÉTAPE 6 : SERVICES */}
        {step === 6 && (
          <div className="flex-1 p-6 md:p-16 overflow-y-auto scrollbar-hide animate-in slide-in-from-right duration-500">
             <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
                <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6 mt-16 md:mt-0">
                   <div>
                     <span className="text-amber-600 font-mono text-xs uppercase tracking-widest">06 — Services & Exclusivités</span>
                     <h2 className="text-3xl md:text-4xl font-serif text-white mt-2">Finitions</h2>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-24 md:pb-12">
                   {SERVICES.map(srv => {
                     const isSelected = data.selectedServices.includes(srv.id);
                     let priceDisplay = '';
                     let subDisplay = '';

                     if (srv.id === 'softs') {
                         priceDisplay = `+${getSoftsPrice(data.pax)}€`;
                         subDisplay = '(Forfait Total)';
                     } else if (srv.price === 0) {
                         priceDisplay = 'OFFERT';
                     } else if (srv.price === -1) {
                         priceDisplay = 'SUR DEVIS';
                     } else {
                         priceDisplay = `+${srv.price}€`;
                         if (srv.isPerHead) subDisplay = '/Pers';
                     }

                     return (
                       <button 
                         key={srv.id}
                         onClick={() => toggleService(srv.id)}
                         className={`relative p-6 border transition-all duration-300 text-left hover:bg-white/5 ${
                           isSelected ? 'border-amber-600 bg-white/5' : 'border-white/10'
                         }`}
                       >
                         <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-full ${isSelected ? 'bg-amber-600 text-white' : 'bg-white/10 text-neutral-400'}`}>
                              {srv.icon}
                            </div>
                            {isSelected && <Check size={16} className="text-amber-600"/>}
                         </div>
                         
                         <h4 className={`text-lg font-serif mb-2 ${isSelected ? 'text-white' : 'text-neutral-300'}`}>{srv.title}</h4>
                         <p className="text-xs text-neutral-500 mb-4 h-8">{srv.desc}</p>
                         
                         <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                            {srv.fakePrice && <span className="text-xs text-neutral-600 line-through decoration-amber-600/50">{srv.fakePrice}€</span>}
                            <span className={`font-mono text-sm ${srv.fakePrice ? 'text-white' : 'text-amber-500'}`}>
                                {priceDisplay}
                            </span>
                            {subDisplay && <span className="text-[10px] text-neutral-600 uppercase">{subDisplay}</span>}
                         </div>
                       </button>
                     );
                   })}
                </div>

                <div className="flex justify-end pb-24 md:pb-0">
                   <button 
                     onClick={() => goToStep(7)}
                     className="bg-white text-black px-10 py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-xl w-full md:w-auto"
                   >
                     Générer la vision
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* ÉTAPE 7 : FINAL */}
        {step === 7 && (
          <div className="flex-1 flex items-center justify-center p-0 md:p-6 animate-in zoom-in-95 duration-700 relative overflow-hidden h-full">
             
             <div 
               className="absolute inset-0 bg-cover bg-center opacity-30 blur-2xl scale-110"
               style={{ backgroundImage: `url(${data.timeSlot?.image})` }}
             ></div>

             <div className="w-full max-w-5xl flex flex-col md:flex-row bg-[#0a0a0a]/95 md:bg-[#0a0a0a]/90 border-0 md:border border-white/10 backdrop-blur-xl shadow-2xl relative z-10 rounded-none md:rounded-sm overflow-hidden h-full md:h-[85vh]">
                
                <div className="w-full md:w-1/2 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/10 flex flex-col relative overflow-y-auto scrollbar-hide pt-20 md:pt-10 max-h-[50vh] md:max-h-full">
                   <div className="absolute top-0 right-0 p-6 opacity-30">
                      <Sparkles className="text-amber-600 w-12 h-12" />
                   </div>
                   
                   <div className="flex-1">
                      <div className="font-mono text-xs text-amber-500 uppercase tracking-widest mb-4 md:mb-6">Récapitulatif Détaillé</div>
                      <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">{data.eventType?.title}</h2>
                      <div className="text-neutral-400 font-mono text-xs mb-8 flex items-center gap-4">
                         <span>{data.date || 'Date à définir'}</span>
                         <span className="w-1 h-1 bg-neutral-600 rounded-full"></span>
                         <span>{data.pax} Invités</span>
                      </div>
                      
                      <div className="space-y-4 text-xs md:text-sm border-t border-white/10 pt-6">
                        
                        <div className="flex justify-between items-center group">
                           <div>
                              <div className="text-white font-medium">Location — {data.timeSlot?.title}</div>
                              <div className="text-xs text-neutral-500">{data.timeSlot?.label}</div>
                           </div>
                           <div className="font-mono text-neutral-300">{data.timeSlot?.price} €</div>
                        </div>

                        {!isDryHire && data.experience && (
                           <div className="flex justify-between items-center group">
                              <div>
                                 <div className="text-white font-medium">{data.experience.title}</div>
                                 <div className="text-[10px] md:text-xs text-neutral-500">{data.experience.price > 0 ? `${data.experience.price}€ x ${data.pax} invités` : 'Inclus'}</div>
                              </div>
                              <div className="font-mono text-neutral-300">
                                 {data.experience.price === -1 ? 'Devis' : `${data.experience.price * data.pax} €`}
                              </div>
                           </div>
                        )}

                        {data.selectedServices.length > 0 && (
                            <div className="pt-4 mt-4 border-t border-white/5 space-y-4">
                                {data.selectedServices.map(id => {
                                    const srv = SERVICES.find(s => s.id === id);
                                    let priceStr = '';
                                    let calcDetail = '';

                                    if (srv.id === 'softs') {
                                        priceStr = `${getSoftsPrice(data.pax)} €`;
                                        calcDetail = 'Forfait Global';
                                    } else if (srv.price === -1) {
                                        priceStr = 'Devis';
                                    } else if (srv.price === 0) {
                                        priceStr = 'Offert';
                                    } else {
                                        priceStr = srv.isPerHead ? `${srv.price * data.pax} €` : `${srv.price} €`;
                                        if (srv.isPerHead) calcDetail = `${srv.price}€ x ${data.pax}`;
                                    }

                                    return (
                                       <div key={id} className="flex justify-between items-center">
                                          <div>
                                             <div className="text-white font-medium">{srv.title}</div>
                                             {calcDetail && <div className="text-[10px] text-neutral-500">{calcDetail}</div>}
                                          </div>
                                          <div className="font-mono text-neutral-300">{priceStr}</div>
                                       </div>
                                    );
                                })}
                            </div>
                        )}
                      </div>
                   </div>

                   <div className="pt-8 mt-12 border-t border-white/10 text-center pb-8 md:pb-0">
                      <div className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Total Estimé TVAC</div>
                      <div className="flex items-baseline justify-center gap-3">
                         <span className="text-4xl md:text-5xl font-serif text-amber-500">{totalAmount} €</span>
                         {isCustom && <span className="text-sm font-sans text-neutral-400 border border-neutral-600 px-2 py-0.5 rounded">+ Devis</span>}
                      </div>
                   </div>
                </div>

                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-black/40 relative">
                   <h3 className="text-xl md:text-2xl font-serif text-white mb-2">Finaliser l'Accord</h3>
                   <p className="text-xs text-neutral-500 mb-8 font-mono">Ceci est une pré-réservation. Aucun paiement immédiat.</p>

                   <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                      <div className="group relative">
                        <input 
                            type="text" 
                            required
                            placeholder="NOM / ENTREPRISE" 
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm"
                            onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})}
                        />
                      </div>
                      <div className="group relative">
                        <input 
                            type="email" 
                            required
                            placeholder="EMAIL PROFESSIONNEL" 
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm"
                            onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})}
                        />
                      </div>
                      <div className="group relative">
                        <input 
                            type="tel" 
                            required
                            placeholder="TÉLÉPHONE" 
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm"
                            onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})}
                        />
                      </div>
                      <div className="group relative">
                        <textarea 
                            rows="3" 
                            placeholder="MESSAGE (Allergies, horaires...)" 
                            className="w-full bg-transparent border-b border-white/20 py-3 text-white outline-none focus:border-amber-600 transition-colors placeholder:text-neutral-700 font-mono text-sm resize-none"
                            onChange={e => setData({...data, contact: {...data.contact, message: e.target.value}})}
                        ></textarea>
                      </div>

                       <button 
                            type="submit"
                            disabled={isSending}
                            className="mt-8 mb-20 md:mb-0 w-full bg-white text-black py-4 font-mono text-xs uppercase tracking-[0.2em] hover:bg-amber-600 hover:text-white transition-all duration-500 shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                          {isSending ? (
                              <>
                                <Loader className="animate-spin" size={16} /> Envoi en cours...
                              </>
                          ) : (
                              <>
                                <Send size={16} /> Envoyer la demande
                              </>
                          )}
                       </button>
                   </form>
                </div>

             </div>
          </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Space+Grotesk:wght@300;400;500&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-mono { font-family: 'Space Grotesk', sans-serif; }
        .writing-vertical { writing-mode: vertical-rl; }
        
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
      </div>
    </div>
  );
}