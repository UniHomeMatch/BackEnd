import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export default {
    async createUser(request, response) {

        const { name, cpf, birthdate, generoId, email, password } = request.body;

        try {
            let user = await prisma.user.findUnique({
                where: { email }
            });

            if(user) {
                return response.status(409).json({ message: 'E-mail já cadastrado' });
            }

            user = await prisma.user.findUnique({
                where: { cpf }
            });

            if(user) {
                return response.status(409).json({ message: 'CPF já cadastrado' });
            }


            const HashPassword = await hash(password, 10);

            const birthdateDate = new Date(birthdate);

            user = await prisma.user.create({
                data:{
                    name,
                    cpf,
                    birthdate: birthdateDate.toISOString().split('T')[0] + 'T00:00:00.000Z',
                        genero: {
                            connect: { id_genero: generoId }
                          },
                    email,
                    password: HashPassword,
                },
                    include: {
                        genero: true
                      }
            });

            return response.json(user);

        } catch (error) {
            return response.json({ message: error.message });
        }
    },
    async findAllUser(request, response) {
        try {
            const users = await prisma.user.findMany();
            return response.json(users);
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
}