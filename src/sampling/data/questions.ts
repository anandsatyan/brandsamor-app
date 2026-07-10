import type { LucideIcon } from 'lucide-react';
import {
  Gift,
  Heart,
  HelpCircle,
  Scissors,
  Shirt,
  Sparkles,
  Sprout,
  Star,
} from 'lucide-react';

export interface OptionItem {
  value: string;
  label: string;
  description?: string;
  icon?: LucideIcon;
}

export const BRAND_STAGE_OPTIONS: OptionItem[] = [
  { value: 'exploring', label: 'Exploring a fragrance idea' },
  { value: 'first-launch', label: 'Preparing for my first launch' },
  { value: 'adding-fragrance', label: 'Adding fragrance to an existing brand' },
  { value: 'reworking', label: 'Reworking or expanding an existing fragrance line' },
  { value: 'recommend', label: 'Recommend the best starting route for me' },
];

export const BUSINESS_TYPE_OPTIONS: OptionItem[] = [
  { value: 'fashion', label: 'Fashion boutique or apparel brand', icon: Shirt },
  { value: 'beauty', label: 'Beauty or skincare brand', icon: Sparkles },
  { value: 'salon', label: 'Salon or spa', icon: Scissors },
  { value: 'wellness', label: 'Wellness or lifestyle brand', icon: Sprout },
  { value: 'creator', label: 'Creator or personal brand', icon: Star },
  { value: 'hospitality', label: 'Hospitality, gifting, or events', icon: Gift },
  { value: 'standalone', label: 'Standalone fragrance brand', icon: Heart },
  { value: 'other', label: 'Other', icon: HelpCircle },
  { value: 'unsure', label: "I'm not sure how to classify it", icon: HelpCircle },
];

export const SCENT_EXPRESSION_OPTIONS: OptionItem[] = [
  { value: 'feminine-leaning', label: 'Feminine-leaning' },
  { value: 'masculine-leaning', label: 'Masculine-leaning' },
  { value: 'gender-neutral', label: 'Gender-neutral' },
  { value: 'mix', label: 'A mix of different expressions' },
  { value: 'recommend', label: 'Recommend for me' },
];

export const BRAND_PERSONALITY_OPTIONS: OptionItem[] = [
  { value: 'fresh-clean', label: 'Fresh and clean' },
  { value: 'soft-elegant', label: 'Soft and elegant' },
  { value: 'sweet-playful', label: 'Sweet and playful' },
  { value: 'warm-sensual', label: 'Warm and sensual' },
  { value: 'bold-luxurious', label: 'Bold and luxurious' },
  { value: 'natural-calming', label: 'Natural and calming' },
  { value: 'dark-mysterious', label: 'Dark and mysterious' },
  { value: 'modern-energetic', label: 'Modern and energetic' },
  { value: 'minimal-understated', label: 'Minimal and understated' },
  { value: 'recommend', label: 'Recommend for me' },
];

export const SCENT_FAMILY_OPTIONS: OptionItem[] = [
  { value: 'citrus-fresh', label: 'Citrus and fresh', description: 'Bright, crisp and energising' },
  { value: 'aquatic-aromatic', label: 'Aquatic and aromatic', description: 'Airy, clean, herbal or ocean-inspired' },
  { value: 'floral', label: 'Floral', description: 'Soft petals, elegant bouquets or rich white flowers' },
  { value: 'fruity', label: 'Fruity', description: 'Juicy, lively and contemporary' },
  { value: 'gourmand', label: 'Gourmand', description: 'Vanilla, coffee, dessert-like or indulgent' },
  { value: 'woody', label: 'Woody', description: 'Dry, earthy, smoky or polished woods' },
  { value: 'amber-spicy', label: 'Amber and spicy', description: 'Warm, sensual, enveloping or mysterious' },
  { value: 'recommend', label: 'Recommend for me', description: 'Choose the most suitable mix based on my brief' },
];

export const INTENSITY_OPTIONS: OptionItem[] = [
  { value: 'light', label: 'Light and close to the skin' },
  { value: 'versatile', label: 'Noticeable and versatile' },
  { value: 'strong', label: 'Strong and long-lasting' },
  { value: 'varied', label: 'A varied set' },
  { value: 'recommend', label: 'Recommend for me' },
];

export const USE_CASE_OPTIONS: OptionItem[] = [
  { value: 'everyday', label: 'Everyday wear' },
  { value: 'work', label: 'Work or daytime' },
  { value: 'evening', label: 'Evening or special occasions' },
  { value: 'gifting', label: 'Gifting' },
  { value: 'hospitality', label: 'Hospitality or branded experiences' },
  { value: 'mixed', label: 'A mix of uses' },
  { value: 'recommend', label: 'Recommend for me' },
];

