'use server'

import { db } from '@/lib/db'
import { cookies } from 'next/headers'

export async function check(ref: string) {
	// Ищем реферальный код в базе данных
	const referral = await db.user.findUnique({
		where: { userRef: ref },
	})

	if (referral && referral.userRef) {
		cookies().set('validRef', ref, { httpOnly: true })
		return true
	} else {
		return false
	}
}
