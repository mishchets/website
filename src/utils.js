export function wait(delay) {
	return new Promise(function(resolve) {
		setTimeout(resolve, delay);
	});
}

export function formatDate(date) {
	let dd = date.getDate();
	if (dd < 10)
		dd = '0' + dd;
	let mm = date.getMonth() + 1;
	if (mm < 10)
		mm = '0' + mm;
	let yyyy = date.getFullYear();
	let hh = date.getHours();
	if (hh < 10)
		hh = '0' + hh;
	let min = date.getMinutes();
	if (min < 10)
		min = '0' + min;
	return `${dd}.${mm}.${yyyy}, ${hh}:${min}`;
}

export function formatDateT(date) {
	let dd = date.getDate();
	if (dd < 10)
		dd = '0' + dd;
	let mm = date.getMonth() + 1;
	if (mm < 10)
		mm = '0' + mm;
	let yyyy = date.getFullYear();
	let hh = date.getHours();
	if (hh < 10)
		hh = '0' + hh;
	let min = date.getMinutes();
	if (min < 10)
		min = '0' + min;
	return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
