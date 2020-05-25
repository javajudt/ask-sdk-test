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
        const deviceAddressServiceClient = handlerInput.serviceClientFactory.getDeviceAddressServiceClient();

        try {
            const countryPostalCode = await deviceAddressServiceClient.getCountryAndPostalCode(getDeviceId(handlerInput.requestEnvelope));
            const fullAddress = await deviceAddressServiceClient.getFullAddress(getDeviceId(handlerInput.requestEnvelope));

            const speechText = 'Hello, world!';
            const cardText = `Short Address: countryCode: ${countryPostalCode.countryCode}, postalCode: ${countryPostalCode.postalCode}\n` +
                `Full Address: line1: ${fullAddress.addressLine1}, line2: ${fullAddress.addressLine2}, line3: ${fullAddress.addressLine3}, ` +
                `city: ${fullAddress.city}, countryCode: ${fullAddress.countryCode}, districtOrCounty: ${fullAddress.districtOrCounty}, ` +
                `postalCode: ${fullAddress.postalCode}, stateOrRegion: ${fullAddress.stateOrRegion}`;
            return handlerInput.responseBuilder
                .speak(speechText)
                .withSimpleCard("Hello World", cardText)
                .getResponse();
        } catch (e) {
            return handlerInput.responseBuilder
                .speak('Hello, world! I am not allowed to view your address.')
                .withAskForPermissionsConsentCard([
                    'alexa:devices:all:address:country_and_postal_code:read',
                    'alexa::devices:all:address:full:read'
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
