import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		forecast: '',
		meteostation: '',
		forecastItems: [],
		meteostationItems: [],
		placeItems: [],
		sourceItems: [],
		loaded: false,
		alertText: ""
	},
	getters: {},
	mutations: {
		'ADD_FORECAST_ITEM'(state, forecast) {
			state.forecastItems = [...state.forecastItems, forecast]
		},
		'UPDATE_FORECAST_ITEM'(state, forecast) {
			const updateIndex = state.forecastItems.findIndex(item => item.id === forecast.id)

			state.forecastItems = [
				...state.forecastItems.slice(0, updateIndex),
				forecast,
				...state.forecastItems.slice(updateIndex + 1)
			]
		},
		'REMOVE_FORECAST_ITEM'(state, forecast) {
			const deletionIndex = state.forecastItems.findIndex(item => item.id === forecast.id)

			if (deletionIndex > -1) {
				state.forecastItems = [
					...state.forecastItems.slice(0, deletionIndex),
					...state.forecastItems.slice(deletionIndex + 1)
				]
			}
		},
		'ADD_METEOSTATION_ITEM'(state, meteostation) {
			state.meteostationItems = [...state.meteostationItems, meteostation]
		},
		'UPDATE_METEOSTATION_ITEM'(state, meteostation) {
			const updateIndex = state.meteostationItems.findIndex(item => item.id === meteostation.id)

			state.meteostationItems = [
				...state.meteostationItems.slice(0, updateIndex),
				meteostation,
				...state.meteostationItems.slice(updateIndex + 1)
			]
		},
		'REMOVE_METEOSTATION_ITEM'(state, meteostation) {
			const deletionIndex = state.meteostationItems.findIndex(item => item.id === meteostation.id)

			if (deletionIndex > -1) {
				state.meteostationItems = [
					...state.meteostationItems.slice(0, deletionIndex),
					...state.meteostationItems.slice(deletionIndex + 1)
				]
			}
		},
		'SET_FORECAST_ITEMS'(state, forecastItems) {
			state.forecastItems = forecastItems;
		},
		'SET_METEOSTATION_ITEMS'(state, meteostationItems) {
			state.meteostationItems = meteostationItems;
		},
		'SET_FORECAST_ITEM'(state, forecast) {
			state.forecast = forecast;
		},
		'SET_METEOSTATION_ITEM'(state, meteostation) {
			state.meteostation = meteostation;
		},
		'SET_ALERT_TEXT'(state, alertText) {
			state.alertText = alertText;
		},
		'SET_LOADED'(state, flag) {
			state.loaded = flag;
		},
		'SET_PLACE_ITEMS'(state, placeItems) {
			state.placeItems = placeItems;
		},
		'SET_SOURCE_ITEMS'(state, sourceItems) {
			state.sourceItems = sourceItems;
		}
	},
	actions: {
		async addForecast(context, forecast) {
			try {
				const response = await api.forecastApi.add(forecast);
				context.commit('ADD_FORECAST_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async updateForecast(context, forecast) {
			try {
				const response = await api.forecastApi.edit(forecast.id, forecast);
				context.commit('UPDATE_FORECAST_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async removeForecast(context, forecast) {
			try {
				const response = await api.forecastApi.delete(forecast.id);
				if (response.status === 200) {
					context.commit('REMOVE_FORECAST_ITEM', forecast);
				}
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async addMeteostation(context, meteostation) {
			try {
				const response = await api.meteostationApi.add(meteostation);
				context.commit('ADD_METEOSTATION_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async updateMeteostation(context, meteostation) {
			try {
				const response = await api.meteostationApi.edit(meteostation.id, meteostation);
				context.commit('UPDATE_METEOSTATION_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async removeMeteostation(context, meteostation) {
			try {
				const response = await api.meteostationApi.delete(meteostation.id);
				if (response.ok && response.data === true) {
					context.commit('REMOVE_METEOSTATION_ITEM', meteostation);
				}
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getForecastItems(context) {
			try {
				const response = await api.forecastApi.getAll();
				context.commit('SET_FORECAST_ITEMS', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getMeteostationItems(context) {
			try {
				const response = await api.meteostationApi.getAll();
				context.commit('SET_METEOSTATION_ITEMS', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getPlaceItems(context) {
			try {
				const response = await api.placeApi.getAll();
				context.commit('SET_PLACE_ITEMS', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getSourceItems(context) {
			try {
				const response = await api.sourceApi.getAll();
				context.commit('SET_SOURCE_ITEMS', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getForecastById(context, id) {
			try {
				const response = await api.forecastApi.getOne(id);
				context.commit('SET_FORECAST_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async getMeteostationById(context, id) {
			try {
				const response = await api.meteostationApi.getOne(id);
				context.commit('SET_METEOSTATION_ITEM', response.data);
			} catch (error) {
				context.commit('SET_ALERT_TEXT', "Произошла ошибка");
			}
		},
		async setLoaded(context) {
			context.commit('SET_LOADED', true)
		}
	}
});
