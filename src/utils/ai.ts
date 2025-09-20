import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { PromptTemplate } from "@langchain/core/prompts"
import * as z from "zod";

const schema = z.object({
    mood: z.
        string().
        describe('the mood of the person who wrote the journal entry.'),
    subject: z.
        string().
        describe('subject of the journal entry.'),
    summery: z.
        string().
        describe('quick summery of the entire entry.'),
    negative: z.
        boolean().
        describe('is the journal entry negative ? (i.e does it contain negative emotions?.)'),
    color: z.
        string().
        describe('a hexadecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.')     
});

const parser = StructuredOutputParser.fromZodSchema(schema);

const getPrompt = async (content) => {
    const formattedInstruction = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
        template: "Analyze the following journal entry. Follow the instruction and format your response to match the format instructions, no matter what! \n {formattedInstruction} \n {entry}",
        inputVariables: ["entry"],
        partialVariables: {formattedInstruction}
   });

   const response = await prompt.format({
    entry: content
   });
   return response;
}

const analyze = async (content) => {
    const prompt = await getPrompt(content);
    const model = new ChatOpenAI({
        temperature: 0,
        model: "gpt-4.1-mini"
    })

    const result = await model.invoke(prompt);

    try{
       return parser.parse(result.content);
    }catch(e) {
        console.log(e)
    }
}

export {
    analyze
};