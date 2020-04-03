import { expect } from 'chai'
import MockClient from '../../src'
import MockClientDist from '../../dist/lib'

describe('CONSTRUCTOR', () => {

  describe('(from code)', () => {
    it('should instantiate the expected default instance', () => {
      const clientDefault = new MockClient({})

      expect(clientDefault).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientDefault).to.deep.equal({
        debug: false,
        ttl: 0, // expires immediately
        uuidMode: false,
        state: {
          user_info: {
            id: null,
            username: null,
            display_name: null,
            avatar_url: null,
          },
          auth: {
            auth_token: null,
            expires_at: null,
          },
        },
      })
    })

    it('should support the "uuidMode" option as expected', () => {
      // UUID mode...
      const clientUUID = new MockClient({
        debug: false,
        ttl: -1,
        uuidMode: true,
      })

      expect(clientUUID).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientUUID).to.contain({
        debug: false,
        ttl: -1,
        uuidMode: true,
      })
    })

    it('should support the "ttl" option as expected', () => {
      // TTL never expires...
      const clientNever = new MockClient({
        debug: false,
        ttl: -1,
      })

      expect(clientNever).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientNever).to.contain({
        debug: false,
        ttl: -1,
        uuidMode: false,
      })

      // TTL expires immediately...
      const clientImmediately = new MockClient({
        debug: false,
        ttl: 0,
        uuidMode: false,
      })

      expect(clientImmediately).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientImmediately).to.contain({
        debug: false,
        ttl: 0,
        uuidMode: false,
      })

      // TTL per millis...
      const clientMillis = new MockClient({
        debug: false,
        ttl: 5 * 60 * 1000,
      })

      expect(clientMillis).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientMillis).to.contain({
        debug: false,
        ttl: 300000,
        uuidMode: false,
      })
    })
  })

  describe('(from build distributable)', () => {
    it('should instantiate the expected default instance', () => {
      // TTL never expires...
      const clientNever = new MockClientDist({
        debug: false,
        ttl: -1,
        uuidMode: false,
      })

      expect(clientNever).to.have.keys([
        'debug',
        'ttl',
        'uuidMode',
        'state',
      ])
      expect(clientNever).to.deep.equal({
        debug: false,
        ttl: -1,
        uuidMode: false,
        state: {
          user_info: {
            id: null,
            username: null,
            display_name: null,
            avatar_url: null,
          },
          auth: {
            auth_token: null,
            expires_at: null,
          },
        },
      })
    })
  })

}) // END - CONSTRUCTOR
