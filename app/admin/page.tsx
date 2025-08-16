
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Users, 
  Activity, 
  FileText,
  BarChart3,
  Shield,
  Database,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Gère le cas où l'utilisateur n'est pas connecté
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Affiche un état de chargement pendant que la session est vérifiée
  if (status === 'loading') {
    return <PageLoadingState />;
  }

  // Retourne null ou un loader pendant la redirection
  if (status === 'unauthenticated') {
    return null;
  }

  // N'affiche le contenu que si l'utilisateur est authentifié
  if (status !== 'authenticated') {
    return null;
  }

  // Vérification du rôle (seulement staff peut voir cette page)
  if (session.user?.role !== 'STAFF') {
    return (
      <div className="min-h-screen bg-franchir-cream">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-franchir-white border-franchir-border">
            <CardContent className="p-8 text-center">
              <h1 className="text-xl font-playfair text-franchir-secondary mb-2">
                Accès administrateur requis
              </h1>
              <p className="text-franchir-muted font-opensans">
                Vous n'avez pas les permissions nécessaires pour accéder au panneau d'administration.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const adminStats = [
    { icon: Users, label: 'Patients actifs', value: '127', change: '+12%' },
    { icon: Activity, label: 'Consultations ce mois', value: '89', change: '+8%' },
    { icon: FileText, label: 'Documents traités', value: '234', change: '+15%' },
    { icon: Bell, label: 'Notifications', value: '12', change: 'Nouveau' }
  ];

  const adminModules = [
    {
      title: 'Gestion des utilisateurs',
      description: 'Gérer les comptes patients, chirurgiens et staff',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Analyses et rapports',
      description: 'Tableaux de bord et statistiques détaillées',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Sécurité et permissions',
      description: 'Contrôle des accès et logs de sécurité',
      icon: Shield,
      color: 'red'
    },
    {
      title: 'Base de données',
      description: 'Maintenance et sauvegarde des données',
      icon: Database,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="bg-franchir-white border border-franchir-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-franchir-blue/10 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-franchir-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-playfair text-franchir-secondary">
                  Administration
                </h1>
                <p className="text-franchir-muted font-opensans text-sm">
                  Panneau de contrôle et gestion système
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-franchir-white border-franchir-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-franchir-muted font-opensans">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-playfair font-bold text-franchir-secondary">
                          {stat.value}
                        </p>
                        <p className="text-xs text-green-600 font-opensans">
                          {stat.change}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-franchir-blue/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-franchir-blue" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Admin Modules */}
          <div>
            <h2 className="text-xl font-playfair text-franchir-secondary mb-4">
              Modules d'administration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-franchir-white border-franchir-border hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                          module.color === 'blue' ? 'bg-blue-100' :
                          module.color === 'green' ? 'bg-green-100' :
                          module.color === 'red' ? 'bg-red-100' : 'bg-purple-100'
                        }`}>
                          <module.icon className={`h-5 w-5 ${
                            module.color === 'blue' ? 'text-blue-600' :
                            module.color === 'green' ? 'text-green-600' :
                            module.color === 'red' ? 'text-red-600' : 'text-purple-600'
                          }`} />
                        </div>
                        <CardTitle className="text-franchir-secondary font-playfair">
                          {module.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-franchir-muted font-opensans mb-4">
                        {module.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-franchir-border"
                      >
                        Accéder
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
