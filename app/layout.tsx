import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Авторизаци с NextAuth',
	description: 'Надежное и элегантное решение для авторизации',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`antialiased`}>{children}</body>
		</html>
	)
}
