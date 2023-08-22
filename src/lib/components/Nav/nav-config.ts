export interface INavItem {
	icon: string;
	title: string;
	name: string;
	href: string;
	isActive: boolean;
	desc: string;
	target?: '_blank';
}

export const navItems: INavItem[] = [
	{
		icon: 'ion:home-outline',
		title: 'Home',
		name: 'home',
		href: '/',
		isActive: false,
		desc: 'Home'
	},
	{
		icon: 'ion:code-slash-outline',
		title: 'Projects',
		name: 'projects',
		href: '/projects',
		isActive: false,
		desc: 'Project Cemetery'
	},
	{
		icon: 'ion:newspaper-outline',
		title: 'Writing',
		name: 'writing',
		href: 'https://dev.to/wraith',
		isActive: false,
		desc: 'Writing',
		target: '_blank'
	}
	// {
	//   icon: 'ion:book-outline',
	//   title: 'Reading',
	//   name: 'reading',
	//   href: '/reading',
	//   isActive: false,
	//   desc: 'Reading List',
	// },
	// {
	//   icon: 'ion:build-outline',
	//   title: 'Tools',
	//   name: 'tools',
	//   href: '/tools',
	//   isActive: false,
	//   desc: 'Tool Set',
	// },
	// {
	//   icon: 'ion:skull-outline',
	//   title: 'About',
	//   name: 'about',
	//   href: '/about',
	//   isActive: false,
	//   desc: 'About Me',
	// },
];
