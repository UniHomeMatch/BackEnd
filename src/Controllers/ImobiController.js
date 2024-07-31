import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default{
    async createImobi(request, response) {
        try {
            const thumb = request.file.filename;
            const {id, title, description, price, location, area, bedrooms, bathrooms} = request.body;

            const user = await prisma.user.findUnique({where: {id: Number(id)}});

            if(!user) {
                return response.status(404).json({ message: "Usuário não encontrado!" });
            }
            
            const imobi = await prisma.imobi.create({
                data: {
                    thumb,
                    title,
                    description,
                    price,
                    location,
                    area,
                    bedrooms,
                    bathrooms,
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
            const { id } = request.params;

            const imobi = await prisma.imobi.findUnique({where: {id: Number(id)}});
            
            if(!imobi) {
                return response.status(404).json({ message: "Imóvel não encontrado!" });
            }

            return response.json(imobi);

        } catch (error) {
            return response.json({ message: error.message });
        }
    }
}