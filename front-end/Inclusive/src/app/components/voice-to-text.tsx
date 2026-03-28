import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface VoiceToTextProps {
  onTranscript: (text: string) => void;
  language?: string;
}

export function VoiceToText({ onTranscript, language = 'pt-BR' }: VoiceToTextProps) {
  const { t, i18n } = useTranslation();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if browser supports Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    
    // Set language based on i18n
    const langMap: { [key: string]: string } = {
      'pt': 'pt-BR',
      'en': 'en-US',
      'es': 'es-ES',
    };
    recognitionInstance.lang = langMap[i18n.language] || 'pt-BR';

    recognitionInstance.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPiece = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPiece + ' ';
        } else {
          interimTranscript += transcriptPiece;
        }
      }

      const fullTranscript = finalTranscript || interimTranscript;
      setTranscript(fullTranscript);
      onTranscript(fullTranscript);
    };

    recognitionInstance.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognitionInstance.onend = () => {
      if (isRecording) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);
  }, [i18n.language, onTranscript, isRecording]);

  const startRecording = () => {
    if (recognition && !isRecording) {
      setTranscript('');
      recognition.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  if (!isSupported) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {t('voiceInputNotSupported')}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">{t('voiceToText')}</span>
            </div>
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? 'destructive' : 'default'}
              className="gap-2"
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  {t('stopRecording')}
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  {t('startRecording')}
                </>
              )}
            </Button>
          </div>

          {isRecording && (
            <div className="flex items-center gap-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
              <span className="text-sm">{t('recording')}</span>
            </div>
          )}

          <div className="min-h-[120px] p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">{t('transcription')}:</p>
            <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
              {transcript || (isRecording ? t('recording') : t('clickToStart', { button: t('startRecording') }))}
            </p>
          </div>

          <Alert>
            <AlertDescription className="text-sm">
              💡 {t('audioConversionInfo')}
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}