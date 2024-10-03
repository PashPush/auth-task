import { UserRole } from '@prisma/client'
import { type DefaultSession } from 'next-auth'
//eslint-disable-next-line
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	interface Session {
		user: {
			userRef: string | null
			fromRef: string | null
		} & DefaultSession['user']
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		userRef: string | null
		fromRef: string | null
	}
}
