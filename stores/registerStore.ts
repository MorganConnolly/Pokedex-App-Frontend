import { create } from 'zustand';

type ErrorsReturned = {
    email: string[],
    password: string[],
    name: string[],
}

type StoreProps = {
    email: string,
    username: string,
    password: string,
    setEmailInput: (email: string) => void;
    setUsernameInput: (username: string) => void;
    setPasswordInput: (password: string) => void;

    errors: ErrorsReturned,
    setErrors: (errorsReturned: ErrorsReturned) => void;
    clearErrors: () => void;
}

const useStore = create<StoreProps>()(
    (set) => ({
        email: '',
        username: '',
        password: '',
        errors: {
            email: [''],
            password: [''],
            name: ['']
        },
        setEmailInput: (emailInput) => {
            set(() => ({email: emailInput}))
            set(() => ({errors: {email: [''], password: [''], name: ['']}})) // Clear the errors
        },
        setUsernameInput: (usernameInput) => {
            set(() => ({username: usernameInput}))
            set(() => ({errors: {email: [''], password: [''], name: ['']}})) // Clear the errors
        }, 
        setPasswordInput: (passwordInput) => {
            set(() => ({password: passwordInput}))
            set(() => ({errors: {email: [''], password: [''], name: ['']}})) // Clear the errors
        },
        setErrors: (errorsReturned) => {
            set(() => ({errors: errorsReturned}))
        },
        clearErrors: () => {
            set(() => ({errors: {email: [''], password: [''], name: ['']}})) // Clear the errors
        }
    })
);

export default useStore;