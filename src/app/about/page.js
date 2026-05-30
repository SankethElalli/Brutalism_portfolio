import ExperienceTable from '@/components/ExperienceTable'
import styles from '@/styles/AboutPage.module.css'

export const metadata = {
  title: 'about - snketh',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>

      {/* ── Section 1: Cream hero ── */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heading}>about.</h1>
          <p className={styles.statement}>
            I build the systems that let serious organizations scale without
            losing what made them worth building in the first place.
          </p>
        </div>
      </div>

      {/* ── Section 2: Black stats + photo ── */}
      <div className={styles.statsSection}>
        <div className={styles.statsInner}>

          <div className={styles.statsRow}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>experience</span>
              <span className={styles.statValue}>1 Year</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>location</span>
              <span className={styles.statValue}>Bengaluru, India</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>status</span>
              <span className={styles.statValue} style={{ color: 'var(--green)' }}>Open to Work</span>
            </div>
          </div>

          <div className={styles.photoRow}>
            <div className={styles.photoWrap}>
              <img src="/assets/images/profile.jpeg" alt="Sanketh Elalli" className={styles.photo} />
            </div>
            <div className={styles.bioWrap}>
              <span className={styles.sectionLabel}>who I am.</span>
              <p className={styles.bio}>
                I build AI &amp; automation systems for organizations that have outgrown manual
                operations, fragmented workflows, and fragile infrastructure.
              </p>
              <p className={styles.bio}>
                My work spans AI orchestration, backend infrastructure, retrieval systems,
                and workflow engineering - helping companies turn automation from isolated
                tools into dependable operational architecture built for scale.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Section 3: Cream experience table ── */}
      <div className={styles.expSection}>
        <div className={styles.expInner}>
          <span className={styles.expSectionLabel}>experiences.</span>
          <ExperienceTable />
        </div>
      </div>

    </div>
  )
}
