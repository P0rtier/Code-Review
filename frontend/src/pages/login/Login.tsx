import * as React from 'react';
import { Box, Button, Input, useStyleConfig } from '@chakra-ui/react';
import { StyledComponents } from '../../common/enums/StyledComponents';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

const Login = () => {
    const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
    const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

    return (
        <div className={styles.container}>
            <div className={styles.componentContainer}>
                <Box
                    className={styles.header}
                    __css={primaryStyles}
                >
                    Log in
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
                    <div className={styles.buttonContainer}>
                        <Link to='/register'>No account?</Link> 
                        <Button variant='auth'>Login</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Login;