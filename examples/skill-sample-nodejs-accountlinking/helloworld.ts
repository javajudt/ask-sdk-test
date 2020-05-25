/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { DefaultApiClient, HandlerInput, RequestHandler, SkillBuilders, getAccountLinkingAccessToken } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { Response } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput: HandlerInput): boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }

    public handle(handlerInput: HandlerInput): Response {
        const token = getAccountLinkingAccessToken(handlerInput.requestEnvelope);
        if (!token) {
            const speechText = 'Welcome to the Alexa Skills Kit, please link your account!';
            return handlerInput.responseBuilder
                .speak(speechText)
                .withLinkAccountCard()
                .getResponse();
        } else {
            const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard('Hello World', speechText)
                .getResponse();
        }
    }
}

export const handler: LambdaHandler = SkillBuilders.custom()
    .addRequestHandlers(
        new LaunchRequestHandler(),
    )
    .withApiClient(new DefaultApiClient())
    .lambda();
