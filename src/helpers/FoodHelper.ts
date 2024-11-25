import { Food, MedidaCaseira } from "../types/foods";

const buildArrayMedidas = (food: Food, ignoreCustomMeasure?: boolean) => {
  const medidas_caseiras: MedidaCaseira[] = [];

  Object.entries(food).forEach((field) => {
    const index: number = Number(field[0].replace(/[^0-9]/g, ''));

    if (field[0].includes('gramas'))
      medidas_caseiras[index]
        ? (medidas_caseiras[index].gramas = Number(field[1] ? field[1] : 0))
        : (medidas_caseiras[index] = { nome: '', gramas: Number(field[1] ? field[1] : 0) });
    else if (field[0].includes('medidaCaseira') && field[1])
      medidas_caseiras[index] ? (medidas_caseiras[index].nome = String(field[1])) : (medidas_caseiras[index] = { gramas: 0, nome: String(field[1]) });
  });

  medidas_caseiras.push({ nome: 'Gramas', gramas: 1 });
  medidas_caseiras.push({ nome: 'À vontade', gramas: 0 });
  !ignoreCustomMeasure && medidas_caseiras.push({ nome: 'Medida Personalizada', gramas: 0 });

  return medidas_caseiras.filter((medida) => medida.nome && !isNaN(medida.gramas) && medida.nome != 'SEM_MEDIDA');
};

const buildFoodMeasures = (food: Food) => {
  const medidas_caseiras: MedidaCaseira[] = [];

  Object.entries(food).forEach((field) => {
    const index: number = Number(field[0].replace(/[^0-9]/g, ''));

    if (field[0].includes('gramas'))
      medidas_caseiras[index]
        ? (medidas_caseiras[index].gramas = Number(field[1] ? field[1] : 0))
        : (medidas_caseiras[index] = { nome: '', gramas: Number(field[1] ? field[1] : 0) });
    else if (field[0].includes('medidaCaseira') && field[1])
      medidas_caseiras[index] ? (medidas_caseiras[index].nome = String(field[1])) : (medidas_caseiras[index] = { gramas: 0, nome: String(field[1]) });
  });

  medidas_caseiras.push({ nome: 'Gramas', gramas: 1 });
  medidas_caseiras.push({ nome: 'À vontade', gramas: 0 });

  return medidas_caseiras.filter((medida) => medida.nome && !isNaN(medida.gramas) && medida.nome != 'SEM_MEDIDA');
};

const buildOptions = (measures: MedidaCaseira[]) => {
  if (measures) {
    const options = measures.map((medida) => {
      return { value: medida.nome, label: medida.nome };
    });

    return options;
  }

  return [];
};

export { buildArrayMedidas, buildFoodMeasures, buildOptions };