import { writable } from 'svelte/store';

interface IMainMenu {
	isOpen: boolean;
}

const initMainMenu: IMainMenu = {
	isOpen: false
};

function createMainMenuStore() {
	const { subscribe, update } = writable<IMainMenu>(initMainMenu);

	return {
		subscribe,
		open: () => update((state) => ({ ...state, isOpen: true })),
		close: () => update((state) => ({ ...state, isOpen: false }))
	};
}

export const mainMenu = createMainMenuStore();
