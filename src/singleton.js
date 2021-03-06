// @flow

export type DataStore<T> = {
	push: T => void,
	pop: T => T,
	length: void => number,
};

var dataStore = (function<T>(): DataStore<T> {
	var data: Array<T> = [];
	return {
		push: (item: T): void => {
			data.push(item);
		},
		pop: (): T => {
			return data.pop();
		},
		length: (): number => {
			return data.length;
		}
	};
}());

dataStore.push(1);
dataStore.push(12);
dataStore.push(18);
dataStore.push(13);
dataStore.push(2);
dataStore.push(17);
console.log(dataStore.length());
console.log(dataStore.pop());
