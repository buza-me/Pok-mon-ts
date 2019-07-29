interface DataModuleStateInterface {
    _arrayOfPokemonData: any[];
}

export const state = (): DataModuleStateInterface => {
    return {
        _arrayOfPokemonData: [],
    };
};
export const mutations = {
    setArrayOfPokemonData(state: DataModuleStateInterface, array: any[]) {
        state._arrayOfPokemonData = array;
    },
};
export const getters = {
    arrayOfPokemonData: (state: DataModuleStateInterface) => state._arrayOfPokemonData,
};
export const actions = {
    async fetchArrayOfPokemonData({ commit }, url: string): Promise<any> {
        let { results } = await fetch(url).then(response => response.json());
        results = results.map((item: any) => fetch(item.url).then(response => response.json()).catch(console.error));

        commit('setArrayOfPokemonData', await Promise.all(results));
    },
}