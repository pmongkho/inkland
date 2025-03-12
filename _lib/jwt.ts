import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export function signJwt(payload: object): Promise<string> {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.NEXTAUTH_SECRET as Secret,
			{ expiresIn: '7d' } as SignOptions, // Ensuring correct type
			(err, token) => {
				if (err || !token) reject(err)
				else resolve(token)
			}
		)
	})
}
