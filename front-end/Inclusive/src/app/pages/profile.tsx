import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { User, Mail, Briefcase, Building, Accessibility, Globe, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function Profile() {
  const { t } = useTranslation();
  const [profileData, setProfileData] = useState({
    name: 'Pedro Henrique Silva',
    email: 'pedro.silva@empresa.com.br',
    department: 'Tecnologia',
    role: 'Analista de Sistemas Pleno',
    bio: 'Desenvolvedor apaixonado por tecnologia e inovação, com foco em criar soluções acessíveis e inclusivas.',
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    deaf: true,
    mute: false,
    signLanguage: 'LIBRAS',
    captionsRequired: true,
    highContrast: false,
    largeText: false,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    feedbackAlerts: true,
    trainingReminders: true,
    jobAlerts: false,
  });

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleSaveAccessibility = () => {
    toast.success('Configurações de acessibilidade salvas!');
  };

  const handleSaveNotifications = () => {
    toast.success('Preferências de notificação salvas!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('myProfile')}</h1>
        <p className="text-muted-foreground mt-1">
          {t('managePersonalInfo')}
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl">PH</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
              <p className="text-muted-foreground">{profileData.role}</p>
              <p className="text-sm text-muted-foreground mt-1">{profileData.department}</p>
            </div>
            <Button variant="outline">{t('changePhoto')}</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="personal">{t('personalInfo')}</TabsTrigger>
          <TabsTrigger value="accessibility">{t('accessibility')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('notifications')}</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('personalInfo')}</CardTitle>
              <CardDescription>
                {t('updatePersonalInfo')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {t('name')}
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t('email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department" className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {t('department')}
                  </Label>
                  <Input
                    id="department"
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {t('role')}
                  </Label>
                  <Input
                    id="role"
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">{t('bio')}</Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveProfile}>
                  {t('saveChanges')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accessibility Tab */}
        <TabsContent value="accessibility" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                {t('accessibilityNeeds')}
              </CardTitle>
              <CardDescription>
                {t('configureAccessibility')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="deaf" className="text-base font-medium">
                      {t('deaf')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('enablesVisualFeatures')}
                    </p>
                  </div>
                  <Switch
                    id="deaf"
                    checked={accessibilitySettings.deaf}
                    onCheckedChange={(checked) =>
                      setAccessibilitySettings({ ...accessibilitySettings, deaf: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="mute" className="text-base font-medium">
                      {t('mute')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('prioritizesTextCommunication')}
                    </p>
                  </div>
                  <Switch
                    id="mute"
                    checked={accessibilitySettings.mute}
                    onCheckedChange={(checked) =>
                      setAccessibilitySettings({ ...accessibilitySettings, mute: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="captions" className="text-base font-medium">
                      {t('captionsRequired')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('displaysCaptions')}
                    </p>
                  </div>
                  <Switch
                    id="captions"
                    checked={accessibilitySettings.captionsRequired}
                    onCheckedChange={(checked) =>
                      setAccessibilitySettings({ ...accessibilitySettings, captionsRequired: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="contrast" className="text-base font-medium">
                      {t('highContrast')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('increasesContrast')}
                    </p>
                  </div>
                  <Switch
                    id="contrast"
                    checked={accessibilitySettings.highContrast}
                    onCheckedChange={(checked) =>
                      setAccessibilitySettings({ ...accessibilitySettings, highContrast: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="textSize" className="text-base font-medium">
                      {t('textSize')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('increasesTextSize')}
                    </p>
                  </div>
                  <Switch
                    id="textSize"
                    checked={accessibilitySettings.largeText}
                    onCheckedChange={(checked) =>
                      setAccessibilitySettings({ ...accessibilitySettings, largeText: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signLanguage" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {t('signLanguage')}
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  {t('signLanguagePreferred')}
                </p>
                <Select
                  value={accessibilitySettings.signLanguage}
                  onValueChange={(value) =>
                    setAccessibilitySettings({ ...accessibilitySettings, signLanguage: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectSignLanguage')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LIBRAS">{t('libras')}</SelectItem>
                    <SelectItem value="ASL">{t('asl')}</SelectItem>
                    <SelectItem value="LSF">{t('lsf')}</SelectItem>
                    <SelectItem value="BSL">{t('bsl')}</SelectItem>
                    <SelectItem value="LGP">{t('lgp')}</SelectItem>
                    <SelectItem value="GESTUNO">{t('gestuno')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveAccessibility}>
                  {t('saveChanges')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                {t('notificationPreferences')}
              </CardTitle>
              <CardDescription>
                {t('configureNotifications')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="emailNotif" className="text-base font-medium">
                      {t('emailNotifications')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('receiveEmailUpdates')}
                    </p>
                  </div>
                  <Switch
                    id="emailNotif"
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="feedbackAlerts" className="text-base font-medium">
                      {t('feedbackAlerts')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('feedbackAlertsDesc')}
                    </p>
                  </div>
                  <Switch
                    id="feedbackAlerts"
                    checked={notificationSettings.feedbackAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, feedbackAlerts: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="trainingReminders" className="text-base font-medium">
                      {t('trainingReminders')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('trainingRemindersDesc')}
                    </p>
                  </div>
                  <Switch
                    id="trainingReminders"
                    checked={notificationSettings.trainingReminders}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, trainingReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <Label htmlFor="jobAlerts" className="text-base font-medium">
                      {t('jobAlerts')}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('jobAlertsDesc')}
                    </p>
                  </div>
                  <Switch
                    id="jobAlerts"
                    checked={notificationSettings.jobAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, jobAlerts: checked })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  {t('saveChanges')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}