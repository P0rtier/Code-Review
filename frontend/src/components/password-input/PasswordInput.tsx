import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import * as React from 'react';
import { IPasswordInputProps } from './IPasswordInputProps';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const PasswordInput = (props: IPasswordInputProps) => {
    const {
        name,
        value,
        variant = 'auth',
        onChange,
    } = props;

    const [show, setShow] = React.useState(false);
    const icon = show ? <ViewIcon /> : <ViewOffIcon />;
    const handleClick = () => setShow(!show);

    return (
        <InputGroup>
            <Input
                variant={variant}
                type={show ? 'text' : 'password'}
                value={value}
                name={name}
                onChange={onChange}
            />
            <InputRightElement
                children={icon}
                onClick={handleClick}
                cursor="pointer"
            />
        </InputGroup>
    );
}

export default PasswordInput;