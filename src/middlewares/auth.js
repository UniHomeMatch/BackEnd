import jwt from 'jsonwebtoken';

export default function auth(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, `${process.env.JTW_KEY}`);
        const { id } = data;
        request.userId = id;
        return next();
    } catch (error) {
        // Verificar se o token é expirado
        if (error.message === 'jwt expired') {
            return response.status(401).json({ message: 'Token expirado' });
        }
        
        // Verificar se o token é inválido
        if (error.message === 'jwt malformed') {
            return response.status(401).json({ message: 'Token inválido' });
        }

        // Para outros tipos de erros relacionados ao JWT
        return response.status(401).json({ message: 'Erro ao autenticar o token', details: error.message });
    }
}