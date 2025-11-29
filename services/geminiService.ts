import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Student } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    archetype: {
      type: Type.STRING,
      description: "A cool, futuristic cyberpunk-style title for this student (e.g., 'Data Runner', 'Bio-Hacker', 'Void Architect').",
    },
    careerSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 3 high-tech or modern job titles suitable for this student.",
    },
    studyTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of 2 strategic, high-performance study hacks.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise, high-impact assessment of the student's potential.",
    },
  },
  required: ["archetype", "careerSuggestions", "studyTips", "summary"],
};

export const analyzeStudentProfile = async (student: Student): Promise<any> => {
  if (!apiKey) {
    throw new Error("API Key is missing.");
  }

  try {
    const prompt = `
      Analyze this student profile for the Nexus Registry:
      Name: ${student.firstName} ${student.lastName}
      DOB: ${student.birthDate} (Age: ${student.age})
      Major: ${student.major}
      GPA: ${student.gpa}
      Bio: ${student.bio}

      Output must be strictly JSON matching the schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an advanced AI guidance system. Your style is precise, futuristic, and encouraging.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};