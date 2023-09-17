import Transaction from '@/_models/Transaction'

export const GET = async () => {
	await startDb()
	return await Transaction.findOne()
}
