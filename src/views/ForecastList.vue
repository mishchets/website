<template>
	<div>
		<div class="panel panel-primary" style="margin-top: 10px">
			<div class="panel-heading">Список прогнозов</div>
			<table class="table table-striped">
				<thead>
				<tr>
					<th>№</th>
					<th>Город</th>
					<th>Дата/время</th>
					<th>Температура</th>
					<th>Облачность</th>
					<th>Направление ветра</th>
					<th>Скорость ветра</th>
					<th>Осадки</th>
					<th>Ресурс</th>
					<th style="width: 50px;"></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(item, index) in forecastItems" :key="index">
					<td>{{item.id}}</td>
					<td>{{item.place.name}}</td>
					<td>{{formatDate(new Date(item.dateTime))}}</td>
					<td>{{item.temperature}}</td>
					<td>{{getCloud(item.cloud)}}</td>
					<td>{{getWindDir(item.wind_dir)}}</td>
					<td>{{item.wind_speed}}</td>
					<td>{{item.precipitation}}</td>
					<td>{{item.source.name}}</td>
					<td>
						<button type="button" class="btn btn-link" :data-id="item.id" @click="handleDelete">
							<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
						</button>
					</td>
				</tr>
				</tbody>
			</table>
		</div>
		<div class="panel panel-primary">
			<div class="panel-heading">Добавление прогноза</div>
			<div class="panel-body">
				<form class="form-horizontal" @submit="handleSave">
					<div class="form-group">
						<label for="forecastId" class="col-xs-2 control-label">№</label>
						<div class="col-xs-10">
							<input id="forecastId" type="number" class="form-control" v-model="id" placeholder="№"
										 @change="handleIdChange"/>
						</div>
					</div>
					<div class="form-group">
						<label for="forecastPlace" class="col-xs-2 control-label">Город</label>
						<div class="col-xs-10">
							<select id="forecastPlace" class="form-control" v-model="place">
								<option v-for="(placeItem, index) in placeItems" :key="index" :value="placeItem.id">{{ placeItem.name
									}}
								</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="forecastDatetime" class="col-xs-2 control-label">Дата/время</label>
						<div class="col-xs-10">
							<input id="forecastDatetime" type="datetime-local" v-model="dateTime" class="form-control"
										 placeholder="Дата/время">
						</div>
					</div>
					<div class="form-group">
						<label for="forecastTemperature" class="col-xs-2 control-label">Температура</label>
						<div class="col-xs-10">
							<input id="forecastTemperature" type="number" class="form-control" v-model="temperature"
										 placeholder="Температура"/>
						</div>
					</div>
					<div class="form-group">
						<label for="forecastCloud" class="col-xs-2 control-label">Облачность</label>
						<div class="col-xs-10">
							<select id="forecastCloud" class="form-control" v-model="cloud">
								<option value="sunny">Солнечно</option>
								<option value="cloudy">Облачно</option>
								<option value="overcast">Пасмурно</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="forecastWindDir" class="col-xs-2 control-label">Направление ветра</label>
						<div class="col-xs-10">
							<select id="forecastWindDir" class="form-control" v-model="wind_dir">
								<option value="W">Запад</option>
								<option value="E">Восток</option>
								<option value="N">Север</option>
								<option value="S">Юг</option>
								<option value="NW">Северо-запад</option>
								<option value="NE">Северо-восток</option>
								<option value="SW">Юго-запад</option>
								<option value="SE">Юго-восток</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="forecastWindSpeed" class="col-xs-2 control-label">Скорость ветра</label>
						<div class="col-xs-10">
							<input id="forecastWindSpeed" type="number" class="form-control" v-model="wind_speed"
										 placeholder="Скорость ветра">
						</div>
					</div>
					<div class="form-group">
						<label for="forecastPrecipitation" class="col-xs-2 control-label">Осадки</label>
						<div class="col-xs-10">
							<input id="forecastPrecipitation" type="number" class="form-control" v-model="precipitation"
										 placeholder="Осадки">
						</div>
					</div>
					<div class="form-group">
						<label for="forecastSource" class="col-xs-2 control-label">Ресурс</label>
						<div class="col-xs-10">
							<select id="forecastSource" class="form-control" v-model="source">
								<option v-for="(sourceItem, index) in sourceItems" :key="index" :value="sourceItem.id">{{
									sourceItem.name }}
								</option>
							</select>
						</div>
					</div>
					<button type="submit" class="btn btn-primary btn-block">Сохранить</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapActions, mapState} from 'vuex'
	import {validationMixin} from 'vuelidate'
	import {required, numeric} from 'vuelidate/lib/validators'
	import {formatDate, formatDateT} from "../utils";
	import {wind_dirs, clouds} from "../config";

	export default {
		mixins: [validationMixin],
		validations: {
			place: {required, numeric},
			dateTime: {required},
			temperature: {required, numeric},
			cloud: {required},
			wind_dir: {required},
			wind_speed: {required, numeric},
			precipitation: {required, numeric},
			source: {required, numeric},
		},
		data() {
			return {
				id: null,
				place: null,
				dateTime: null,
				temperature: null,
				cloud: null,
				wind_dir: null,
				wind_speed: null,
				precipitation: null,
				source: null,
			}
		},
		// watch: {
		// 	forecast(newVal, oldVal) {
		// 		console.log(newVal)
		// 		this.id = newVal.id;
		// 		this.name = newVal.place.name;
		// 		this.dateTime = newVal.dateTime;
		// 		this.temperature = newVal.temperature;
		// 		this.cloud = newVal.cloud;
		// 		this.wind_dir = newVal.wind_dir;
		// 		this.wind_speed = newVal.wind_speed;
		// 		this.precipitation = newVal.precipitation;
		// 		this.source = newVal.source.name;
		// 	}
		// },
		methods: {
			...mapActions(['addForecast', 'updateForecast', 'getForecastById', 'getPlaceItems', 'getSourceItems', 'removeForecast']),
			formatDate,
			getWindDir(wind_dir) {
				return wind_dirs[wind_dir];
			},
			getCloud(cloud) {
				return clouds[cloud];
			},
			handleIdChange(e) {
				const id = parseInt(e.currentTarget.value);
				const forecast = this.forecastItems.find(item => item.id === id);
				this.id = forecast.id;
				this.place = forecast.place.id;
				this.dateTime = formatDateT(new Date(forecast.dateTime));
				this.temperature = forecast.temperature;
				this.cloud = forecast.cloud;
				this.wind_dir = forecast.wind_dir;
				this.wind_speed = forecast.wind_speed;
				this.precipitation = forecast.precipitation;
				this.source = forecast.source.id;
			},
			handleSave(e) {
				e.preventDefault();
				// if (this.$v.$invalid) {
				//
				// } else {
				const forecast = {
					id: this.id ? parseInt(this.id) : 0,
					place: {id: this.place},
					dateTime: this.dateTime,
					temperature: parseInt(this.temperature),
					cloud: this.cloud,
					wind_dir: this.wind_dir,
					wind_speed: parseInt(this.wind_speed),
					precipitation: parseInt(this.precipitation),
					source: {id: this.source}
				}
				// };
				if (this.id) {
					this.updateForecast(forecast)
				} else {
					this.addForecast(forecast)
				}

				this.id = null;
				this.place = null;
				this.dateTime = null;
				this.temperature = null;
				this.cloud = null;
				this.wind_dir = null;
				this.wind_speed = null;
				this.precipitation = null;
				this.source = null;
				// this.$v.$reset()
			},
			handleDelete(e) {
				const id = parseInt(e.currentTarget.dataset.id);
				this.removeForecast({id})
			}
		},
		computed: {
			...mapState({
				forecastItems: state => state.forecastItems,
				placeItems: state => state.placeItems,
				sourceItems: state => state.sourceItems
			}),
			// placeItems: () => [{id:1,name:"Казань"}]
		}
	}
</script>
