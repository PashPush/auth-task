'use client'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaCheckSquare, FaCopy, FaLink, FaUser } from 'react-icons/fa'
import { ExitIcon } from '@radix-ui/react-icons'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Header } from '@/components/auth/Header'
import { useState } from 'react'
import { Input } from '@/components/ui/input'

const AccountPage = () => {
	const [showUserRef, setShowUserRef] = useState(false)
	const [isCopied, setIsCopied] = useState(false)
	const user = useCurrentUser()
	const userRef = `${
		process.env.NEXT_PUBLIC_DOMAIN
	}/auth/register?ref=${user?.userRef!}`

	console.log('user: ', user)
	return (
		<Card className='w-[600px] shadow-md flex flex-col justify-center items-center'>
			<CardHeader>
				<Header label={'Добро пожаловать'} heading={'Ваш аккаунт'} />
			</CardHeader>
			<CardContent className='flex flex-col gap-6 w-full'>
				<div className='flex flex-row justify-center items-center gap-4'>
					<Avatar className='size-16'>
						<AvatarImage src={user?.image ?? ''} />
						<AvatarFallback className='bg-green-500'>
							<FaUser className='text-white' />
						</AvatarFallback>
					</Avatar>
					<div>
						<p className='text-lg'>Ваше имя: {user?.name}</p>
						<p className='text-lg'>Ваш email: {user?.email}</p>
					</div>
				</div>
				{showUserRef && (
					<p className='p-4 border rounded-md border-slate-400 flex flex-row gap-4 items-center justify-between'>
						{userRef}{' '}
						<span>
							{isCopied ? (
								<FaCheckSquare className='text-green-500 size-5' />
							) : (
								<FaCopy
									className='cursor-pointer  size-5'
									onClick={() => {
										navigator.clipboard.writeText(userRef)
										setIsCopied(true)
									}}
								/>
							)}
						</span>
					</p>
				)}
				<div className='flex flex-row  justify-center  gap-4'>
					<Button
						variant='default'
						size='lg'
						onClick={() => setShowUserRef(!showUserRef)}
					>
						Ваша реферальная ссылка
						<FaLink className='ml-2' />
					</Button>
					<Button variant='default' size='lg' onClick={() => signOut()}>
						Выйти
						<ExitIcon className='ml-2' />
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}

export default AccountPage