export const EXCLUSION_OPTIONS: OptionItem[] = [
  { value: 'very-sweet', label: 'Very sweet' },
  { value: 'heavy-oud', label: 'Heavy oud' },
  { value: 'strong-smoke', label: 'Strong smoke' },
  { value: 'powdery', label: 'Powdery scents' },
  { value: 'sharp-citrus', label: 'Sharp citrus' },
  { value: 'strong-florals', label: 'Strong florals' },
  { value: 'marine-aquatic', label: 'Marine or aquatic scents' },
  { value: 'spicy', label: 'Spicy scents' },
  { value: 'none', label: 'None of these' },
  { value: 'unsure', label: "I'm not sure" },
];

export const PACKAGING_OPTIONS: OptionItem[] = [
  { value: 'minimal-modern', label: 'Minimal and modern', description: 'Clean lines, restrained typography and a contemporary feel.' },
  { value: 'boutique-expressive', label: 'Boutique and expressive', description: 'Distinctive details with a creative, boutique character.' },
  { value: 'premium-refined', label: 'Premium and refined', description: 'Understated luxury with polished finishes and balance.' },
  { value: 'bold-impact', label: 'Bold and high-impact', description: 'Strong presence designed to stand out on shelf or in gifting.' },
  { value: 'classic-timeless', label: 'Classic and timeless', description: 'Enduring shapes and a familiar, trusted impression.' },
  { value: 'recommend', label: 'Recommend for me', description: 'We will suggest a direction based on your brief.' },
];

export const BOTTLE_SIZE_OPTIONS: OptionItem[] = [
  { value: '30ml', label: '30 ml' },
  { value: '50ml', label: '50 ml' },
  { value: '100ml', label: '100 ml' },
  { value: 'travel', label: 'Travel size or roll-on' },
  { value: 'recommend', label: 'I have not decided — recommend for me' },
];

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SG', name: 'Singapore' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'IE', name: 'Ireland' },
  { code: 'BE', name: 'Belgium' },
  { code: 'AT', name: 'Austria' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PL', name: 'Poland' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'QA', name: 'Qatar' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'EG', name: 'Egypt' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'KE', name: 'Kenya' },
  { code: 'OTHER', name: 'Other' },
];

export const LABEL_MAP: Record<string, string> = {
  exploring: 'Exploring a fragrance idea',
  'first-launch': 'Preparing for my first launch',
  'adding-fragrance': 'Adding fragrance to an existing brand',
  reworking: 'Reworking or expanding an existing fragrance line',
  recommend: 'Brandsamor will recommend for you',
  fashion: 'Fashion boutique or apparel brand',
  beauty: 'Beauty or skincare brand',
  salon: 'Salon or spa',
  wellness: 'Wellness or lifestyle brand',
  creator: 'Creator or personal brand',
  hospitality: 'Hospitality, gifting, or events',
  standalone: 'Standalone fragrance brand',
  other: 'Other',
  unsure: "Not sure — Brandsamor will recommend",
  'feminine-leaning': 'Feminine-leaning',
  'masculine-leaning': 'Masculine-leaning',
  'gender-neutral': 'Gender-neutral',
  mix: 'A mix of different expressions',
  'fresh-clean': 'Fresh and clean',
  'soft-elegant': 'Soft and elegant',
  'sweet-playful': 'Sweet and playful',
  'warm-sensual': 'Warm and sensual',
  'bold-luxurious': 'Bold and luxurious',
  'natural-calming': 'Natural and calming',
  'dark-mysterious': 'Dark and mysterious',
  'modern-energetic': 'Modern and energetic',
  'minimal-understated': 'Minimal and understated',
  'citrus-fresh': 'Citrus and fresh',
  'aquatic-aromatic': 'Aquatic and aromatic',
  floral: 'Floral',
  fruity: 'Fruity',
  gourmand: 'Gourmand',
  woody: 'Woody',
  'amber-spicy': 'Amber and spicy',
  light: 'Light and close to the skin',
  versatile: 'Noticeable and versatile',
  strong: 'Strong and long-lasting',
  varied: 'A varied set',
  everyday: 'Everyday wear',
  work: 'Work or daytime',
  evening: 'Evening or special occasions',
  gifting: 'Gifting',
  'minimal-modern': 'Minimal and modern',
  'boutique-expressive': 'Boutique and expressive',
  'premium-refined': 'Premium and refined',
  'bold-impact': 'Bold and high-impact',
  'classic-timeless': 'Classic and timeless',
  '30ml': '30 ml',
  '50ml': '50 ml',
  '100ml': '100 ml',
  travel: 'Travel size or roll-on',
  'very-sweet': 'Very sweet',
  'heavy-oud': 'Heavy oud',
  'strong-smoke': 'Strong smoke',
  powdery: 'Powdery scents',
  'sharp-citrus': 'Sharp citrus',
  'strong-florals': 'Strong florals',
  'marine-aquatic': 'Marine or aquatic scents',
  spicy: 'Spicy scents',
  none: 'None of these',
};

export const getLabel = (value: string | undefined, fallback = 'Not provided') =>
  value ? LABEL_MAP[value] ?? value : fallback;
