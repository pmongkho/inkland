import Transaction from '@/_models/Transaction'

export const GET = async () => {
	return await Transaction.findOne()
}
