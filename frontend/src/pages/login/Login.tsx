import * as React from 'react';
import { Box, Button, Input, useStyleConfig } from '@chakra-ui/react';
import { StyledComponents } from '../../common/enums/StyledComponents';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ILoginValues } from '../../common/interfaces/ILoginValues';
import { toast } from 'react-toastify';
import { isEmailValid } from '../../common/utils/helpers';
import agent from '../../common/api/agent';
import { UserContext } from '../../common/providers/UserProvider';
import { IUser } from '../../common/interfaces/IUser';
import { UserActions } from '../../common/enums/UserActions';
import { IAuthResponse } from '../../common/interfaces/IAuthResponse';
import PasswordInput from '../../components/password-input/PasswordInput';

const Login = () => {
    const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
    const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

    const navigate = useNavigate();

    const { dispatch } = useContext(UserContext);

    const [loginValues, setLoginValues] = useState<ILoginValues>({
        email: '',
        password: ''
    });

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setLoginValues({
            ...loginValues,
            [name]: value
        });
    }

    const handleLogin = () => {
        if (!areCredentialsValid()) {
            return;
        }

        const { email, password } = loginValues;

        agent.Auth.login(email, password).then((data: IAuthResponse) => {
            const user: IUser = {
                email: email,
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            }

            dispatch({ type: UserActions.SetUser, payload: user });
            navigate('/home');
        });
    }

    const areCredentialsValid = () => {
        const { email, password } = loginValues;

        if (email === '') {
            toast.error('Email is required');
            return false;
        }

        if (!isEmailValid(email)) {
            toast.error('Email is not valid');
            return false;
        }

        if (password === '') {
            toast.error('Password is required');
            return false;
        }

        return true;
    }

    return (
        <div className={styles.container}>
            <div className={styles.componentContainer}>
                <Box
                    className={styles.header}
                    __css={primaryStyles}
                >
                    Sign in
                </Box>
                <Box
                    className={styles.content}
                    __css={secondaryStyles}
                >
                    <div className={styles.inputContainer}>
                        <label>Email</label>
                        <Input
                            variant='auth' type="email"
                            name='email'
                            onChange={handleChanges}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password</label>
                        <PasswordInput
                            onChange={handleChanges}
                            onEnterKeyPress={handleLogin}
                            name='password'
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to='/register'>No account? Register</Link>
                        <Button
                            variant='auth'
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    );
}

export default Login;