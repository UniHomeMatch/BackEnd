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
    },
    
    async findByUF(request, response) {
        try {
            const { uf } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    uf: uf, 
                }
            });
            if (!imobi.length) {
                return response.status(404).json({ message: "Nenhum imóvel encontrado para este estado." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findByCidade(request, response) {
        try {
            const { cidade } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    cidade: cidade,
                }
            });
            if (!imobi.length) {
                return response.status(404).json({ message: "Nenhum imóvel encontrado para este estado." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findByQuartos(request, response) {
        try {
            const { bedrooms } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    bedrooms: bedrooms, 
                }
            });
            if (!imobi.length) {
                return response.status(404).json({ message: "Nenhum imóvel encontrado para este estado." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findByBanheiros(request, response) {
        try {
            const { bathrooms } = request.params;
            const imobi = await prisma.imobi.findMany({
                where: {
                    bathrooms: bathrooms, 
                }
            });
            if (!imobi.length) {
                return response.status(404).json({ message: "Nenhum imóvel encontrado para este estado." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },
    async searchBar(request, response) {
        try {
            const { query } = request.query;  // Captura o termo de busca
    
            const imobi = await prisma.imobi.findMany({
                where: {
                    OR: [
                        { predio: { contains: query, mode: 'insensitive' } },
                        { description: { contains: query, mode: 'insensitive' } },
                        { nome: { contains: query, mode: 'insensitive' } },//proprietário
                        { logradouro:  { contains: query, mode: 'insensitive' } },
                        { bairro: { contains: query, mode: 'insensitive' } },
                    ],
                },
            });
    
            if (!imobi.length) {
                return response.status(404).json({ message: "Nenhum imóvel encontrado para este termo de pesquisa." });
            }
            return response.json(imobi);
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
    
}