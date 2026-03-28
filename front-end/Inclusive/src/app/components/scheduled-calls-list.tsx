import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar, Clock, Video, Trash2, User, AlertCircle } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';
import { toast } from 'sonner';
import type { ScheduledCall } from './video-call-scheduler';

interface ScheduledCallsListProps {
  calls: ScheduledCall[];
  onStartCall: (call: ScheduledCall) => void;
  onCancelCall: (callId: string) => void;
  userType: 'employee' | 'manager';
}

export function ScheduledCallsList({ calls, onStartCall, onCancelCall, userType }: ScheduledCallsListProps) {
  const { t, i18n } = useTranslation();

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'pt': return ptBR;
      case 'es': return es;
      default: return enUS;
    }
  };

  const getDateLabel = (date: Date) => {
    if (isToday(date)) return t('today');
    if (isTomorrow(date)) return t('tomorrow');
    return format(date, 'PPP', { locale: getDateLocale() });
  };

  const getStatusBadge = (call: ScheduledCall) => {
    if (call.status === 'completed') {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t('completed')}</Badge>;
    }
    if (call.status === 'cancelled') {
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{t('cancelled')}</Badge>;
    }
    if (call.status === 'in-progress') {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 animate-pulse">{t('inProgress')}</Badge>;
    }
    if (isPast(call.date) && call.time) {
      return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">{t('missedCall')}</Badge>;
    }
    return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">{t('scheduled')}</Badge>;
  };

  const canStartCall = (call: ScheduledCall) => {
    if (call.status !== 'scheduled') return false;
    
    const now = new Date();
    const callDate = new Date(call.date);
    const [hours, minutes] = call.time.split(':').map(Number);
    callDate.setHours(hours, minutes);
    
    // Permite iniciar 5 minutos antes
    const fiveMinutesBefore = new Date(callDate.getTime() - 5 * 60 * 1000);
    
    return now >= fiveMinutesBefore;
  };

  const handleStartCall = (call: ScheduledCall) => {
    if (!canStartCall(call)) {
      toast.error(t('callNotYetAvailable'));
      return;
    }
    onStartCall(call);
  };

  const handleCancelCall = (callId: string) => {
    if (confirm(t('confirmCancelCall'))) {
      onCancelCall(callId);
      toast.success(t('callCancelled'));
    }
  };

  const sortedCalls = [...calls].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const [hoursA, minutesA] = a.time.split(':').map(Number);
    const [hoursB, minutesB] = b.time.split(':').map(Number);
    dateA.setHours(hoursA, minutesA);
    dateB.setHours(hoursB, minutesB);
    return dateA.getTime() - dateB.getTime();
  });

  if (calls.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Video className="w-12 h-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center">
            {t('noScheduledCalls')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {sortedCalls.map((call) => (
        <Card key={call.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{call.title}</CardTitle>
                  {getStatusBadge(call)}
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  {/* Participant */}
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>
                      {userType === 'manager' ? t('employee') : t('manager')}: <strong>{call.participant}</strong>
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{getDateLabel(call.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{call.time} ({call.duration} min)</span>
                    </div>
                  </div>

                  {/* LIBRAS Badge */}
                  {call.requiresLibras && (
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <Video className="w-3 h-3" />
                        {call.signLanguage.toUpperCase()} {t('translation')}
                      </Badge>
                    </div>
                  )}

                  {/* Description */}
                  {call.description && (
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      {call.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {call.participant.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between gap-2">
              {/* Warning for upcoming calls */}
              {call.status === 'scheduled' && isToday(call.date) && (
                <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t('callToday')}</span>
                </div>
              )}
              
              {call.status !== 'scheduled' && call.status !== 'in-progress' && (
                <div />
              )}

              {/* Actions */}
              <div className="flex gap-2 ml-auto">
                {call.status === 'scheduled' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCancelCall(call.id)}
                      className="gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t('cancel')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleStartCall(call)}
                      disabled={!canStartCall(call)}
                      className="gap-2"
                    >
                      <Video className="w-4 h-4" />
                      {canStartCall(call) ? t('startCall') : t('notYetAvailable')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
