import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req,res) => {
    try{
        const movie = await prisma.movie.findMany({
                    select:{
          		id:true,
          		image:true,
          		titulo:true,
          		fecha_publicacion:true
                    },
            orderBy:{
                  fecha_publicacion:"asc"
            }
        });

        res.json({
            ok:false,
            data: movie,
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

        const pelicula = await prisma.movie.create({
            data:{
                ...body,
            }
        });
        res.json({
            ok:true,
            data:pelicula
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
        const dato = await prisma.movie.update({
            where:{
                id:Number(id)
            },
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data: "Update Movie"
        })
    }catch(error){
        res.json({
            ok:false,
            error: error.message
        })
    }

}

export const remove = async (req,res) => {
    try{
        const {id} = req.params
        await prisma.movie.delete({
            where:{id:Number(id)}
        })
        return res.json({
            ok:true,
            message: "Delete Movie"
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}

export const findOneMovie = async(req, res)=>{
  try{
    const{id} = req.params;
    const peliculaDetalle = await prisma.movie.findUnique({
      where:{
        id:Number(id)
      },
      include:{
        personajes:{
          select:{
            name:true
          }
        }
      }
    })
    return res.json({
        ok:true,
        message: peliculaDetalle
    })
  }catch(error){
    res.json({
      ok:false,
      error:error.message
    })
  }
}
