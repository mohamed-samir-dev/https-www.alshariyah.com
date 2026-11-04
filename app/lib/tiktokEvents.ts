/**
 * TikTok Pixel Event Tracking
 * يتم استخدام هذه الدوال لإرسال الأحداث إلى TikTok Pixel
 * مستخرج ومطابق للمشروع الأصلي sharehaa-net-clone
 */

/**
 * Track ViewContent event - عند عرض صفحة المنتج
 */
export function pushTikTokViewContent(params: {
  content_id: string;
  content_type: string;
  content_name: string;
  content_category?: string;
  price: number;
  quantity?: number;
  currency?: string;
  value: number;
}) {
  if (typeof window === "undefined" || !window.ttq) return;

  try {
    window.ttq.track("ViewContent", {
      content_id: params.content_id,
      content_type: params.content_type || "product",
      content_name: params.content_name,
      content_category: params.content_category || "",
      price: params.price,
      quantity: params.quantity || 1,
      currency: params.currency || "SAR",
      value: params.value,
      contents: [
        {
          content_id: params.content_id,
          content_name: params.content_name,
          content_type: "product",
          quantity: params.quantity || 1,
          price: params.price,
        },
      ],
    });
  } catch (error) {
    console.error("TikTok ViewContent tracking error:", error);
  }
}

/**
 * Track AddToCart event - عند إضافة منتج للسلة
 */
export function pushTikTokAddToCart(params: {
  content_id: string;
  content_type: string;
  content_name: string;
  content_category?: string;
  price: number;
  quantity: number;
  currency?: string;
  value: number;
}) {
  if (typeof window === "undefined" || !window.ttq) return;

  try {
    window.ttq.track("AddToCart", {
      content_id: params.content_id,
      content_type: params.content_type || "product",
      content_name: params.content_name,
      content_category: params.content_category || "",
      price: params.price,
      quantity: params.quantity,
      currency: params.currency || "SAR",
      value: params.value,
      contents: [
        {
          content_id: params.content_id,
          content_name: params.content_name,
          content_type: "product",
          quantity: params.quantity,
          price: params.price,
        },
      ],
    });
  } catch (error) {
    console.error("TikTok AddToCart tracking error:", error);
  }
}

/**
 * Track InitiateCheckout event - عند بدء عملية الدفع
 */
export function pushTikTokInitiateCheckout(params: {
  content_ids: string[];
  content_type: string;
  content_name: string;
  content_category?: string;
  price: number;
  quantity: number;
  currency?: string;
  value: number;
}) {
  if (typeof window === "undefined" || !window.ttq) return;

  try {
    const primaryId = params.content_ids[0] || "";
    window.ttq.track("InitiateCheckout", {
      content_id: primaryId,
      content_ids: params.content_ids,
      content_type: params.content_type || "product",
      content_name: params.content_name,
      content_category: params.content_category || "",
      price: params.price,
      quantity: params.quantity,
      currency: params.currency || "SAR",
      value: params.value,
      contents: params.content_ids.map((id) => ({
        content_id: id,
        content_name: params.content_name,
        content_type: "product",
        quantity: params.quantity,
        price: params.price,
      })),
    });
  } catch (error) {
    console.error("TikTok InitiateCheckout tracking error:", error);
  }
}

/**
 * Track CompletePayment event - عند إتمام الدفع بنجاح
 */
export function pushTikTokCompletePayment(params: {
  content_ids: string[];
  content_type: string;
  content_name: string;
  content_category?: string;
  price: number;
  quantity: number;
  currency?: string;
  value: number;
}) {
  if (typeof window === "undefined" || !window.ttq) return;

  try {
    const primaryId = params.content_ids[0] || "";
    window.ttq.track("CompletePayment", {
      content_id: primaryId,
      content_ids: params.content_ids,
      content_type: params.content_type || "product",
      content_name: params.content_name,
      content_category: params.content_category || "",
      price: params.price,
      quantity: params.quantity,
      currency: params.currency || "SAR",
      value: params.value,
      contents: params.content_ids.map((id) => ({
        content_id: id,
        content_name: params.content_name,
        content_type: "product",
        quantity: params.quantity,
        price: params.price,
      })),
    });
  } catch (error) {
    console.error("TikTok CompletePayment tracking error:", error);
  }
}

/**
 * Track PlaceAnOrder event - عند تأكيد الطلب
 */
export function pushTikTokPlaceAnOrder(params: {
  content_ids: string[];
  content_type: string;
  content_name: string;
  content_category?: string;
  price: number;
  quantity: number;
  currency?: string;
  value: number;
}) {
  if (typeof window === "undefined" || !window.ttq) return;

  try {
    const primaryId = params.content_ids[0] || "";
    window.ttq.track("PlaceAnOrder", {
      content_id: primaryId,
      content_ids: params.content_ids,
      content_type: params.content_type || "product",
      content_name: params.content_name,
      content_category: params.content_category || "",
      price: params.price,
      quantity: params.quantity,
      currency: params.currency || "SAR",
      value: params.value,
      contents: params.content_ids.map((id) => ({
        content_id: id,
        content_name: params.content_name,
        content_type: "product",
        quantity: params.quantity,
        price: params.price,
      })),
    });
  } catch (error) {
    console.error("TikTok PlaceAnOrder tracking error:", error);
  }
}
