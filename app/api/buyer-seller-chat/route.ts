import BuyerSellerChat from '@/_models/BuyerSellerChat'

export const POST = async () => {
    return await BuyerSellerChat.findOne()
}