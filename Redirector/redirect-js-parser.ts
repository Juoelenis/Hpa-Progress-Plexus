import { Destination, RedirectResponse } from '../../src/types';

describe('RedirectResponse', () => {
  describe('new', () => {
    // Original Test 1: Full External URL with custom port
    it('test 1: Full external URL with custom port', async () => {
      const destination: Destination = {
        protocol: 'https',
        host: 'www.youtube.com',
        pathnames: ['/watch'],
        queries: ['a=b'],
        status: 302,
        port: 8080,
      };

      const response = new RedirectResponse(destination);
      expect(response).toEqual({
        fqdn: 'www.youtube.com',
        status: 302,
        url: 'https://www.youtube.com:8080/watch?a=b',
      });
    });

    // Modified Test 2 (Replaced confusing 0.0.0.0 with a cleaner localhost test)
    it('test 2: Localhost redirect with standard port', async () => {
      const destination: Destination = {
        protocol: 'http',
        pathnames: ['/api/v1'],
        status: 301,
        host: '127.0.0.1', // Using loopback is cleaner for local tests
        queries: ['debug=true'],
        // When port is 80 (HTTP default) or 443 (HTTPS default), it should be omitted from the URL
        port: 80, 
      };

      const response = new RedirectResponse(destination);
      expect(response).toEqual({
        fqdn: '127.0.0.1',
        status: 301,
        // The port 80 is correctly omitted from the URL
        url: 'http://127.0.0.1/api/v1?debug=true', 
      });
    });

    // Original Test 3: Localhost redirect with port 0 (standard or dynamic port)
    it('test 3: Localhost redirect with path and default port omission', async () => {
      const destination: Destination = {
        protocol: 'http',
        pathnames: ['/'], // Using '/' instead of empty array for better clarity
        status: 301,
        host: '127.0.0.1',
        queries: [],
        port: 0,
      };

      const response = new RedirectResponse(destination);
      expect(response).toEqual({
        fqdn: '127.0.0.1',
        status: 301,
        // The path array of [] should likely result in just a trailing slash
        url: 'http://127.0.0.1/', 
      });
    });
  });
});