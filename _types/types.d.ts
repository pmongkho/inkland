import { ObjectId } from 'mongoose'
import { LikeDocument } from '../_models/likeModel'

export type Like = {
        likes: [LikeDocument]
        users: void[][]
        count: number

}


