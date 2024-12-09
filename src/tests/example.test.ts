import { AcceptLanguage } from '../constants/common.constant';

describe('User Model', () => {
	it('Check vietnamese language', () => {
		expect(AcceptLanguage.JP).toBe('jp');
	});
});
