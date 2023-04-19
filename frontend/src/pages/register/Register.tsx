import { Box, Button, Input, useStyleConfig } from "@chakra-ui/react";
import react from "react";
import { Link } from "react-router-dom";
import { StyledComponents } from "../../common/enums/StyledComponents";
import styles from './Register.module.scss';


const Register = () => {
    const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
    const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);


    return (
        <div className={styles.container}>
            <div className={styles.componentContainer}>
                <Box
                    className={styles.header}
                    __css={primaryStyles}
                >
                    Sign up
                </Box>
                <Box
                    className={styles.content}
                    __css={secondaryStyles}
                >
                    <div className={styles.inputContainer}>
                        <label>Email</label>
                        <Input variant='auth' type="email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password</label>
                        <Input variant='auth' type="password" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Repeat password</label>
                        <Input variant='auth' type="password" />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to='/login'>Already have an account?</Link>
                        <Button variant='auth'>Register</Button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Register;