'use server'

import { RegisterSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { nanoid } from 'nanoid'
export const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Не удалось создать пользователя' }
	}

	const { email, name, password, fromRef } = validatedFields.data
	const hashedPass = await bcrypt.hash(password, 7)
	const newUserRefLink = nanoid(20)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { error: 'Этот email уже используется другим пользователем' }
	}

	await db.user.create({
		data: {
			email,
			name,
			password: hashedPass,
			fromRef: fromRef,
			userRef: newUserRefLink,
		},
	})

	return { success: 'Пользователь успешно создан' }
}
