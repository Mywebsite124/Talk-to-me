
import { Plan, ImageItem } from './types';

export const DEFAULT_HERO_IMAGE = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1920&auto=format&fit=crop";

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    price: 0,
    duration: 'Once',
    description: 'Perfect for getting to know me.',
    features: ['5 Minutes Video Call', 'High Quality Connection', 'Instant Booking'],
    redirectUrl: 'https://example.com/trial',
  },
  {
    id: 'weekly',
    name: 'Weekly Pass',
    price: 20,
    duration: 'per week',
    description: 'For regular connections.',
    features: ['5 Separate Video Calls', 'Duration: 15 mins per call', 'Priority Scheduling', 'Chat Support'],
    redirectUrl: 'https://example.com/weekly',
  },
  {
    id: 'monthly',
    name: 'VVIP Monthly',
    price: 100,
    duration: 'per month',
    description: 'The ultimate dating experience.',
    features: ['Unlimited Video Calls', '24/7 Priority Access', 'Private Chat Room', 'Early Access to Content'],
    isPopular: true,
    redirectUrl: 'https://example.com/monthly',
  },
];

const DEFAULT_PHOTO_IDS = [
  '1529626455594-4ff0802cfb7e',
  '1494790108377-be9c29b29330',
  '1531746020798-e6953c6e8e04',
  '1507003211169-0a1dd7228f2d',
  '1534528741775-53994a69daeb',
  '1517841905240-472988babdf9',
  '1524504388940-b1c1722653e1',
  '1581403341630-a6e0b9d2d29e',
  '1526510747391-58c975878291',
  '1604311795833-25e1d5bc8286'
];

export const DEFAULT_IMAGES: ImageItem[] = DEFAULT_PHOTO_IDS.map((id, i) => ({
  id: i + 1,
  url: `https://images.unsplash.com/photo-${id}?q=80&w=800&auto=format&fit=crop`,
  alt: `Exclusive Profile image ${i + 1}`,
}));
