export default async function FechApi(api) {
  const res = await fetch(api)
  return  await res.json()
  
}