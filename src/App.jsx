import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  MessageSquare, 
  Calendar, 
  ChevronDown, 
  Rocket, 
  CheckCircle, 
  AlertCircle, 
  GraduationCap, 
  Mail, 
  Zap 
} from 'lucide-react';

// --- CONFIGURATION SUPABASE ---
const SUPABASE_URL = ""; 
const SUPABASE_ANON_KEY = "";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [supabase, setSupabase] = useState(null);
  const registrationRef = useRef(null);

  useEffect(() => {
    const initSupabase = async () => {
      if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        const { createClient } = await import('https://esm.sh/@supabase/supabase-js');
        const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        setSupabase(client);
      }
    };
    initSupabase();
  }, []);

  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) {
      alert("Note : Configurez vos clés Supabase pour activer l'envoi.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.target);
    const data = {
      nom: formData.get('nom'),
      prenom: formData.get('prenom'),
      email: formData.get('email'),
      age: parseInt(formData.get('age')),
      telephone: formData.get('telephone'),
      attentes: formData.get('attentes'),
      created_at: new Date(),
    };

    try {
      const { error } = await supabase.from('etudiants').insert([data]);
      if (error) throw error;
      setStatus('success');
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#1E293B] font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-xl border-b border-blue-100/30 px-8 py-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-xl shadow-lg shadow-blue-200">
            <GraduationCap className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-800">
            Dev.<span className="text-blue-600">Aridone</span>
          </span>
        </div>
        
        <button 
          onClick={scrollToRegistration}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          S'inscrire
        </button>
      </nav>

      {/* --- SECTION HERO (VIBRANTE ET COLORÉE) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* Blobs de couleurs animés */}
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-blue-400 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[35rem] h-[35rem] bg-purple-400 rounded-full blur-[120px] opacity-20" />
        
        <div className="relative z-20 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
                   
            <h1 className="text-6xl md:text-[100px] font-bold text-slate-900 leading-[0.9] mb-8 tracking-tighter">
              CODER. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">CRÉER.</span> <br/>
              INNOVER.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              La formation <span className="text-blue-600 font-bold">Dev.Aridone</span> fusionne technologie et créativité. 
              Pensée pour la nouvelle génération de bâtisseurs numériques.
            </p>
            
            <button
              onClick={scrollToRegistration}
              className="px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-3 text-sm mx-auto group"
            >
              REJOINDRE LA TRIBU <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="mt-16 opacity-30 flex justify-center"
            >
              <ChevronDown size={40} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION FORMULAIRE (DÉCALÉ ET FUN) --- */}
      <section 
        ref={registrationRef}
        className="relative py-32 px-6 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-md font-bold text-[10px] uppercase tracking-widest mb-6 inline-block rotate-3">
              Inscription ouverte
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-slate-900">
              Deviens le <br/> <span className="text-blue-600 italic">héros</span> de ton code.
            </h2>
            <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">
              Inscris-toi en moins de 2 minutes. Notre équipe pédagogique te recontactera sous 24h pour valider tes objectifs.
            </p>
            
            <div className="space-y-4">
              {[
                { t: "Sceance pratique 100%", c: "text-blue-600 bg-blue-50" },
                { t: "Projets réels", c: "text-purple-600 bg-purple-50" },
                { t: "Ressources pédagogiques", c: "text-green-600 bg-green-50" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm text-slate-700 transition-transform hover:translate-x-2">
                  <div className={`${item.c} p-1.5 rounded-lg`}>
                    <CheckCircle size={18} />
                  </div>
                  {item.t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Formulaire au Design Décalé (Tilted layers) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Couches de couleurs inclinées en arrière-plan */}
            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 shadow-2xl opacity-80 transition-transform hover:rotate-3" />
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-[3rem] -rotate-3 shadow-xl opacity-90 transition-transform hover:-rotate-1" />
            
            {/* Conteneur du formulaire */}
            <div className="relative bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 opacity-50" />
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Prénom</label>
                    <input name="prenom" required type="text" placeholder="Aridona" className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Nom</label>
                    <input name="nom" required type="text" placeholder="dev" className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Email</label>
                  <input name="email" required type="email" placeholder="Aridona@example.com" className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Âge</label>
                    <input name="age" required type="number" min="15" placeholder="Ton âge" className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Téléphone</label>
                    <input name="telephone" required type="tel" placeholder="06..." className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-black ml-1">Tes attentes</label>
                  <textarea name="attentes" required rows="2" placeholder="Quels sont tes objectifs ?" className="w-full px-5 py-4 bg-slate-50 focus:bg-white border border-transparent focus:border-blue-400 rounded-2xl outline-none transition-all text-sm font-medium resize-none" />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 uppercase tracking-[0.2em] text-[10px]"
                >
                  {loading ? "Chargement..." : (
                    <>
                      Valider mon inscription <Rocket size={18} />
                    </>
                  )}
                </motion.button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="p-4 bg-green-50 border border-green-100 text-green-700 text-[10px] font-bold rounded-xl text-center uppercase tracking-widest"
                    >
                      <CheckCircle size={14} className="inline mr-2" /> Reçu ! Bienvenue dans l'aventure.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 py-20 px-6 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-2xl font-bold text-white tracking-tight">
            Dev.<span className="text-blue-500 font-black">Aridone</span>
          </div>
         
          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-[0.4em] pt-10 border-t border-slate-800/50">
            © 2024 Aridone Formation • Créons le monde de demain
          </p>
        </div>
      </footer>
    </div>
  );
}