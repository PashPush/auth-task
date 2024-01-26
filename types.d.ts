import { UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'
//eslint-disable-next-line
import { JWT } from 'next-auth/jwt'

export type ExtendedUser = {
	fromRef: string
	userRef: string
} & DefaultSession['user']

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userRef: string | null
		fromRef: string | null
	}
}
