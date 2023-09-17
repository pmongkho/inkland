import PublicChat from '@/_models/PublicChat'

export const GET = async () => {
    return await PublicChat.findOne()
}