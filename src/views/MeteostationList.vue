<template>
	<div>
		<div class="panel panel-primary" style="margin-top: 10px">
			<div class="panel-heading">Список метеостанций</div>
			<table class="table table-striped">
				<thead>
				<tr>
					<th>№</th>
					<th>Название</th>
					<th>Населенный пункт</th>
					<th>Координата x</th>
					<th>Координата y</th>
					<th style="width: 50px;"></th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="(item, index) in meteostationItems" :key="index">
					<td>{{item.id}}</td>
					<td>{{item.name}}</td>
					<td>{{item.place.name}}</td>
					<td>{{item.coordination_x}}</td>
					<td>{{item.coordination_y}}</td>
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
			<div class="panel-heading">Добавление метеостанции</div>
			<div class="panel-body">
				<form class="form-horizontal" @submit="handleSave">
					<div class="form-group">
						<label for="meteostationId" class="col-xs-2 control-label">№</label>
						<div class="col-xs-10">
							<input id="meteostationId" type="number" class="form-control" v-model="id" placeholder="№" @change="handleIdChange"/>
						</div>
					</div>
					<div class="form-group">
						<label for="meteostationName" class="col-xs-2 control-label">Название</label>
						<div class="col-xs-10">
							<input id="meteostationName" type="text" class="form-control" v-model="name" placeholder="Название"/>
						</div>
					</div>
					<div class="form-group">
						<label for="meteostationPlace" class="col-xs-2 control-label">Город</label>
						<div class="col-xs-10">
							<select id="meteostationPlace" class="form-control" v-model="place">
								<option v-for="(placeItem, index) in placeItems" :key="index" :value="placeItem.id">{{ placeItem.name }}</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="meteostationCoordinationX" class="col-xs-2 control-label">Координата x</label>
						<div class="col-xs-10">
							<input id="meteostationCoordinationX" type="number" class="form-control" v-model="coordination_x" placeholder="Координата x"/>
						</div>
					</div>
					<div class="form-group">
						<label for="meteostationCoordinationY" class="col-xs-2 control-label">Координата y</label>
						<div class="col-xs-10">
							<input id="meteostationCoordinationY" type="number" class="form-control" v-model="coordination_y" placeholder="Координата y"/>
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

	export default {
		mixins: [validationMixin],
		validations: {
			name: {required},
			place: {required},
			coordination_x: {required, numeric},
			coordination_y: {required, numeric},
		},
		data() {
			return {
				id: null,
				name: null,
				place: null,
				coordination_x: null,
				coordination_y: null,
			}
		},
		methods: {
			...mapActions(['addMeteostation', 'updateMeteostation', 'removeMeteostation', 'getMeteostationById', 'getPlaceItems']),
			handleIdChange(e) {
				const id = parseInt(e.currentTarget.value);
				const meteostation = this.meteostationItems.find(item => item.id === id);
				this.id = meteostation.id;
				this.name = meteostation.name;
				this.place = meteostation.place.id;
				this.coordination_x = meteostation.coordination_x;
				this.coordination_y = meteostation.coordination_y;
			},
			handleSave(e) {
				e.preventDefault();
				// if (this.$v.$invalid) {
				//
				// } else {
					const meteostation = {
						id: this.id ? parseInt(this.id) : 0,
						name: this.name,
						place: {id: this.place},
						coordination_x: parseInt(this.coordination_x),
						coordination_y: parseInt(this.coordination_y)
					}
				// };
				if (this.id) {
					this.updateMeteostation(meteostation)
				} else {
					this.addMeteostation(meteostation)
				}

				this.id = null,
				this.name = null,
				this.place = null,
				this.coordination_x = null,
				this.coordination_y = null
				// this.$v.$reset()
			},
			handleDelete(e) {
				const id = parseInt(e.currentTarget.dataset.id);
				this.removeMeteostation({id})
			}
		},
		computed: {
			...mapState({
				meteostationItems: state => state.meteostationItems,
				placeItems: state => state.placeItems
			})
		}
	}
</script>
