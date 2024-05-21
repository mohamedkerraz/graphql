import { getUser } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const createLikePost: MutationResolvers['createLikePost'] = async (_, {postId, token}, {dataSources}) => {
  try {
    const userdata = getUser(token)

    if(!userdata){
        return {
            code: 400,
            message: "invalid token",
            success: false
        }
    }
    // AMELIORATION POSSIBLE
    // alreadyLiked peux être évité en faisant un identifiant hérité des tables posts et user.
    const alreadyLiked = await dataSources.db.userPostLikes.findFirst({
        where:{
            userId: userdata.id,
            postId: postId
        }
    });
    if(!alreadyLiked){
        await dataSources.db.userPostLikes.create({
            data: {
                postId: postId,
                userId: userdata.id
            }
        });
        return {
            code: 201,
            message: 'Like has been created',
            success: true
        }
    }
    return {
        code: 400,
        message: 'Post already liked',
        success: true
    }
  } catch(e) {
    return {
      code: 400,
      message: (e as Error).message,
      success: false
    }
  }
}