import {createRequired} from 'node:module';
import crypto from 'node:crypto'


const require= createRequired(import.meta.url);
export const readJSON=(path)=>require(path); //Funcion para leer JSON


export const createID=()=>crypto.randomUUID(); 