export const formatCreatedAt = (created_at: string) => {
  created_at = created_at.slice(0, 10);
  created_at = created_at.replaceAll("-", "/");
  return created_at;
};