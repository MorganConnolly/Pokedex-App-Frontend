import { create } from 'zustand';

type ErrorsReturned = {
    email: string[],
    password: string[],
}

type StoreProps = {
    email: string,
    password: string,
    setEmailInput: (email: string) => void;
    setPasswordInput: (password: string) => void;

    errors: ErrorsReturned,
    setErrors: (errorsReturned: ErrorsReturned) => void;
    clearErrors: () => void;
}

const useStore = create<StoreProps>()(
    (set) => ({
        email: '',
        password: '',
        errors: {
            email: [''],
            password: [''],
        },
        setEmailInput: (emailInput) => {
            set(() => ({email: emailInput}))
            set(() => ({errors: {email: [''], password: ['']}})) // Clear the errors
        },
        setPasswordInput: (passwordInput) => {
            set(() => ({password: passwordInput}))
            set(() => ({errors: {email: [''], password: ['']}})) // Clear the errors
        },
        setErrors: (errorsReturned) => {
            set(() => ({errors: errorsReturned}))
        },
        clearErrors: () => {
            set(() => ({errors: {email: [''], password: ['']}})) // Clear the errors
        }
    })
);

export default useStore;