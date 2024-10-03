'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginSchema } from '@/schemas'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { FullCard } from './FullCard'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ErrorForm } from '../ErrorForm'
// import { SuccessForm } from '../SuccessForm'
import { login } from '@/actions/login'
import { useTransition, useState } from 'react'

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>('')
	// const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError('')
		// setSuccess('')

		startTransition(() => {
			login(values).then((data) => {
				setError(data?.error)
				// setSuccess(data?.success)
			})
		})
	}
	return (
		<FullCard
			heading='Авторизация'
			headerLabel='Добро пожаловать'
			backButtonLabel='Регистрация. Только по реферальной ссылке'
			backButtonHref='/auth/register'
			showSocial
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											autoFocus
											placeholder='your@email.ru'
											type='email'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{/* <SuccessForm message={success} /> */}
					<ErrorForm message={error} />
					<Button type='submit' disabled={isPending} className='w-full'>
						Войти
					</Button>
				</form>
			</Form>
		</FullCard>
	)
}
