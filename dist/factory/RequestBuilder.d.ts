import { Context, Request, RequestEnvelope, Scope, Session } from 'ask-sdk-model';
import { InterfaceSettings, PermissionSettings, SkillSettings } from '../types';
export declare abstract class RequestBuilder {
    protected settings: SkillSettings;
    constructor(settings: SkillSettings);
    build(): RequestEnvelope;
    withInterfaces(iface: InterfaceSettings): RequestBuilder;
    withPermissions(permissions: PermissionSettings): RequestBuilder;
    protected abstract buildRequest(): Request;
    protected modifyRequest(request: RequestEnvelope): void;
    protected getSessionData(): Session;
    protected getContextData(): Context;
    protected getPermissionScopes(): {
        [key: string]: Scope;
    };
}
