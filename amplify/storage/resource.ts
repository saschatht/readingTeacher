import { defineStorage } from "@aws-amplify/backend";
import { convertTextToSpeech } from "../data/resource";

export const pollyBucket = defineStorage({
  name: "pollystorage20240921",
  access: (allow) => ({
    "public/*": [
      allow.resource(convertTextToSpeech).to(["write"]),
      allow.guest.to(["read", "write"]),
    ],
  }),
});