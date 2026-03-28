import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';

interface LibrasAvatarProps {
  text: string;
  language?: 'libras' | 'asl' | 'lsf' | 'bsl';
  isActive?: boolean;
  onTranslationComplete?: () => void;
}

export function LibrasAvatar({ 
  text, 
  language = 'libras', 
  isActive = true,
  onTranslationComplete 
}: LibrasAvatarProps) {
  const { t } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentSign, setCurrentSign] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simula tradução em tempo real palavra por palavra
  useEffect(() => {
    if (!text || !isActive) return;

    setIsTranslating(true);
    const words = text.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setCurrentSign(words[currentIndex]);
        currentIndex++;
      } else {
        setIsTranslating(false);
        setCurrentSign('');
        onTranslationComplete?.();
        clearInterval(interval);
      }
    }, 800); // Cada sinal dura ~800ms

    return () => clearInterval(interval);
  }, [text, isActive, onTranslationComplete]);

  const getLanguageName = () => {
    switch (language) {
      case 'libras': return 'LIBRAS';
      case 'asl': return 'ASL';
      case 'lsf': return 'LSF';
      case 'bsl': return 'BSL';
      default: return 'LIBRAS';
    }
  };

  return (
    <Card className={`relative overflow-hidden ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Header with controls */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <Badge variant="secondary" className="gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {getLanguageName()}
        </Badge>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Avatar Container */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950 flex items-center justify-center">
        {/* Animated Avatar Silhouette */}
        <motion.div
          className="relative w-40 h-48 flex flex-col items-center justify-center"
          animate={isTranslating ? {
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0],
          } : {}}
          transition={{
            duration: 1.6,
            repeat: isTranslating ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {/* Head */}
          <motion.div 
            className="w-16 h-20 rounded-full bg-blue-400 dark:bg-blue-600 border-4 border-white dark:border-gray-800 relative"
            animate={isTranslating ? { y: [0, -5, 0] } : {}}
            transition={{ duration: 1.6, repeat: isTranslating ? Infinity : 0 }}
          >
            {/* Eyes */}
            <div className="absolute top-6 left-3 w-2 h-2 rounded-full bg-white" />
            <div className="absolute top-6 right-3 w-2 h-2 rounded-full bg-white" />
            {/* Mouth */}
            <motion.div 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white rounded-full"
              animate={isTranslating ? { scaleX: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.8, repeat: isTranslating ? Infinity : 0 }}
            />
          </motion.div>

          {/* Body */}
          <div className="w-20 h-24 bg-blue-500 dark:bg-blue-700 rounded-b-full border-4 border-t-0 border-white dark:border-gray-800 relative">
            {/* Arms - animadas */}
            <motion.div 
              className="absolute -left-8 top-2 w-16 h-3 bg-blue-400 dark:bg-blue-600 rounded-full origin-right"
              animate={isTranslating ? {
                rotate: [0, -30, 20, 0],
                x: [0, -5, 5, 0],
                y: [0, -5, 5, 0]
              } : {}}
              transition={{ duration: 1.6, repeat: isTranslating ? Infinity : 0 }}
            />
            <motion.div 
              className="absolute -right-8 top-2 w-16 h-3 bg-blue-400 dark:bg-blue-600 rounded-full origin-left"
              animate={isTranslating ? {
                rotate: [0, 30, -20, 0],
                x: [0, 5, -5, 0],
                y: [0, -5, 5, 0]
              } : {}}
              transition={{ duration: 1.6, repeat: isTranslating ? Infinity : 0, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Translation Status */}
        {isActive && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              {isTranslating ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-blue-500"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('translating')}...
                    </span>
                  </div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    &quot;{currentSign}&quot;
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {t('waitingForSpeech')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Inactive State */}
        {!isActive && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-white text-center p-6">
              <p className="text-lg font-semibold">{t('avatarInactive')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Text Display */}
      {text && (
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
            {t('translatingText')}:
          </p>
          <p className="text-gray-900 dark:text-white">
            {text}
          </p>
        </div>
      )}
    </Card>
  );
}
