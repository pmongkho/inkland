import startDb from '@/_lib/db'
import BuyerSellerChat from '@/_models/BuyerSellerChat'

export const POST = async () => {
    await startDb()
    return await BuyerSellerChat.findOne()
}