import { kv } from "@vercel/kv";

export default async function handler(request, response){
    response.setHeader('Access-control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if(request.method === 'OPTIONS'){
        return response.status(200).end();
    }

    try{
        if(request.method === 'GET'){
            const eventos = await kv.get('lista_eventos_compartida');
            return response.status(200).json(eventos || [])
        }

        if(request.method === 'POST'){
            const nuevoEvento = request.body;

            const eventosActuales = (await kv.get('lista_eventos_compartida')) || [];

            const nuevaLista = [...eventosActuales, nuevoEvento];

            await kv.set('lista_eventos_compartida', nuevaLista);

            return response.status(201).json(nuevaLista)
        }

        return response.status(405).json({error: 'Metodo no permitido'});
    }catch(error){
        return response.status(500).json({error:'error en la base de datos', details: error.message})
    }
}