// Local type definitions to avoid Prisma import issues
export enum UserRole {
  PATIENT = 'PATIENT',
  SURGEON = 'SURGEON',
  STAFF = 'STAFF'
}

export enum DocumentType {
  MEDICAL_REPORT = 'MEDICAL_REPORT',
  IMAGING = 'IMAGING',
  PRESCRIPTION = 'PRESCRIPTION',
  INSURANCE = 'INSURANCE',
  IDENTIFICATION = 'IDENTIFICATION',
  OTHER = 'OTHER'
}

export enum NotificationType {
  MESSAGE = 'MESSAGE',
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  APPOINTMENT_REMINDER = 'APPOINTMENT_REMINDER',
  SYSTEM = 'SYSTEM',
  MEDICAL_UPDATE = 'MEDICAL_UPDATE'
}

export enum MessageStatus {
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ'
}

export enum Language {
  FRENCH = 'FRENCH',
  ENGLISH = 'ENGLISH'
}

export interface UserProfile {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    phone?: string;
    language: Language;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
}

export interface MedicalProfileData {
    id: string;
    userId: string;
    dateOfBirth?: Date;
    gender?: string;
    bloodType?: string;
    allergies?: string;
    currentMedications?: string;
    medicalHistory?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    insuranceProvider?: string;
    insuranceNumber?: string;
    diagnosisDetails?: string;
    surgeryType?: string;
    surgeryDate?: Date;
    surgeonId?: string;
    hospitalName?: string;
    notes?: string;
}

export interface DocumentData {
    id: string;
    title: string;
    description?: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    filePath: string;
    type: DocumentType;
    isConfidential: boolean;
    uploadedById: string;
    patientId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface MessageData {
    id: string;
    content: string;
    conversationId: string;
    senderId: string;
    recipientId?: string;
    status: MessageStatus;
    isSystemMessage: boolean;
    createdAt: Date;
    updatedAt: Date;
    sender?: UserProfile;
    recipient?: UserProfile;
}

export interface ConversationData {
    id: string;
    title?: string;
    isGroup: boolean;
    participants: UserProfile[];
    messages: MessageData[];
    lastMessage?: MessageData;
    unreadCount?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface NotificationData {
    id: string;
    title: string;
    message: string;
    type: NotificationType;
    isRead: boolean;
    userId: string;
    link?: string;
    createdAt: Date;
}

export interface DashboardStats {
    totalDocuments: number;
    unreadMessages: number;
    unreadNotifications: number;
    upcomingAppointments: number;
    recentActivity: Array<{
        type: 'document' | 'message' | 'appointment' | 'notification';
        title: string;
        description: string;
        timestamp: Date;
        link?: string;
    }>;
}

export interface ChatMessage {
    id: string;
    content: string;
    isBot: boolean;
    timestamp: Date;
    isLoading?: boolean;
}

// Localization types
export interface Translations {
    [key: string]: string | Translations;
}

export interface LocaleContextType {
    locale: Language;
    setLocale: (locale: Language) => void;
    t: (key: string, params?: Record<string, string>) => string;
}

export type DateRange = {
    from: Date | undefined;
    to: Date | undefined;
}