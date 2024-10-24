import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {

        try {
            const thumb = request.file.filename;
           
            const { predio, description, price, cep, logradouro, complemento, bairro, numero, cidade, uf, area, bedrooms, bathrooms, name, phone, email, userId } = request.body;

          const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
            
           const slugify = str =>
            str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s-]+/g, '-')
                .replace(/^-+|-+$/g, '');

                let slug = slugify(predio); 
                let count = 1;
                
                while (await prisma.imobi.findUnique({ where: { slug } })) {
                  slug = `${slugify(predio)}-${count++}`; 
                } //evita erro caso houver duplicação de slug

            // Criar o anúncio de imóvel
            const imobi = await prisma.imobi.create({
                data: {
                    thumb,
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
