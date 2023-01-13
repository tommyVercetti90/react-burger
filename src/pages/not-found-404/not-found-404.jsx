import {Link} from "react-router-dom";
import styles from './not-found-404.module.css'

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <p className='text text_type_main-medium'>Страница не найдена</p>
            <Link to='/' className={styles.link}>На главную страницу</Link>
        </div>
    );
};

export default NotFoundPage;