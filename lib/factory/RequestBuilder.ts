/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { Context, Request, RequestEnvelope, Scope, Session } from 'ask-sdk-model';
import { v4 } from 'uuid';
import { InterfaceSettings, PermissionSettings, SkillSettings } from '../types';

export abstract class RequestBuilder {

    protected settings : SkillSettings;

    constructor(settings : SkillSettings) {
        this.settings = JSON.parse(JSON.stringify(settings));
        if (!this.settings.interfaces) {
            this.settings.interfaces = {};
        }
        if (!this.settings.interfaces.hasOwnProperty('audio')) {
            this.settings.interfaces.audio = true;
        }
        if (!this.settings.permissions) {
            this.settings.permissions = {};
        }
    }

    public build() : RequestEnvelope {
        const request : RequestEnvelope = {
            version: '1.0',
            session: this.getSessionData(),
            context: this.getContextData(),
            request: this.buildRequest(),
        };
        this.modifyRequest(request);
        return request;
    }

    public withInterfaces(iface : InterfaceSettings) : RequestBuilder {
        if (iface.hasOwnProperty('apl')) {
            this.settings.interfaces.apl = iface.apl;
        }
        if (iface.hasOwnProperty('audio')) {
            this.settings.interfaces.audio = iface.audio;
        }
        if (iface.hasOwnProperty('display')) {
            this.settings.interfaces.display = iface.display;
        }
        if (iface.hasOwnProperty('video')) {
            this.settings.interfaces.video = iface.video;
        }
        if (iface.hasOwnProperty('geolocation')) {
            this.settings.interfaces.geolocation = iface.geolocation;
        }
        return this;
    }

    public withPermissions(permissions : PermissionSettings) : RequestBuilder {
        this.settings.permissions = permissions;
        return this;
    }

    protected abstract buildRequest() : Request;

    protected modifyRequest(request : RequestEnvelope) : void {
        // override if needed
    }

    protected getSessionData() : Session {
        return {
            // randomized for every session and set before calling the handler
            sessionId: 'SessionId.00000000-0000-0000-0000-000000000000',
            application: {applicationId: this.settings.appId},
            attributes: {},
            user: {userId: this.settings.userId},
            new: true,
        };
    }

    protected getContextData() : Context {
        const ctx : Context = {
            System: {
                application: {applicationId: this.settings.appId},
                user: {
                    userId: this.settings.userId,
                    permissions: {
                        scopes: this.getPermissionScopes(),
                    },
                },
                device: {
                    deviceId: this.settings.deviceId,
                    supportedInterfaces: {},
                },
                apiEndpoint: 'https://api.amazonalexa.com/',
                apiAccessToken: v4(),
            },
            AudioPlayer: {
                playerActivity: 'IDLE',
            },
        };
        if (this.settings.interfaces.audio) {
            ctx.System.device.supportedInterfaces.AudioPlayer = {};
        }
        if (this.settings.interfaces.display) {
            ctx.System.device.supportedInterfaces.Display = {templateVersion: '1.0', markupVersion: '1.0'};
        }
        if (this.settings.interfaces.video) {
            ctx.System.device.supportedInterfaces.VideoApp = {};
        }
        if (this.settings.interfaces.apl) {
            ctx.System.device.supportedInterfaces['Alexa.Presentation.APL'] = {runtime: {maxVersion: '1.0'}};
        }
        if (this.settings.interfaces.geolocation) {
            ctx.System.device.supportedInterfaces.Geolocation = {};
            ctx.Geolocation = this.settings.interfaces.geolocation;
        }
        return ctx;
    }

    protected getPermissionScopes() : { [key : string] : Scope } {
        const scopes : { [key : string] : Scope } = {};
        const granted : Scope = { status : 'GRANTED' };
        const denied : Scope = { status : 'DENIED' };

        if (this.settings.permissions.shortAddress === true) {
            scopes['alexa:devices:all:address:country_and_postal_code:read'] = granted;
        } else if (this.settings.permissions.shortAddress === false) {
            scopes['alexa:devices:all:address:country_and_postal_code:read'] = denied;
        }

        if (this.settings.permissions.fullAddress === true) {
            scopes['alexa::devices:all:address:full:read'] = granted;
        } else if (this.settings.permissions.fullAddress === false) {
            scopes['alexa::devices:all:address:full:read'] = denied;
        }

        if (this.settings.permissions.geolocation === true) {
            scopes['alexa::devices:all:geolocation:read'] = granted;
        } else if (this.settings.permissions.geolocation === false) {
            scopes['alexa::devices:all:geolocation:read'] = denied;
        }

        if (this.settings.permissions.reminders === true) {
            scopes['alexa::alerts:reminders:skill:readwrite'] = granted;
        } else if (this.settings.permissions.reminders === false) {
            scopes['alexa::alerts:reminders:skill:readwrite'] = denied;
        }

        if (this.settings.permissions.notifications === true) {
            scopes['alexa::devices:all:notifications:write'] = granted;
        } else if (this.settings.permissions.notifications === false) {
            scopes['alexa::devices:all:notifications:write'] = denied;
        }

        if (this.settings.permissions.listsRead === true) {
            scopes['alexa::household:lists:read'] = granted;
        } else if (this.settings.permissions.listsRead === false) {
            scopes['alexa::household:lists:read'] = denied;
        }

        if (this.settings.permissions.listsWrite === true) {
            scopes['alexa::household:lists:write'] = granted;
        } else if (this.settings.permissions.listsWrite === false) {
            scopes['alexa::household:lists:write'] = denied;
        }

        if (this.settings.permissions.personId === true) {
            scopes['alexa::person_id:read'] = granted;
        } else if (this.settings.permissions.personId === false) {
            scopes['alexa::person_id:read'] = denied;
        }

        if (this.settings.permissions.email === true) {
            scopes['alexa::profile:email:read'] = granted;
        } else if (this.settings.permissions.email === false) {
            scopes['alexa::profile:email:read'] = denied;
        }

        if (this.settings.permissions.phoneNumber === true) {
            scopes['alexa::profile:mobile_number:read'] = granted;
        } else if (this.settings.permissions.phoneNumber === false) {
            scopes['alexa::profile:mobile_number:read'] = denied;
        }

        if (this.settings.permissions.firstName === true) {
            scopes['alexa::profile:given_name:read'] = granted;
        } else if (this.settings.permissions.firstName === false) {
            scopes['alexa::profile:given_name:read'] = denied;
        }

        if (this.settings.permissions.fullName === true) {
            scopes['alexa::profile:name:read'] = granted;
        } else if (this.settings.permissions.fullName === false) {
            scopes['alexa::profile:name:read'] = denied;
        }

        return scopes;
    }

}
