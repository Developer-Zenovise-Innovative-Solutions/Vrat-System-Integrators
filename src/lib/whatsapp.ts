/**
 * Generates universal desktop & mobile compatible WhatsApp chat links
 */
export function getWhatsAppUrl(phoneOrWhatsapp: string, prefilledText?: string): string {
  if (!phoneOrWhatsapp) return "https://wa.me/919510759646";
  const digits = phoneOrWhatsapp.replace(/[^0-9]/g, "");
  // If standard 10 digit Indian mobile number, prefix 91
  const formatted = digits.length === 10 ? `91${digits}` : digits;
  const baseUrl = `https://wa.me/${formatted}`;
  return prefilledText ? `${baseUrl}?text=${encodeURIComponent(prefilledText)}` : baseUrl;
}

