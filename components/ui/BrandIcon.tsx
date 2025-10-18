import { SiWhatsapp, SiTelegram, SiViber } from "react-icons/si";

export type Brand = "whatsapp" | "telegram" | "viber";

export function BrandIcon({
  brand,
  size = 20,
  className = "",
  title,
}: {
  brand: Brand;
  size?: number;
  className?: string;
  title?: string;
}) {
  const common = { size, className, "aria-hidden": true } as const;

  switch (brand) {
    case "whatsapp":
      return <SiWhatsapp {...common} color="#25D366" title={title ?? "WhatsApp"} />;
    case "telegram":
      return <SiTelegram {...common} color="#26A5E4" title={title ?? "Telegram"} />;
    case "viber":
      return <SiViber {...common} color="#7360F2" title={title ?? "Viber"} />;
  }
}
