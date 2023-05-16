import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { StatsIcon } from "../../assets/icons/StatsIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import { TrophyIcon } from "../../assets/icons/TrophyIcon";
import ToggleThemeButton from "../toggle-theme-button/ToggleThemeButton";
import { Box, IconButton, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { UserActions } from "../../common/enums/UserActions";
import { EnvironmentProfiles } from "../../common/enums/EnvironmentProfiles";
import { NotificationsPopover } from "./components/notifications-popover/NotificationsPopover";
import { NotificationContext } from "../../common/providers/NotificationsProvider";
import { NotificationsActions } from "../../common/enums/NotificationsActions";
import NavbarLogo from "../../assets/images/nav-logo.svg";  

export const Navbar = () => {
  const navbarStyles = useStyleConfig(StyledComponents.Navbar);

  const { state: user, dispatch: dispatchUser } = useContext(UserContext);
  const { dispatch: dispatchNotifications } = useContext(NotificationContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatchUser({ type: UserActions.ClearUser });
    dispatchNotifications({ type: NotificationsActions.ClearNotifications });
    navigate("/login");
  };

  const isDev = process.env.REACT_APP_ENV === EnvironmentProfiles.Development;

  return (
    <>
      <div className={styles.navbarContainer}>
        <Box className={styles.navbarWrapper} __css={navbarStyles}>
          <Link to={"/home"}>
            <div className={styles.navbarLogo}>
              <img src={NavbarLogo} className={styles.navbarLogoImg} alt="Code Review Logo" />
            </div>
          </Link>
          <div className={styles.navbarLinks}>
            {(user || isDev) && (
              <>
                <Link to="/home">
                  <HomeIcon />
                </Link>
                <NotificationsPopover />
                <Link to="/stats">
                  <StatsIcon />
                </Link>
                <Link to="/leaderboard">
                  <TrophyIcon />
                </Link>
              </>
            )}
            <ToggleThemeButton />
            {(user || isDev) && (
              <IconButton
                icon={<LogoutIcon />}
                aria-label="logout-button"
                onClick={handleLogout}
                variant="ghost"
              />
            )}
          </div>
        </Box>
      </div>
      <Outlet />
    </>
  );
};
