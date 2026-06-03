import {prisma} from "../../../prismaClient";

 const createGrowthRecord = async (
  height: number,
  weight: number,
  childId: string,
  userId: string,
  date?: Date
) => {
  const child = await prisma.child.findFirst({
    where: { id: childId, userId },
  });

  if (!child) {
    const error = new Error("Access denied");
    (error as any).statusCode = 403;
    throw error;
  }

  return await prisma.growthRecord.create({
    data: {
      height,
      weight,
      date: date ?? new Date(),
      childId,
    },
  });
};

 const updateGrowthRecord = async (
  growthRecordId: string,
  userId: string,
  height?: number,
  weight?: number,
  date?: Date
) => {
  const existingRecord = await prisma.growthRecord.findFirst({
    where: {
      id: growthRecordId,
      child: { userId },
    },
  });

  if (!existingRecord) {
    const error = new Error("Access denied");
    (error as any).statusCode = 403;
    throw error;
  }

  return await prisma.growthRecord.update({
    where: { id: growthRecordId },
    data: { height, weight, date },
  });
};

 const deleteGrowthRecord = async (
  growthRecordId: string,
  userId: string
) => {
  const growthRecord = await prisma.growthRecord.findFirst({
    where: {
      id: growthRecordId,
      child: { userId },
    },
  });

  if (!growthRecord) {
    const error = new Error("Access denied");
    (error as any).statusCode = 403;
    throw error;
  }

  await prisma.growthRecord.delete({
    where: { id: growthRecordId },
  });
};
const growthRecordService = { createGrowthRecord, updateGrowthRecord, deleteGrowthRecord };
export default growthRecordService;