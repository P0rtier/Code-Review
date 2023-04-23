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
import { NotificationsPopover } from "../notifications-popover/NotificationsPopover";
import { useContext } from "react";
import { UserContext } from "../../common/providers/UserProvider";
import { UserActions } from "../../common/enums/UserActions";
import { EnviromentProfiles } from "../../common/enums/EnviromentProfiles";
import agent from "../../common/api/agent";


export const Navbar = () => {
  const navbarStyles = useStyleConfig(StyledComponents.Navbar);

  const {state: user, dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({type: UserActions.ClearUser});
    navigate("/login");
  }

  const isDev = process.env.REACT_APP_ENV === EnviromentProfiles.Development;

  return (
    <>
      <div className={styles.navbarContainer}>
        <Box className={styles.navbarWrapper} __css={navbarStyles}>
          <Link to={"/home"}>
            <div className={styles.navbarLogo}>code review</div>
          </Link>
          <div className={styles.navbarLinks}>
            {(user || isDev) && <>
              <Link to="/home">
                <HomeIcon />
              </Link>
              <NotificationsPopover />
              <Link to="/stats">
                <StatsIcon />
              </Link>
            </>}
            <ToggleThemeButton />
            {(user || isDev) && <IconButton 
              icon={<LogoutIcon />} 
              aria-label="logout-button" 
              onClick={handleLogout}
              variant="ghost"
            />}
            <button onClick={() => agent.Notifications.getAll().then(console.log)}>Test</button>
          </div>
        </Box>
      </div>
      <Outlet />
    </>
  );
};
