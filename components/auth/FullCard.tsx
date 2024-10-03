'use client'

import { Card, CardContent, CardHeader, CardFooter } from '../ui/card'
import { BackButton } from './BackButton'
import { Header } from './Header'
import { Social } from './Social'

interface FullCardProps {
	children: React.ReactNode
	heading: string
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
	socialDisabled?: boolean
}

export const FullCard = ({
	children,
	heading,
	headerLabel,
	backButtonLabel,
	backButtonHref,
	showSocial,
	socialDisabled,
}: FullCardProps) => {
	return (
		<Card className='w-[400px] shadow-md'>
			<CardHeader>
				<Header label={headerLabel} heading={heading} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social isDisabled={socialDisabled} />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButtonLabel} href={backButtonHref} />
			</CardFooter>
		</Card>
	)
}
