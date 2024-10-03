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
import { useTransition, useState, useEffect } from 'react'
import { register } from '@/actions/register'
import { useSearchParams } from 'next/navigation'
import { check } from '@/actions/check'

export const RegisterForm = () => {
	const [error, setError] = useState<string | undefined>('')
	const [success, setSuccess] = useState<string | undefined>('')
	const [isReferred, setIsReferred] = useState<boolean>(false)
	const [isPending, startTransition] = useTransition()

	const params = useSearchParams()

	const currentRef = params?.get('ref')

	useEffect(() => {
		// Проверяем наличие и валидность реферального кода

		const checkRef = async () => {
			if (currentRef) {
				await checkReferralCode(currentRef)
			} else {
				setIsReferred(false) // Если нет кода, перенаправляем на ошибку
			}
		}
		checkRef()
	}, [currentRef])

	const checkReferralCode = async (ref: string) => {
		const response = await check(ref)

		console.log('response: ', response)

		if (response) {
			setIsReferred(true)
		} else {
			setIsReferred(false) // Если код не валиден
		}
	}

	console.log('isReferred: ', isReferred)
	console.log(currentRef)

	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
			fromRef: currentRef || '',
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
			heading='Регистрация'
			headerLabel={
				isReferred
					? 'Добро пожаловать'
					: 'Доступно только по реферальной ссылке'
			}
			backButtonLabel='Есть аккаунт? Войти'
			backButtonHref='/auth/login'
			showSocial
			socialDisabled={!isReferred}
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
											disabled={isPending || !isReferred}
											autoFocus
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
											disabled={isPending || !isReferred}
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
											disabled={isPending || !isReferred}
											placeholder='******'
											type='password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='fromRef'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} type='hidden' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<SuccessForm message={success} />
					<ErrorForm message={error} />
					<Button
						type='submit'
						disabled={isPending || !isReferred}
						className='w-full'
					>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</FullCard>
	)
}
