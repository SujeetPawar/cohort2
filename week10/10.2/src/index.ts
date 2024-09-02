import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
  firstName: string;
  lastName: string;
}

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  const res = await prisma.user.create({
    data: { email: username, password, firstName, lastName },
    select: {
      id: true,
      password: true,
      firstName: true,
    },
  });
}

async function updateUser(
  username: string,
  { firstName, lastName }: UpdateParams
) {
 const res = await prisma.user.update({
    where: { email: username },
    data: {
      firstName,
      lastName,
    },
  });
}

async function getUser(username: string) {
    const res = await prisma.user.findFirst({where:{email:username}})
    console.log(res)
}

getUser("sujeet170@gmail.com")

