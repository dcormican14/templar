// Icon registry - consolidates iconoir-react imports
// This file dynamically imports all available icons from iconoir-react

import * as IconoirIcons from 'iconoir-react';

// Filter out non-icon exports (IconoirContext, IconoirProvider, default export)
const iconComponents = Object.entries(IconoirIcons).reduce((acc, [name, component]) => {
  // Skip non-icon exports
  if (name === 'IconoirContext' || name === 'IconoirProvider' || name === 'default') {
    return acc;
  }
  
  // Add the icon component
  acc[name] = component;
  return acc;
}, {} as Record<string, React.ComponentType<any>>);
// Create the icon registry with string name mappings
export const iconRegistry: Record<string, React.ComponentType<any>> = {
  // Direct component name mappings
  ...iconComponents,
  
  // Common kebab-case aliases for frequently used icons
  'arrow-right': iconComponents.ArrowRight,
  'arrow-left': iconComponents.ArrowLeft,
  'arrow-up': iconComponents.ArrowUp,
  'arrow-down': iconComponents.ArrowDown,
  'check-circle': iconComponents.CheckCircle,
  'x-mark': iconComponents.Xmark,
  'warning-triangle': iconComponents.WarningTriangle,
  'info-circle': iconComponents.InfoCircle,
  'user-circle': iconComponents.UserCircle,
  'user-plus': iconComponents.UserPlus,
  'bell-notification': iconComponents.BellNotification,
  'bell-off': iconComponents.BellOff,
  'message-text': iconComponents.MessageText,
  'mail-in': iconComponents.MailIn,
  'mail-out': iconComponents.MailOut,
  'edit-pencil': iconComponents.EditPencil,
  'eye-closed': iconComponents.EyeClosed,
  'refresh-double': iconComponents.RefreshDouble,
  'share-android': iconComponents.ShareAndroid,
  'share-ios': iconComponents.ShareIos,
  'sun-light': iconComponents.SunLight,
  'half-moon': iconComponents.HalfMoon,
  'fast-arrow-right': iconComponents.FastArrowRight,
  'fast-arrow-left': iconComponents.FastArrowLeft,
  'skip-next': iconComponents.SkipNext,
  'skip-prev': iconComponents.SkipPrev,
  'sound-high': iconComponents.SoundHigh,
  'sound-low': iconComponents.SoundLow,
  'sound-off': iconComponents.SoundOff,
  'folder-plus': iconComponents.FolderPlus,
  'wifi-off': iconComponents.WifiOff,
  'antenna-off': iconComponents.AntennaOff,
  'shield-check': iconComponents.ShieldCheck,
  'cloud-download': iconComponents.CloudDownload,
  'cloud-upload': iconComponents.CloudUpload,
  'cloud-sync': iconComponents.CloudSync,
  'cart-plus': iconComponents.CartPlus,
  'shopping-bag': iconComponents.ShoppingBag,
  'credit-card': iconComponents.CreditCard,
  'sort-up': iconComponents.SortUp,
  'sort-down': iconComponents.SortDown,
  'question-mark': iconComponents.QuestionMark,
  'warning-circle': iconComponents.WarningCircle,
  'xmark-circle': iconComponents.XmarkCircle,
  'help-circle': iconComponents.HelpCircle,
  'calendar-plus': iconComponents.CalendarPlus,
  'timer-off': iconComponents.TimerOff,
  'coffee-cup': iconComponents.CoffeeCup,
  'medal-1st': iconComponents.Medal1st,
  'map-pin': iconComponents.MapPin,
  
  // Common lowercase aliases (only if they exist in iconComponents)
  ...(iconComponents.Home && { home: iconComponents.Home }),
  ...(iconComponents.User && { user: iconComponents.User }),
  ...(iconComponents.Settings && { settings: iconComponents.Settings }),
  ...(iconComponents.Search && { search: iconComponents.Search }),
  ...(iconComponents.Bell && { bell: iconComponents.Bell }),
  ...(iconComponents.Heart && { heart: iconComponents.Heart }),
  ...(iconComponents.Star && { star: iconComponents.Star }),
  ...(iconComponents.Menu && { menu: iconComponents.Menu }),
  ...(iconComponents.Check && { check: iconComponents.Check }),
  ...(iconComponents.Plus && { plus: iconComponents.Plus }),
  ...(iconComponents.Minus && { minus: iconComponents.Minus }),
  ...(iconComponents.Trash && { trash: iconComponents.Trash }),
  ...(iconComponents.Eye && { eye: iconComponents.Eye }),
  ...(iconComponents.Lock && { lock: iconComponents.Lock }),
  ...(iconComponents.Download && { download: iconComponents.Download }),
  ...(iconComponents.Upload && { upload: iconComponents.Upload }),
  ...(iconComponents.Copy && { copy: iconComponents.Copy }),
  ...(iconComponents.Play && { play: iconComponents.Play }),
  ...(iconComponents.Pause && { pause: iconComponents.Pause }),
  ...(iconComponents.Phone && { phone: iconComponents.Phone }),
  ...(iconComponents.Mail && { mail: iconComponents.Mail }),
  ...(iconComponents.Message && { message: iconComponents.Message }),
  ...(iconComponents.Microphone && { microphone: iconComponents.Microphone }),
  ...(iconComponents.Camera && { camera: iconComponents.Camera }),
  ...(iconComponents.Folder && { folder: iconComponents.Folder }),
  ...(iconComponents.Computer && { computer: iconComponents.Computer }),
  ...(iconComponents.Laptop && { laptop: iconComponents.Laptop }),
  ...(iconComponents.Wifi && { wifi: iconComponents.Wifi }),
  ...(iconComponents.Bluetooth && { bluetooth: iconComponents.Bluetooth }),
  ...(iconComponents.Antenna && { antenna: iconComponents.Antenna }),
  ...(iconComponents.Shield && { shield: iconComponents.Shield }),
  ...(iconComponents.Cloud && { cloud: iconComponents.Cloud }),
  ...(iconComponents.Database && { database: iconComponents.Database }),
  ...(iconComponents.Cart && { cart: iconComponents.Cart }),
  ...(iconComponents.Wallet && { wallet: iconComponents.Wallet }),
  ...(iconComponents.Coins && { coins: iconComponents.Coins }),
  ...(iconComponents.Dollar && { dollar: iconComponents.Dollar }),
  ...(iconComponents.Euro && { euro: iconComponents.Euro }),
  ...(iconComponents.Filter && { filter: iconComponents.Filter }),
  ...(iconComponents.Sort && { sort: iconComponents.Sort }),
  ...(iconComponents.Link && { link: iconComponents.Link }),
  ...(iconComponents.Forward && { forward: iconComponents.Forward }),
  ...(iconComponents.Reply && { reply: iconComponents.Reply }),
  ...(iconComponents.Calendar && { calendar: iconComponents.Calendar }),
  ...(iconComponents.Clock && { clock: iconComponents.Clock }),
  ...(iconComponents.Timer && { timer: iconComponents.Timer }),
  ...(iconComponents.Hourglass && { hourglass: iconComponents.Hourglass }),
  ...(iconComponents.Wind && { wind: iconComponents.Wind }),
  ...(iconComponents.Car && { car: iconComponents.Car }),
  ...(iconComponents.Truck && { truck: iconComponents.Truck }),
  ...(iconComponents.Bus && { bus: iconComponents.Bus }),
  ...(iconComponents.Train && { train: iconComponents.Train }),
  ...(iconComponents.Bicycle && { bicycle: iconComponents.Bicycle }),
  ...(iconComponents.Apple && { apple: iconComponents.Apple }),
  ...(iconComponents.Running && { running: iconComponents.Running }),
  ...(iconComponents.Gym && { gym: iconComponents.Gym }),
  ...(iconComponents.Trophy && { trophy: iconComponents.Trophy }),
  ...(iconComponents.Medal && { medal: iconComponents.Medal }),
  ...(iconComponents.Building && { building: iconComponents.Building }),
  ...(iconComponents.Shop && { shop: iconComponents.Shop }),
  ...(iconComponents.Bookmark && { bookmark: iconComponents.Bookmark }),
  ...(iconComponents.Pin && { pin: iconComponents.Pin }),
  ...(iconComponents.Compass && { compass: iconComponents.Compass }),
  ...(iconComponents.Gamepad && { gamepad: iconComponents.Gamepad }),
  ...(iconComponents.Calculator && { calculator: iconComponents.Calculator }),
  ...(iconComponents.Palette && { palette: iconComponents.Palette }),
  ...(iconComponents.Google && { google: iconComponents.Google }),
  ...(iconComponents.Windows && { windows: iconComponents.Windows }),
  ...(iconComponents.Github && { github: iconComponents.Github }),
  ...(iconComponents.Discord && { discord: iconComponents.Discord }),
  ...(iconComponents.Spotify && { spotify: iconComponents.Spotify }),
  ...(iconComponents.Youtube && { youtube: iconComponents.Youtube }),
  ...(iconComponents.Twitter && { twitter: iconComponents.Twitter }),
  ...(iconComponents.Instagram && { instagram: iconComponents.Instagram }),
  ...(iconComponents.Facebook && { facebook: iconComponents.Facebook }),
  ...(iconComponents.Linkedin && { linkedin: iconComponents.Linkedin }),
};

// Export available icon names for documentation/autocomplete
export const availableIcons = Object.keys(iconRegistry);

// Helper function to get an icon component by name
export function getIcon(name: string): React.ComponentType<any> | undefined {
  return iconRegistry[name];
}

// Export count for debugging
export const iconCount = availableIcons.length;

console.log(`Icon registry loaded with ${iconCount} icons`);

export type IconName = keyof typeof iconRegistry;
