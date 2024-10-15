import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {    
    async findByPredio(request, response){
        try {
            const { predio } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    predio: { startsWith: predio},
                }
            })
            if(!imobi){
                return response.status(404).json({message: "Nenhum imóvel neste parâmetro foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){
            return response.json({message: error.message});
        }
    },

    async findByPrice(request, response) {
        try {
            const { minPrice, maxPrice } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    price: {
                        gte: parseInt(minPrice), // Preço mínimo
                        lte: parseInt(maxPrice),  // Preço máximo
                    },
                }
            })
            if (!imobi) {
                return response.status(404).json({ message: "Nenhum imóvel com preço menor que o informado foi encontrado." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findByArea(request, response) {
        try {
            const { areaMin, areaMax } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    area: { gte: parseInt(areaMin),
                            lte: parseInt(areaMax) 
                    },
                }
            })
            if(!imobi){
                return response.status(404).json({message: "Nenhum imóvel neste parâmetro foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){                                                   
            return response.json({message: error.message});
        }
    },

    async findByGender(request, response) {  
        try {
            const { generoId } = request.params;

             if (generoId = 3){
                const imobi = await prisma.imobi.findMany();
                return response.json(imobi);
             }
            const imobi = await prisma.imobi.findMany({
                where: {
                    generoId: Number(generoId),
                  }
            })
            if(!imobi){
                return response.status(404).json({message: "Nenhum imóvel neste parâmetro foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){
            return response.json({message: error.message});
        }
    }    
}