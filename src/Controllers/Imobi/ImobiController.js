import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {
        try {
            // Validação inicial de dados
            const { predio, description, price, cep, logradouro, complemento, bairro, numero, cidade, uf, area, bedrooms, bathrooms, name, phone, email, generoId, userId } = request.body;
            
            if (!userId) {
                return response.status(400).json({ message: "User ID não fornecido!" });
            }

            const thumb = request.files && request.files.thumb ? request.files.thumb[0].filename : null;
            const imagesZip = request.body.imagesZip;

            if (!thumb) {
                return response.status(400).json({ message: "Imagem (thumb) não fornecida!" });
            }

            // Conversão do gênero para int
            const generoIdInt = parseInt(generoId, 10);

            // Verificar se o usuário existe
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado!" });
            }

            // Slugify para criar o slug do nome do prédio
            const slugify = (str) => 
                str.toLowerCase()
                   .trim()
                   .replace(/[^\w\s-]/g, '')
                   .replace(/[\s_-]+/g, '-')
                   .replace(/^-+|-+$/g, '');
            const slug = predio ? slugify(predio) : '';

            // Criar o anúncio de imóvel
            const imobi = await prisma.imobi.create({
                data: {
                    thumb,
                    images: imagesZip,  
                    predio,
                    description,
                    price,
                    cep, 
                    logradouro, 
                    complemento, 
                    bairro, 
                    numero, 
                    cidade, 
                    uf, 
                    area,
                    bedrooms,
                    bathrooms,
                    name,
                    phone,
                    email,
                    genero: { connect: { id_genero: generoIdInt } }, // Conectar com a tabela gênero
                    slug,
                    userId: user.id,
                }
            });

            return response.status(201).json(imobi); // Código 201 para indicar criação bem-sucedida

        } catch (error) {
            console.error('Erro ao criar imóvel:', error);
            return response.status(500).json({ message: error.message });
        }
    },

    async findAllImobi(request, response) {
        try {
            const imobi = await prisma.imobi.findMany();
            return response.json(imobi);
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    },

    async findImobi(request, response) {
        try {
            const { slug } = request.params;
            const imobi = await prisma.imobi.findUnique({
                where: { slug }
            });
    
            if (!imobi) {
                return response.status(404).json({ message: "Imóvel não encontrado!" });
            }
    
            return response.json(imobi);
        } catch (error) {
            console.error('Erro ao listar imóvel:', error);
            return response.status(500).json({ message: error.message });
        }
    },

    async deleteImobi(request, response) {
        const { id } = request.params;
        const userId = request.user.id; // Certifique-se de que `request.user.id` está sendo definido corretamente
    
        try {
            const imobi = await prisma.imobi.findUnique({
                where: { id: Number(id) }
            });
    
            if (!imobi) {
                return response.status(404).json({ message: "Anúncio não encontrado!" });
            }

            if (imobi.userId !== userId) {
                return response.status(403).json({ message: "Você não tem permissão para deletar este anúncio." });
            }

            await prisma.imobi.delete({
                where: { id: Number(id) }
            });
    
            return response.json({ message: "Anúncio deletado com sucesso!" });
    
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}
