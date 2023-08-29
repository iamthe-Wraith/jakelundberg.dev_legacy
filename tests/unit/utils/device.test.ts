import { getDevice } from '$lib/utils/device';
import { describe, expect, it } from 'vitest';

describe('Utils - Device', () => {
	describe('getDevice', () => {
		it('should return should return true for isMobile if mobile is found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36');

      expect(device.isMobile).toEqual(true);
		});

    it('should return should return false for isMobile if mobile is not found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; Android 10; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36');

      expect(device.isMobile).toEqual(false);
    });

    it('should return should return true for isTablet if tablet is found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; Android 10; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Tablet Safari/537.36');

      expect(device.isTablet).toEqual(true);
    });

    it('should return should return false for isTablet if tablet is not found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; Android 10; SM-G960U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36');

      expect(device.isTablet).toEqual(false);
    });

    it('should return should return true for isAndroid if android is found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; Android 10; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36');

      expect(device.isAndroid).toEqual(true);
    });

    it('should return should return false for isAndroid if android is not found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      expect(device.isAndroid).toEqual(false);
    });

    it('should return should return true for isiPhone if iphone is found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      expect(device.isiPhone).toEqual(true);
    });

    it('should return should return false for isiPhone if iphone is not found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (iPad; CPU OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      expect(device.isiPhone).toEqual(false);
    });

    it('should return should return true for isiPad if ipad is found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (iPad; CPU OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      expect(device.isiPad).toEqual(true);
    });

    it('should return should return false for isiPad if ipad is not found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (iPhone; CPU iPhone OS 14_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1');

      expect(device.isiPad).toEqual(false);
    });

    it('should return should return false for all properties if none of the device types are found in the user agent string', async () => {
      const device = getDevice('Mozilla/5.0 (Linux; SM-T500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36');

      expect(device.isMobile).toEqual(false);
      expect(device.isTablet).toEqual(false);
      expect(device.isAndroid).toEqual(false);
      expect(device.isiPhone).toEqual(false);
      expect(device.isiPad).toEqual(false);
    });

    it('should return false for all properties if no user agent string is passed', async () => {
      const device = getDevice('');

      expect(device.isMobile).toEqual(false);
      expect(device.isTablet).toEqual(false);
      expect(device.isAndroid).toEqual(false);
      expect(device.isiPhone).toEqual(false);
      expect(device.isiPad).toEqual(false);
    });

    it('should return false for all properties if null passed instead of a user string', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore - intentionally passing null to test
      const device = getDevice(null);

      expect(device.isMobile).toEqual(false);
      expect(device.isTablet).toEqual(false);
      expect(device.isAndroid).toEqual(false);
      expect(device.isiPhone).toEqual(false);
      expect(device.isiPad).toEqual(false);
    });
	});
});