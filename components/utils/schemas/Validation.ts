import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Неверный формат почты").required("Почта обязательная") ,
    password: yup.string().min(6, 'Длина пароля более 6 строк').required('Пароль обязательный')
})
export const RegisterSchema = yup.object().shape({
    fullname: yup.string().required("Имя и фамилия обязательны")
}).concat(LoginSchema)