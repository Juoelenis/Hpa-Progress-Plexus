import { Destination, RedirectResponse } from '../../src/types';

// Extend the RedirectResponse class to support dynamic host and port forwarding
class EnhancedRedirectResponse extends RedirectResponse {
  constructor(destination: Destination) {
    const { protocol, host, port, pathnames, queries, status } = destination;

    // Allow dynamic host configuration for self-hosting
    const dynamicHost = process.env.HPP_HOST || host;
    const dynamicPort = process.env.HPP_PORT || port;

    const fqdn = dynamicPort ? `${dynamicHost}:${dynamicPort}` : dynamicHost;
    const url = `${protocol}://${fqdn}${pathnames.join('')}${queries.length ? '?' + queries.join('&') : ''}`;

    super({ fqdn: dynamicHost, status, url });
  }
}

describe('EnhancedRedirectResponse', () => {
  describe('new', () => {
    // Test for dynamic host and port forwarding
    it('test 4: Dynamic host and port forwarding', async () => {
      process.env.HPP_HOST = 'my-custom-domain.com';
      process.env.HPP_PORT = '3000';

      const destination: Destination = {
        protocol: 'https',
        pathnames: ['/dashboard'],
        queries: ['user=admin'],
        status: 302,
        host: 'localhost',
        port: 8080,
      };

      const response = new EnhancedRedirectResponse(destination);
      expect(response).toEqual({
        fqdn: 'my-custom-domain.com:3000',
        status: 302,
        url: 'https://my-custom-domain.com:3000/dashboard?user=admin',
      });

      delete process.env.HPP_HOST;
      delete process.env.HPP_PORT;
    });

    // Test for default behavior when no environment variables are set
    it('test 5: Default behavior without dynamic host and port', async () => {
      const destination: Destination = {
        protocol: 'http',
        pathnames: ['/home'],
        queries: ['theme=dark'],
        status: 301,
        host: 'localhost',
        port: 8080,
      };

      const response = new EnhancedRedirectResponse(destination);
      expect(response).toEqual({
        fqdn: 'localhost:8080',
        status: 301,
        url: 'http://localhost:8080/home?theme=dark',
      });
    });
  });
});