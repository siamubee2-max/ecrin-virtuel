import { supabase } from './supabaseClient';

// ============================================
// Intégrations - L'Écrin Virtuel (Supabase)
// ============================================

// Upload de fichiers vers Supabase Storage
export const UploadFile = async ({ file }) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return { file_url: urlData.publicUrl };
};

// Placeholder pour InvokeLLM - à connecter à OpenAI plus tard
export const InvokeLLM = async ({ prompt, file_urls }) => {
  console.log('InvokeLLM called with:', { prompt, file_urls });
  // Pour l'instant, retourne des suggestions génériques
  return {
    suggestions: "Ce bijou s'harmonise parfaitement avec votre teint.",
    advice: "L'or rose complète les tons chauds de votre peau.",
    compatible_items: ["Boucles d'oreilles assorties", "Bracelet fin", "Bague délicate"]
  };
};

// Placeholder pour GenerateImage - à connecter à une API d'IA plus tard
export const GenerateImage = async ({ prompt, existing_image_urls }) => {
  console.log('GenerateImage called with:', { prompt, existing_image_urls });
  // Pour l'instant, retourne la première image existante
  // Tu pourras connecter Replicate, Stability AI, ou autre plus tard
  return { 
    url: existing_image_urls?.[0] || null 
  };
};

// Placeholder pour extraction de données
export const ExtractDataFromUploadedFile = async ({ file_url }) => {
  console.log('ExtractDataFromUploadedFile called for:', file_url);
  return {};
};

// Placeholder pour fetch website
export const FetchWebsite = async ({ url }) => {
  console.log('FetchWebsite called:', url);
  return { content: '' };
};

// Placeholder pour email
export const SendEmail = async ({ to, subject, body }) => {
  console.log('SendEmail called:', { to, subject, body });
  return { success: true };
};

// Placeholder pour SMS
export const SendSMS = async ({ to, message }) => {
  console.log('SendSMS called:', { to, message });
  return { success: true };
};

// Export par défaut
export default {
  UploadFile,
  InvokeLLM,
  GenerateImage,
  ExtractDataFromUploadedFile,
  FetchWebsite,
  SendEmail,
  SendSMS
};

