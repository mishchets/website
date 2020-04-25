export const isProduction = process.env.NODE_ENV === 'production';

export const apiUrl = isProduction ? "http://localhost:8080" : "http://localhost:8080";

export const wind_dirs = {
	N: "Север",
	W: "Запад",
	E: "Восток",
	S: "Юг",
	NW: "Северо-запад",
	NE: "Северо-восток",
	SW: "Юго-запад",
	SE: "Юго-восток"
};
export const clouds = {
	sunny: "Солнечно",
	cloudy: "Облачно",
	overcast: "Пасмурно"
};
