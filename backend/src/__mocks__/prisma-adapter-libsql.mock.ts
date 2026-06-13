export const PrismaLibSql = jest.fn().mockImplementation(() => ({
  connect: jest.fn(),
  connectToShadowDb: jest.fn(),
}));
