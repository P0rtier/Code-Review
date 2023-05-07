import * as React from 'react';
import { Box, Button, Input, useStyleConfig } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledComponents } from "../../common/enums/StyledComponents";
import styles from './Register.module.scss';
import { toast } from "react-toastify";
import { IRegisterValues } from "../../common/interfaces/IRegisterValues";
import { isEmailValid, isPasswordValid } from "../../common/utils/helpers";
import agent from "../../common/api/agent";
import { UserContext } from "../../common/providers/UserProvider";
import { IUser } from "../../common/interfaces/IUser";
import { UserActions } from "../../common/enums/UserActions";
import { IAuthResponse } from '../../common/interfaces/IAuthResponse';
import PasswordInput from '../../components/password-input/PasswordInput';


const Register = () => {
    const primaryStyles = useStyleConfig(StyledComponents.PrimaryComponent);
    const secondaryStyles = useStyleConfig(StyledComponents.SecondaryComponent);

    const navigate = useNavigate();

    const { dispatch } = useContext(UserContext);

    const [registerValues, setRegisterValues] = useState<IRegisterValues>({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setRegisterValues({
            ...registerValues,
            [name]: value
        });
    }

    const handleRegister = () => {
        if (!areCredentialsValid()) {
            return;
        }

        const { email, password } = registerValues;

        agent.Auth.register(email, password).then((data: IAuthResponse) => {
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
        const { email, password, confirmPassword } = registerValues;

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

        if (!isPasswordValid(password)) {
            toast.error(`Password must contain at least 8 characters, one uppercase letter, 
                        one lowercase letter, one number and one special character`);
            return false;
        }

        if (confirmPassword === '') {
            toast.error('Confirm password is required');
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
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
                    Sign up
                </Box>
                <Box
                    className={styles.content}
                    __css={secondaryStyles}
                >
                    <div className={styles.inputContainer}>
                        <label>Email</label>
                        <Input
                            variant='auth' type="email"
                            onChange={handleChanges}
                            name='email'
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Password</label>
                        <PasswordInput
                            onChange={handleChanges}
                            name='password'
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Confirm password</label>
                        <PasswordInput
                            onChange={handleChanges}
                            onEnterKeyPress={handleRegister}
                            name='confirmPassword'
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Link to='/login'>Already have an account?</Link>
                        <Button
                            variant='auth'
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                </Box>
            </div>
        </div>
    )
}

export default Register;