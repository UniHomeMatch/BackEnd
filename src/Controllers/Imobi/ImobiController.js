import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {

        try {
            const thumb = request.file.filename;
            const { id, title, description, price, cep, 
                    logradouro, numero, complemento, cidade, 
                    uf, area, bedrooms, bathrooms, name, phone, email } = request.body;

            const user = await prisma.user.findUnique({ where: { id: Number(id) } });

            if (!user) {
                return response.status(404).json({ message: "Usuário não encontrado!" });
            }

            const slugify = str => 
                str
                  .toLowerCase()
                  .trim()
                  .replace(/[^\w\s-]/g, '')
                  .replace(/[\s_-]+/g, '-')
                  .replace(/^-+|-+$/g, '');
              
              const slug = title ? slugify(title) : '';

            const imobi = await prisma.imobi.create({
                data: {
                    thumb,
                    title,
                    description,
                    price,
                    cep, 
                    logradouro, 
                    numero,
                    complemento, 
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

            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findAllImobi(request, response) {
        try {

            const imobi = await prisma.imobi.findMany();

            return response.json(imobi);

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findImobi(request, response) {
        try {
            const { slug } = request.params;
    
            const imobi = await prisma.imobi.findUnique({
                where: {
                    slug: slug, 
                },
            });
    
            if (!imobi) {
                return response.status(404).json({ message: "Imóvel não encontrado!" });
            }
    
            return response.json(imobi);
        } catch (error) {
            console.error('Erro ao listar imóvel:', error);
            return response.status(500).json({ message: error.message });
        }
    }
}
