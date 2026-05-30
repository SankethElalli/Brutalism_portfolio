import Link from 'next/link'
import { RiArrowRightLine } from 'react-icons/ri'
import styles from '@/styles/About.module.css'

export default function About() {
  return (
    <section className={styles.section} id="about">
      <h2 className={styles.heading}>about.</h2>

      <div className={styles.content}>
        {/* Left — para + button */}
        <div className={styles.leftCol}>
          <p className={styles.para}>
            I build AI &amp; automation systems for organizations that have outgrown manual
            operations, fragmented workflows, and fragile infrastructure.<br /><br />
            The result is scalable operational clarity & systems that process volume reliably, make
            intelligent decisions, and continue performing under real-world complexity. <br /><br />
            My work spans AI orchestration, backend infrastructure, retrieval systems,
            and workflow engineering, helping companies turn automation from isolated
            tools into dependable operational architecture built for scale.
          </p>

          <Link href="/about" className={styles.aboutBtn}>
            <span>about me</span>
            <span className={styles.aboutBtnArrow}><RiArrowRightLine /></span>
          </Link>
        </div>

        {/* Right — photo */}
        <div className={styles.rightCol}>
          <img
            src="/assets/images/profile.jpeg"
            alt="Sanketh Elalli"
            className={styles.photo}
          />
        </div>
      </div>
    </section>
  )
}
