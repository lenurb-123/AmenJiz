
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Send, Star, ChefHat, ArrowRight, BrainCircuit } from 'lucide-react';

const CakeAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState<{name: string, reason: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `L'utilisateur cherche un gâteau pour cette occasion: "${prompt}". 
        Suggère-lui un type de gâteau créatif et explique pourquoi émotionnellement ce choix est parfait. 
        Utilise un ton professionnel, élégant et expert en haute pâtisserie. Ne mets aucun emoji dans ta réponse.
        Réponds uniquement en JSON avec les clés "name" et "reason".`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["name", "reason"]
          }
        }
      });

      const text = response.text;
      if (text) {
        const data = JSON.parse(text);
        setRecommendation(data);
      }
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel p-8 md:p-16 lg:p-24 rounded-[3rem] md:rounded-[5rem] shadow-premium max-w-5xl mx-auto border border-white/30 text-chocolate backdrop-blur-3xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
        <div className="w-96 h-96 border border-chocolate/20 rounded-full" />
      </div>

      <div className="flex flex-col items-center text-center gap-6 md:gap-10 mb-10 md:mb-16 relative z-10">
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full glass-panel flex items-center justify-center border border-gold/30">
          <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-gold" />
        </div>
        <div>
          <h3 className="italic mb-2 md:mb-4 text-chocolate text-xl md:text-3xl">Expertise Cognitive</h3>
          <p className="text-chocolate/60 font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:small-text">L'IA au service de votre émotion</p>
        </div>
      </div>
      
      <p className="mb-8 md:mb-16 italic opacity-80 text-center max-w-2xl mx-auto text-chocolate text-sm md:text-base">
        "Décrivez-nous l'âme de l'événement, nous mobilisons notre intelligence créative pour vous répondre..."
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 relative z-10 max-w-3xl mx-auto">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && getRecommendation()}
          placeholder="Un anniversaire surprise sous les étoiles..."
          className="flex-1 glass-panel border border-chocolate/10 rounded-full px-8 md:px-12 py-4 md:py-6 focus:outline-none focus:border-gold transition-all font-light text-chocolate placeholder:text-chocolate/40 shadow-inner text-sm md:text-base"
        />
        <button 
          onClick={getRecommendation}
          disabled={loading}
          className="bg-chocolate text-vanilla w-full sm:w-20 h-14 sm:h-20 rounded-full hover:bg-gold hover:text-vanilla transition-all flex items-center justify-center flex-shrink-0 disabled:opacity-50 shadow-2xl"
        >
          {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Send className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {recommendation && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="mt-12 md:mt-20 flex justify-center"
          >
            <div className="glass-panel w-full max-w-2xl p-8 md:p-16 rounded-[2rem] md:rounded-[5rem] flex flex-col items-center justify-center text-center border border-gold/20 backdrop-blur-3xl relative">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <span className="font-bold text-gold tracking-[0.3em] md:tracking-[0.5em] uppercase text-[10px] md:small-text">Analyse Profonde Terminée</span>
              </div>
              
              <h4 className="mb-4 md:mb-8 italic text-gold tracking-tight text-xl md:text-4xl">{recommendation.name}</h4>
              <p className="text-chocolate/80 italic mb-8 md:mb-10 max-w-md text-sm md:text-base">"{recommendation.reason}"</p>
              
              <button className="flex items-center gap-3 text-chocolate font-bold hover:text-gold transition-colors group uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:small-text">
                <span>Détails Techniques</span>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-chocolate/30 flex items-center justify-center group-hover:border-gold transition-colors">
                  <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CakeAssistant;
