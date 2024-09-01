import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default{
    
    async findByTitle(request, response) {
        try {
            const { title } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    title: { startsWith: title},
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
            const { priceMax } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    price: {
                        gt: priceMax,
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

    // async findByLocation(request, response) {
    //     try {
    //         const { location } = request.params;
    //         const imobi = await prisma.imobi.findMany({
    //             where: {
    //                 location: {
    //                     string
    //                 },
    //             }
    //         })
    //         if(!imobi){
    //             return response.status(404).json({message: "Nenhum imóvel neste parâmetro foi encontrado."});
    //         }
    //         return response.json(imobi);
    //     } catch(error){
    //         return response.json({message: error.message});
    //     }
    // },
    
    async findByArea(request, response) {
        try {
            const { areaMin } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    area: {
                        gte: areaMin,
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
            const imobi = await prisma.imobi.findMany({
                where: {
                    generoId: generoId,
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