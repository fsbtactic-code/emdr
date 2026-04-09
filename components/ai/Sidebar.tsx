'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareHeart, ChevronRight, CheckCircle2, Star } from 'lucide-react';
import { useStore } from '@/store/useStore';

export const Sidebar = () => {
  const { isFeedbackOpen: isOpen, setIsFeedbackOpen: setIsOpen } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form State
  const [hasTherapy, setHasTherapy] = useState<'yes'|'no'|null>(null);
  
  // If Yes
  const [visualRating, setVisualRating] = useState(0);
  const [settingsRating, setSettingsRating] = useState(0);
  const [featuresToAdd, setFeaturesToAdd] = useState('');
  const [initialProblems, setInitialProblems] = useState('');
  
  // If No
  const [stoppingReason, setStoppingReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [whatWouldHelp, setWhatWouldHelp] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hasTherapy,
          visualRating,
          settingsRating,
          featuresToAdd,
          initialProblems,
          stoppingReason,
          otherReason,
          whatWouldHelp,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after a while if they reopen
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setHasTherapy(null);
        setVisualRating(0);
        setSettingsRating(0);
        setFeaturesToAdd('');
        setInitialProblems('');
        setStoppingReason('');
        setOtherReason('');
        setWhatWouldHelp('');
      }, 5000);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  };

  const StarRating = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="p-1 hover:scale-110 transition-transform focus:outline-none"
          >
            <Star 
              size={24} 
              className={star <= value ? 'fill-amber-400 text-amber-400' : 'text-white/20 hover:text-white/40'} 
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="fixed left-0 top-0 h-full w-full md:w-[450px] bg-zinc-950/90 backdrop-blur-2xl border-r border-white/10 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 md:p-6 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center">
                  <MessageSquareHeart size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Обратная связь</h3>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/40">EMDR Платформа</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none">
                <ChevronRight size={24} className="text-white/60 rotate-180" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 no-scrollbar relative">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center px-4 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-emerald-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Спасибо за ваш отзыв!</h2>
                  <p className="text-white/60 text-sm">Ваше мнение очень важно для развития платформы.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-10">
                  <div className="bg-cyan-900/20 border border-cyan-500/30 p-4 rounded-2xl">
                    <p className="text-cyan-100 text-sm leading-relaxed">
                      Скоро здесь будет AI-ассистент терапии, который будет выставлять и корректировать настройки, помогать прохождению терапии. А пока мне требуется обратная связь.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-white/90 text-sm font-semibold">Проходили ли вы терапию EMDR?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setHasTherapy('yes')}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border ${hasTherapy === 'yes' ? 'bg-indigo-500/30 border-indigo-500/50 text-indigo-100' : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'}`}
                      >
                        Да
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasTherapy('no')}
                        className={`py-3 rounded-xl text-sm font-bold transition-all border ${hasTherapy === 'no' ? 'bg-indigo-500/30 border-indigo-500/50 text-indigo-100' : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10'}`}
                      >
                        Нет
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {hasTherapy === 'yes' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-6">
                            
                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">Насколько визуально вам нравится сервис?</label>
                                <StarRating value={visualRating} onChange={setVisualRating} />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">Насколько удобно сейчас реализованы настройки?</label>
                                <StarRating value={settingsRating} onChange={setSettingsRating} />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">Что бы вам хотелось добавить?</label>
                                <textarea 
                                    value={featuresToAdd} 
                                    onChange={e => setFeaturesToAdd(e.target.value)} 
                                    placeholder="Новые функции, пресеты, звуки..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 min-h-[100px] focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-y" 
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">С какими проблемами вы сталкивались в начале терапии EMDR?</label>
                                <textarea 
                                    value={initialProblems} 
                                    onChange={e => setInitialProblems(e.target.value)} 
                                    placeholder="Сложности с поиском специалиста, страх, непонимание процесса..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 min-h-[100px] focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-y" 
                                />
                            </div>

                        </motion.div>
                    )}

                    {hasTherapy === 'no' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="flex flex-col gap-6">
                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">Что вас останавливает от начала терапии?</label>
                                <div className="flex flex-col gap-2">
                                    {['Это слишком дорого', 'Непонятно как начать', 'Боюсь процесса', 'Другое'].map((reason) => (
                                        <label key={reason} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-transparent hover:bg-white/10 cursor-pointer transition-colors">
                                            <input 
                                              type="radio" 
                                              name="stoppingReason" 
                                              checked={stoppingReason === reason} 
                                              onChange={() => setStoppingReason(reason)}
                                              className="w-4 h-4 accent-indigo-500 bg-white/10 border-white/20"
                                            />
                                            <span className="text-sm text-white/90">{reason}</span>
                                        </label>
                                    ))}
                                </div>
                                {stoppingReason === 'Другое' && (
                                    <input 
                                        type="text" 
                                        value={otherReason} 
                                        onChange={e => setOtherReason(e.target.value)} 
                                        placeholder="Опишите вашу причину..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 mt-2 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                                        required
                                    />
                                )}
                            </div>

                            <div className="space-y-3">
                                <label className="block text-white/80 text-sm font-medium">Что помогло бы вам начать такую терапию?</label>
                                <textarea 
                                    value={whatWouldHelp} 
                                    onChange={e => setWhatWouldHelp(e.target.value)} 
                                    placeholder="Бесплатное демо, больше информации, гарантии..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-white/30 min-h-[100px] focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all resize-y" 
                                />
                            </div>
                        </motion.div>
                    )}
                  </AnimatePresence>

                  {hasTherapy !== null && (
                    <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full mt-4 py-4 rounded-xl bg-white text-zinc-950 font-bold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex justify-center items-center gap-2 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                        ) : (
                          'Отправить результат'
                        )}
                    </motion.button>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
