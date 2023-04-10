import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { SessionStore } from '@midwayjs/session';

@Provide()
@Scope(ScopeEnum.Singleton)
export class MemorySessionStore extends SessionStore {
  sessions = {};
  async get(key) {
    return this.sessions[key];
  }

  async set(key, value) {
    this.sessions[key] = value;
  }

  async destroy(key) {
    this.sessions[key] = undefined;
  }
}
