'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'



interface Props {
	children?: ReactNode
}

export default function AuthProvider({ children }: Props) {
	const [queryClient] = useState(() => new QueryClient()) 

	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>{children}</SessionProvider>
		</QueryClientProvider>
	)
}
