export interface FindResourceRepositoryDto {
  page: number;
  limit: number;
  filter: FindResourceRepositoryFilter;
}

interface FindResourceRepositoryFilter {
  active: boolean;
}
