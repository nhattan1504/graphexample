const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// module.exports={resolvers};



const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        posts: async () => {
            var listPost = await prisma.post.findMany();
            return listPost;
        },
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
        createUser: async (_,{ email, name }) => {
            // console.log(await  prisma.user.create({data:{email:"teo",name:"tan"}}));
            const user = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                }
            });
            console.log(user);
            return user;
        },
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
        removeUser:async(_,{userId})=>{
            console.log(userId);
            let foundAuthor= await prisma.author.findMany({where:{userId:userId}});
            // console.log(foundAuthor);
            // await prisma.post.delete({where:{authorId:foundAuthor[0].id}});
            await prisma.author.delete({where:{id:foundAuthor[0].id}});
            await prisma.user.delete({where:{id:userId}});
            console.log("delete success");
            return "success";
        },
        updateUser:async(_,{userId,name,email})=>{
            try{
                var userUpdate= await prisma.user.update({where:{id:userId},
                data:{
                    email:email,
                    name:name
                }});
                return "success";
            }catch(err){
                return err;
            }
        }
    }

};

module.exports = { resolvers };