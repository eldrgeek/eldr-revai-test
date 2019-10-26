// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

 
const revai = require('revai-node-sdk');
const fs = require('fs');
const token =   "02qpETqg3XvjGChGn7F1wc-5dHgQuOOtpe7MzS7AsskYSO5XN9EMfQkyz-48fsXmpBE2dLN7vFRVZAy-Z3BFv-r0MvGBo";
let url = "https://cdn.glitch.com/a713bb55-db98-4862-84ad-39777182d9bf%2FTest%20clip.mp3?v=1569794815724"
    


// equire('./config/config.json').access_token;

const dofunction = async () => {  
    // Initialize your client with your revai access token
    var client = new revai.RevAiApiClient(token);
    console.log(revai.RevAiApiClient) 
  return

    // Get account details
    var account = await client.getAccount();
    console.log(`Account: ${account.email}`);
    console.log(`Balance: ${account.balance_seconds} seconds`);

    const jobOptions = {
        metadata: "InternalOrderNumber=123456789",
        // callback_url: "https://jsonplaceholder.typicode.com/posts",
        skip_diarization: false,
        custom_vocabularies: [{
            phrases: [
                "add",
                "custom",
                "vocabularies",
                "here"
            ]
        }]
    };

    // Media may be submitted from a url
    let url = "https://cdn.glitch.com/a713bb55-db98-4862-84ad-39777182d9bf%2FTest%20clip.mp3?v=1569794815724"
    var job = await client.submitJobUrl(url, jobOptions);

    console.log(`Job Id: ${job.id}`);
    console.log(`Status: ${job.status}`);
    console.log(`Created On: ${job.created_on}`);

    /**
     * Waits 5 seconds between each status check to see if job is complete.
     * note: polling for job status is not recommended in a non-testing environment.
     * Use the callback_url option (see: https://www.rev.ai/docs#section/Node-SDK)
     * to receive the response asynchronously on job completion
     */
    let jobStatus;
    while((jobStatus = (await client.getJobDetails(job.id)).status) == revai.JobStatus.InProgress)
    {  
        console.log(`Job ${job.id} is ${jobStatus}`);
        await new Promise( resolve => setTimeout(resolve, 5000));
    }

    /**
     * Get transcript as plain text
     * Transcripts can also be gotten as Object, Text Stream, Object Stream,
     * or as captions
     */
    var transcriptText = await client.getTranscriptText(job.id);
    // var transcriptTextStream = await client.getTranscriptTextStream(job.id);
    // var transcriptObject = await client.getTranscriptObject(job.id);
    // var transcriptObjectStream = await client.getTranscriptObjectStream(job.id);
    // var captionsStream = await client.getCaptions(job.id);

    fs.writeFile("./outputs/async_url_transcript.txt", transcriptText, (err) => {
        if (err) throw err;
        console.log("Success! Check the examples/outputs/ directory for the transcript.")
    });

    /**
     * Delete a job
     * Job deletion will remove all information about the job from the servers
     */
    // await client.deleteJob(job.id);
}
try{
// dofunction()
}catch(e){
  console.log(e + "")
}
const client = new revai.RevAiApiClient(token)
const revTest = async () => {
  const account = await client.getAccount()
  const job = await client.submitJobUrl(url)
  const id = job.id
  console.log(job)
  

  const details = { id: '2qw6Nbz5O6eK',
    created_on: '2019-09-29T23:29:04.763Z',
    completed_on: '2019-09-29T23:29:39.348Z',
    name: 'a713bb55-db98-4862-84ad-39777182d9bfTestclip.mp3',
    media_url: 'https://cdn.glitch.com/a713bb55-db98-4862-84ad-39777182d9bf%2FTest%20clip.mp3?v=1569794815724',
    status: 'transcribed',
    duration_seconds: 29.88,
    type: 'async' }
  const transcriptObject = await client.getTranscriptObject(id);
    // console.log(transcriptObject)
  fs.writeFile("./output/transcript1.json", transcriptObject, (err) => {
          if (err) throw err;
          console.log("Success! Check the examples/outputs/ directory for the transcript.") });
}

const jobInfo = async (id) => {
  const info =  await client.getJobDetails(id).then(info => console.log(info))
  return info
}

  


//revTest() 
//transcriptObject = await client.getTranscriptObject(job.id)