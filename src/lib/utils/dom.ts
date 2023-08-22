export const removeChildren = (el: Element) => {
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
};
