import Header from './components/Header'
import Hero from './components/Hero'
import TheorySection from './components/TheorySection'
import CaseStudySection from './components/CaseStudySection'
import ChartSection from './components/ChartSection'
import AIChat from './components/AIChat'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <div className="max-w-5xl mx-auto px-4 pb-12 space-y-20">
          <TheorySection />
          <CaseStudySection />
          <ChartSection />
        </div>
      </main>
      <Footer />
      <AIChat />
    </div>
  )
}
