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
        const newCharacter = body.character;
        const newMovie = body.movie;

        const personaje = await prisma.character.create({
            data:{...newCharacter}
        });
        const movie = await prisma.movie.create({
          data:{ ...newMovie}
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


//
export const findOneCharacter = async(req, res)=>{
  try{
    const{id} = req.params;
    const personajeDetalle = await prisma.character.findUnique({
      where:{
        id:Number(id)
      },
      include:{
        peliculas:{
          include:{
            movie:{
              select:{
                titulo:true
              }
            }
          }
        }
      }
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




export const FindByQuery = async (req,res) => {
    //console.log(name)
    try{
        let { name, age, weight, movie } = req.query

    if(movie){
        let characters = await prisma.character.findMany({
            where:{
                peliculaId: Number(movie)
            },
            select:{
                name:true,
                image:true,
                pelicula:true
            }
        })
        return res.json({
            ok:true,
            data:characters
        })
    }else if(age){
        const characters = await prisma.character.findMany()
        const fechaHoy = new Date()
        const anioNacimiento = fechaHoy.getFullYear() - Number(age)
        console.log(anioNacimiento)
        const filterAge = characters.filter((e)=>
            e.date_birth.getFullYear() == anioNacimiento
        )

        return res.json({
            ok:true,
            data:filterAge
        })

    }else{
        let characters = await prisma.character.findMany({
            where:{
                OR:[
                    {name:name},
                    {weight:Number(weight)},

                ]
            },
            select:{
                name:true,
                image:true
            }
        })
        return res.json({
            ok:true,
            data:characters
        })
    }
    }catch(error){
        return res.json({
            ok:false,
            error: error.message
        })

    }

}
