import Link from 'next/link'
import { RiArrowLeftLine } from 'react-icons/ri'
import { RiArrowRightLine } from 'react-icons/ri'
import { projects } from '@/data/projects'
import styles from '@/styles/WorkPage.module.css'

export function generateStaticParams() {
  return projects.map((p) => ({ id: String(p.id) }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const project = projects.find((p) => p.id === parseInt(id))
  return {
    title: project ? `${project.title} - snketh` : 'Project - Sanketh Elalli',
  }
}

export default async function WorkPage({ params }) {
  const { id } = await params
  const project = projects.find((p) => p.id === parseInt(id))

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>Project not found.</p>
        <Link href="/portfolio" className={styles.backLink}>←</Link>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* Back link */}
      <Link href="/portfolio" className={styles.backLink}>
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
            className={styles.heroLink}
            style={{ background: project.bgColor, color: project.textColor }}
          >
            visit project <span className={styles.heroLinkArrow}><RiArrowRightLine /></span>
          </a>
        ) : (
          <span className={`${styles.heroLink} ${styles.heroLinkDisabled}`}>
            Link Coming Soon <span className={styles.heroLinkArrow}><RiArrowRightLine /></span>
          </span>
        )}
      </div>

      {/* Project image */}
      {project.imageSrc && (
        <div className={styles.imageWrap}>
          <div className={`${styles.imageInner} ${project.detailImageNatural ? styles.imageInnerNatural : ''}`}>
            <img
              src={project.imageSrc}
              alt={project.title}
              className={`${styles.image} ${project.detailImageNatural ? styles.imageNatural : ''}`}
              style={project.detailImageNatural ? undefined : {
                objectFit: project.detailImageFit || 'cover',
                objectPosition: project.detailImagePosition || 'top',
              }}
            />
          </div>
        </div>
      )}

      {/* Content: left details + right sticky meta */}
      <div className={styles.content}>

        {/* Left */}
        <div className={styles.left}>
          {project.achievements && project.achievements.length > 0 ? (
            <div className={styles.block}>
              <span className={styles.blockLabel}>Process</span>
              <ul className={styles.list}>
                {project.achievements.map((item, i) => (
                  <li
                    key={i}
                    className={`${styles.listItem} ${item.trimStart().startsWith('-') ? styles.bulletItem : ''}`}
                  >
                    {item}
                  </li>
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
