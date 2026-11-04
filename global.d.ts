declare module "*.css";

// TikTok Pixel (ttq) global type declaration
// Payload يغطي كل أحداث ttq (ViewContent, AddToCart, CompletePayment…)
interface TikTokPixelPayload {
  content_id?: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
  price?: number;
  quantity?: number;
  currency?: string;
  value?: number;
  contents?: { content_id: string; content_name: string; quantity: number; price: number }[];
  [key: string]: unknown;
}

interface TikTokPixel {
  track: (event: string, payload?: TikTokPixelPayload) => void;
  page: () => void;
  identify: (params: Record<string, unknown>) => void;
  // instance(id) يُستخدم لتتبع catalog pixel منفصل
  instance?: (id: string) => { track: (event: string, payload: TikTokPixelPayload) => void };
  _i?: Record<string, unknown>;
}

interface Window {
  ttq?: TikTokPixel;
  dataLayer: unknown[];
}
