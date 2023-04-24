export interface IPasswordInputProps {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name: string;
    variant?: string;
}