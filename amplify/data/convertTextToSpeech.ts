import {
  PollyClient,
  SynthesizeSpeechCommand,
} from "@aws-sdk/client-polly";



export const handler = awslambda.streamifyResponse(async (event, responseStream, _context) => {
    const client = new PollyClient({
        region: process.env.AWS_DEFAULT_REGION
    });
    
    // ***
    
    const command = new SynthesizeSpeechCommand({
        OutputFormat: 'mp3',
        //Text: event.arguments.text,
        Text:'hello world, this is alex',
        VoiceId: 'Mia',
        TextType: 'text',
        SampleRate: "8000",
    });
    
    //const { AudioStream } = await client.send(command);

    responseStream.write(await client.send(command))
    responseStream.end()

    return( "all good");
  });

