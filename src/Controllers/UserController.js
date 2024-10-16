import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

export default {
    async createUser(request, response) {

        const profile = request.file.filename;
        const { name, cpf, birthdate, generoId, email, password, confirmPassword } = request.body;
      
        const generoIdInt = parseInt(generoId, 10);

        try {
            let user = await prisma.user.findUnique({
                where: { email }
            });

            if(user) {
                return response.status(409).json({ 
                    error: true,
                    message: 'E-mail já cadastrado' 
                });
            }

            user = await prisma.user.findUnique({
                where: { cpf }
            });

            if(user) {
                return response.status(409).json({
                    error: true,
                    message: 'CPF já cadastrado' 
                });
            }

            if (password !== confirmPassword) {
                throw new Error("As senhas não coincidem.");
            }


            
            const HashPassword = await hash(password, 10);

            const birthdateDate = new Date(birthdate);

            user = await prisma.user.create({
                data:{
                    profile,
                    name,
                    cpf,
                    birthdate: birthdateDate.toISOString().split('T')[0] + 'T00:00:00.000Z',
                    genero: { connect: { id_genero: generoIdInt } },
                    email,
                    password: HashPassword,
                },
                    include: {
                        genero: true
                      }
            });

            return response.json({
                error: false,
                message: 'Usuário cadastrado com sucesso!',
                user
            });

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
    },

    async findUser(request, response) {
        try {
          const { userId } = request.params;
    
          const user = await prisma.user.findUnique({
            where: { id : Number(userId) }
          });
          delete user.password;
          return response.json(user);
    
        } catch (error) {
          return response.json({ message: error.message })
        }
    },

    async updateUser(request, response) {
        const { id } = request.params; // ID do usuário a ser atualizado
        const profile = request.file?.filename; // Atualização da imagem (se houver)
        const { email, password, confirmPassword } = request.body; // Apenas email e senha podem ser atualizados
        
        try {
            // Busca o usuário pelo ID
            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                return response.status(404).json({ 
                    error: true,
                    message: 'Usuário não encontrado' 
                });
            }
    
            // Validação de e-mail: verificar se já existe outro usuário com o mesmo e-mail
            if (email) {
                const emailExists = await prisma.user.findUnique({ where: { email } });
                if (emailExists && emailExists.id !== user.id) {
                    return response.status(409).json({ error: true, message: 'E-mail já cadastrado' });
                }
            }
    
            // Validação de senha: verificar se as senhas coincidem
            if (password && password !== confirmPassword) {
                return response.status(400).json({ error: true, message: 'As senhas não coincidem' });
            }
    
            // Se houver uma senha, criptografar
            const HashPassword = password ? await hash(password, 10) : user.password;
    
            // Atualizar o usuário no banco de dados
            const updatedUser = await prisma.user.update({
                where: { id: Number(id) },
                data: {
                    profile: profile || user.profile, // Atualizar a imagem se houver, senão manter a antiga
                    email: email || user.email, // Atualizar o e-mail se houver, senão manter o antigo
                    password: HashPassword, // Atualizar a senha se houver, senão manter a antiga
                },
                include: {
                    genero: true // Incluir o gênero na resposta, se aplicável
                }
            });
    
            return response.json({
                error: false,
                message: 'Usuário atualizado com sucesso!',
                updatedUser
            });
    
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}