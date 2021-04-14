const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {createUser,login,removeUser,updateUser}=require('./User/user.controller');
const {posts,approPost,createPost}=require('./Post/post.controller');
// module.exports={resolvers};




const resolvers = {
    Query: {
        posts,
        hello: () => "hiiii",
        getAllUser: async () => {
            try {
                var listUser = await prisma.user.findMany();
                return listUser;
            } catch (err) {
                return err;
            }
        },
        getInformationAuthor: async (_,{authorId}) => {
            try {
                console.log(authorId);
                let returnAuthor = await prisma.author.findMany({ where: { id: authorId } });
                // return 
                let returnUser=await prisma.user.findMany({where:{id:returnAuthor.userId}});
                let post=await prisma.post.findMany({where:{authorId:authorId}});
                // console.log(returnUser);
                // console.log(returnAuthor);
                // console.log({user:returnUser[0],post:post[0]})
                return {
                    user:returnUser[0],
                    post:post[0]
                };
            } catch (err) {
                return err;
            }
        },
        
     },
    Mutation: {
        createUser,
        login,
        createAuthor:async(_,{userId})=>{
            let findUser= await prisma.user.findMany({where:{id:userId}});
            if(findUser==[]){
                return err;
            }
            const author= await prisma.author.create({data:{
                userId:userId
            }});
            console.log(author);
            return author;
        },
        removeUser,
        updateUser,
        approPost,
        createPost
    }

};

module.exports = { resolvers };