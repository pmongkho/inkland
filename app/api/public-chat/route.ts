import PublicChat from '@/_models/PublicChat'

export const GET = async () => {
    await startDb()
    return await PublicChat.findOne()
}