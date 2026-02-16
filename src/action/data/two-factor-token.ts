import PRISMA from "@/utils/prisma";

export const getTwoFactorTokenByToken = async(token:string) => {
  try{
    const twoFactorToken = await PRISMA.tokens.findUnique({
      where:{token,type:"TwoFactor"}
    });

    return twoFactorToken;
  }catch{
    return null;
  }
}

export const getTwoFactorTokenByEmail = async(email:string) => {
  try{
    const twoFactorToken = await PRISMA.tokens.findFirst({
      where:{email,type:"TwoFactor"}
    });

    return twoFactorToken;
  }catch{
    return null;
  }
}