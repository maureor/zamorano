import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedTrips } from "@/components/featured-trips"
import { TripCategories } from "@/components/trip-categories"
import { WhyChooseUs } from "@/components/why-choose-us"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsSection } from "@/components/news-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <FeaturedTrips />
        <TripCategories />
        <WhyChooseUs />
        <TestimonialsSection />
        {/* Ocultar NewsSection en móvil para mejor UX */}
        <div className="hidden md:block">
          <NewsSection />
        </div>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
