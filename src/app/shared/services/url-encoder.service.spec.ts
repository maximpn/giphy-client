import { UrlEncoderService } from './url-encoder.service';

describe('UrlEncoderService', () => {
  let service: UrlEncoderService;

  beforeEach(() => {
    service = new UrlEncoderService();
  });

  it('should encode an english string to be url ready', () => {
    const expected = 'some-string';

    const actual = service.encode('some string');

    expect(actual).toBe(expected);
  });

  it('should encode a russian string to be url ready', () => {
    const expected = 'некоторый-запрос';

    const actual = service.encode('некоторый запрос');

    expect(actual).toBe(expected);
  });

  it('should encode a complex string to be url ready', () => {
    const expected = 'somerequestwithразныйhttpdatacom-path';

    const actual = service.encode('some/request?with<разный>http://data.com/     path');

    expect(actual).toBe(expected);
  });

  it('should decode a string', () => {
    const expected = 'somerequestwithразныйhttpdatacom path';

    const actual = service.decode('somerequestwithразныйhttpdatacom-path');

    expect(actual).toBe(expected);
  });

  it('should preserve numbers', () => {
    const expected = 'some-text-123';

    const actual = service.encode('some text 123');

    expect(actual).toBe(expected);
  });
});
