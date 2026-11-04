declare module "*.css";

// TikTok Pixel (ttq) global type declaration
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
  [key: string]: unknown;
}

interface TikTokPixel {
  track: (event: string, payload?: TikTokPixelPayload) => void;
  page: () => void;
  identify: (params: Record<string, unknown>) => void;
  instance?: (id: string) => { track: (event: string, payload?: TikTokPixelPayload) => void };
  _i?: Record<string, unknown>;
}

interface Window {
  ttq: TikTokPixel;
  dataLayer: unknown[];
}
