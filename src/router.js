import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './views/App';
import Loader from "./views/Loader";
import ForecastList from "./views/ForecastList";
import MeteostationList from "./views/MeteostationList"

Vue.use(VueRouter);
export default new VueRouter({
	mode: 'history',
	routes: [
		{ path: "/", name: "loader", component: Loader },
		{ path: "/app", component: App, children: [
				{ path: "forecastlist", name: "forecast", component: ForecastList },
				{ path: "meteostationlist", name: "meteostation", component: MeteostationList }
		]}
	]
});
