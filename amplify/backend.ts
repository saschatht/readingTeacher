import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data, convertTextToSpeech } from "./data/resource";
import { Stack } from "aws-cdk-lib";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { pollyBucket } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
  pollyBucket,
  convertTextToSpeech,
 });
 
 backend.convertTextToSpeech.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    actions: ["polly:SynthesizeSpeechCommand"],
    resources: ["*"],
  })
 );

 // Configure a policy for the required use case.
// The actions included below cover all supported ML capabilities
backend.auth.resources.unauthenticatedUserIamRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: [
      "polly:SynthesizeSpeech"
    ],
    resources: ["*"],
  })
);

backend.addOutput({
  custom: {
    Predictions: {
      convert: {
        speechGenerator: {
          defaults: {
            voiceId: "Ivy",
          },
          proxy: false,
          region: Stack.of(backend.auth.resources.unauthenticatedUserIamRole)
            .region,
        },
      },
    },
  },
});