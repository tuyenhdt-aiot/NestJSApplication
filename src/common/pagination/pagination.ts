export function getPaginationParam(
  page?: number,
  limit?: number,
): { skip: number; take: number; page: number; limit: number } {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;
  return { skip, take: limitNumber, page: pageNumber, limit: limitNumber };
}
