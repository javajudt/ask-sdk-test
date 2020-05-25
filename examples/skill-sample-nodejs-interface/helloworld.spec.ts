/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { AlexaTest, IntentRequestBuilder, LaunchRequestBuilder, SkillSettings } from '../../lib';
import { handler as skillHandler } from './helloworld';

// initialize the testing framework
const skillSettings: SkillSettings = {
    appId: 'amzn1.ask.skill.00000000-0000-0000-0000-000000000000',
    userId: 'amzn1.ask.account.VOID',
    deviceId: 'amzn1.ask.device.VOID',
    locale: 'en-US',
};

const alexaTest = new AlexaTest(skillHandler, skillSettings);

describe('Hello World Skill Interfaces', () => {

    // tests the behavior of the skill's GeolocationIntent
    describe('GeolocationIntent', () => {
        alexaTest.test([
            {
                request: new IntentRequestBuilder(skillSettings, 'GeolocationIntent')
                    .withInterfaces({
                        geolocation: {
                            locationServices: {
                                access: "ENABLED",
                                status: "RUNNING",
                            },
                            timestamp: new Date().toString(),
                            coordinate: {
                                latitudeInDegrees: 38.2,
                                longitudeInDegrees: 28.3,
                                accuracyInMeters: 12.1
                            },
                            altitude: {
                                altitudeInMeters: 120.1,
                                accuracyInMeters: 30.1
                            },
                            heading: {
                                directionInDegrees: 180.0,
                                accuracyInDegrees: 5.0
                            },
                            speed: {
                                speedInMetersPerSecond: 10,
                                accuracyInMetersPerSecond: 1.1
                            }
                        }
                    })
                    .build(),
                says: 'Your current location is north 38.2 degrees, east 28.3 degrees. Your current speed is 10 meters per second.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });

    // tests the behavior of the skill's GeolocationIntent
    describe('GeolocationIntent without interface', () => {
        alexaTest.test([
            {
                request: new IntentRequestBuilder(skillSettings, 'GeolocationIntent').build(),
                says: 'Your device does not support geolocation.',
                repromptsNothing: true, shouldEndSession: true,
            },
        ]);
    });
});
