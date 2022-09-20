import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req,res) => {
    try{
        const gender = await prisma.gender.findMany({
            include:{
                movie:{
                    select:{
                        titulo:true,
                        calificacion:true,
                        image:true,
                        fecha_publicacion:true
                    }
                }
            },
            orderBy:{
                createdAt:"asc"
            }
        });

        res.json({
            ok:false,
            data: gender,
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
};

export const create = async (req, res) => {
    try{
        const { body } = req;

        const genero = await prisma.gender.create({
            data:{
                ...body,
            }
        });
        res.json({
            ok:true,
            data:genero
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}

export const destroy = async (req,res) => {
    try{
        const {id} = req.params
        await prisma.gender.delete({
            where:{id:Number(id)}
        })
        return res.json({
            ok:true,
            message: "Eliminado correctamente"
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}

export const update = async (req,res) => {
    try{
        const { id } = req.params
        const { body } = req
        const dato = await prisma.gender.update({
            where:{
                id:Number(id)
            },
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data: dato
        })
    }catch(error){
        res.json({
            ok:false,
            error: error.message
        })
    }
    
}

export const findOneGender = async (req,res) => {
    try{
        const { id } = req.params
        const gender = await prisma.gender.findUnique({
            where: {
                id:Number(id)
            },
            include:{
                movie:{
                    select:{
                        titulo:true,
                        calificacion:true,
                        image:true,
                        fecha_publicacion:true
                    }
                }
            }
        })
        return res.json({
            ok:true,
            data:gender
        })
    }catch(error){
        res.json({
            ok:false,
            error:error.message
        })
    }
}
