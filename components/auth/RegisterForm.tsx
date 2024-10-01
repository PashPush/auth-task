'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { RegisterSchema } from '@/schemas'
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
import { SuccessForm } from '../SuccessForm'
import { useTransition, useState } from 'react'
import { register } from '@/actions/register'

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError('')
		setSuccess('')

		startTransition(() => {
			register(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}
	return (
		<FullCard
			headerLabel='Регистрация'
			backButtonLabel='Есть аккаунт?'
			backButtonHref='/auth/login'
			showSocial
		>
			<Form {...form}>
				<form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder='Ваше имя'
											type='text'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
					<SuccessForm message={success} />
					<ErrorForm message={error} />
					<Button type='submit' disabled={isPending} className='w-full'>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</FullCard>
	)
}
