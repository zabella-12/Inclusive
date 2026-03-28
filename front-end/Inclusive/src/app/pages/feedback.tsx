import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FeedbackInput } from '../components/feedback-input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { MessageSquare, Send, User, Calendar, ThumbsUp, Target, Award, Video } from 'lucide-react';
import { toast } from 'sonner';

export function Feedback() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const receivedFeedbacks = [
    {
      id: 1,
      from: 'Maria Silva',
      type: 'positive',
      date: '2024-03-17',
      content: t('feedbackContent1'),
      badge: t('positive'),
      icon: ThumbsUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 2,
      from: 'João Santos',
      type: 'development',
      date: '2024-03-14',
      content: t('feedbackContent2'),
      badge: t('development'),
      icon: Target,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      id: 3,
      from: 'Ana Costa',
      type: 'recognition',
      date: '2024-03-10',
      content: t('feedbackContent3'),
      badge: t('recognition'),
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const givenFeedbacks = [
    {
      id: 4,
      to: 'Carlos Oliveira',
      type: 'positive',
      date: '2024-03-15',
      content: t('feedbackContent4'),
      badge: t('positive'),
    },
  ];

  const handleVoiceTranscript = (text: string) => {
    setFeedbackText(text);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText || !feedbackType) {
      toast.error(t('fillAllFields'));
      return;
    }
    toast.success(t('sendFeedback') + '!');
    setFeedbackText('');
    setFeedbackType('');
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
              <Video className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {t('videoCallAccessibilityInfo')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {t('videoFeedbackBannerDesc')}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                onClick={() => navigate('/video-feedback')}
              >
                <Video className="w-4 h-4" />
                {t('scheduleVideoCall')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('feedbackTitle')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('voiceToTextConversion')}
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <MessageSquare className="w-4 h-4" />
                {t('newFeedback')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('newFeedback')}</DialogTitle>
                <DialogDescription>
                  {t('voiceToTextConversion')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Feedback Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">{t('to')}</Label>
                    <Input
                      id="recipient"
                      placeholder={t('employee')}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="feedbackType">{t('feedbackType')}</Label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={t('feedbackType')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="positive">{t('positive')}</SelectItem>
                        <SelectItem value="constructive">{t('constructive')}</SelectItem>
                        <SelectItem value="development">{t('development')}</SelectItem>
                        <SelectItem value="recognition">{t('recognition')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Feedback Input with Voice or Text */}
                  <FeedbackInput onTextChange={setFeedbackText} value={feedbackText} />

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      {t('cancel')}
                    </Button>
                    <Button onClick={handleSubmitFeedback} className="gap-2">
                      <Send className="w-4 h-4" />
                      {t('sendFeedback')}
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="received">{t('receivedFeedbacks')}</TabsTrigger>
          <TabsTrigger value="given">{t('givenFeedbacks')}</TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4 mt-6">
          {receivedFeedbacks.map((feedback) => {
            const Icon = feedback.icon;
            return (
              <Card key={feedback.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${feedback.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${feedback.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feedback.from}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(feedback.date).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{feedback.badge}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{feedback.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="given" className="space-y-4 mt-6">
          {givenFeedbacks.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <User className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{t('to')}: {feedback.to}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(feedback.date).toLocaleDateString('pt-BR')}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{feedback.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">{feedback.content}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}