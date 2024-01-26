'use client'

import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { FaYandex } from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'

type SocialProps = {
	isDisabled?: boolean | undefined
}

export const Social = ({ isDisabled }: SocialProps) => {
	const params = useSearchParams()
	const currentRef = params?.get('ref')
	const onClick = (provider: 'google' | 'github' | 'yandex') => {
		signIn(
			provider,
			{ callbackUrl: DEFAULT_LOGIN_REDIRECT },
			{
				fromRef: currentRef,
			}
		)
	}
	return (
		<div className='flex items-center w-full gap-x-2'>
			<Button
				className='w-full'
				variant='outline'
				size='lg'
				disabled={isDisabled}
				onClick={() => onClick('google')}
			>
				<FcGoogle />
			</Button>
			<Button
				className='w-full'
				variant='outline'
				size='lg'
				disabled={isDisabled}
				onClick={() => onClick('github')}
			>
				<FaGithub />
			</Button>
			<Button
				className='w-full'
				variant='outline'
				size='lg'
				disabled={isDisabled}
				onClick={() => onClick('yandex')}
			>
				<FaYandex />
			</Button>
		</div>
	)
}
