import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  Phone,
  Camera,
  CameraOff,
  AlertCircle,
  Hand,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

interface VideoCallProps {
  onCallEnd?: (duration: number) => void;
}

export function VideoCall({ onCallEnd }: VideoCallProps) {
  const { t } = useTranslation();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup quando o componente desmontar
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stream]);

  const startCall = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      setIsCallActive(true);
      setCallDuration(0);
      
      // Iniciar contador de duração
      intervalRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      toast.success(t('videoCallStarted'));
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(t('cameraAccessError'));
      toast.error(t('cameraAccessError'));
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsCallActive(false);
    
    if (onCallEnd) {
      onCallEnd(callDuration);
    }

    toast.success(t('videoCallEnded'));
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Informação sobre acessibilidade */}
      <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50">
        <Hand className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <AlertDescription className="text-blue-900 dark:text-blue-100">
          {t('videoCallAccessibilityInfo')}
        </AlertDescription>
      </Alert>

      {/* Área de vídeo */}
      <div className="relative overflow-hidden bg-gray-900 dark:bg-gray-950 rounded-xl border">
        {!isCallActive ? (
          <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Video className="w-10 h-10 text-white" />
            </div>
            <p className="text-white text-lg font-medium mb-2">{t('readyToStartCall')}</p>
            <p className="text-gray-400 text-sm text-center max-w-md">
              {t('videoCallInstructions')}
            </p>
          </div>
        ) : (
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Indicador de gravação/chamada ativa */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-medium">{formatDuration(callDuration)}</span>
            </div>

            {/* Badge de LIBRAS/ASL */}
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2">
              <Hand className="w-4 h-4" />
              <span className="text-sm font-medium">{t('signLanguageEnabled')}</span>
            </div>

            {/* Indicadores de status */}
            {!isVideoEnabled && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                <div className="text-center">
                  <CameraOff className="w-16 h-16 text-white mx-auto mb-2" />
                  <p className="text-white">{t('cameraOff')}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Erro */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Controles */}
      <div className="flex items-center justify-center gap-3">
        {!isCallActive ? (
          <Button 
            onClick={startCall} 
            size="lg" 
            className="gap-2 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
          >
            <Phone className="w-5 h-5" />
            {t('startVideoCall')}
          </Button>
        ) : (
          <>
            <Button
              onClick={toggleVideo}
              size="lg"
              variant={isVideoEnabled ? "outline" : "destructive"}
              className="gap-2"
            >
              {isVideoEnabled ? (
                <>
                  <Video className="w-5 h-5" />
                  {t('camera')}
                </>
              ) : (
                <>
                  <VideoOff className="w-5 h-5" />
                  {t('cameraOff')}
                </>
              )}
            </Button>

            <Button
              onClick={toggleAudio}
              size="lg"
              variant={isAudioEnabled ? "outline" : "destructive"}
              className="gap-2"
            >
              {isAudioEnabled ? (
                <>
                  <Mic className="w-5 h-5" />
                  {t('microphone')}
                </>
              ) : (
                <>
                  <MicOff className="w-5 h-5" />
                  {t('microphoneOff')}
                </>
              )}
            </Button>

            <Button
              onClick={endCall}
              size="lg"
              className="gap-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white"
            >
              <PhoneOff className="w-5 h-5" />
              {t('endCall')}
            </Button>
          </>
        )}
      </div>

      {/* Informações adicionais */}
      {isCallActive && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{t('participantsInCall')}: 2</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Video className="w-4 h-4" />
            <span>{t('videoQuality')}: HD</span>
          </div>
        </div>
      )}
    </div>
  );
}