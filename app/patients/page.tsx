
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Search, 
  Filter, 
  Plus,
  Phone,
  Mail,
  Calendar,
  FileText,
  MoreVertical,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

// Hook personnalisé pour gérer les données des patients
function usePatientsData() {
  const { data: session, status } = useSession();
  const [patients, setPatients] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const loadPatientsData = async () => {
      // L'APPEL NE SE FAIT QUE SI LA SESSION EST VALIDE
      if (status === 'authenticated' && session) {
        // Vérifier aussi le rôle pour cette page spécifique
        if (session.user?.role === 'STAFF' || session.user?.role === 'SURGEON') {
          setIsDataLoading(true);
          
          // Dans un vrai environnement, on ferait un appel API sécurisé ici
          // const response = await fetch('/api/patients', {
          //   headers: {
          //     'Authorization': `Bearer ${session.accessToken}`
          //   }
          // });
          // const data = await response.json();
          
          // Simuler un délai réseau
          await new Promise(resolve => setTimeout(resolve, 400));
          
          const patientsData = [
            {
              id: 1,
              firstName: 'Marie',
              lastName: 'Dupont',
              email: 'marie.dupont@email.com',
              phone: '+1-514-123-4567',
              status: 'active',
              joinDate: '2024-06-15',
              nextAppointment: '2024-07-25',
              condition: 'Hernie discale L4-L5'
            },
            {
              id: 2,
              firstName: 'Jean',
              lastName: 'Tremblay',
              email: 'jean.tremblay@email.com',
              phone: '+1-514-987-6543',
              status: 'consultation',
              joinDate: '2024-07-01',
              nextAppointment: '2024-07-28',
              condition: 'Sténose spinale'
            },
            {
              id: 3,
              firstName: 'Sophie',
              lastName: 'Martin',
              email: 'sophie.martin@email.com',
              phone: '+1-514-555-0123',
              status: 'post-op',
              joinDate: '2024-05-20',
              nextAppointment: '2024-08-02',
              condition: 'Arthrodèse L5-S1'
            }
          ];

          setPatients(patientsData);
        } else {
          setPatients([]);
        }
        setIsDataLoading(false);
      } else if (status === 'unauthenticated') {
        // Si l'utilisateur n'est pas authentifié, on ne charge pas de données
        setPatients([]);
        setIsDataLoading(false);
      }
      // Si le statut est 'loading', on garde isDataLoading à true
    };

    loadPatientsData();
  }, [status, session]); // Déclenche l'effet quand le statut de la session change

  return {
    patients,
    isDataLoading
  };
}

export default function PatientsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Hook pour les données des patients - appelé inconditionnellement
  const { patients, isDataLoading } = usePatientsData();

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

  // Vérification du rôle (seulement staff et surgeons peuvent voir cette page)
  if (session.user?.role !== 'STAFF' && session.user?.role !== 'SURGEON') {
    return (
      <div className="min-h-screen bg-franchir-cream">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Card className="bg-franchir-white border-franchir-border">
            <CardContent className="p-8 text-center">
              <h1 className="text-xl font-playfair text-franchir-secondary mb-2">
                Accès restreint
              </h1>
              <p className="text-franchir-muted font-opensans">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
                  <Users className="h-6 w-6 text-franchir-blue" />
                </div>
                <div>
                  <h1 className="text-2xl font-playfair text-franchir-secondary">
                    Patients
                  </h1>
                  <p className="text-franchir-muted font-opensans text-sm">
                    Gérez vos patients et leurs dossiers
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-franchir-border">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
                <Button variant="outline" size="sm" className="border-franchir-border">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button size="sm" className="bg-franchir-blue hover:bg-franchir-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau patient
                </Button>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div className="space-y-4">
            {patients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-franchir-white border-franchir-border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-franchir-blue/10 text-franchir-blue font-playfair">
                          {patient.firstName[0]}{patient.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-playfair font-semibold text-franchir-secondary">
                              {patient.firstName} {patient.lastName}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-franchir-muted">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {patient.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-4 w-4" />
                                {patient.phone}
                              </div>
                            </div>
                            <div className="text-sm text-franchir-muted">
                              <strong>Condition:</strong> {patient.condition}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-franchir-muted">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Inscrit: {new Date(patient.joinDate).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Prochain RDV: {new Date(patient.nextAppointment).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="secondary"
                              className={
                                patient.status === 'active' ? 'bg-green-100 text-green-800' :
                                patient.status === 'consultation' ? 'bg-blue-100 text-blue-800' :
                                'bg-orange-100 text-orange-800'
                              }
                            >
                              {patient.status === 'active' ? 'Actif' :
                               patient.status === 'consultation' ? 'Consultation' : 'Post-op'}
                            </Badge>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
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
        </motion.div>
      </div>
    </div>
  );
}
