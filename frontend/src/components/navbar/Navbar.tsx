import * as React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { NotificationsIcon } from "../../assets/icons/NotificationsIcon";
import { StatsIcon } from "../../assets/icons/StatsIcon";
import { SettingsIcon } from "../../assets/icons/SettingsIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import ToggleThemeButton from '../toggle-theme-button/ToggleThemeButton';

export const Navbar = () => {
    return (
        <>
            <div className={styles.navbarContainer}>
                <div className={styles.navbarWrapper}>
                    <div className={styles.navbarLogo}>
                        code review
                    </div>
                    <div className={styles.navbarLinks}>
                        <Link to='/home'><HomeIcon /></Link>
                        <Link to='/notifications'><NotificationsIcon /></Link>
                        <Link to='/stats'><StatsIcon /></Link>
                        <Link to='/settings'><SettingsIcon /></Link>
                        <ToggleThemeButton />
                        <Link to='/logout'><LogoutIcon /></Link>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}
