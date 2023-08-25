export interface IDevice {
	isMobile: boolean;
	isTablet: boolean;
	isAndroid: boolean;
	isiPhone: boolean;
	isiPad: boolean;
}

export const defaultDeviceData: IDevice = {
	isMobile: false,
	isTablet: false,
	isAndroid: false,
	isiPhone: false,
	isiPad: false
};

export const getDevice = (userAgent = ''): IDevice => {
	const ua = userAgent.toLowerCase();

	const isMobile = ua.match(/mobile/i);
	const isTablet = ua.toLowerCase().match(/tablet/i);
	const isAndroid = ua.toLowerCase().match(/android/i);
	const isiPhone = ua.toLowerCase().match(/iphone/i);
	const isiPad = ua.toLowerCase().match(/ipad/i);

	return {
		isMobile: !!isMobile,
		isTablet: !!isTablet,
		isAndroid: !!isAndroid,
		isiPhone: !!isiPhone,
		isiPad: !!isiPad
	};
};
