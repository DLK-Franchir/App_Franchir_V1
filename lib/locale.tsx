
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/types';
import { LocaleContextType } from '@/lib/types';

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const translations = {
  [Language.FRENCH]: {
    // Common
    'app.name': 'Franchir.app',
    'app.tagline': 'Votre accompagnement médical en France',
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.upload': 'Télécharger',
    'common.download': 'Télécharger',
    'common.send': 'Envoyer',
    'common.submit': 'Soumettre',
    'common.confirm': 'Confirmer',
    'common.yes': 'Oui',
    'common.no': 'Non',
    // Auth
    'auth.signin': 'Se connecter',
    'auth.signup': 'Créer un compte',
    'auth.signout': 'Se déconnecter',
    'auth.email': 'Adresse email',
    'auth.password': 'Mot de passe',
    'auth.firstName': 'Prénom',
    'auth.lastName': 'Nom',
    'auth.phone': 'Téléphone',
    'auth.role': 'Rôle',
    'auth.language': 'Langue',
    'auth.welcome': 'Bienvenue',
    'auth.loginTitle': 'Connexion à votre compte',
    'auth.signupTitle': 'Créer votre compte',
    'auth.forgotPassword': 'Mot de passe oublié ?',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    // Navigation
    'nav.dashboard': 'Accueil',
    'nav.documents': 'Documents',
    'nav.messages': 'Messages',
    'nav.chatbot': 'Assistant IA',
    'nav.profile': 'Profil',
    'nav.notifications': 'Notifications',
    'nav.patients': 'Patients',
    'nav.medical': 'Dossier médical',
    'nav.admin': 'Administration',
    // Dashboard
    'dashboard.welcome': 'Bienvenue',
    'dashboard.patient_subtitle': 'Gérez votre parcours de soins en toute simplicité',
    'dashboard.professional_subtitle': 'Suivez vos patients et gérez leur accompagnement',
    'dashboard.overview': 'Vue d\'ensemble',
    'dashboard.recentActivity': 'Activité récente',
    'dashboard.recent_activities': 'Activités récentes',
    'dashboard.quick_actions': 'Actions rapides',
    'dashboard.stats': 'Statistiques',
    'dashboard.documents': 'Mes documents',
    'dashboard.messages': 'Messages',
    'dashboard.notifications': 'Notifications',
    'dashboard.appointments': 'Rendez-vous',
    'dashboard.patients': 'Mes patients',
    'dashboard.surgeries': 'Interventions',
    'dashboard.upcoming_consultation': 'Consultation prévue',
    'dashboard.patient_consultation': 'Consultation patient',
    'dashboard.new_report_available': 'Nouveau rapport disponible',
    'dashboard.report_submitted': 'Rapport soumis',
    'dashboard.new_message': 'Nouveau message',
    'dashboard.view_documents': 'Voir mes documents',
    'dashboard.send_message': 'Envoyer un message',
    'dashboard.medical_record': 'Mon dossier médical',
    'dashboard.manage_patients': 'Gérer les patients',
    'dashboard.review_documents': 'Examiner les documents',
    'dashboard.patient_messages': 'Messages patients',
    // Roles
    'role.PATIENT': 'Patient',
    'role.SURGEON': 'Chirurgien',
    'role.STAFF': 'Équipe Franchir',
    'role.ADMIN': 'Administrateur',
    // Home page
    'home.next_steps': 'Prochaines étapes',
    'home.recent_messages': 'Messages récents',
    'home.documents': 'Mes documents',
    'home.no_next_steps': 'Aucune étape planifiée',
    'home.no_messages': 'Aucun message récent',
    'home.no_documents': 'Aucun document récent',
    'home.view_all_messages': 'Voir tous les messages',
    'home.view_all_documents': 'Voir tous les documents',
    'home.contact_team': 'Contacter l\'équipe',
    'home.call_team': 'Appeler l\'équipe',
    'home.emergency_call': 'Appel d\'urgence',
    // Messages
    'messages.title': 'Conciergerie 24/7',
    'messages.subtitle': 'Communiquez avec les équipes Franchir',
    'messages.search': 'Rechercher...',
    'messages.new_conversation': 'Nouvelle conversation',
    'messages.online': 'En ligne',
    'messages.offline': 'Hors ligne',
    'messages.type_message': 'Tapez votre message...',
    'messages.send': 'Envoyer',
    'messages.call': 'Appeler',
    'messages.video_call': 'Visio',
    // Chatbot
    'chatbot.title': 'Conciergerie',
    'chatbot.subtitle': 'Assistant virtuel Franchir disponible 24h/24',
    'chatbot.welcome': 'Bonjour {{firstName}}! Je suis votre assistant Conciergerie Franchir. Je suis là pour répondre à vos questions sur votre parcours médical, vos documents, vos rendez-vous et bien plus encore. Comment puis-je vous aider aujourd\'hui?',
    'chatbot.thinking': 'En train de réfléchir...',
    'chatbot.error': 'Désolé, une erreur est survenue. Veuillez réessayer.',
    'chatbot.placeholder': 'Tapez votre question...',
    'chatbot.quick_questions': 'Questions fréquentes',
    'chatbot.quick_questions_desc': 'Cliquez sur une question pour commencer',
    'chatbot.online_status': 'En ligne',
    'chatbot.call_support': 'Appeler le support',
    // Calendar
    'calendar.title': 'Planning',
    'calendar.view_calendar': 'Voir le planning',
    // Documents
    'documents.title': 'Mes documents',
    'documents.subtitle': 'Gérez vos documents médicaux',
  },
  [Language.ENGLISH]: {
    // Common
    'app.name': 'Franchir.app',
    'app.tagline': 'Your medical support in France',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.upload': 'Upload',
    'common.download': 'Download',
    'common.send': 'Send',
    'common.submit': 'Submit',
    'common.confirm': 'Confirm',
    'common.yes': 'Yes',
    'common.no': 'No',
    // Auth
    'auth.signin': 'Sign In',
    'auth.signup': 'Sign Up',
    'auth.signout': 'Sign Out',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.phone': 'Phone',
    'auth.role': 'Role',
    'auth.language': 'Language',
    'auth.welcome': 'Welcome',
    'auth.loginTitle': 'Sign in to your account',
    'auth.signupTitle': 'Create your account',
    'auth.forgotPassword': 'Forgot password?',
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Already have an account?',
    // Navigation
    'nav.dashboard': 'Home',
    'nav.documents': 'Documents',
    'nav.messages': 'Messages',
    'nav.chatbot': 'AI Assistant',
    'nav.profile': 'Profile',
    'nav.notifications': 'Notifications',
    'nav.patients': 'Patients',
    'nav.medical': 'Medical Record',
    'nav.admin': 'Administration',
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.patient_subtitle': 'Manage your care journey with ease',
    'dashboard.professional_subtitle': 'Follow your patients and manage their support',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.recent_activities': 'Recent Activities',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.stats': 'Statistics',
    'dashboard.documents': 'My documents',
    'dashboard.messages': 'Messages',
    'dashboard.notifications': 'Notifications',
    'dashboard.appointments': 'Appointments',
    'dashboard.patients': 'My patients',
    'dashboard.surgeries': 'Surgeries',
    'dashboard.upcoming_consultation': 'Upcoming consultation',
    'dashboard.patient_consultation': 'Patient consultation',
    'dashboard.new_report_available': 'New report available',
    'dashboard.report_submitted': 'Report submitted',
    'dashboard.new_message': 'New message',
    'dashboard.view_documents': 'View my documents',
    'dashboard.send_message': 'Send message',
    'dashboard.medical_record': 'My medical record',
    'dashboard.manage_patients': 'Manage patients',
    'dashboard.review_documents': 'Review documents',
    'dashboard.patient_messages': 'Patient messages',
    // Roles
    'role.PATIENT': 'Patient',
    'role.SURGEON': 'Surgeon',
    'role.STAFF': 'Franchir Team',
    'role.ADMIN': 'Administrator',
    // Home page
    'home.next_steps': 'Next steps',
    'home.recent_messages': 'Recent messages',
    'home.documents': 'My documents',
    'home.no_next_steps': 'No upcoming steps',
    'home.no_messages': 'No recent messages',
    'home.no_documents': 'No recent documents',
    'home.view_all_messages': 'View all messages',
    'home.view_all_documents': 'View all documents',
    'home.contact_team': 'Contact team',
    'home.call_team': 'Call team',
    'home.emergency_call': 'Emergency call',
    // Messages
    'messages.title': 'Concierge 24/7',
    'messages.subtitle': 'Communicate with Franchir teams',
    'messages.search': 'Search...',
    'messages.new_conversation': 'New conversation',
    'messages.online': 'Online',
    'messages.offline': 'Offline',
    'messages.type_message': 'Type your message...',
    'messages.send': 'Send',
    'messages.call': 'Call',
    'messages.video_call': 'Video call',
    // Chatbot
    'chatbot.title': 'Concierge',
    'chatbot.subtitle': 'Franchir virtual assistant available 24/7',
    'chatbot.welcome': 'Hello {{firstName}}! I am your Franchir Concierge assistant. I am here to answer your questions about your medical journey, documents, appointments and much more. How can I help you today?',
    'chatbot.thinking': 'Thinking...',
    'chatbot.error': 'Sorry, an error occurred. Please try again.',
    'chatbot.placeholder': 'Type your question...',
    'chatbot.quick_questions': 'Frequently asked questions',
    'chatbot.quick_questions_desc': 'Click on a question to get started',
    'chatbot.online_status': 'Online',
    'chatbot.call_support': 'Call support',
    // Calendar
    'calendar.title': 'My appointments',
    'calendar.view_calendar': 'View schedule',
    // Documents
    'documents.title': 'My documents',
    'documents.subtitle': 'Manage your medical documents',
  }
};

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Language>(Language.FRENCH);

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Language;
    if (savedLocale && Object.values(Language).includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  const handleSetLocale = (newLocale: Language) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string, params?: Record<string, string>): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') {
      return key; // Return key if translation not found
    }
    
    if (params) {
      return Object.entries(params).reduce(
        (text, [param, replacement]) => text.replace(`{{${param}}}`, replacement),
        value
      );
    }
    
    return value;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
