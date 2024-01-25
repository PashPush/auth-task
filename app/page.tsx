import { LoginButton } from '@/components/auth/LoginButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Jost } from 'next/font/google'

const font = Jost({ weight: '600', subsets: ['cyrillic'] })

export default function Home() {
	return (
		<main className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-300 to-slate-900'>
			<div className='space-y-8 text-center'>
				<h1
					className={cn(
						'text-5xl font-bold text-white drop-shadow-md',
						font.className
					)}
				>
					Авторизация
					<br />с NextAuth
				</h1>
				<p className='text-white texg-lg'>Простой login system</p>
				<div>
					<LoginButton>
						<Button variant={'secondary'}>Войти</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	)
}
