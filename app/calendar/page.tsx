
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PageLoadingState } from '@/components/ui/loading-states';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CalendarPage() {
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

  const appointments = [
    {
      id: 1,
      title: 'Consultation Pre-op',
      date: '2024-07-25',
      time: '14:00',
      duration: '1h',
      location: 'Hôpital Saint-Joseph',
      type: 'consultation',
      doctor: 'Dr. Martin Dubois'
    },
    {
      id: 2,
      title: 'IRM Rachis',
      date: '2024-07-28',
      time: '10:30',
      duration: '45min',
      location: 'Centre Imagerie',
      type: 'exam',
      doctor: 'Technicien IRM'
    },
    {
      id: 3,
      title: 'Chirurgie Rachis',
      date: '2024-08-05',
      time: '08:00',
      duration: '3h',
      location: 'Bloc Opératoire',
      type: 'surgery',
      doctor: 'Dr. Martin Dubois'
    }
  ];

  return (
    <div className="min-h-screen bg-franchir-cream">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="bg-franchir-white border border-franchir-border rounded-xl p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-franchir-blue/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-franchir-blue" />
                </div>
                <div>
                  <h1 className="text-2xl font-playfair text-franchir-secondary">
                    Calendrier
                  </h1>
                  <p className="text-franchir-muted font-opensans text-sm">
                    Gérez vos rendez-vous médicaux
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-franchir-border">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
                <Button className="bg-franchir-blue hover:bg-franchir-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau RDV
                </Button>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-4">
            {appointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-franchir-white border-franchir-border hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                          appointment.type === 'surgery' ? 'bg-red-100' :
                          appointment.type === 'exam' ? 'bg-blue-100' : 'bg-green-100'
                        }`}>
                          <Calendar className={`h-6 w-6 ${
                            appointment.type === 'surgery' ? 'text-red-600' :
                            appointment.type === 'exam' ? 'text-blue-600' : 'text-green-600'
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-playfair font-semibold text-franchir-secondary">
                              {appointment.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-franchir-muted">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(appointment.date).toLocaleDateString('fr-FR')}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {appointment.time} ({appointment.duration})
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-franchir-muted">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {appointment.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {appointment.doctor}
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={
                              appointment.type === 'surgery' ? 'bg-red-100 text-red-800' :
                              appointment.type === 'exam' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }
                          >
                            {appointment.type === 'surgery' ? 'Chirurgie' :
                             appointment.type === 'exam' ? 'Examen' : 'Consultation'}
                          </Badge>
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
