import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { VideoCallScheduler, type ScheduledCall } from '../components/video-call-scheduler';
import { ScheduledCallsList } from '../components/scheduled-calls-list';
import { LibrasAvatar } from '../components/libras-avatar';
import { 
  Video, 
  Calendar, 
  Mic, 
  MicOff, 
  VideoIcon as VideoOnIcon, 
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Volume2,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../context/auth-context';

export function VideoFeedback() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userType } = useAuth();
  
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([
    // Mock data
    {
      id: '1',
      title: t('feedbackSession1on1'),
      participant: userType === 'manager' ? 'Maria Silva' : `João Souza (${t('manager')})`,
      date: new Date(2026, 2, 26, 14, 0), // Today at 14:00
      time: '14:00',
      duration: 30,
      description: t('quarterlyFeedbackDesc'),
      requiresLibras: true,
      signLanguage: 'libras',
      status: 'scheduled',
      createdBy: 'manager',
    },
    {
      id: '2',
      title: t('careerDevelopmentMeeting'),
      participant: userType === 'manager' ? 'Carlos Oliveira' : `Ana Costa (${t('manager')})`,
      date: new Date(2026, 2, 27, 10, 30), // Tomorrow at 10:30
      time: '10:30',
      duration: 45,
      description: t('discussCareerGoals'),
      requiresLibras: true,
      signLanguage: 'libras',
      status: 'scheduled',
      createdBy: 'employee',
    },
  ]);

  const [activeCall, setActiveCall] = useState<ScheduledCall | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; timestamp: Date }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check if starting call from URL params
  useEffect(() => {
    const callId = searchParams.get('callId');
    if (callId) {
      const call = scheduledCalls.find(c => c.id === callId);
      if (call) {
        handleStartCall(call);
      }
    }
  }, [searchParams, scheduledCalls]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInCall) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setSpokenText(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleScheduleCall = (callData: ScheduledCall) => {
    setScheduledCalls(prev => [...prev, callData]);
  };

  const handleCancelCall = (callId: string) => {
    setScheduledCalls(prev => 
      prev.map(call => 
        call.id === callId ? { ...call, status: 'cancelled' as const } : call
      )
    );
  };

  const handleStartCall = async (call: ScheduledCall) => {
    try {
      // Request camera and microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setActiveCall(call);
      setIsInCall(true);
      setCallDuration(0);
      
      // Update call status
      setScheduledCalls(prev =>
        prev.map(c => c.id === call.id ? { ...c, status: 'in-progress' as const } : c)
      );

      // Start speech recognition if LIBRAS is enabled
      if (call.requiresLibras && recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }

      toast.success(t('videoCallStarted'));
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error(t('cameraAccessError'));
    }
  };

  const handleEndCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    if (activeCall) {
      setScheduledCalls(prev =>
        prev.map(c => c.id === activeCall.id ? { ...c, status: 'completed' as const } : c)
      );
    }

    setIsInCall(false);
    setActiveCall(null);
    setCallDuration(0);
    setSpokenText('');
    setChatMessages([]);
    setCurrentMessage('');
    
    toast.success(t('videoCallEnded'));
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    setChatMessages(prev => [...prev, {
      sender: userType === 'manager' ? t('manager') : t('employee'),
      text: currentMessage,
      timestamp: new Date(),
    }]);
    setCurrentMessage('');
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Active call view
  if (isInCall && activeCall) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{activeCall.title}</h2>
            <p className="text-sm text-gray-300">{activeCall.participant}</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              {formatCallDuration(callDuration)}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3 h-3" />
              2
            </Badge>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex gap-4 p-4">
          {/* Video area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Participant video (simulated) */}
            <Card className="flex-1 bg-gray-800 border-gray-700">
              <CardContent className="p-0 h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold">
                        {activeCall.participant.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                    <p className="text-xl font-semibold">{activeCall.participant}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">
                    {userType === 'manager' ? t('employee') : t('manager')}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Your video */}
            <Card className="h-48 bg-gray-800 border-gray-700">
              <CardContent className="p-0 h-full relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-lg"
                />
                {!isCameraOn && (
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <VideoOff className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary">{t('you')}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right sidebar - LIBRAS Avatar & Chat */}
          <div className="w-96 flex flex-col gap-4">
            {/* LIBRAS Avatar */}
            {activeCall.requiresLibras && (
              <LibrasAvatar
                text={spokenText}
                language={activeCall.signLanguage}
                isActive={isListening}
              />
            )}

            {/* Chat */}
            <Card className="flex-1 flex flex-col bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  {t('chat')}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-4 space-y-4">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-2">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                      <p className="text-sm font-semibold text-gray-300">{msg.sender}</p>
                      <p className="text-white">{msg.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Textarea
                    placeholder={t('typeMessage')}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="bg-gray-700 border-gray-600 text-white resize-none"
                    rows={2}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-6 flex items-center justify-center gap-4">
          <Button
            variant={isMicOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleMic}
            className="rounded-full w-14 h-14"
          >
            {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </Button>
          
          <Button
            variant={isCameraOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleCamera}
            className="rounded-full w-14 h-14"
          >
            {isCameraOn ? <VideoOnIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="rounded-full w-14 h-14"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>

          {activeCall.requiresLibras && (
            <Button
              variant={isListening ? "default" : "secondary"}
              size="lg"
              onClick={() => {
                if (isListening) {
                  recognitionRef.current?.stop();
                  setIsListening(false);
                } else {
                  recognitionRef.current?.start();
                  setIsListening(true);
                }
              }}
              className="rounded-full w-14 h-14"
            >
              <Volume2 className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Main view - Scheduling and list
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('videoFeedbackTitle')}
          </h1>
          <p className="text-muted-foreground mt-1">
            {t('videoFeedbackSubtitle')}
          </p>
        </div>
        <Button onClick={() => setIsSchedulerOpen(true)} className="gap-2">
          <Calendar className="w-4 h-4" />
          {t('scheduleNewCall')}
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('scheduledCalls')}</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledCalls.filter(c => c.status === 'scheduled').length}
            </div>
            <p className="text-xs text-muted-foreground">{t('upcomingMeetings')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('completedCalls')}</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledCalls.filter(c => c.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">{t('totalCompleted')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('librasEnabled')}</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scheduledCalls.filter(c => c.requiresLibras).length}
            </div>
            <p className="text-xs text-muted-foreground">{t('withTranslation')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">{t('upcomingCalls')}</TabsTrigger>
          <TabsTrigger value="completed">{t('completedCalls')}</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <ScheduledCallsList
            calls={scheduledCalls.filter(c => c.status === 'scheduled')}
            onStartCall={handleStartCall}
            onCancelCall={handleCancelCall}
            userType={userType || 'employee'}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <ScheduledCallsList
            calls={scheduledCalls.filter(c => c.status === 'completed' || c.status === 'cancelled')}
            onStartCall={handleStartCall}
            onCancelCall={handleCancelCall}
            userType={userType || 'employee'}
          />
        </TabsContent>
      </Tabs>

      {/* Scheduler Dialog */}
      <VideoCallScheduler
        isOpen={isSchedulerOpen}
        onClose={() => setIsSchedulerOpen(false)}
        onSchedule={handleScheduleCall}
        userType={userType || 'employee'}
      />
    </div>
  );
}