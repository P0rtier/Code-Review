import * as React from 'react';
import { Box, Button, Input, useStyleConfig } from '@chakra-ui/react';
import { StyledComponents } from '../../common/enums/StyledComponents';
import styles from './Login.module.scss';

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
                        <Input variant='login' type="email" />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password</label>
                        <Input variant='login' type="paasword" />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button variant='login'>Login</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Login;