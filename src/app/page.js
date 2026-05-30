import Hero from '@/components/Hero'
import ProjectsStack from '@/components/ProjectsStack'
import About from '@/components/About'
import WhatIDo from '@/components/WhatIDo'

export const metadata = {
  title: 'snketh.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectsStack />
      <About />
      <WhatIDo />
    </>
  )
}
