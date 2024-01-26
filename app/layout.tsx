import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'

export const metadata: Metadata = {
	title: 'Авторизаци с NextAuth',
	description: 'Надежное и элегантное решение для авторизации',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()
	return (
		<SessionProvider session={session}>
			<html lang='ru'>
				<body className={`antialiased`}>{children}</body>
			</html>
		</SessionProvider>
	)
}
