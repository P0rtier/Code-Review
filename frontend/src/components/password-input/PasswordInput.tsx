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
        onEnterKeyPress,
    } = props;

    const [show, setShow] = React.useState(false);
    const icon = show ? <ViewIcon /> : <ViewOffIcon />;
    const handleClick = () => setShow(!show);


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (onEnterKeyPress) {
                onEnterKeyPress();
            };
        };
    };

    return (
        <InputGroup>
            <Input
                variant={variant}
                type={show ? 'text' : 'password'}
                value={value}
                name={name}
                onChange={onChange}
                onKeyDown={handleKeyPress}
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