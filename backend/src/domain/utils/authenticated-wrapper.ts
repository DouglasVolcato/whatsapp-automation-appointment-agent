export function authenticatedWrapper(data: any) {
  return {
    ...data,
    token: '',
  };
}
