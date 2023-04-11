import * as React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { StatsIcon } from "../../assets/icons/StatsIcon";
import { SettingsIcon } from "../../assets/icons/SettingsIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import ToggleThemeButton from "../toggle-theme-button/ToggleThemeButton";
import { Box, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { NotificationsPopover } from "../notifications-popover/NotificationsPopover";

export const Navbar = () => {
  const navbarStyles = useStyleConfig(StyledComponents.Navbar);

  return (
    <>
      <div className={styles.navbarContainer}>
        <Box className={styles.navbarWrapper} __css={navbarStyles}>
          <Link to={"/home"}>
            <div className={styles.navbarLogo}>code review</div>
          </Link>
          <div className={styles.navbarLinks}>
            <Link to="/home">
              <HomeIcon />
            </Link>
            <NotificationsPopover />
            <Link to="/stats">
              <StatsIcon />
            </Link>
            {/* <Link to="/settings"> */}
              <SettingsIcon />
            {/* </Link> */}
            <ToggleThemeButton />
            <Link to="/login">
              <LogoutIcon />
            </Link>
          </div>
        </Box>
      </div>
      <Outlet />
    </>
  );
};
