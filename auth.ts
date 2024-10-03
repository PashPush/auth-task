import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'
import { getUserById } from './data/user'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'

export const { handlers, signIn, signOut, auth } = NextAuth({
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	events: {
		async linkAccount({ user }) {
			const currentRef = cookies().get('validRef')?.value

			if (currentRef) {
				const referral = await db.user.findUnique({
					where: { userRef: currentRef },
				})

				if (referral && referral.userRef) {
					await db.user.update({
						where: {
							id: user.id,
						},
						data: {
							emailVerified: new Date(),
							fromRef: currentRef,
							userRef: nanoid(20),
						},
					})
				}
			}
		},
	},
	callbacks: {
		async signIn({ user, account, profile, credentials }) {
			// Получаем реферальный код из куков
			const currentRef = cookies().get('validRef')?.value

			if (currentRef) {
				const referral = await db.user.findUnique({
					where: { userRef: currentRef },
				})

				if (referral && referral.userRef) {
					return true
				} else {
					return false // Если реферальный код не найден
				}
			}
			// Проверяем реферальный код у уже зарегистрированного пользователя
			// @ts-ignore
			const isRefValid = user?.fromRef

			return !!isRefValid
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}
			if (token.fromRef && session.user) {
				session.user.fromRef = token.fromRef
			}
			if (token.userRef && session.user) {
				session.user.userRef = token.userRef
			}
			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.fromRef = existingUser.fromRef
			token.userRef = existingUser.userRef

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
	...authConfig,
})
