/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { HandlerInput, RequestHandler, SkillBuilders, DefaultApiClient } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { Response } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput : HandlerInput) : boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }

    public async handle(handlerInput : HandlerInput) : Promise<Response> {
        if (handlerInput.requestEnvelope.context.System.user.permissions.scopes["alexa::profile:given_name:read"].status === "GRANTED") {
            const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();
            const givenName = await upsServiceClient.getProfileGivenName();
            return handlerInput.responseBuilder
                .speak(`Welcome to the Alexa Skills Kit, ${givenName}! You can say hello!`)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak('Welcome to the Alexa Skills Kit, you can say hello!')
                .withAskForPermissionsConsentCard(["alexa::profile:given_name:read"])
                .getResponse();
        }
    }
}

export const handler : LambdaHandler = SkillBuilders.custom()
    .addRequestHandlers(
        new LaunchRequestHandler(),
    )
    .withApiClient(new DefaultApiClient())
    .lambda();
