import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findAll = async (req,res) => {
    try{
        const character = await prisma.character.findMany({
            select:{
                		id:true,
                    name:true,
                		image:true,
                    },
        });

        res.json({
            ok:true,
            data: character,
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
        console.log(body.character);
        const personaje = await prisma.character.create({
            data:{ body.character}

        });
        const movie = await prisma.movie.create({
          data:{ body.movie}
        })

        const relationMovieCharacter = await prisma.MovieOnCharacter.create({
          data:{ characterId: personaje.id, movieId:movie.id}
        })
        res.json({
            ok:true,
            data:{personaje, movie, relationMovieCharacter}
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
        const dato = await prisma.character.update({
            where:{
                id:Number(id)
            },
            data:{
                ...body
            }
        });
        res.json({
            ok:true,
            data: "Update Character"
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
        await prisma.character.delete({
            where:{id:Number(id)}
        })
        return res.json({
            ok:true,
            message: "Delete Character"
        })
    }catch(error){
        res.json({
            ok:false,
            data:error.message,
        })
    }
}

export const findOneCharacter = async(req, res)=>{
  try{
    const{id} = req.params;
    const personajeDetalle = await prisma.character.findUnique({
      where:{
        id:Number(id)
      },
      include:{
        pelicula:{
          select:{
            movie:{
              select:{
                titulo:true
              }
            }
          }
        }}
    })
    return res.json({
        ok:true,
        message: personajeDetalle
    })
  }catch(error){
    res.json({
      ok:false,
      error:error.message
    })
  }
}
