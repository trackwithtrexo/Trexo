import { getpasswordResetTokenByEmail } from "@/action/data/password-reset-token"
import { getVerifationTokenByEmail } from "@/action/data/verification-token"
import PRISMA from "@/utils/prisma"
import { v4 as uuidv4 } from "uuid"
// To Generate random OTP Better then Math.random
import { getTwoFactorTokenByEmail } from "@/action/data/two-factor-token"
import crypto from "crypto"

export const generateTwoFactorToken = async (email: string) => {
  // 100000 and 100_000 same thing this is a little trick to read numbers better
  const token = crypto.randomInt(100_000, 1_000_000) + ""

  //TODO:: Later change to 15 min token expires
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getTwoFactorTokenByEmail(email)

  // console.log(existingToken);

  if (existingToken) await PRISMA.tokens.delete({ where: { id: existingToken.id } })

  const twoFactorToken = await PRISMA.tokens.create({
    data: {
      email,
      token,
      expires,
      type: "TwoFactor",
    },
  })

  return twoFactorToken
}

// Token for reset-password
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4()

  //expires in 1 hr
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getpasswordResetTokenByEmail(email)

  if (existingToken) {
    await PRISMA.tokens.delete({
      where: {
        id: existingToken.id,
        type: "PasswordReset",
      },
    })
  }

  const passwordResetToken = await PRISMA.tokens.create({
    data: {
      token,
      email,
      expires,
      type: "PasswordReset",
    },
  })

  return passwordResetToken
}

// Token for email verification
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4()

  //expire the token in 1hr
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerifationTokenByEmail(email)

  if (existingToken) {
    await PRISMA.tokens.delete({
      where: {
        id: existingToken.id,
        type: "EmailVerification",
      },
    })
  }

  const verficationToken = await PRISMA.tokens.create({
    data: {
      email,
      token,
      expires,
      type: "EmailVerification",
    },
  })

  return verficationToken
}
