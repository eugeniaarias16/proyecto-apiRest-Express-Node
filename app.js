import express from 'express';
import cors from 'cors';

const app= express();
app.use(json());
app.disable('x-powered-by');

const PORT= process.env.PORT ?? 3001;

//Configuracion CORS avanzada
app.use(cors({
    origin:(origin,callback)=>{
        const ACCEPTED_ORIGINS=[
            'http://localhost:3001'
        ];

        if(!origin || ACCEPTED_ORIGINS.includes(origin)){
            return callback(null,true);
        }

        return callback(new Error('Not allowed by CORS.'));

    }
}));




// Definir una ruta básica
app.get('/', (req, res) => {
    res.send('¡Hola mundo con Express!');
  });

//Iniacilizar servidor
app.listen(PORT,()=>{
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
})