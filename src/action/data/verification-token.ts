import PRISMA from "@/utils/prisma"

export const getVerifationTokenByEmail= async(email:string)=>{
  try{
    const verifationToken = await PRISMA.tokens.findFirst({
      where:{
        email,
        type:"EmailVerification"
      }
    });

    return verifationToken;
  }catch(e){
    return null;
  }
}

export const getVerifationTokenByToken= async(token:string)=>{
  try{
    const verifationToken = await PRISMA.tokens.findFirst({
      where:{
        token,
        type:"EmailVerification"
      }
    });

    return verifationToken;
  }catch(e){
    return null;
  }
}