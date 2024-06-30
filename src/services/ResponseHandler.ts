export const handleResponse = async (response: Response) => {
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    const error = new Error(
      JSON.stringify(data) || 'Something went wrong',
    )
    throw error
  }
}