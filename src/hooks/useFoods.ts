import api from "../services/useAxios";
import { useIndexedDB } from "../services/useIndexedDB";
import { create } from "zustand";
import { Food } from "../types/foods";

type createFoods = {
  foods: Food[];
  // eslint-disable-next-line no-unused-vars
  setFoods: (foods: Food[]) => void;
  // eslint-disable-next-line no-unused-vars
  addFood: (food: Food) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  updateFood: (food: Food) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  removeFood: (food: Food) => Promise<void>;
  getFoods: () => Promise<Food[]>;
};

let initialized = false;

const useFoods = create<createFoods>((set) => {
  const { setData, getData, removeData, addItem, updateItem, deleteDatabase } = useIndexedDB();

  return {
    foods: [],

    getFoods: async () => {
      try {
        const alimentos = await getData<Food>('Alimentos')

        if (!alimentos || !alimentos.length || !initialized) {

          !initialized && await deleteDatabase();

          const response = await api.get('/alimentos')

          await setData('Alimentos', response.data.map((food: Food) => ({ ...food, key: food.id + '@' + food.tabela })))

          initialized = true;
          set(() => {
            return { foods: response.data };
          })

          return await getData('Alimentos')
        } else {

          initialized = true;
          set(() => {
            return { foods: alimentos };
          })

          return alimentos
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    addFood: async (food: Food) => {
      const alimentos = await getData<Food>('Alimentos')

      if (!alimentos || !alimentos.length) {

        food.key = food.id + '@' + food.tabela;

        await setData('Alimentos', [food])
        set(() => {
          return { foods: [food] };
        })
      } else {
        food.key = food.id + '@' + food.tabela;

        await addItem<Food>('Alimentos', food)
        set(() => {
          return { foods: [...alimentos, food] };
        })
      }

      return;
    },

    removeFood: async (food: Food) => {
      const alimentos = await getData<Food>('Alimentos')

      if (!alimentos || !alimentos.length) {
        return
      } else {
        const newAlimentos = alimentos.filter(alimento => alimento.id !== food.id)

        food.key = food.id + '@' + food.tabela;

        await removeData<Food>('Alimentos', food)
        set(() => {
          return { foods: newAlimentos };
        })
      }
    },

    updateFood: async (food: Food) => {
      const alimentos = await getData<Food>('Alimentos')

      if (!alimentos || !alimentos.length) {
        return
      } else {
        const newAlimentos = alimentos.map(alimento => {
          if (alimento.id === food.id) {
            return food
          }

          return alimento
        })

        food.key = food.id + '@' + food.tabela;

        await updateItem<Food>('Alimentos', food)
        set(() => {
          return { foods: newAlimentos };
        })
      }
    },

    setFoods: (foods) =>
      set((state) => {
        return { foods: [...state.foods, ...foods] };
      }),
  };
});

export default useFoods;