export type ImageMessage = {
  messaging_product: "whatsapp";
  recipient_type: string;
  to: string;
  type: "image";
  image: { link: string; caption: string | null } | { id: string; caption: string | null };
};

export type AudioMessage = {
  messaging_product: "whatsapp";
  recipient_type?: string;
  to: string;
  type: "audio";
  audio: { link: string } | { id: string };
};

export type VideoMessage = {
  messaging_product: "whatsapp";
  recipient_type?: string;
  to: string;
  type: "video";
  video: { link: string, caption: string | null } | { id: string, caption: string | null };
};

export type DocumentMessage = {
  messaging_product: "whatsapp";
  recipient_type?: string;
  to: string;
  type: "document";
  document: { link: string, caption: string | null, filename: string } | { id: string, caption: string | null, filename: string };
};

export type LocationMessage = {
  messaging_product: "whatsapp";
  recipient_type?: string;
  to: string;
  type: "location";
  location: { latitude: number; longitude: number; name: string | null; address: string | null };
};