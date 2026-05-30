import styles from '@/styles/Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.statement}>
          i get obsessed with making things run on their own.
        </h1>
      </div>
    </section>
  )
}
