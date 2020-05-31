/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { AlexaTest, LaunchRequestBuilder, SkillSettings } from '../../lib';
import { handler as skillHandler } from './helloworld';

// initialize the testing framework
const skillSettings: SkillSettings = {
    appId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
    userId: 'amzn1.ask.account.VOID',
    deviceId: 'amzn1.ask.device.VOID',
    locale: 'en-US',
};

const alexaTest = new AlexaTest(skillHandler, skillSettings);

describe('Hello World Skill Permissions', () => {

    describe('LaunchIntent with permission granted', () => {
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings)
                    .withPermissions({ firstName: true })
                    .build(),
                says: 'Welcome to the Alexa Skills Kit, John! You can say hello!',
                repromptsNothing: true, shouldEndSession: true,
                withProfile:{
                    givenName: 'John',
                    name: 'Smith',
                    email: 'john@smith.com',
                    mobileNumber: '+1234567890',
                    distanceUnits: 'METRIC',
                    temperatureUnits: 'CELSIUS',
                    timeZone: 'Africa/Abidjan'
                }
            },
        ]);
    });

    describe('LaunchIntent with permission denied', () => {
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings)
                    .withPermissions({ firstName: false })
                    .build(),
                says: 'Welcome to the Alexa Skills Kit, you can say hello!',
                repromptsNothing: true, shouldEndSession: true,
                hasAskForPermissionsConsentCard: ["alexa::profile:given_name:read"]
            },
        ]);
    });
});
