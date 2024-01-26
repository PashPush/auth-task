import { FullCard } from '@/components/auth/FullCard'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import React from 'react'

const ErrorPage = () => {
	return (
		<FullCard
			heading='Ошибка'
			headerLabel='Вход возможен только по реферальной ссылке'
			backButtonLabel='Вернуться на главную страницу'
			backButtonHref='/'
		>
			<div className='flex justify-center items-center'>
				<ExclamationTriangleIcon className='size-10 text-destructive' />
			</div>
		</FullCard>
	)
}
export default ErrorPage
