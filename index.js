const express =require("express")
const dotenv=require("dotenv")
const cors=require("cors")

const { Configuration, OpenAIApi } =require("openai")


dotenv.config();

const configuration = new Configuration({
  apiKey:process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);
const app = express();
app.use(express.json())
app.use(cors())

app.post('/', async (req, res) => {
    try {
      const {words,about } = req.body;
  
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `write a ${words} words story on ${about}.`,
        temperature: 1.2,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
  
      const Query_Response = response.data.choices[0].text.trim();
      res.status(200).json({
        bot: Query_Response.split("\n"),
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error || 'Something went wrong');
    }
  });
  


  app.listen(8080, () => {
    try {
      
        console.log("http://localhost:8080");
    } catch (error) {
        console.log(error);
    }
  });
