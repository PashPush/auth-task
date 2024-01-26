import { LoginButton } from '@/components/auth/LoginButton'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Jost } from 'next/font/google'
import Link from 'next/link'

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
				<p className='text-white texg-lg'>Простая, но надежная login system</p>
				<p className=' texg-lg'>
					<Button variant={'secondary'}>
						<Link href={`/auth/register?ref=${process.env.PUBLIC_REF}`}>
							Регистрирация по реферальной ссылке
						</Link>
					</Button>
				</p>
				<p className='texg-lg'>
					<Button variant={'secondary'}>
						<Link href={'/auth/register'}>Просто страница регистрации</Link>
					</Button>
				</p>
				<div>
					<LoginButton>
						<Button variant={'secondary'}>Страница логина</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	)
}
