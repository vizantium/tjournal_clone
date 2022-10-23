import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert} from '@material-ui/lab'
import {useForm} from "react-hook-form";
import {LoginDto} from "../utils/api/types";
import {UserApi} from "../utils/api/user";
import {setCookie} from "nookies";
import {useAppDispatch} from "../../redux/hooks";
import {setUserData} from "../../redux/slices/user";
import {Api} from "../utils/api";

interface LoginFormProps {
    setFormType: (string) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({setFormType}) => {
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = React.useState('')
    const {register,watch , formState: {errors}, handleSubmit} = useForm<any>({
        mode: 'onSubmit'
    })

    const onSubmit = async (dto: LoginDto) => {
        try {
            const data = await Api().user.login(dto)
            setCookie(null, 'rtoken', data.token, {
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
                    {errorMessage && <Alert className={'mb-20'} severity={'error'}>{errorMessage}</Alert>}
                    <Button type={'submit'} color="primary" variant="contained">
                        Войти
                    </Button>
                    <Button onClick={() => setFormType('register')} color="primary" variant="text">
                        Регистрация
                    </Button>
                </form>
        </div>
    )
}