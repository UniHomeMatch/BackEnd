import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default{
    
    async findByTitle(request, response) {
        try {
            const { title } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    title: { startsWith: title, mode: 'insensitive'},
                }
            })
            if(!imobi){
                return response.status(404).json({message: "Nenhum imóvel com este título foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){
            return response.json({message: error.message});
        }
    },

    async findByPrice(request, response) {
        try {
            const { price } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    price: {
                        gte: precoMin,
                        lte: precoMax,
                    },
                }
            })
            if(!imobi){
                return response.status(404).json({message: "Nenhum imóvel com este preço foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){
            return response.json({message: error.message});
        }
    }
}