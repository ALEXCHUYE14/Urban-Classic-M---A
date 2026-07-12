import Hero from '../components/Hero'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedSection from '../components/FeaturedSection'
import Testimonials from '../components/Testimonials'
import InstagramGallery from '../components/InstagramGallery'
import Faq from '../components/Faq'

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoryGrid />
      <FeaturedSection />
      <Testimonials />
      <InstagramGallery />
      <Faq />
    </main>
  )
}
