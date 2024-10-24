import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {

        try {
            console.log('Request Body:', request.body);
            const thumb = request.file.filename;
           
            const { predio, description, price, cep, logradouro, complemento, bairro, numero, cidade, uf, area, bedrooms, bathrooms, name, phone, email, userId } = request.body;

          //  const generoIdInt = parseInt(generoId, 10);

          const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
            

           //console.log('Request Body:', request.body);


           const slugify = str =>
            str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s-]+/g, '-')
                .replace(/^-+|-+$/g, '');

                let slug = slugify(predio); // Gera o slug base
                let count = 1;
                
                // Verifica se o slug já existe
                while (await prisma.imobi.findUnique({ where: { slug } })) {
                  slug = `${slugify(predio)}-${count++}`; // Ajusta o slug se houver duplicado
                }

            const imobi = await prisma.imobi.create({
                data: {
                    thumb,
                   // images: imagesZip,  
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
                  //  genero: { connect: { id_genero: generoIdInt } },
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
                where: { slug: slug }
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
        const userId = request.user.id; 
    
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

