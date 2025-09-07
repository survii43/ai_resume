interface OllamaRequest {
  model: string
  prompt: string
  stream?: boolean
}

interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

export class OllamaClient {
  private baseUrl: string

  constructor(baseUrl: string = 'http://localhost:11434') {
    this.baseUrl = baseUrl
  }

  async generate(prompt: string, model: string = 'mistral:latest'): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.statusText}`)
      }

      const data: OllamaResponse = await response.json()
      return data.response
    } catch (error) {
      console.error('Ollama API error:', error)
      throw new Error('Failed to connect to Ollama. Please ensure Ollama is running on localhost:11434')
    }
  }

  async generateSummary(personalInfo: any, experiences: any[]): Promise<string> {
    const prompt = `Generate an ATS-optimized professional summary for a resume based on the following information:

Personal Information:
- Name: ${personalInfo.firstName} ${personalInfo.lastName}
- Location: ${personalInfo.location || 'Not specified'}

Work Experience:
${experiences.map((exp: any) => `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`).join('\n')}

Please write a compelling 2-3 sentence professional summary that:
1. Uses industry-standard keywords and terminology
2. Highlights quantifiable achievements and results
3. Is ATS-friendly (no special characters, clear formatting)
4. Demonstrates value proposition to employers
5. Includes relevant skills and expertise
6. Is specific and impactful

Make it professional, keyword-rich, and optimized for Applicant Tracking Systems.`

    return this.generate(prompt)
  }

  async improveBulletPoint(bulletPoint: string, context: string): Promise<string> {
    const prompt = `Improve this resume bullet point to be ATS-optimized and high-scoring:

Original bullet point: "${bulletPoint}"

Context: ${context}

Please rewrite this bullet point to:
1. Start with a strong action verb (managed, developed, implemented, etc.)
2. Include specific metrics, percentages, or quantifiable results
3. Highlight the impact or outcome for the business
4. Use industry-standard keywords and terminology
5. Be ATS-friendly (no special characters, clear formatting)
6. Keep it concise (1-2 lines maximum)
7. Focus on achievements rather than responsibilities

Return only the improved bullet point, no additional text.`

    return this.generate(prompt)
  }

  async tailorResume(resume: any, jobDescription: string): Promise<any> {
    const prompt = `Analyze this resume against the job description and provide ATS-optimization suggestions:

Job Description:
${jobDescription}

Resume Summary:
- Name: ${resume.personalInfo?.firstName} ${resume.personalInfo?.lastName}
- Experience: ${resume.experiences?.map((exp: any) => `${exp.position} at ${exp.company}`).join(', ')}
- Skills: ${resume.skills?.map((skill: any) => skill.name).join(', ')}

Please provide comprehensive ATS optimization suggestions:
1. Missing keywords from the job description that should be added
2. Suggestions for improving the professional summary to match job requirements
3. Recommendations for highlighting relevant experience and achievements
4. Skills that should be emphasized or added
5. ATS score improvement recommendations
6. Industry-specific terminology to include

Format your response as a JSON object with the following structure:
{
  "missingKeywords": ["keyword1", "keyword2"],
  "summarySuggestions": "detailed suggestion text for ATS optimization",
  "experienceRecommendations": "recommendation text for highlighting relevant experience",
  "skillEmphasis": ["skill1", "skill2"],
  "atsScore": "estimated ATS score (1-100)",
  "improvementAreas": ["area1", "area2"],
  "industryKeywords": ["keyword1", "keyword2"]
}`

    const response = await this.generate(prompt)
    
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('No valid JSON found in response')
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        missingKeywords: [],
        summarySuggestions: response,
        experienceRecommendations: '',
        skillEmphasis: []
      }
    }
  }

  async generateATSResume(userData: any, jobDescription?: string): Promise<any> {
    const prompt = `Generate a complete ATS-optimized resume based on the following user data:

User Data:
${JSON.stringify(userData, null, 2)}

${jobDescription ? `Target Job Description:
${jobDescription}` : ''}

Please generate a complete resume with the following sections:
1. Professional Summary (2-3 sentences, ATS-optimized)
2. Work Experience (with improved bullet points for each role)
3. Skills (organized by category, with relevant keywords)
4. Education (if provided)
5. Projects (if provided)

Requirements:
- Use industry-standard keywords and terminology
- Include quantifiable achievements and metrics
- Be ATS-friendly (no special characters, clear formatting)
- Optimize for high ATS scores
- Use strong action verbs
- Focus on achievements rather than responsibilities
- Include relevant keywords from job description if provided

Format your response as a JSON object with the following structure:
{
  "professionalSummary": "optimized summary text",
  "workExperience": [
    {
      "company": "company name",
      "position": "position title",
      "duration": "start date - end date",
      "bulletPoints": ["improved bullet point 1", "improved bullet point 2"]
    }
  ],
  "skills": {
    "technical": ["skill1", "skill2"],
    "soft": ["skill1", "skill2"],
    "certifications": ["cert1", "cert2"]
  },
  "education": "education details",
  "projects": "project details if applicable",
  "atsScore": "estimated ATS score (1-100)",
  "keywords": ["keyword1", "keyword2"],
  "recommendations": "additional optimization recommendations"
}`

    const response = await this.generate(prompt)
    
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('No valid JSON found in response')
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        professionalSummary: response,
        workExperience: [],
        skills: { technical: [], soft: [], certifications: [] },
        education: '',
        projects: '',
        atsScore: 'N/A',
        keywords: [],
        recommendations: 'Please review the generated content and make manual adjustments as needed.'
      }
    }
  }
}

export const ollamaClient = new OllamaClient()
