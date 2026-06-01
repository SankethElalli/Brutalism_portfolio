import styles from '@/styles/Hero.module.css'

const STATEMENT = 'i get obsessed with making things run on their own.'

export default function Hero() {
  const words = STATEMENT.split(' ')

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.statement}>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>
              <span
                className={styles.wordInner}
                style={{ animationDelay: `${0.15 + i * 0.07}s` }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </section>
  )
}
