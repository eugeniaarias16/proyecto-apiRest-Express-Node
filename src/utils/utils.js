import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import fs from 'node:fs/promises'; 
import path from 'node:path';
import { fileURLToPath } from 'node:url';


export const readJSON = async (path) => {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Si el archivo no existe, devolver un array vacío
      return [];
    }
    console.error('Error reading JSON file:', error);
    throw error;
  }
};

export const writeJSON = async (path, data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(path, jsonData, 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
};



export const createID = () => crypto.randomUUID();

export const absolutePath=({folder,file})=>{
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE_PATH = path.join(__dirname, '..', folder, file);
return FILE_PATH
}