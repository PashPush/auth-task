import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'
import Yandex from 'next-auth/providers/yandex'

export default {
	providers: [
		Yandex({
			clientId: process.env.YANDEX_ID,
			clientSecret: process.env.YANDEX_SECRET,
		}),
		Github({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		Google({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		Credentials({
			async authorize(credentials) {
				const validatedFields = LoginSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data

					const user = await getUserByEmail(email)
					if (!user || !user.password) return null

					const passwordMatch = await bcrypt.compare(password, user.password)

					if (passwordMatch) return user
				}

				return null
			},
		}),
	],
} satisfies NextAuthConfig
