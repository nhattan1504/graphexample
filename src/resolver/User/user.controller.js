const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
function signToken(account) {
    return JWT.sign({
        iss: 'graphql',
        userId: account.id,
        role: account.role,
        iat: new Date().getTime(), // current time
        exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, process.env.JWT_KEY);
};
module.exports = {
    createUser: async (_, { email, name, password,roles}, context) => {
        // console.log(await  prisma.user.create({data:{email:"teo",name:"tan"}}));
        const { userId, role } = context;
        var salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(password, salt);
        if (userId) {
            if (role == "ADMIN") {
                const user = await context.prisma.user.create({
                    data: {
                        email: email,
                        name: name,
                        password: hashPassword,
                        role: "ADMIN"
                    }
                });
            }
        }
        const user = await context.prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashPassword,
                role:"NORMAL"
            }
        });
        // console.log(user);
        return user;
    },
    login: async (_, { email, password }, context, info) => {
        console.log(context.userId,context.role);
        var {userId}=context;
        if(userId!=null){
            throw new Error("loged in");
        }        
        var user = await context.prisma.user.findUnique({ where: { email: email } });
        if (!user) {
            throw new Error("cant find user with this email");
        }
        //If find user
        var valid = bcrypt.compare(password, user.password);
        if (valid) {
            var token = signToken(user);
            console.log(user);
            return {
                user, token
            };
        }
        throw new Error("login failed");
    },
    removeUser: async (_, { userId }) => {
        // console.log(userId);
        let foundAuthor = await prisma.author.findMany({ where: { userId: userId } });
        // console.log(foundAuthor);
        // await prisma.post.delete({where:{authorId:foundAuthor[0].id}});
        await prisma.author.delete({ where: { id: foundAuthor[0].id } });
        await prisma.user.delete({ where: { id: userId } });
        console.log("delete success");
        return "success";
    },
    updateUser: async (_, { userId, name, email }) => {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    email: email,
                    name: name
                }
            });
            return "success";
        } catch (err) {
            return err;
        }
    }

};