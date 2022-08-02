import {fileURLToPath} from 'url';
import { dirname } from 'path';


const filename = fileURLToPath(import.meta.url);
const _dirname = dirname(filename);

export const authMidleware = (req,res,next)=>{
    if (!req.auth) res.status(403).send ({error:-2, message:"No eres administrador"})
    else next();
}
export const getTime = () =>{
    return{
        fyh:new Date().toLocaleString(),
        timestamp:Date.now(), 
    }
}


export default _dirname;
