const logInput = async (resolve, root, args, context, info) => {
  if (Object.keys(args).length > 0)
    console.log(`Resolving`, info.fieldName, args);
  const result = await resolve(root, args, context, info);

  return result;
};

const logResult = async (resolve, root, args, context, info) => {
  const result = await resolve(root, args, context, info);
  console.log(`Completed`, info.fieldName, result);

  return result;
};

module.exports = {
  logInput,
  logResult
};
