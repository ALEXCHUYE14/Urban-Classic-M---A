import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../lib/contact'

const DEFAULT_MESSAGE = 'Hola, quiero más información sobre Urban Classic M&A.'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-transform duration-300 hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle size={26} strokeWidth={1.75} />
    </a>
  )
}
