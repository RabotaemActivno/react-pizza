import styles from './NotFoundBlock.module.scss'

export function NotFoundBlock () {
    return(
        <div className={styles.root}>
            <h1>
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению данная страница отстсвует в нашем интернет-магазине</p>
        </div>
    )
}