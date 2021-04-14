
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports={
    posts: async (parent,{}, context, info) => {
        const{userId}=context;
        console.log(userId);
        if(userId){
            var listPost = await context.prisma.post.findMany({where:{approval:true}});
        return listPost;
        }
        throw new Error('please login');
    },
    approPost:async(parent,{postId},context,info)=>{
        const{userId,role}=context;
        if(userId&&role=="ADMIN"){
            await context.prisma.post.update({where:{
                id:postId
            },data:{
                approval:true
            }});
            return "appro success";
        }
        return "you dont permission";
    },
    createPost:async(parent,{content},context,info)=>{
        // console.log(context.role);
        const{userId}=context;
        if(userId==null){
            throw new Error( "please login for create post");
        }
        var foundAuthor= await context.prisma.author.findMany({where:{
            userId:userId
        }});
        // console.log(foundAuthor[0]);
        await context.prisma.post.create({data:{
            content:content,
            authorId:foundAuthor[0].id,
        }});
        return "Create post success";
    }
};
