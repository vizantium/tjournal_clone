import React from "react";
import {setCookie} from 'nookies'
import {Button, TextField} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {UserApi} from "../utils/api/user";
import {CreateUserDto} from "../utils/api/types";
import {Alert} from "@material-ui/lab";
import {setUserData} from "../../redux/slices/user";
import {useAppDispatch} from "../../redux/hooks";
import {Api} from "../utils/api";

interface RegisterFormProps {
    setFormType: (string) => void
}


export const RegisterForm: React.FC<RegisterFormProps> = ({setFormType}) => {
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = React.useState('')
    const {register,watch , formState: {errors}, handleSubmit} = useForm<any>({
        mode: 'onSubmit'
    })



    const onSubmit = async (dto: CreateUserDto) => {
        try {
            const data = await Api().user.register(dto)
            console.log(data)
            setCookie(null, 'authToken', data.token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            setErrorMessage('')
            dispatch(setUserData(data))
        } catch (e) {
            console.warn('registration error', e);
            if (e.response) {
                setErrorMessage(e.response.data.message)

            }
        }
    }

    return (
        <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('fullName', {
                            required: 'Enter your name',
                            minLength: {
                                value: 5,
                                message: 'At least 5 characters'
                            }
                        })}
                        error={!!errors.fullName?.message}
                        // @ts-ignore
                        helperText={errors.fullName?.message}
                        name={'fullName'}
                        className="mb-20"
                        size="small"
                        label={'fullName'}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        {...register('email', {
                            required: 'Enter your email',
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'Email incorrect'
                            }
                        })}
                        type={'email'}
                        error={!!errors.email?.message}
                        // @ts-ignore
                        helperText={errors.email?.message}
                        name={'email'}
                        className="mb-20"
                        size="small"
                        label={'Почта'}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        {...register('password', {
                            required: 'Enter your password',
                            minLength: {
                                value: 6,
                                message: 'At least 6 characters'
                            },
                        })}
                        type={'password'}
                        error={!!errors.password?.message}
                        // @ts-ignore
                        helperText={errors.password?.message}
                        name={'password'}
                        className="mb-20"
                        size="small"
                        label={'Пароль'}
                        variant="outlined"
                        fullWidth
                    />
                    {errorMessage && <Alert severity={'error'} className={'mb-20'}>{errorMessage}</Alert>}
                    <div className={'d-flex align-center justify-between'}>
                        <Button type={'submit'} color="primary" variant="contained">
                            Зарегистрироваться
                        </Button>
                        <Button onClick={() => setFormType('login')} color="primary" variant="text">
                            Войти
                        </Button>
                    </div>
                </form>
        </div>
    )
}