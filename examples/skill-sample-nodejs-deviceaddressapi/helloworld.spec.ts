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

describe('Hello World Skill Profile API', () => {

    describe('LaunchRequest', () => {
        const cardText = `Short Address: countryCode: US, postalCode: 98109\n` +
            `Full Address: line1: 410 Terry Ave North, line2: Apt 3, line3: , ` +
            `city: Seattle, countryCode: US, districtOrCounty: , ` +
            `postalCode: 98109, stateOrRegion: WA`
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings).build(),
                withDeviceAddress: {
                    stateOrRegion: "WA",
                    city: "Seattle",
                    countryCode: "US",
                    postalCode: "98109",
                    addressLine1: "410 Terry Ave North",
                    addressLine2: "Apt 3",
                    addressLine3: "",
                    districtOrCounty: ""
                },
                says: 'Hello, world!',
                hasCardTitle: 'Hello World',
                hasCardContent: cardText,
                repromptsNothing: true,
                shouldEndSession: true,
            },
        ]);
    });

    describe('LaunchRequest without profile info', () => {
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings).build(),
                says: 'Hello, world! I am not allowed to view your address.',
                hasAskForPermissionsConsentCard: ['alexa:devices:all:address:country_and_postal_code:read', 'alexa::devices:all:address:full:read'],
                repromptsNothing: true,
                shouldEndSession: true,
            },
        ]);
    });

});
