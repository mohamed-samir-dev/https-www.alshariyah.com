/**
 * TikTok Pixel Event Tracking — شريحة برو
 * Pixel ID: DBLMNC3C77U8I4RJ3B6G
 *
 * يغطي هذا الملف جميع أحداث TikTok الموحّدة:
 *   ViewContent | AddToCart | InitiateCheckout | CompletePayment | PlaceAnOrder
 *
 * يستخدم ttq.track() (global pixel) وليس instance() لأن
 * GTM يحمل الـ pixel مباشرةً على window.ttq.
 */

import type { Product } from '../components/products/types';

// ─── الثوابت ───────────────────────────────────────────────────
export const TIKTOK_PIXEL_ID = 'DBLMNC3C77U8I4RJ3B6G';

// ─── Types ─────────────────────────────────────────────────────
interface TikTokContent {
  content_id: string;       // مطلوب لـ VSA
  content_name: string;
  content_type: 'product';
  quantity: number;
  price: number;
}

interface TikTokEventPayload {
  content_id: string;        // مطلوب لـ VSA
  content_ids: string[];     // مطلوب
  content_type: 'product';
  content_name: string;
  content_category?: string;
  currency: string;
  value: number;
  quantity: number;
  contents: TikTokContent[];
}

// ─── Guard ─────────────────────────────────────────────────────
function getTtq(): TikTokPixel | null {
  if (typeof window === 'undefined') return null;
  const ttq = window.ttq;
  if (!ttq || typeof ttq.track !== 'function') return null;
  return ttq;
}

/** بناء الـ payload بشكل موحّد مع ضمان وجود content_id في كل مكان */
function buildPayload(product: Product, quantity: number): TikTokEventPayload {
  const price = product.salePrice ?? product.originalPrice ?? product.price ?? 0;
  const value = price * quantity;
  const id    = product._id;

  return {
    content_id:       id,            // ✅ مطلوب لـ VSA
    content_ids:      [id],          // ✅ مطلوب
    content_type:     'product',
    content_name:     product.name  || '',
    content_category: product.category || product.brand || '',
    currency:         'SAR',
    value,
    quantity,
    contents: [
      {
        content_id:   id,            // ✅ داخل contents كمان
        content_name: product.name  || '',
        content_type: 'product',
        quantity,
        price,
      },
    ],
  };
}

// ─── Validation ────────────────────────────────────────────────
function isValidProduct(product: Product, quantity: number): boolean {
  if (!product._id?.trim()) return false;
  const price = product.salePrice ?? product.originalPrice ?? product.price ?? 0;
  const value = price * quantity;
  if (!Number.isFinite(value) || value < 0) return false;
  if (!Number.isInteger(quantity) || quantity < 1) return false;
  return true;
}

// ─── Events ────────────────────────────────────────────────────

/**
 * ViewContent — عند فتح صفحة المنتج
 */
export function trackTikTokViewContent(product: Product, quantity = 1): boolean {
  if (!isValidProduct(product, quantity)) return false;
  const ttq = getTtq();
  if (!ttq) return false;

  try {
    ttq.track('ViewContent', buildPayload(product, quantity));
    return true;
  } catch (e) {
    console.error('[TikTok] ViewContent error:', e);
    return false;
  }
}

/**
 * AddToCart — عند إضافة منتج للسلة
 */
export function trackTikTokAddToCart(product: Product, quantity = 1): boolean {
  if (!isValidProduct(product, quantity)) return false;
  const ttq = getTtq();
  if (!ttq) return false;

  try {
    ttq.track('AddToCart', buildPayload(product, quantity));
    return true;
  } catch (e) {
    console.error('[TikTok] AddToCart error:', e);
    return false;
  }
}

/**
 * InitiateCheckout — عند بدء الدفع
 */
export function trackTikTokInitiateCheckout(
  products: { product: Product; quantity: number }[]
): boolean {
  if (!products.length) return false;
  const ttq = getTtq();
  if (!ttq) return false;

  try {
    const contents: TikTokContent[] = products.map(({ product, quantity }) => ({
      content_id:   product._id,
      content_name: product.name  || '',
      content_type: 'product',
      quantity,
      price: product.salePrice ?? product.originalPrice ?? product.price ?? 0,
    }));

    const totalValue = contents.reduce((s, c) => s + c.price * c.quantity, 0);
    const firstId    = products[0].product._id;

    ttq.track('InitiateCheckout', {
      content_id:   firstId,
      content_ids:  products.map(({ product }) => product._id),
      content_type: 'product',
      content_name: products[0].product.name || '',
      currency:     'SAR',
      value:        totalValue,
      quantity:     contents.reduce((s, c) => s + c.quantity, 0),
      contents,
    });
    return true;
  } catch (e) {
    console.error('[TikTok] InitiateCheckout error:', e);
    return false;
  }
}

/**
 * CompletePayment — عند نجاح الدفع
 */
export function trackTikTokCompletePayment(
  products: { product: Product; quantity: number }[]
): boolean {
  if (!products.length) return false;
  const ttq = getTtq();
  if (!ttq) return false;

  try {
    const contents: TikTokContent[] = products.map(({ product, quantity }) => ({
      content_id:   product._id,
      content_name: product.name  || '',
      content_type: 'product',
      quantity,
      price: product.salePrice ?? product.originalPrice ?? product.price ?? 0,
    }));

    const totalValue = contents.reduce((s, c) => s + c.price * c.quantity, 0);
    const firstId    = products[0].product._id;

    ttq.track('CompletePayment', {
      content_id:   firstId,
      content_ids:  products.map(({ product }) => product._id),
      content_type: 'product',
      content_name: products[0].product.name || '',
      currency:     'SAR',
      value:        totalValue,
      quantity:     contents.reduce((s, c) => s + c.quantity, 0),
      contents,
    });
    return true;
  } catch (e) {
    console.error('[TikTok] CompletePayment error:', e);
    return false;
  }
}

/**
 * PlaceAnOrder — عند تأكيد الطلب
 */
export function trackTikTokPlaceAnOrder(
  products: { product: Product; quantity: number }[]
): boolean {
  if (!products.length) return false;
  const ttq = getTtq();
  if (!ttq) return false;

  try {
    const contents: TikTokContent[] = products.map(({ product, quantity }) => ({
      content_id:   product._id,
      content_name: product.name  || '',
      content_type: 'product',
      quantity,
      price: product.salePrice ?? product.originalPrice ?? product.price ?? 0,
    }));

    const totalValue = contents.reduce((s, c) => s + c.price * c.quantity, 0);
    const firstId    = products[0].product._id;

    ttq.track('PlaceAnOrder', {
      content_id:   firstId,
      content_ids:  products.map(({ product }) => product._id),
      content_type: 'product',
      content_name: products[0].product.name || '',
      currency:     'SAR',
      value:        totalValue,
      quantity:     contents.reduce((s, c) => s + c.quantity, 0),
      contents,
    });
    return true;
  } catch (e) {
    console.error('[TikTok] PlaceAnOrder error:', e);
    return false;
  }
}

// ─── Legacy adapter (backward compat) ──────────────────────────
/** يُستخدم من cartEvents.ts و productEvents.ts القديم */
export function trackProductEvent(
  event: 'view_item' | 'add_to_cart',
  product: Product,
  quantity = 1
): boolean {
  if (event === 'view_item') return trackTikTokViewContent(product, quantity);
  if (event === 'add_to_cart') return trackTikTokAddToCart(product, quantity);
  return false;
}
