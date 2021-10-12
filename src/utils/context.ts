import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken'


require('dotenv').config()
export const APP_SECRET = process.env.APP_SECRET || ""


const prisma = new PrismaClient()
export interface Context {
  prisma: PrismaClient
  req: any
}

interface Token {
  userId: string
}


export function createContext(req: any) {
  return { ...req, prisma }
}

export function getUserId(context: Context) {
  const authHeader = context.req.get('Authorization')
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && Number(verifiedToken.userId)
  }
}