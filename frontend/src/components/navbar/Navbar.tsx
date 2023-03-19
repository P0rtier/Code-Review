import * as React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';

const Navbar = () => {
    return (
        <>
            <div className={styles.navbarContainer}>
                <Link to='/home'>home</Link>
                <Link to='/stats'>stats</Link>
            </div>
            <Outlet />
        </>
    );
}

export default Navbar;