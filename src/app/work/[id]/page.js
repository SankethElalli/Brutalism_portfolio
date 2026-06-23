import { Link } from 'next-view-transitions'
import { RiArrowLeftLine } from 'react-icons/ri'
import { RiArrowRightLine } from 'react-icons/ri'
import { workItems } from '@/data/projects'
import ParallaxImage from '@/components/ParallaxImage'
import styles from '@/styles/WorkPage.module.css'

export function generateStaticParams() {
  return workItems.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const project = workItems.find((p) => String(p.id) === id)
  return {
    title: project ? `${project.title} - snketh` : 'Project - Sanketh Elalli',
  }
}

export default async function WorkPage({ params }) {
  const { id } = await params
  const project = workItems.find((p) => String(p.id) === id)

  const achievementSegments = []
  let currentBulletGroup = null

  if (project?.achievements) {
    project.achievements.forEach((rawItem) => {
      const item = rawItem ?? ''
      const trimmed = item.trim()
      if (!trimmed) {
        currentBulletGroup = null
        return
      }

      if (trimmed.startsWith('-')) {
        const bullet = trimmed.slice(1).trim()
        if (!currentBulletGroup) {
          currentBulletGroup = { type: 'bullets', items: [] }
          achievementSegments.push(currentBulletGroup)
        }
        currentBulletGroup.items.push(bullet)
      } else {
        currentBulletGroup = null
        achievementSegments.push({ type: 'text', content: item })
      }
    })
  }

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found.</p>
        <Link href="/work" className={styles.backLink}>←</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Back link */}
      <Link href="/work" className={styles.backLink}>
        <RiArrowLeftLine />
      </Link>

      {/* Hero */}
      <div className={styles.hero}>
        <h1 className={`${styles.title} ${project.title.length > 30 ? styles.titleSmall : ''}`}>{project.title}</h1>
        {project.tagline && (
          <p className={styles.tagline}>{project.tagline}</p>
        )}
        {project.link && project.link !== '#' ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.heroLink} neubrutal-btn`}
            style={{ background: project.bgColor, color: project.textColor }}
          >
            visit project <span className={styles.heroLinkArrow}><RiArrowRightLine /></span>
          </a>
        ) : project.isAutomation ? null : (
          <span className={`${styles.heroLink} ${styles.heroLinkDisabled}`}>
            Link Coming Soon <span className={styles.heroLinkArrow}><RiArrowRightLine /></span>
          </span>
        )}
      </div>

      {/* Project image */}
      {project.imageSrc && (
        <ParallaxImage
          src={project.imageSrc}
          alt={project.title}
          wrapClassName={styles.imageWrap}
          innerClassName={`${styles.imageInner} ${project.detailImageNatural ? styles.imageInnerNatural : ''}`}
          className={`${styles.image} ${project.detailImageNatural ? styles.imageNatural : ''}`}
          style={project.detailImageNatural ? undefined : {
            objectFit: project.detailImageFit || 'cover',
            objectPosition: project.detailImagePosition || 'top',
          }}
        />
      )}

      {/* Content: left details + right sticky meta */}
      <div className={styles.content}>

        {/* Left */}
        <div className={styles.left}>
          {achievementSegments.length > 0 ? (
            <div className={styles.block}>
              <span className={styles.blockLabel}>{project.detailLabel || 'Process'}</span>
              <ul className={styles.list}>
                {achievementSegments.map((segment, index) => (
                  segment.type === 'text' ? (
                    <li key={index} className={styles.listItem}>
                      {segment.content}
                    </li>
                  ) : (
                    <li key={index} className={styles.listItem}>
                      <ul className={styles.subList}>
                        {segment.items.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className={styles.subListItem}>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.block}>
              <span className={styles.blockLabel}>Process</span>
              <p className={styles.placeholder}>Case study coming soon.</p>
            </div>
          )}

          {project.tech && project.tech.length > 0 && (
            <div className={styles.block}>
              <span className={styles.blockLabel}>Skills</span>
              <div className={styles.techTags}>
                {project.tech.map((t) => (
                  <span key={t} className={styles.techTag}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — sticky metadata */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>year</span>
            <span
              className={styles.metaValue}
              style={{ color: project.bgColor }}
            >
              {project.year}
            </span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>category</span>
            <span
              className={styles.metaValue}
              style={{ color: project.bgColor }}
            >
              {project.category}
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
