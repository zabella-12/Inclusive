import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar as CalendarIcon, Clock, Video, Send } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR, enUS, es } from 'date-fns/locale';

interface VideoCallSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (callData: ScheduledCall) => void;
  userType: 'employee' | 'manager';
}

export interface ScheduledCall {
  id: string;
  title: string;
  participant: string;
  date: Date;
  time: string;
  duration: number;
  description: string;
  requiresLibras: boolean;
  signLanguage: 'libras' | 'asl' | 'lsf' | 'bsl';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdBy: 'employee' | 'manager';
}

export function VideoCallScheduler({ isOpen, onClose, onSchedule, userType }: VideoCallSchedulerProps) {
  const { t, i18n } = useTranslation();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [participant, setParticipant] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiresLibras, setRequiresLibras] = useState(true);
  const [signLanguage, setSignLanguage] = useState<'libras' | 'asl' | 'lsf' | 'bsl'>('libras');

  const getDateLocale = () => {
    switch (i18n.language) {
      case 'pt': return ptBR;
      case 'es': return es;
      default: return enUS;
    }
  };

  const handleSchedule = () => {
    if (!date || !time || !participant || !title) {
      toast.error(t('fillAllFields'));
      return;
    }

    const scheduledCall: ScheduledCall = {
      id: Math.random().toString(36).substring(7),
      title,
      participant,
      date,
      time,
      duration: parseInt(duration),
      description,
      requiresLibras,
      signLanguage,
      status: 'scheduled',
      createdBy: userType,
    };

    onSchedule(scheduledCall);
    toast.success(t('videoCallScheduled'));
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setDate(undefined);
    setTime('');
    setDuration('30');
    setParticipant('');
    setTitle('');
    setDescription('');
    setRequiresLibras(true);
    setSignLanguage('libras');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            {t('scheduleVideoCall')}
          </DialogTitle>
          <DialogDescription>
            {t('scheduleVideoCallDesc')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Title */}
          <div>
            <Label htmlFor="call-title">{t('callTitle')}</Label>
            <Input
              id="call-title"
              placeholder={t('callTitlePlaceholder')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Participant */}
          <div>
            <Label htmlFor="participant">
              {userType === 'manager' ? t('employee') : t('manager')}
            </Label>
            <Input
              id="participant"
              placeholder={userType === 'manager' ? t('selectEmployee') : t('selectManager')}
              value={participant}
              onChange={(e) => setParticipant(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('date')}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: getDateLocale() }) : <span>{t('selectDate')}</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">{t('time')}</Label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label htmlFor="duration">{t('duration')}</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 {t('minutes')}</SelectItem>
                <SelectItem value="30">30 {t('minutes')}</SelectItem>
                <SelectItem value="45">45 {t('minutes')}</SelectItem>
                <SelectItem value="60">60 {t('minutes')}</SelectItem>
                <SelectItem value="90">90 {t('minutes')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sign Language Options */}
          <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">{t('requiresLibrasTranslation')}</Label>
              <Button
                variant={requiresLibras ? "default" : "outline"}
                size="sm"
                onClick={() => setRequiresLibras(!requiresLibras)}
              >
                {requiresLibras ? t('yes') : t('no')}
              </Button>
            </div>

            {requiresLibras && (
              <div>
                <Label htmlFor="sign-language">{t('selectSignLanguage')}</Label>
                <Select value={signLanguage} onValueChange={(v) => setSignLanguage(v as any)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="libras">{t('libras')}</SelectItem>
                    <SelectItem value="asl">{t('asl')}</SelectItem>
                    <SelectItem value="lsf">{t('lsf')}</SelectItem>
                    <SelectItem value="bsl">{t('bsl')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">{t('description')} ({t('optional')})</Label>
            <Textarea
              id="description"
              placeholder={t('callDescriptionPlaceholder')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button onClick={handleSchedule} className="gap-2">
            <Send className="w-4 h-4" />
            {t('scheduleCall')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
