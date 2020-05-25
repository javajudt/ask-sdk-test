/*
 * Copyright (c) 2018. Taimos GmbH http://www.taimos.de
 */

import { HandlerInput, RequestHandler, SkillBuilders, getSupportedInterfaces } from 'ask-sdk';
import { LambdaHandler } from 'ask-sdk-core/dist/skill/factory/BaseSkillFactory';
import { Response } from 'ask-sdk-model';

class LaunchRequestHandler implements RequestHandler {

    public canHandle(handlerInput : HandlerInput) : boolean {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    }

    public handle(handlerInput : HandlerInput) : Response {
        const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
}

class GeolocationIntentHandler implements RequestHandler {

    public canHandle(handlerInput : HandlerInput) : boolean {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'GeolocationIntent';
    }

    public handle(handlerInput : HandlerInput) : Response {
        if (getSupportedInterfaces(handlerInput.requestEnvelope).Geolocation) {
            const geolocation = handlerInput.requestEnvelope.context.Geolocation;
            const speech = `Your current location is ${geolocation.coordinate.latitudeInDegrees > 0 ? "north" : "south"} ${geolocation.coordinate.latitudeInDegrees} degrees, ` +
                `${geolocation.coordinate.longitudeInDegrees > 0 ? "east" : "west"} ${geolocation.coordinate.longitudeInDegrees} degrees. ` +
                `Your current speed is ${geolocation.speed.speedInMetersPerSecond} meters per second.`;
            return handlerInput.responseBuilder
                .speak(speech)
                .getResponse();
        } else {
            return handlerInput.responseBuilder
                .speak('Your device does not support geolocation.')
                .getResponse();
        }
    }
}

export const handler : LambdaHandler = SkillBuilders.custom()
    .addRequestHandlers(
        new LaunchRequestHandler(),
        new GeolocationIntentHandler(),
    )
    .lambda();
