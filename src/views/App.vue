<template>
	<div>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">

				</div>
				<div class="nav navbar-nav">
					<li><router-link :to="{name: 'forecast'}">Прогнозы</router-link></li>
					<li><router-link :to="{name: 'meteostation'}">Метеостанции</router-link></li>
				</div>
			</div>
		</nav>
		<main class="container">
			<router-view></router-view>
		</main>
		<alert-snack :text="alertText"></alert-snack>
	</div>
</template>

<script>
	import AlertSnack from "../components/AlertSnack";
	import { mapState } from 'vuex';

	export default {
		mounted() {
			this.$nextTick(async () => {
				if (!this.loaded) {
					this.$router.push({name: "loader"});
				}
			});
		},
		computed: {
			...mapState({
				loaded: state => state.loaded,
				alertText: state => state.alertText
			})
		},
		components: {
			AlertSnack
		}
	}
</script>
