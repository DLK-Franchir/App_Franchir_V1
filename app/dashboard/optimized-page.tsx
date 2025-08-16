
'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  FileText, 
  MessageSquare, 
  Heart,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Suspense, useState, useEffect } from 'react';
import { useNotificationContext } from '@/contexts/notification-context';
import { usePerformanceMonitor, useRenderCount } from '@/components/performance-monitor';
import { useScrollAnimation } from '@/hooks/use-intersection-observer';
import { PageTransition, LoadingOverlay } from '@/components/ui/loading-states';
import { StatCardSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';
import { LazyWrapper } from '@/components/lazy-components';

// Composant de statistique optimisé avec animation au scroll
const StatCard = motion(Card);

interface StatItemProps {
  stat: {
    label: string;
    value: string;
    icon: any;
    color: string;
    trend: string;
    href: string;
    description: string;
  };
  index: number;
}

function StatItem({ stat, index }: StatItemProps) {
  const { ref, animate, initial, transition } = useScrollAnimation(index * 0.1);
  const [count, setCount] = useState(0);
  const targetValue = parseInt(stat.value);

  // Animation du compteur
  useEffect(() => {
    if (animate && targetValue > 0) {
      const duration = 1000; // 1 seconde
      const steps = 30;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [animate, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate ? { opacity: 1, y: 0 } : initial}
      transition={transition}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link href={stat.href} className="block group">
        <StatCard className="bg-franchir-white border-franchir-border hover:shadow-xl hover:border-franchir-blue/20 transition-all duration-300 cursor-pointer h-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-opensans text-franchir-secondary mb-1 group-hover:text-franchir-blue transition-colors">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold font-montserrat text-franchir-primary mb-1">
                  {animate ? count : stat.value}
                </p>
                <p className="text-xs text-franchir-red mb-2">
                  {stat.trend}
                </p>
                <p className="text-xs text-franchir-secondary group-hover:text-franchir-blue transition-colors opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                  {stat.description}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </StatCard>
      </Link>
    </motion.div>
  );
}

// Composant d'activité récente avec lazy loading
function RecentActivitiesCard({ userRole }: { userRole?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Simuler un chargement async des activités
    const timer = setTimeout(() => {
      setActivities([
        {
          id: 1,
          type: 'appointment',
          title: userRole === 'PATIENT' 
            ? 'Consultation prévue'
            : 'Consultation patient',
          time: '14:30',
          date: 'Aujourd\'hui',
          status: 'confirmed',
          icon: Calendar
        },
        {
          id: 2,
          type: 'document',
          title: userRole === 'PATIENT'
            ? 'Nouveau rapport disponible'
            : 'Rapport soumis',
          time: '10:15',
          date: 'Hier',
          status: 'new',
          icon: FileText
        },
        {
          id: 3,
          type: 'message',
          title: 'Nouveau message',
          time: '16:45',
          date: 'Hier',
          status: 'unread',
          icon: MessageSquare
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [userRole]);

  return (
    <Card className="bg-franchir-white border-franchir-border relative">
      <LoadingOverlay isVisible={isLoading} message="Chargement des activités..." />
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-franchir-blue font-montserrat">
          <Activity className="h-5 w-5" />
          Activités récentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id} 
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-franchir-cream transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className={`p-2 rounded-lg ${
              activity.status === 'confirmed' ? 'bg-green-100 text-green-600' :
              activity.status === 'new' ? 'bg-franchir-red bg-opacity-10 text-franchir-red' :
              'bg-franchir-blue bg-opacity-10 text-franchir-blue'
            }`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-franchir-primary font-opensans">
                {activity.title}
              </p>
              <p className="text-sm text-franchir-secondary">
                {activity.date} à {activity.time}
              </p>
            </div>
            {activity.status === 'new' && (
              <Badge className="bg-franchir-red text-white text-xs">
                Nouveau
              </Badge>
            )}
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

// Composant principal optimisé
export default function OptimizedDashboardPage() {
  const { data: session } = useSession();
  const { notifications } = useNotificationContext();
  
  // Hooks de monitoring des performances
  const { averageRenderTime } = usePerformanceMonitor('OptimizedDashboardPage');
  const { renderCount, logProps } = useRenderCount('OptimizedDashboardPage');

  // Log des props pour le debugging
  useEffect(() => {
    logProps({ session, notifications });
  }, [session, notifications, logProps]);

  const patientStats = [
    { 
      label: 'Rendez-vous', 
      value: '3', 
      icon: Calendar,
      color: 'bg-franchir-blue',
      trend: '+1',
      href: '/calendar',
      description: 'Gérer vos rendez-vous'
    },
    { 
      label: 'Documents', 
      value: '12', 
      icon: FileText,
      color: 'bg-franchir-red',
      trend: '+2',
      href: '/documents',
      description: 'Accéder à vos documents'
    },
    { 
      label: 'Messages', 
      value: '5', 
      icon: MessageSquare,
      color: 'bg-franchir-blue',
      trend: notifications.messages.isVisible ? `${notifications.messages.count} nouveaux` : '0 nouveau',
      href: '/messages',
      description: 'Voir vos conversations'
    },
  ];

  const surgeonStats = [
    { 
      label: 'Patients', 
      value: '47', 
      icon: Users,
      color: 'bg-franchir-blue',
      trend: '+3',
      href: '/patients',
      description: 'Gérer vos patients'
    },
    { 
      label: 'Interventions', 
      value: '8', 
      icon: Activity,
      color: 'bg-franchir-red',
      trend: 'Cette semaine',
      href: '/calendar',
      description: 'Planning interventions'
    },
    { 
      label: 'Documents', 
      value: '156', 
      icon: FileText,
      color: 'bg-franchir-blue',
      trend: '+12',
      href: '/documents',
      description: 'Dossiers médicaux'
    },
  ];

  const getStats = () => {
    switch (session?.user?.role) {
      case 'SURGEON':
      case 'STAFF':
        return surgeonStats;
      default:
        return patientStats;
    }
  };

  return (
    <PageTransition className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section optimisé */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-franchir-white rounded-lg p-6 shadow-lg border border-franchir-border">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h1 className="franchir-h1 text-franchir-blue mb-2">
                  Bienvenue {session?.user?.firstName}
                </h1>
                <p className="franchir-body text-franchir-secondary mb-4">
                  {session?.user?.role === 'PATIENT' 
                    ? 'Gérez votre parcours de soins en toute simplicité'
                    : 'Suivez vos patients et gérez leur accompagnement'
                  }
                </p>
                {process.env.NODE_ENV === 'development' && (
                  <div className="flex gap-2 text-xs text-franchir-secondary">
                    <Badge variant="outline">Renders: {renderCount}</Badge>
                    <Badge variant="outline">Avg: {averageRenderTime.toFixed(0)}ms</Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards avec loading progressif */}
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => <StatCardSkeleton key={i} />)}
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getStats().map((stat, index) => (
              <StatItem key={index} stat={stat} index={index} />
            ))}
          </div>
        </Suspense>

        {/* Content avec lazy loading */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LazyWrapper
            fallback={<CardSkeleton />}
            className="space-y-4"
          >
            <RecentActivitiesCard userRole={session?.user?.role} />
          </LazyWrapper>

          <LazyWrapper
            fallback={<CardSkeleton />}
          >
            <Card className="bg-franchir-white border-franchir-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-franchir-blue font-montserrat">
                  <TrendingUp className="h-5 w-5" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {session?.user?.role === 'PATIENT' ? (
                  <>
                    <Link href="/documents">
                      <Button className="w-full justify-start bg-franchir-blue hover:bg-franchir-blue/90 text-white font-opensans">
                        <FileText className="mr-2 h-4 w-4" />
                        Voir mes documents
                      </Button>
                    </Link>
                    <Link href="/messages">
                      <Button className="w-full justify-start bg-franchir-red hover:bg-franchir-red/90 text-white font-opensans">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Envoyer un message
                        {notifications.messages.isVisible && notifications.messages.count > 0 && (
                          <Badge className="ml-auto bg-white text-franchir-red">
                            {notifications.messages.count}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                    <Link href="/medical">
                      <Button variant="outline" className="w-full justify-start border-franchir-border text-franchir-blue hover:bg-franchir-cream font-opensans">
                        <Heart className="mr-2 h-4 w-4" />
                        Mon dossier médical
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/patients">
                      <Button className="w-full justify-start bg-franchir-blue hover:bg-franchir-blue/90 text-white font-opensans">
                        <Users className="mr-2 h-4 w-4" />
                        Gérer les patients
                      </Button>
                    </Link>
                    <Link href="/documents">
                      <Button className="w-full justify-start bg-franchir-red hover:bg-franchir-red/90 text-white font-opensans">
                        <FileText className="mr-2 h-4 w-4" />
                        Examiner les documents
                      </Button>
                    </Link>
                    <Link href="/messages">
                      <Button variant="outline" className="w-full justify-start border-franchir-border text-franchir-blue hover:bg-franchir-cream font-opensans">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages patients
                        {notifications.messages.isVisible && notifications.messages.count > 0 && (
                          <Badge className="ml-auto bg-franchir-red text-white">
                            {notifications.messages.count}
                          </Badge>
                        )}
                      </Button>
                    </Link>
                  </>
                )}
              </CardContent>
            </Card>
          </LazyWrapper>
        </div>
      </div>
    </PageTransition>
  );
}
