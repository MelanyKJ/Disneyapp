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
        });

        res.json({
            ok:true,
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
        character:{
          select:{
            character:{
              select:{
                name:true
              }
            }
          }
        }}
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

export const FindByMovies = async(req, res) => {
  try{
        const { name, gender, order } = req.query
        if(Object.keys(
          req.query
        ).length === 0){
            const movie = await prisma.movie.findMany({
                        select:{
              		id:true,
              		image:true,
              		titulo:true,
              		fecha_publicacion:true
                        },
            });

            res.json({
                ok:true,
                data: movie,
            })
        }
  if(name){
    const movie = await prisma.movie.findMany({
      where:{
        titulo: name
      },
      select:{
        id:true,
        image:true,
        titulo:true,
        fecha_publicacion:true
      }
    })
    return res.json({
        ok:true,
        data:movie
    })
  }else if (gender) {
    const movies = await prisma.movie.findMany({
      where:{
        idGender: Number(gender)
      },
      select:{
          id:true,
          image:true,
          titulo:true,
          fecha_publicacion:true
        }
    })
    return res.json({
        ok:true,
        data:movies
    })
}else if (order) {
    const movies = await prisma.movie.findMany({
      orderBy:{
        fecha_publicacion:order.toLowerCase()
      },
      select:{
        id:true,
        titulo:true,
        fecha_publicacion:true
      }
    })
    res.json({
    ok:true,
    data:movies
    })
  }
}catch(error){
    return res.json({
        ok:false,
        error: error.message
    })

}
}
