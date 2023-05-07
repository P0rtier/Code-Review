import * as React from "react";
import { Outlet, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { HomeIcon } from "../../assets/icons/HomeIcon";
import { StatsIcon } from "../../assets/icons/StatsIcon";
import { LogoutIcon } from "../../assets/icons/LogoutIcon";
import ToggleThemeButton from "../toggle-theme-button/ToggleThemeButton";
import { Box, IconButton, useStyleConfig } from "@chakra-ui/react";
import { StyledComponents } from "../../common/enums/StyledComponents";
import { useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { UserActions } from "../../common/enums/UserActions";
import { EnvironmentProfiles } from "../../common/enums/EnvironmentProfiles";
import { NotificationsPopover } from "./components/notifications-popover/NotificationsPopover";

export const Navbar = () => {
  const navbarStyles = useStyleConfig(StyledComponents.Navbar);

  const { state: user, dispatch } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: UserActions.ClearUser });
    navigate("/login");
  };

  const isDev = process.env.REACT_APP_ENV === EnvironmentProfiles.Development;

  return (
    <>
      <div className={styles.navbarContainer}>
        <Box className={styles.navbarWrapper} __css={navbarStyles}>
          <Link to={"/home"}>
            <div className={styles.navbarLogo}>code review</div>
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
