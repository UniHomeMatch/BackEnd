import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {


        try {
            const { thumb, images } = request.files;

            if (!thumb || thumb.length === 0) {
                return response.status(400).json({ message: "A miniatura (thumb) é obrigatória." });
              }
        
              if (!images || images.length < 2 || images.length > 10) {
                return response.status(400).json({ message: "Você deve enviar entre 2 a 10 imagens." });
              }

              
            const { id, predio, description, price, cep, logradouro, complemento, bairro, numero, cidade, uf, area, bedrooms, bathrooms, name, phone, email, generoId } = request.body;

            const generoIdInt = parseInt(generoId, 10);

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
              
              const slug = predio ? slugify(predio) : '';

            const imobi = await prisma.imobi.create({
                data: {
                    thumb: thumb[0].filename,
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
                    genero: { connect: { id_genero: generoIdInt } },
                    slug,
                    userId: user.id,
                }
            });
            const imagens = await Promise.all(
                images.map(file => 
                  prisma.imagem.create({
                    data: {
                      filename: file.filename, // Nome do arquivo de imagem
                      imobiId: imobi.id        // ID do imóvel recém-criado
                    }
                  })
                )
            );

            const imobiComImagens = {
                ...imobi,
                photos: imagens
            };

            return response.json(imobiComImagens);
        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findAllImobi(request, response) {
        try {

            const imobi = await prisma.imobi.findMany({
                include: {
                    photos: true,
                }
            });

            return response.json(imobi);

        } catch (error) {
            return response.json({ message: error.message });
        }
    },

    async findImobi(request, response) {
        try {
            const { slug } = request.params;
    
            const imobi = await prisma.imobi.findUnique({
                where: { slug: slug },
                include: { photos: true}
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

