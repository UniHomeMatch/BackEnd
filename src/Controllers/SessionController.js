import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();



export default {
    async createSession(request, response) {
        try {
            const { email, password } = request.body;

            const user = await prisma.user.findUnique({
                where: { email }
            });
            
            if (!user || !await compare(password, user.password)) {
                throw new Error("Usuário ou senha incorreto");
            }
            
            const token = jwt.sign({ id: user.id }, `${process.env.JTW_KEY}`, { expiresIn: "1d" });
            
            delete user.password;

            return response.json({ user,token });

        } catch(error) {
            return response.json({ message: error.message });
        }
    }
}