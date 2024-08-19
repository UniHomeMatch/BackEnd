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
                return response.status(404).json({message: "Nenhum imóvel neste parâmetro foi encontrado."});
            }
            return response.json(imobi);
        } catch(error){
            return response.json({message: error.message});
        }
    },

    async findByPrice(request, response) {
        try {
            const { priceMin, priceMax } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    price: {
                        gte: priceMin,
                        lte: priceMax,
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
    //                     gte: precoMin,
    //                     lte: precoMax,
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
            const { areaMin, areaMax } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    area: {
                        gte: areaMin,
                        lte: areaMax,
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

    async findByBedrooms(request, response) {
        try {
            const { bedrooms } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    bedrooms: parseInt(bedrooms),
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

    async findByBathrooms(request, response) {
        try {
            const { bathrooms } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    bathrooms: parseInt(bathrooms),
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