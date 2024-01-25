'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Не удалось создать пользователя' }
	}

	const { email, name, password } = validatedFields.data
	const hashedPass = await bcrypt.hash(password, 7)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Этот email уже используется другим пользователем' }
	}

	await db.user.create({
		data: {
			email,
			name,
			password: hashedPass,
		},
	})

	return { success: 'Пользователь успешно создан' }
}
