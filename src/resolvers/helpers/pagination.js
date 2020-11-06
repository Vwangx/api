module.exports = (totalItems, limit, page) => {
  const pagination = {};
  const hasNextPage = page < Math.ceil(totalItems / limit);
  const hasPreviousPage = page > 1;

  let nextPage = null;
  let previousPage = null;

  if (hasPreviousPage) nextPage = page + 1;
  if (hasPreviousPage) previousPage = page - 1;

  pagination.totalItems = totalItems;
  pagination.totalPages = Math.ceil(totalItems / limit);
  pagination.page = page;
  pagination.perPage = limit;
  pagination.hasPreviousPage = hasPreviousPage;
  pagination.hasNextPage = hasNextPage;
  pagination.nextPage = nextPage;
  pagination.previousPage = previousPage;

  return pagination;
};
