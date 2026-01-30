
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
// Fixed: 'Movie' is not an exported member of 'lucide-react', replaced with 'Clapperboard'
import { Image as ImageIcon, Clapperboard, Upload, Loader2, Sparkles, Wand2, MonitorPlay } from 'lucide-react';

const CreativeStudio: React.FC = () => {
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [videoRatio, setVideoRatio] = useState<'16:9' | '9:16'>('9:16');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [isAnimatingVideo, setIsAnimatingVideo] = useState(false);
  const [videoStatus, setVideoStatus] = useState('');

  const handleKeySetup = async () => {
    if (!(await (window as any).aistudio.hasSelectedApiKey())) {
      await (window as any).aistudio.openSelectKey();
    }
  };

  const generateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    try {
      await handleKeySetup();
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: `Create a luxurious, highly detailed professional photography of a birthday cake: ${imagePrompt}. Elegant setting, soft lighting, 8k resolution.` }] },
        config: { imageConfig: { aspectRatio: "1:1", imageSize: imageSize } }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImageUrl(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e: any) {
      console.error(e);
      // Handle "Requested entity was not found" error by prompting for key selection again as per guidelines
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const animateToVideo = async () => {
    if (!uploadedImage) return;
    setIsAnimatingVideo(true);
    setVideoStatus("Initialisation du moteur Veo...");
    try {
      await handleKeySetup();
      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = uploadedImage.split(',')[1];

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Soft cinematic animation, slow rotation, flickering candles, magical particles.',
        image: { imageBytes: base64Data, mimeType: 'image/png' },
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: videoRatio }
      });

      while (!operation.done) {
        setVideoStatus("Le chef sublime votre vidéo (cela peut prendre 1-2 minutes)...");
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setGeneratedVideoUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      console.error(e);
      // Handle "Requested entity was not found" error
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
    } finally {
      setIsAnimatingVideo(false);
      setVideoStatus("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 space-y-24">
      {/* IMAGE GEN SECTION */}
      <section className="glass-panel p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-premium">
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
            <ImageIcon className="text-gold w-8 h-8" />
          </div>
          <h2 className="italic text-chocolate text-2xl md:text-4xl">Studio de Conception</h2>
          <p className="text-chocolate/60 uppercase tracking-widest text-xs md:small-text font-bold">Visualisez votre rêve avant sa création</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-chocolate font-bold small-text uppercase tracking-widest block">Description de l'œuvre</label>
              <textarea 
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Un gâteau velours rouge avec des perles dorées et des fleurs de cerisier..."
                className="w-full glass-panel-light p-6 rounded-3xl min-h-[150px] focus:outline-none focus:ring-2 ring-gold/20 text-chocolate italic"
              />
            </div>

            <div className="space-y-4">
              <label className="text-chocolate font-bold small-text uppercase tracking-widest block">Format d'Excellence</label>
              <div className="flex gap-4">
                {['1K', '2K', '4K'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setImageSize(size as any)}
                    className={`flex-1 py-3 rounded-full border transition-all ${imageSize === size ? 'bg-chocolate text-vanilla border-chocolate' : 'bg-white/50 border-chocolate/10 text-chocolate'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={generateImage}
              disabled={isGeneratingImage || !imagePrompt}
              className="w-full bg-chocolate text-vanilla py-6 rounded-full flex items-center justify-center gap-4 hover:bg-strawberry transition-all disabled:opacity-50"
            >
              {isGeneratingImage ? <Loader2 className="animate-spin" /> : <Wand2 />}
              <span className="cta-text uppercase tracking-widest">Générer le concept</span>
            </button>
          </div>

          <div className="relative aspect-square glass-panel-light rounded-[3rem] overflow-hidden flex items-center justify-center border border-chocolate/5">
            {generatedImageUrl ? (
              <img src={generatedImageUrl} className="w-full h-full object-cover" alt="Concept généré" />
            ) : (
              <div className="text-center p-8 opacity-30 italic">
                {isGeneratingImage ? "L'IA sculpte votre vision..." : "Votre concept apparaîtra ici"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VIDEO VEO SECTION */}
      <section className="glass-panel p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-premium">
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          <div className="w-16 h-16 rounded-full bg-strawberry/10 flex items-center justify-center">
            {/* Fixed: Replaced 'Movie' with 'Clapperboard' */}
            <Clapperboard className="text-strawberry w-8 h-8" />
          </div>
          <h2 className="italic text-chocolate text-2xl md:text-4xl">Cinématographie Veo</h2>
          <p className="text-chocolate/60 uppercase tracking-widest text-xs md:small-text font-bold">Donnez vie à vos souvenirs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-chocolate font-bold small-text uppercase tracking-widest block">Photo de Départ</label>
              <div className="relative border-2 border-dashed border-chocolate/20 rounded-[3rem] p-12 text-center hover:border-gold transition-colors group">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                {uploadedImage ? (
                  <img src={uploadedImage} className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white" alt="Upload" />
                ) : (
                  <div className="space-y-4">
                    <Upload className="mx-auto w-12 h-12 text-chocolate/20 group-hover:text-gold" />
                    <p className="small-text italic">Déposez votre photo de gâteau ici</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-chocolate font-bold small-text uppercase tracking-widest block">Angle Cinématique</label>
              <div className="flex gap-4">
                {['16:9', '9:16'].map((ratio) => (
                  <button 
                    key={ratio}
                    onClick={() => setVideoRatio(ratio as any)}
                    className={`flex-1 py-3 rounded-full border transition-all ${videoRatio === ratio ? 'bg-chocolate text-vanilla border-chocolate' : 'bg-white/50 border-chocolate/10 text-chocolate'}`}
                  >
                    {ratio === '16:9' ? 'Paysage' : 'Portrait'}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={animateToVideo}
              disabled={isAnimatingVideo || !uploadedImage}
              className="w-full bg-chocolate text-vanilla py-6 rounded-full flex items-center justify-center gap-4 hover:bg-strawberry transition-all disabled:opacity-50"
            >
              {isAnimatingVideo ? <Loader2 className="animate-spin" /> : <MonitorPlay />}
              <span className="cta-text uppercase tracking-widest">Animer avec Veo</span>
            </button>
            {videoStatus && <p className="text-center text-xs italic text-strawberry animate-pulse">{videoStatus}</p>}
          </div>

          <div className="relative aspect-video glass-panel-light rounded-[3rem] overflow-hidden flex items-center justify-center border border-chocolate/5 bg-black/5">
            {generatedVideoUrl ? (
              <video src={generatedVideoUrl} controls autoPlay loop className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-8 opacity-30 italic">
                {isAnimatingVideo ? "Production cinématique en cours..." : "La magie s'affichera ici"}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreativeStudio;
