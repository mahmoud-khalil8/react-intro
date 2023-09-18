const fetchPet = async ({ queryKey }) => {
  const animal = queryKey[1];
  if (!animal) return [];
  const apiRes = await fetch(`http://pets-v2.dev-apis.com/breeds?animal=${id}`);
  if (!apiRes.ok) {
    throw new Error(`breeds/${animal} fetch not ok`);
  }
  return apiRes.json();
};
export default fetchPet;
