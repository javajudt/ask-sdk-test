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

describe('Hello World Skill Account Linking', () => {

    describe('LaunchRequest with account linked', () => {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings).build(),
                says: speechText,
                hasCardTitle: 'Hello World',
                hasCardContent: 'Welcome to the Alexa Skills Kit, you can say hello!',
                repromptsNothing: true,
                shouldEndSession: true,
                withUserAccessToken: "abc123",
            },
        ]);
    });

    describe('LaunchRequest without account linked', () => {
        alexaTest.test([
            {
                request: new LaunchRequestBuilder(skillSettings).build(),
                says: 'Welcome to the Alexa Skills Kit, please link your account!',
                hasLinkAccountCard: true,
                repromptsNothing: true,
                shouldEndSession: true,
            },
        ]);
    });

});
