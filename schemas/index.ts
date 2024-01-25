import * as z from 'zod'

export const LoginSchema = z.object({
	email: z.string().email({
		message: 'Неверный email',
	}),
	password: z.string().min(1, { message: 'Введите пароль' }),
})

export const RegisterSchema = z.object({
	email: z.string().email({
		message: 'Введите верный email',
	}),
	password: z
		.string()
		.min(6, { message: 'Пароль должен состоять минимум из 6 символов' }),
	name: z.string().min(1, { message: 'Введите имя' }),
})
