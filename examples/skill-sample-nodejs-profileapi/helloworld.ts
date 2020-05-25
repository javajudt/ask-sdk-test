/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { DefaultApiClient, HandlerInput, RequestHandler, SkillBuilders, getDeviceId } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { Response } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput : HandlerInput) : boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }

    public async handle(handlerInput : HandlerInput) : Promise<Response> {
        const upsServiceClient = handlerInput.serviceClientFactory.getUpsServiceClient();

        try {
            const name = await upsServiceClient.getProfileName();
            const givenName = await upsServiceClient.getProfileGivenName();
            const email = await upsServiceClient.getProfileEmail();
            const mobile = await upsServiceClient.getProfileMobileNumber();
            const distance = await upsServiceClient.getSystemDistanceUnits(getDeviceId(handlerInput.requestEnvelope));
            const temperature = await upsServiceClient.getSystemTemperatureUnit(getDeviceId(handlerInput.requestEnvelope));
            const timeZone = await upsServiceClient.getSystemTimeZone(getDeviceId(handlerInput.requestEnvelope));

            const speechText = `Hello, ${givenName} ${name}. Your e-mail is ${email} and your phone number is ${mobile}`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard("Hello World", `Distance Unit: ${distance}\nTemperature Unit: ${temperature}\nTime Zone: ${timeZone}`)
                .getResponse();
        } catch (e) {
            console.log(e)
            return handlerInput.responseBuilder
                .speak('Hello, world! I am not allowed to view your profile.')
                .withAskForPermissionsConsentCard([
                    'alexa::profile:name:read', 
                    'alexa::profile:email:read', 
                    'alexa::profile:mobile_number:read'
                ])
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
