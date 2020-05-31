/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { expect } from 'chai';
import { LaunchRequestBuilder, SkillSettings } from '../lib';

// initialize the testing framework
const skillSettings : SkillSettings = {
    appId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
    userId: 'amzn1.ask.account.VOID',
    deviceId: 'amzn1.ask.device.VOID',
    locale: 'en-US',
};

describe('Tests for request builder with permissions', () => {

    it('should have no permissions by default', () => {
        const request = new LaunchRequestBuilder(skillSettings).build();
        expect(request.context.System.user.permissions.scopes).to.deep.equal({});
    });

    describe('short address permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ shortAddress: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa:devices:all:address:country_and_postal_code:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ shortAddress: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa:devices:all:address:country_and_postal_code:read": { status: "DENIED" }
            });
        });
    });

    describe('full address permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ fullAddress: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:address:full:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ fullAddress: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:address:full:read": { status: "DENIED" }
            });
        });
    });

    describe('geolocation permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ geolocation: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:geolocation:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ geolocation: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:geolocation:read": { status: "DENIED" }
            });
        });
    });

    describe('reminders permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ reminders: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::alerts:reminders:skill:readwrite": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ reminders: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::alerts:reminders:skill:readwrite": { status: "DENIED" }
            });
        });
    });

    describe('notifications permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ notifications: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:notifications:write": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ notifications: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::devices:all:notifications:write": { status: "DENIED" }
            });
        });
    });

    describe('read lists permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ listsRead: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::household:lists:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ listsRead: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::household:lists:read": { status: "DENIED" }
            });
        });
    });

    describe('write lists permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ listsWrite: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::household:lists:write": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ listsWrite: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::household:lists:write": { status: "DENIED" }
            });
        });
    });

    describe('personId permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ personId: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::person_id:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ personId: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::person_id:read": { status: "DENIED" }
            });
        });
    });

    describe('email address permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ email: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:email:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ email: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:email:read": { status: "DENIED" }
            });
        });
    });

    describe('phone number permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ phoneNumber: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:mobile_number:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ phoneNumber: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:mobile_number:read": { status: "DENIED" }
            });
        });
    });

    describe('first name permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ firstName: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:given_name:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ firstName: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:given_name:read": { status: "DENIED" }
            });
        });
    });

    describe('full name permission', () => {
        it('should grant', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ fullName: true })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:name:read": { status: "GRANTED" }
            });
        });
        
        it('should deny', () => {
            const request = new LaunchRequestBuilder(skillSettings)
                .withPermissions({ fullName: false })
                .build();
            expect(request.context.System.user.permissions.scopes).to.deep.equal({
                "alexa::profile:name:read": { status: "DENIED" }
            });
        });
    });

});
