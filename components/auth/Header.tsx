import { cn } from '@/lib/utils'
import { Jost } from 'next/font/google'

const font = Jost({ weight: '500', subsets: ['cyrillic'] })

interface HeaderProps {
	label: string
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<div className='w-full flex flex-col justify-center items-center text-center gap-y-4 '>
			<h1 className={cn('text-4xl font-bold', font.className)}>Авторизация</h1>
			<p className='text-muted-foreground text-lg'>{label}</p>
		</div>
	)
}
