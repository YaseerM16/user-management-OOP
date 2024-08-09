"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SessionService.ts
class SessionService {
    constructor() { }
    static getInstance() {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }
    setSession(session) {
        this.session = session;
    }
    getSession() {
        return this.session;
    }
    clearSession() {
        this.session = null;
    }
}
exports.default = SessionService;
