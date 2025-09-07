# Ollama Setup Guide for Resume Builder

## Overview

This resume builder uses Ollama as a local AI service to generate ATS-optimized resumes with high scores. Ollama runs locally on your machine, ensuring your data stays private while providing powerful AI capabilities.

## Prerequisites

- macOS, Linux, or Windows
- Node.js 18+ (already installed)
- Ollama (already installed)

## Current Setup Status

✅ **Ollama is installed and running**
✅ **Mistral model is available**
✅ **AI integration is working**

## Available Models

- **mistral:latest** (4.4 GB) - Currently active
- **llama2** - Alternative option (if needed)

## How to Use Ollama with Resume Builder

### 1. Start Ollama Service

```bash
# Start Ollama service (if not already running)
ollama serve
```

### 2. Verify Ollama is Running

```bash
# Check available models
ollama list

# Test connection
curl http://localhost:11434/api/tags
```

### 3. Use AI Features in Resume Builder

The resume builder now includes these AI-powered features:

#### A. **AI Summary Generator**
- Generates professional summaries based on your experience
- ATS-optimized with industry keywords
- Quantifiable achievements and results

#### B. **AI Bullet Point Improver**
- Enhances bullet points with strong action verbs
- Adds metrics and quantifiable results
- ATS-friendly formatting

#### C. **AI Resume Tailoring**
- Analyzes job descriptions
- Provides keyword suggestions
- Estimates ATS scores
- Industry-specific recommendations

#### D. **ATS Resume Generator** (NEW)
- Complete resume generation from JSON data
- ATS-optimized formatting
- High-scoring resume templates
- Downloadable results

## API Endpoints

### 1. AI Status Check
```
GET /api/ai/status
```
Returns: `{"status": "available"}` or `{"status": "unavailable"}`

### 2. Generate Summary
```
POST /api/ai/summary
Body: { "personalInfo": {...}, "experiences": [...] }
```

### 3. Improve Bullet Point
```
POST /api/ai/improve-bullet
Body: { "bulletPoint": "...", "context": "..." }
```

### 4. Tailor Resume
```
POST /api/ai/tailor
Body: { "resume": {...}, "jobDescription": "..." }
```

### 5. Generate Complete ATS Resume
```
POST /api/ai/generate-resume
Body: { "userData": {...}, "jobDescription": "..." }
```

## Example Usage

### Generate ATS-Optimized Resume

```javascript
const userData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    location: "San Francisco, CA"
  },
  experiences: [
    {
      company: "Tech Corp",
      position: "Software Engineer",
      startDate: "2020-01",
      endDate: "2023-12",
      description: "Developed web applications using React and Node.js"
    }
  ],
  skills: [
    { name: "JavaScript", category: "technical" },
    { name: "React", category: "technical" }
  ],
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science in Computer Science"
    }
  ]
};

const response = await fetch('/api/ai/generate-resume', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userData, jobDescription: "..." })
});

const result = await response.json();
console.log(result.resume);
```

## Troubleshooting

### Ollama Not Running
```bash
# Start Ollama service
ollama serve

# Check if it's running
ps aux | grep ollama
```

### Model Not Found
```bash
# Pull Mistral model
ollama pull mistral:latest

# Or pull Llama2
ollama pull llama2
```

### Connection Issues
```bash
# Test Ollama API
curl http://localhost:11434/api/tags

# Check port availability
lsof -i :11434
```

### AI Features Not Working
1. Check if Ollama is running: `ollama serve`
2. Verify model is available: `ollama list`
3. Test API connection: `curl http://localhost:11434/api/tags`
4. Check browser console for errors
5. Restart the development server: `npm run dev`

## Performance Tips

1. **Use Mistral for better performance** - It's faster and more efficient
2. **Keep Ollama running** - Starting/stopping frequently can slow down responses
3. **Monitor system resources** - Ollama uses significant RAM when running
4. **Use specific prompts** - More detailed prompts yield better results

## Security & Privacy

- ✅ **Local Processing** - All AI processing happens on your machine
- ✅ **No Data Sharing** - Your resume data never leaves your computer
- ✅ **Offline Capable** - Works without internet connection
- ✅ **Open Source** - Ollama is open source and transparent

## Next Steps

1. **Start using AI features** in the resume builder
2. **Test the ATS Resume Generator** with your data
3. **Customize prompts** for your specific industry
4. **Share feedback** on AI suggestions quality

## Support

If you encounter issues:
1. Check this guide first
2. Verify Ollama is running
3. Test with the provided examples
4. Check browser console for errors
5. Restart services if needed

---

**Status**: ✅ Ready to use
**Model**: mistral:latest
**Service**: Running on localhost:11434
