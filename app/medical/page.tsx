
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Heart, 
  FileText, 
  Calendar,
  TrendingUp,
  Download,
  Eye,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalPage() {
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

  const medicalData = [
    {
      id: 1,
      type: 'examination',
      title: 'IRM Lombaire',
      date: '2024-07-15',
      doctor: 'Dr. Martin Dubois',
      status: 'completed',
      priority: 'high'
    },
    {
      id: 2,
      type: 'report',
      title: 'Rapport Pre-opératoire',
      date: '2024-07-10',
      doctor: 'Dr. Sarah Johnson',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Prescription Post-op',
      date: '2024-07-20',
      doctor: 'Dr. Martin Dubois',
      status: 'active',
      priority: 'high'
    }
  ];

  const vitals = [
    { label: 'Tension artérielle', value: '120/80', status: 'normal' },
    { label: 'Fréquence cardiaque', value: '72 bpm', status: 'normal' },
    { label: 'Température', value: '36.5°C', status: 'normal' },
    { label: 'Poids', value: '68 kg', status: 'normal' }
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-franchir-blue/10 rounded-lg flex items-center justify-center">
                  <Activity className="h-6 w-6 text-franchir-blue" />
                </div>
                <div>
                  <h1 className="text-2xl font-playfair text-franchir-secondary">
                    Données Médicales
                  </h1>
                  <p className="text-franchir-muted font-opensans text-sm">
                    Suivi de votre parcours médical
                  </p>
                </div>
              </div>
              <Button className="bg-franchir-blue hover:bg-franchir-blue/90">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle donnée
              </Button>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vitals.map((vital, index) => (
              <motion.div
                key={vital.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-franchir-white border-franchir-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-franchir-muted font-opensans">
                          {vital.label}
                        </p>
                        <p className="text-xl font-playfair font-semibold text-franchir-secondary">
                          {vital.value}
                        </p>
                      </div>
                      <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Heart className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Normal
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Medical Records */}
          <div>
            <h2 className="text-xl font-playfair text-franchir-secondary mb-4">
              Dossiers Médicaux
            </h2>
            <div className="space-y-4">
              {medicalData.map((record, index) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-franchir-white border-franchir-border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center ${
                          record.type === 'examination' ? 'bg-blue-100' :
                          record.type === 'report' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {record.type === 'examination' ? (
                            <Activity className={`h-6 w-6 text-blue-600`} />
                          ) : record.type === 'report' ? (
                            <FileText className={`h-6 w-6 text-green-600`} />
                          ) : (
                            <Heart className={`h-6 w-6 text-purple-600`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className="font-playfair font-semibold text-franchir-secondary">
                                {record.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-franchir-muted">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(record.date).toLocaleDateString('fr-FR')}
                                </div>
                                <span>Dr. {record.doctor}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={record.priority === 'high' ? 'destructive' : 'secondary'}
                                className={
                                  record.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {record.priority === 'high' ? 'Priorité haute' : 'Priorité normale'}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={
                                  record.status === 'completed' ? 'bg-green-100 text-green-800' :
                                  'bg-blue-100 text-blue-800'
                                }
                              >
                                {record.status === 'completed' ? 'Terminé' : 'Actif'}
                              </Badge>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
