import { Instagram, Facebook } from 'lucide-react'

const TIKTOK_URL = 'https://www.tiktok.com/@urbanclasiccmya?_r=1&_t=ZS-97v7ptHi2an'
const FACEBOOK_URL = 'https://www.facebook.com/share/1QfXFCSgRt/'

function TikTokIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82c-1-.86-1.6-2.13-1.6-3.52h-3.1v13.4c0 1.5-1.22 2.7-2.72 2.7a2.72 2.72 0 0 1 0-5.44c.25 0 .5.03.72.1V9.9a5.8 5.8 0 0 0-.72-.05 5.87 5.87 0 1 0 5.87 5.87V9.1a7.9 7.9 0 0 0 4.63 1.5V7.5a4.83 4.83 0 0 1-3.08-1.68Z" />
    </svg>
  )
}

const SOCIALS = [
  { id: 'instagram', label: 'Instagram', href: '#', Icon: Instagram, comingSoon: true },
  { id: 'tiktok', label: 'TikTok', href: TIKTOK_URL, Icon: TikTokIcon, comingSoon: false },
  { id: 'facebook', label: 'Facebook', href: FACEBOOK_URL, Icon: Facebook, comingSoon: false },
]

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {SOCIALS.map(({ id, label, href, Icon, comingSoon }) => (
        <li key={id}>
          {comingSoon ? (
            <span
              aria-disabled="true"
              title={`${label} — próximamente`}
              className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full border border-line text-fog/50"
            >
              <Icon size={18} strokeWidth={1.5} />
            </span>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fog transition-colors duration-300 hover:border-brass hover:text-brass"
            >
              <Icon size={18} strokeWidth={1.5} />
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
