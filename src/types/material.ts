export interface Material {
  id: number;
  nomematerial: string;
  codigo: string;
}

export type MaterialDTO = Omit<Material, 'nomematerial'> & { nomeMaterial: string };

export function toDTO(m: Material): MaterialDTO {
  const { nomematerial, ...rest } = m;
  return { ...rest, nomeMaterial: nomematerial };
}
