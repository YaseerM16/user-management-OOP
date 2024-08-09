// SessionService.ts
class SessionService {
    private static instance: SessionService;
    private session: any;

    private constructor() { }

    public static getInstance(): SessionService {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    public setSession(session: any): void {
        this.session = session;
    }

    public getSession(): any {
        return this.session;
    }

    public clearSession(): void {
        this.session = null;
    }
}

export default SessionService;