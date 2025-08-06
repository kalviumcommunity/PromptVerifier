# PromptVerifier

> Automatically test, analyze, and refine AI prompts across multiple test cases — ensuring quality, clarity, and consistency in LLM responses.

---

##  Overview

**PromptVerifier** is a developer tool designed to streamline **prompt engineering** by automating the process of testing a prompt across multiple inputs and scoring each output based on:

-  Clarity  
-  Relevance  
-  Output Quality  
-  Length Match  
-  Consistency  

Whether you're building AI applications, chatbots, or instructional prompts — PromptVerifier helps ensure your prompts perform reliably before deployment.

---

##  Features

-  **Multi-test Evaluation**: Run a single prompt across multiple test cases
-  **Structured Output**: View per-test JSON results with breakdowns
-  **Function Calling**: LLM uses tools to assess each output’s quality
-  **RAG Support**: Retrieves best practices from prompt-engineering docs
-  **LLM Tuning**: Customize temperature, token limits, and top_p
-  **Report View (optional)**: Export results to CSV, JSON, or view as charts

---

##  Example Use Case

```json
{
  "prompt": "Summarize this blog post in 2-3 sentences:",
  "test_cases": [
    "Text of blog post A...",
    "Text of blog post B...",
    "Text of blog post C..."
  ],
  "parameters": {
    "temperature": 0.7,
    "max_tokens": 200
  }
}
