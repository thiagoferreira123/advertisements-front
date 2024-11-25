export type ShoppingListItem = {
  id?: number| string,
  nome: string,
  gramas_7: number | '',
  gramas_15: number | '',
  gramas_30: number | '',
  id_plano?: number,
  is_user_input: number,
  update_list: number,
  id_alimento?: number,
}