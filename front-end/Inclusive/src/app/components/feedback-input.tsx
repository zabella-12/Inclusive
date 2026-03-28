import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { VoiceToText } from './voice-to-text';
import { VideoCall } from './video-call';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Mic, Type, Video } from 'lucide-react';

interface FeedbackInputProps {
  onTextChange: (text: string) => void;
  value?: string;
}

export function FeedbackInput({ onTextChange, value = '' }: FeedbackInputProps) {
  const { t } = useTranslation();
  const [inputMethod, setInputMethod] = useState<'text' | 'voice' | 'video'>('text');

  return (
    <div className="space-y-4">
      <div>
        <Label>{t('chooseInputMethod')}</Label>
      </div>
      
      <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as 'text' | 'voice' | 'video')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text" className="gap-2">
            <Type className="w-4 h-4" />
            {t('textInput')}
          </TabsTrigger>
          <TabsTrigger value="voice" className="gap-2">
            <Mic className="w-4 h-4" />
            {t('voiceInput')}
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-2">
            <Video className="w-4 h-4" />
            {t('videoInput')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div>
            <Label htmlFor="feedback-text">{t('feedbackContent')}</Label>
            <Textarea
              id="feedback-text"
              placeholder={t('typeHere')}
              value={value}
              onChange={(e) => onTextChange(e.target.value)}
              className="min-h-[200px] mt-2"
            />
          </div>
        </TabsContent>

        <TabsContent value="voice" className="space-y-4">
          <VoiceToText onTranscript={onTextChange} />
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <VideoCall onCallEnd={(duration) => {
            onTextChange(`[Vídeo chamada realizada - Duração: ${Math.floor(duration / 60)}min ${duration % 60}s]`);
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
}