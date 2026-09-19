// ============================================================
// AI UNIVERSE DATA — JavaAlgo Elite v3.0
// Complete curriculum: AI → ML → LLMs → RAG → Agents → MCPs
// Designed for absolute beginners → certification-ready
// ============================================================

export const aiUniverseData = {

  // ── TRACK META ──────────────────────────────────────────
  title: "AI & Generative AI Universe",
  subtitle: "From 'What is AI?' to building production AI agents — no prior knowledge needed",
  totalTopics: 15,
  estimatedHours: 40,
  certifications: ["Claude Certified Architect", "Google Antigravity Agent Dev", "AWS AI Practitioner"],

  // ── TOPICS ──────────────────────────────────────────────
  topics: [

    // ── TOPIC 1 ─────────────────────────────────────────
    {
      id: "what-is-ai",
      title: "What is AI? (Really)",
      icon: "🧠",
      color: "#818cf8",
      difficulty: "Beginner",
      estimatedMins: 20,
      hook: "Your phone predicts the next word you'll type. Netflix knows you'll like that show before you do. Your spam folder catches suspicious emails. All of this is AI — and none of it is magic.",

      sections: [
        {
          type: "story",
          title: "The Real Story of AI",
          content: `Imagine you're teaching a 5-year-old to recognize cats. You don't give them a rulebook that says "cats have whiskers AND pointed ears AND meow." Instead, you show them 1000 pictures: "This is a cat. This is a cat. This is NOT a cat." After a while, they just... know.

That's exactly how AI works.

**Artificial Intelligence (AI)** is the field of making computers learn from examples instead of following hard-coded rules.

Before AI: A programmer would write:
\`\`\`
if (has_whiskers AND has_pointy_ears AND meows):
    return "cat"
\`\`\`

After AI: You show the computer 1 million cat photos and let it figure out the pattern itself.

The computer finds patterns you couldn't even describe in words — the exact curve of an ear, the specific glint in cat eyes, the texture of fur. This is why AI can recognize your face but you can't describe to anyone exactly how you recognize faces either.`
        },
        {
          type: "concept",
          title: "The AI Family Tree — Understanding the Buzz Words",
          content: `You've heard these words thrown around. Let's map them out clearly:`,
          diagram: {
            type: "tree",
            label: "AI Family Tree",
            nodes: [
              { id: "ai", label: "🧠 Artificial Intelligence", desc: "Computers solving tasks that require human-like intelligence", level: 0 },
              { id: "ml", label: "📊 Machine Learning", desc: "AI systems that learn from data (subset of AI)", level: 1 },
              { id: "dl", label: "🔢 Deep Learning", desc: "ML using multi-layer neural networks (subset of ML)", level: 2 },
              { id: "genai", label: "✨ Generative AI", desc: "Deep Learning that creates new content — text, images, code", level: 3 },
              { id: "llm", label: "📝 Large Language Models", desc: "GenAI specifically for text (GPT-4, Claude, Gemini)", level: 4 },
            ]
          },
          explainer: `**Think of it like this:**
- AI = The entire field (like 'Sports')
- Machine Learning = A type of AI (like 'Ball Sports')
- Deep Learning = A type of ML (like 'Team Ball Sports')
- Generative AI = A type of Deep Learning (like 'Team Ball Sports that involve goals')
- LLMs = A specific type of GenAI (like 'Football specifically')

When someone says "I use AI at work," they probably mean they use an LLM like ChatGPT or Claude.`
        },
        {
          type: "realworld",
          title: "AI You Already Use Every Day",
          examples: [
            { icon: "📱", name: "Your Keyboard's Autocomplete", how: "Predicts your next word using language patterns from billions of texts" },
            { icon: "📺", name: "Netflix Recommendations", how: "Analyzes what 200 million people watch to predict what YOU want next" },
            { icon: "📧", name: "Gmail Spam Filter", how: "Learned from millions of spam examples to detect new spam patterns" },
            { icon: "🗺️", name: "Google Maps ETA", how: "Learns from millions of past trips to predict traffic for your exact route" },
            { icon: "🎵", name: "Spotify Discover Weekly", how: "Finds people with similar music taste and shows you what they loved" },
            { icon: "💳", name: "Credit Card Fraud Detection", how: "Flags transactions that don't match your normal spending patterns" },
          ]
        },
        {
          type: "quiz",
          questions: [
            {
              q: "Which is the correct ordering from broadest to most specific?",
              options: ["ML → AI → Deep Learning → LLMs", "AI → ML → Deep Learning → LLMs", "LLMs → Deep Learning → ML → AI", "AI → LLMs → Deep Learning → ML"],
              correct: 1,
              explanation: "AI is the broadest field. ML is a subset of AI. Deep Learning is a subset of ML. LLMs are a specific type of Generative AI (Deep Learning)."
            }
          ]
        }
      ]
    },

    // ── TOPIC 2 ─────────────────────────────────────────
    {
      id: "how-llms-work",
      title: "How ChatGPT/Claude Actually Work",
      icon: "🤖",
      color: "#38bdf8",
      difficulty: "Beginner",
      estimatedMins: 30,
      hook: "You've used ChatGPT or Claude. But have you ever wondered — what is actually happening inside? It's not a database lookup. It's not a search engine. It's something far more fascinating.",

      sections: [
        {
          type: "story",
          title: "The World's Most Ambitious Autocomplete",
          content: `Here's the shocking truth about how LLMs like ChatGPT and Claude work:

**They're predicting the next word. That's it.**

But doing it *really, really, really well* with massive context window.

Here's what happens when you type "What is the capital of France?":

1. The model reads your words: [What] [is] [the] [capital] [of] [France] [?]
2. It asks itself: "Given everything I've ever read, what word is most likely to come next?"
3. It produces: "The"
4. Then asks again: "Given [What][is][the][capital][of][France][?][The] — what's next?"
5. It produces: "capital"
6. Continues: "of" → "France" → "is" → "Paris"

This repeats until it decides to stop. That's the entire mechanism.

**So why is it so smart?** Because it was trained on hundreds of billions of words from the entire internet, books, and scientific papers. It didn't memorize facts — it learned the *patterns of human reasoning* from reading everything humans have ever written.`
        },
        {
          type: "concept",
          title: "Training: How an LLM Learns",
          content: `Training an LLM is a 3-phase process:

**Phase 1: Pre-training** (Months, costs $10-100 million)
- Feed the model ~500 billion words of text
- Task: "Predict the next word"
- The model adjusts billions of internal settings (called *parameters* or *weights*) until it gets good at prediction
- This is where general knowledge comes from

**Phase 2: Fine-tuning / RLHF** (Weeks)
- Show the model examples of good conversations
- Human raters score the outputs (Reinforcement Learning from Human Feedback)
- This teaches it to be helpful, harmless, and honest
- This is why Claude is polite and ChatGPT follows instructions

**Phase 3: Deployment**
- The trained model is frozen (no longer learning)
- Each conversation starts fresh — the model doesn't remember you between sessions
- Context window = short-term memory during a conversation`,
          diagram: {
            type: "pipeline",
            label: "LLM Training Pipeline",
            steps: [
              { label: "Raw Text Data", detail: "Books, Wikipedia, Code, Web", icon: "📚" },
              { label: "Tokenization", detail: "Text → Numbers (tokens)", icon: "🔢" },
              { label: "Pre-training", detail: "Predict next token billions of times", icon: "🏋️" },
              { label: "RLHF", detail: "Human raters teach helpfulness", icon: "👥" },
              { label: "Deployed Model", detail: "Ready to answer your questions", icon: "✅" },
            ]
          }
        },
        {
          type: "concept",
          title: "Tokens — The Currency of LLMs",
          content: `LLMs don't read words — they read **tokens**. A token is a chunk of text, roughly 3/4 of a word on average.

**Examples:**
- "Hello" = 1 token
- "programming" = 1 token  
- "unbelievable" = 2 tokens (un + believable)
- "ChatGPT is amazing!" = 5 tokens

**Why does this matter?**
- Models have a **context window** = max tokens they can process at once
- Claude 3.5: 200,000 tokens (~150,000 words = entire Lord of the Rings trilogy)
- GPT-4o: 128,000 tokens
- Longer context = more expensive (you pay per token in APIs)
- Everything in a conversation (your messages + AI responses) counts against the limit`,

          code: {
            language: "python",
            label: "Counting tokens with tiktoken (OpenAI's tokenizer)",
            content: `import tiktoken

# Load the tokenizer for GPT-4
enc = tiktoken.encoding_for_model("gpt-4")

text = "Hello, I want to learn about artificial intelligence!"

# Tokenize
tokens = enc.encode(text)
print(f"Text: {text}")
print(f"Token count: {len(tokens)}")    # Output: 9 tokens
print(f"Tokens: {tokens}")              # Output: [15496, 11, 314, 765, 284, 2193, 546, 11666, 4430, 0]

# Decode back
decoded = enc.decode(tokens)
print(f"Decoded: {decoded}")            # Same as original`
          }
        },
        {
          type: "concept",
          title: "Key LLM Parameters You Need to Know",
          content: `When calling any LLM API, you control these settings:`,
          table: {
            headers: ["Parameter", "What it means", "Real-world analogy", "Typical values"],
            rows: [
              ["Temperature", "How creative/random the output is", "0 = textbook answer, 1 = improv comedian", "0.0–1.0 (0 for code, 0.7 for creative)"],
              ["Max Tokens", "Maximum length of the response", "Word limit on an essay", "100–4096 depending on need"],
              ["Top-P (Nucleus)", "Controls diversity of word choices", "Picking from top 90% vs top 10% of options", "0.9 recommended"],
              ["System Prompt", "Instructions that shape the AI's role", "A job description for the AI", "Set once per conversation"],
              ["Context Window", "Total memory for a conversation", "Short-term memory — gets cleared each session", "Model-dependent"],
            ]
          }
        }
      ]
    },

    // ── TOPIC 3 ─────────────────────────────────────────
    {
      id: "prompt-engineering",
      title: "Prompt Engineering — Talk to AI Like a Pro",
      icon: "✍️",
      color: "#34d399",
      difficulty: "Beginner",
      estimatedMins: 25,
      hook: "The difference between a useless AI response and a brilliant one is often just how you asked the question. Prompt engineering is the skill that separates people who get 10% value from AI and people who get 10x their productivity.",

      sections: [
        {
          type: "story",
          title: "Why Prompting Matters",
          content: `**Bad prompt:** "Write me some code"
**Good prompt:** "Write a Python function that takes a list of student names and grades as a dict, sorts by grade descending, and returns the top 3 students with their percentile rank. Include docstring and edge case handling for empty input."

The second prompt gets you production-ready code. The first gets you a "Hello World."

Prompting is a skill. Here are the frameworks professionals use.`
        },
        {
          type: "patterns",
          title: "The 5 Core Prompting Techniques",
          items: [
            {
              name: "Zero-Shot Prompting",
              desc: "Give a task with no examples. Works for simple tasks.",
              example: `Classify this review as Positive or Negative:
"The battery life is amazing but the screen is dim."`,
              output: "Mixed (or Negative depending on model)"
            },
            {
              name: "Few-Shot Prompting",
              desc: "Give 2–5 examples before your task. Dramatically improves accuracy.",
              example: `Review: "Great product, fast delivery!" → Positive
Review: "Broke after one week. Terrible quality." → Negative
Review: "Looks nice but overpriced for what it does." → ?`,
              output: "Negative (model learned the pattern from examples)"
            },
            {
              name: "Chain-of-Thought (CoT)",
              desc: "Ask the model to think step by step. Solves reasoning tasks much better.",
              example: `Q: A store sells apples for ₹10 each. If I buy 5 and get 20% off, how much do I pay?
A: Let me think step by step:
1. Total without discount: 5 × ₹10 = ₹50
2. 20% discount: ₹50 × 0.20 = ₹10 off
3. Final price: ₹50 - ₹10 = ₹40
Answer: ₹40`,
              output: "Far more reliable than asking directly"
            },
            {
              name: "Role Prompting",
              desc: "Give the AI a persona/role to get specialized responses.",
              example: `You are a senior software engineer at Google with 15 years of experience. 
Review this code for performance issues and suggest improvements.
[paste code]`,
              output: "Much more detailed, expert-level feedback"
            },
            {
              name: "Structured Output Prompting",
              desc: "Ask for specific formats — JSON, tables, bullet points.",
              example: `Extract the following from this job description and return as JSON:
{
  "role": "",
  "required_skills": [],
  "salary_range": "",
  "location": ""
}

Job description: [paste job desc]`,
              output: "Parseable JSON you can use in code"
            }
          ]
        },
        {
          type: "code",
          title: "Calling Claude API — Your First AI Integration",
          code: {
            language: "python",
            label: "claude_api_basics.py",
            content: `import anthropic

# Initialize the client
# Get your API key at: https://console.anthropic.com/
client = anthropic.Anthropic(api_key="your-api-key-here")

# === BASIC COMPLETION ===
message = client.messages.create(
    model="claude-opus-4-5",       # or "claude-sonnet-4-5" (faster, cheaper)
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "Explain recursion to a 10-year-old using a real example"
        }
    ]
)
print(message.content[0].text)


# === WITH SYSTEM PROMPT (ROLE PROMPTING) ===
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=2048,
    system="""You are an expert Java DSA tutor. 
    Always explain with a real-world analogy first, 
    then show code, then give time complexity analysis.""",
    messages=[
        {"role": "user", "content": "Explain Binary Search"}
    ]
)
print(response.content[0].text)


# === MULTI-TURN CONVERSATION ===
conversation_history = []

def chat(user_message):
    conversation_history.append({
        "role": "user",
        "content": user_message
    })
    
    response = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1024,
        system="You are a helpful coding assistant. Be concise.",
        messages=conversation_history
    )
    
    assistant_message = response.content[0].text
    conversation_history.append({
        "role": "assistant",
        "content": assistant_message
    })
    
    return assistant_message

# This maintains conversation context!
print(chat("What is a HashMap?"))
print(chat("How is it different from a TreeMap?"))  # Remembers previous context`
          }
        }
      ]
    },

    // ── TOPIC 4 ─────────────────────────────────────────
    {
      id: "rag",
      title: "RAG — Teaching AI Your Own Knowledge",
      icon: "📚",
      color: "#f97316",
      difficulty: "Intermediate",
      estimatedMins: 35,
      hook: "ChatGPT doesn't know about your company's internal docs. It doesn't know about events after its training cutoff. It doesn't know your own codebase. RAG is the technique that fixes all of this — and it powers 80% of real enterprise AI products.",

      sections: [
        {
          type: "story",
          title: "The Closed-Book Exam Problem",
          content: `Imagine you have a brilliant student (the LLM). They've read every textbook ever written and are incredibly smart at reasoning. But they graduated in 2024 and there's been new research since then. Also, they've never read YOUR company's internal documents.

**Without RAG:** You ask the student a question about your proprietary data. They either make something up (hallucinate) or say "I don't know."

**With RAG:** Before the student answers, you hand them the relevant pages from your internal documents. Now they can reason about YOUR data using their general intelligence.

This is Retrieval-Augmented Generation.

**Real products built on RAG:**
- ChatGPT with web browsing
- GitHub Copilot (retrieves your codebase)
- Notion AI (retrieves your notes)
- Customer support bots (retrieves your FAQ docs)
- Medical AI assistants (retrieves patient records)`
        },
        {
          type: "pipeline",
          title: "How RAG Works — Step by Step",
          steps: [
            {
              step: 1,
              phase: "Indexing Phase (done once)",
              title: "Load & Split Your Documents",
              detail: "Take your PDFs, docs, code files. Split them into chunks (~500 words each) so they can be searched efficiently.",
              code: `from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load your document
loader = PyPDFLoader("company_handbook.pdf")
documents = loader.load()

# Split into searchable chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50  # slight overlap so context isn't lost at boundaries
)
chunks = splitter.split_documents(documents)
print(f"Created {len(chunks)} searchable chunks")`
            },
            {
              step: 2,
              phase: "Indexing Phase (done once)",
              title: "Convert Chunks to Vectors (Embeddings)",
              detail: "Each chunk gets turned into a list of ~1500 numbers (a vector) that captures its *meaning*. Similar topics have similar vectors. This is how semantic search works.",
              code: `from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# Convert text meaning → numbers
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

# Store in a vector database
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./my_knowledge_base"
)
print("Knowledge base created! Saved to disk.")`
            },
            {
              step: 3,
              phase: "Query Phase (every user request)",
              title: "User Asks a Question → Find Relevant Chunks",
              detail: "When a user asks a question, it also gets converted to a vector. The DB finds the chunks with the most similar vectors.",
              code: `# User asks a question
user_question = "What is the company's vacation policy?"

# Convert question to vector and find similar chunks
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})  # Top 4 relevant chunks
relevant_chunks = retriever.invoke(user_question)

print(f"Found {len(relevant_chunks)} relevant passages:")
for chunk in relevant_chunks:
    print(f"  → {chunk.page_content[:100]}...")`
            },
            {
              step: 4,
              phase: "Query Phase (every user request)",
              title: "Inject Context into LLM Prompt",
              detail: "The retrieved chunks get stuffed into the prompt alongside the user's question. The LLM answers using THIS specific context.",
              code: `from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate

llm = ChatAnthropic(model="claude-sonnet-4-5")

prompt = ChatPromptTemplate.from_template("""
You are a helpful HR assistant. Answer questions using ONLY the context provided.
If the answer isn't in the context, say "I don't have that information."

Context from company documents:
{context}

Question: {question}
""")

# Assemble the chain: retrieve → format → generate
chain = (
    {"context": retriever, "question": lambda x: x}
    | prompt
    | llm
)

response = chain.invoke(user_question)
print(response.content)`
            }
          ]
        },
        {
          type: "concept",
          title: "Vector Databases — The Secret Engine of RAG",
          content: `Normal databases search by exact match: "WHERE name = 'John'".

Vector databases search by *meaning similarity*: "Find me the 5 chunks most semantically similar to this question."

**How it works:**
Every piece of text gets converted to a list of numbers (vector/embedding) by an embedding model. The embedding model has learned that "car" and "automobile" should have similar vectors, while "car" and "elephant" should be very different.

**Popular Vector DBs:**

| Database | Best For | Key Feature |
|----------|----------|-------------|
| **Chroma** | Local development | In-memory, easy to set up |
| **Pinecone** | Production scale | Fully managed, fast |
| **Weaviate** | Self-hosted | Open source, powerful |
| **FAISS** | High performance | Facebook's library, runs anywhere |
| **pgvector** | Existing Postgres users | Add vector search to Postgres |`,
        }
      ]
    },

    // ── TOPIC 5 ─────────────────────────────────────────
    {
      id: "ai-agents",
      title: "AI Agents — AI That Takes Actions",
      icon: "🦾",
      color: "#c084fc",
      difficulty: "Intermediate",
      estimatedMins: 40,
      hook: "ChatGPT answers questions. AI Agents *do things*. An agent can search the web, write code, run it, read the output, fix bugs, send emails, and book meetings — all on its own. This is the technology that will reshape every job in the next 5 years.",

      sections: [
        {
          type: "story",
          title: "The Difference: Chatbot vs Agent",
          content: `**Chatbot (LLM only):**
You: "Book me a flight to Mumbai next Friday"
AI: "Sure! Here's how you can book a flight to Mumbai: 1. Go to MakeMyTrip..."
*(Just gives you instructions. YOU have to do the work.)*

**AI Agent:**
You: "Book me a flight to Mumbai next Friday"
AI Agent: 
- *Searches real-time flight prices* 🔍
- *Compares 12 flights* 📊
- *Identifies cheapest non-stop IndiGo flight at 6am* ✓
- *Opens booking page* 🌐
- *Fills in your saved passenger details* 📝
- *Asks you to confirm payment* 💳
*(The agent actually DOES the work.)*

The difference is **tools**. An agent is an LLM + the ability to use tools (search, code execution, web browsing, APIs, databases).`
        },
        {
          type: "concept",
          title: "The ReAct Loop — How Agents Think",
          content: `Agents use the **ReAct pattern** (Reasoning + Acting). Here's the loop:

\`\`\`
Observation: [User wants to know today's weather in Mumbai]
    ↓
Thought: I should use the weather API tool to get current data.
    ↓
Action: CALL weather_api(city="Mumbai")
    ↓
Observation: "Mumbai: 32°C, Humid, 80% chance of rain"
    ↓
Thought: I have the data. I can now answer the user.
    ↓
Final Answer: "It's currently 32°C in Mumbai with high humidity and
an 80% chance of rain today. Bring an umbrella!"
\`\`\`

The key insight: **the LLM decides which tools to call and in what order.** You give it tools; it figures out the plan.`,
          diagram: {
            type: "cycle",
            label: "ReAct Agent Loop",
            nodes: [
              { label: "User Input", icon: "👤" },
              { label: "Think (LLM Reasoning)", icon: "🧠" },
              { label: "Act (Call a Tool)", icon: "🔧" },
              { label: "Observe (Get Result)", icon: "👁️" },
              { label: "Answer or Loop Again", icon: "✅" },
            ]
          }
        },
        {
          type: "code",
          title: "Your First AI Agent with LangChain",
          code: {
            language: "python",
            label: "first_agent.py",
            content: `from langchain_anthropic import ChatAnthropic
from langchain.tools import tool
from langchain.agents import create_react_agent, AgentExecutor
from langchain import hub

# ─── STEP 1: Define Tools the Agent Can Use ───────────────────
@tool
def search_web(query: str) -> str:
    """Search the internet for current information. Use for news, prices, facts."""
    # In production, use Serper API / Tavily / DuckDuckGo
    # For demo, we'll simulate it
    return f"Search results for '{query}': [Example results would appear here]"

@tool
def calculate(expression: str) -> str:
    """Perform mathematical calculations. Input should be a math expression."""
    try:
        result = eval(expression)  # In prod, use a safe math library
        return str(result)
    except Exception as e:
        return f"Error: {e}"

@tool
def get_current_date() -> str:
    """Get today's date and time."""
    from datetime import datetime
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# List all tools the agent can use
tools = [search_web, calculate, get_current_date]

# ─── STEP 2: Create the LLM ──────────────────────────────────
llm = ChatAnthropic(model="claude-sonnet-4-5", temperature=0)

# ─── STEP 3: Load ReAct prompt template from LangChain Hub ───
prompt = hub.pull("hwchase17/react")

# ─── STEP 4: Create the Agent ────────────────────────────────
agent = create_react_agent(llm, tools, prompt)
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True,        # Shows the agent's thinking process!
    max_iterations=5     # Safety: stop after 5 tool calls
)

# ─── STEP 5: Run the Agent ───────────────────────────────────
result = agent_executor.invoke({
    "input": "What is today's date, and if I invest ₹50,000 at 12% annual return for 5 years, how much will I have?"
})

print("\\n=== FINAL ANSWER ===")
print(result["output"])`
          }
        },
        {
          type: "concept",
          title: "Multi-Agent Systems — Agents Working Together",
          content: `Just like how a company has different departments (HR, Engineering, Sales), complex AI tasks can be solved by multiple specialized agents working together.

**Architecture patterns:**

**1. Supervisor + Workers (Most Common)**
\`\`\`
User Request
    ↓
Supervisor Agent (Claude/GPT-4)
├── Research Agent → searches web, papers
├── Code Agent → writes + tests code
├── Writer Agent → creates documentation
└── QA Agent → reviews everything
    ↓
Supervisor synthesizes all outputs → Final Answer
\`\`\`

**2. Sequential Pipeline**
Agent A output → Agent B input → Agent C input → Final Result
*(Like an assembly line)*

**3. Peer-to-Peer (Debate)**
Agent A argues one approach
Agent B argues another
Judge Agent picks the best

**Real companies using multi-agent systems:**
- AutoGPT, Devin (autonomous coding)
- Cognition AI (engineering tasks)
- Google Gemini with tool use
- Microsoft AutoGen framework`,
        }
      ]
    },

    // ── TOPIC 6 ─────────────────────────────────────────
    {
      id: "mcp",
      title: "Model Context Protocol (MCP)",
      icon: "🔌",
      color: "#fbbf24",
      difficulty: "Intermediate",
      estimatedMins: 30,
      hook: "In November 2024, Anthropic released MCP — a standard that lets any AI connect to any tool, the same way USB-C lets any device connect to any charger. This is the protocol that will make AI agents universally powerful.",

      sections: [
        {
          type: "story",
          title: "The USB-C of AI",
          content: `Before USB-C, every phone company had their own charger. Micro-USB, Lightning, proprietary connectors — chaos.

Before MCP, every AI agent had to have custom code written for each tool connection. Want Claude to read your files? Custom code. Access your database? More custom code. Read your calendar? Even more custom code.

**MCP (Model Context Protocol)** is Anthropic's answer: a universal standard so any AI model can connect to any tool through one consistent interface.

**The three MCP primitives:**
1. **Tools** — Functions the AI can call (like "search_web" or "run_code")
2. **Resources** — Data the AI can read (like files, database records, API responses)
3. **Prompts** — Pre-written prompt templates the AI can use

**MCP Servers you can use today:**
- Filesystem MCP Server (reads/writes local files)
- GitHub MCP Server (searches repos, creates PRs)
- Slack MCP Server (reads messages, sends notifications)
- PostgreSQL MCP Server (queries your database)
- Browser MCP Server (controls Chrome like a human)
- Google Maps MCP Server (directions, places)

Think of MCP servers as "apps" that AI can install and use.`
        },
        {
          type: "code",
          title: "Building Your Own MCP Server",
          code: {
            language: "python",
            label: "my_mcp_server.py — A simple custom MCP server",
            content: `from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp import types

# Create MCP server
server = Server("my-learning-assistant")

# ─── DEFINE TOOLS ─────────────────────────────────────────────
@server.list_tools()
async def list_tools():
    """Tell clients what tools this server offers"""
    return [
        types.Tool(
            name="get_dsa_topic",
            description="Get detailed explanation of a DSA topic",
            inputSchema={
                "type": "object",
                "properties": {
                    "topic": {
                        "type": "string",
                        "description": "DSA topic name (e.g., 'binary search', 'graph bfs')"
                    }
                },
                "required": ["topic"]
            }
        ),
        types.Tool(
            name="run_java_code",
            description="Execute a Java code snippet and return the output",
            inputSchema={
                "type": "object",
                "properties": {
                    "code": {"type": "string", "description": "Java code to execute"}
                },
                "required": ["code"]
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    """Handle tool calls from the AI"""
    if name == "get_dsa_topic":
        topic = arguments["topic"]
        # In real use: query your DSA database
        return [types.TextContent(
            type="text",
            text=f"Binary Search: Searches sorted array in O(log n) by halving search space..."
        )]
    
    elif name == "run_java_code":
        code = arguments["code"]
        # In real use: send to a sandboxed executor
        return [types.TextContent(type="text", text="Output: Hello World!")]

# ─── START SERVER ─────────────────────────────────────────────
if __name__ == "__main__":
    import asyncio
    asyncio.run(stdio_server(server))`
          }
        },
        {
          type: "concept",
          title: "MCP vs Function Calling vs RAG — When to Use What",
          content: `These are different tools for different jobs:`,
          table: {
            headers: ["Technique", "What it does", "Best for", "Example use"],
            rows: [
              ["**RAG**", "Give AI access to your documents/data", "Static knowledge that changes rarely", "Company FAQ chatbot, documentation search"],
              ["**Function Calling**", "AI calls your APIs in real-time", "Getting live data from external APIs", "Weather, stock prices, database queries"],
              ["**MCP**", "Standardized way to expose tools+resources", "Building reusable integrations", "Connect Claude Desktop to your local files"],
              ["**Fine-tuning**", "Permanently teach AI new patterns/style", "Consistent style, domain specialization", "Medical AI trained on patient records"],
              ["**Prompting**", "Guide the AI with instructions", "Quick customization, no code needed", "Making Claude respond like your brand voice"],
            ]
          }
        }
      ]
    },

    // ── TOPIC 7 ─────────────────────────────────────────
    {
      id: "google-gemini-antigravity",
      title: "Google Gemini & Antigravity ADK",
      icon: "🚀",
      color: "#34d399",
      difficulty: "Intermediate",
      estimatedMins: 35,
      hook: "Google's answer to OpenAI isn't just a model — it's an entire development kit for building enterprise-grade AI agents. The Antigravity ADK (Agent Development Kit) is how Google teams build production AI systems, and it's what your Google Enterprise Agent Dev certification covers.",

      sections: [
        {
          type: "concept",
          title: "The Gemini Model Family",
          content: `Google's Gemini family has models for every use case:`,
          table: {
            headers: ["Model", "Speed", "Intelligence", "Context", "Best for"],
            rows: [
              ["Gemini 2.0 Flash", "⚡ Fastest", "⭐⭐⭐", "1M tokens", "High-volume tasks, real-time apps"],
              ["Gemini 2.0 Pro", "🔄 Balanced", "⭐⭐⭐⭐", "2M tokens", "Complex reasoning, coding"],
              ["Gemini Ultra", "🐢 Slowest", "⭐⭐⭐⭐⭐", "1M tokens", "Most difficult tasks, research"],
              ["Gemini Nano", "⚡⚡ On-device", "⭐⭐", "Local", "Mobile apps, offline tasks"],
            ]
          }
        },
        {
          type: "code",
          title: "Calling Gemini API — Your First Integration",
          code: {
            language: "python",
            label: "gemini_basics.py",
            content: `import google.generativeai as genai

# Setup — get your key at: https://aistudio.google.com/
genai.configure(api_key="your-api-key")

# ─── BASIC TEXT GENERATION ────────────────────────────────────
model = genai.GenerativeModel('gemini-2.0-flash')

response = model.generate_content("Explain recursion with a real example in Java")
print(response.text)


# ─── MULTIMODAL: IMAGE + TEXT ────────────────────────────────
import PIL.Image

img = PIL.Image.open("architecture_diagram.png")
response = model.generate_content([
    img,
    "Analyze this architecture diagram and identify potential bottlenecks"
])
print(response.text)


# ─── STREAMING RESPONSE ───────────────────────────────────────
for chunk in model.generate_content("Write a 500-word essay on AI", stream=True):
    print(chunk.text, end="", flush=True)


# ─── CHAT CONVERSATION ───────────────────────────────────────
chat = model.start_chat()

r1 = chat.send_message("What is a HashMap?")
r2 = chat.send_message("How is it different from HashTable?")  # Maintains history
r3 = chat.send_message("Show me a Java implementation")

print(r3.text)  # Response knows context of previous 2 messages`
          }
        },
        {
          type: "concept",
          title: "Antigravity ADK — Building Enterprise AI Agents",
          content: `The **Antigravity ADK (Agent Development Kit)** is Google's framework for building production-grade AI agents. It provides:

**Core Concepts:**
- **Agent**: An AI entity that can reason and take actions
- **Tool**: A function the agent can call (search, database, API)
- **Runner**: Orchestrates agent execution
- **Session**: Manages conversation state and memory
- **Callback**: Hook into agent lifecycle for monitoring

**What makes ADK different:**
1. **Multi-model support**: Use Gemini, Claude, or any LLM
2. **Multi-agent orchestration**: Build networks of specialized agents
3. **Built-in evaluation**: Test your agents systematically
4. **Enterprise security**: IAM integration, audit logs
5. **Deployment ready**: Vertex AI hosting, auto-scaling`,
          code: {
            language: "python",
            label: "antigravity_agent.py",
            content: `from google.adk.agents import Agent
from google.adk.tools import google_search
from google.adk.runners import InMemoryRunner
from google.genai import types

# ─── BUILD YOUR AGENT ─────────────────────────────────────────
agent = Agent(
    name="dsa_tutor",
    model="gemini-2.0-flash",
    description="Expert DSA tutor that searches for the latest algorithms",
    instruction="""You are an expert Data Structures & Algorithms tutor.
    When explaining a concept:
    1. Start with a real-world analogy
    2. Explain the technical concept
    3. Show Java code example
    4. Give time/space complexity
    Always be encouraging to beginners!""",
    tools=[google_search]  # Agent can search the web!
)

# ─── CREATE RUNNER (manages sessions + memory) ───────────────
runner = InMemoryRunner(agent=agent)

# ─── RUN A CONVERSATION ───────────────────────────────────────
session = runner.session_service.create_session(
    app_name="javaalgo-elite",
    user_id="sanjay_learning"
)

# Send a message
content = types.Content(
    role="user",
    parts=[types.Part(text="Explain Dijkstra's algorithm for finding shortest paths")]
)

for event in runner.run(
    user_id="sanjay_learning",
    session_id=session.id,
    new_message=content
):
    if event.is_final_response():
        print(event.content.parts[0].text)`
          }
        }
      ]
    },

    // ── TOPIC 8 ─────────────────────────────────────────
    {
      id: "langchain-langgraph",
      title: "LangChain & LangGraph — The Agent Frameworks",
      icon: "⛓️",
      color: "#fb923c",
      difficulty: "Intermediate",
      estimatedMins: 40,
      hook: "LangChain is the most popular framework for building LLM applications, used by thousands of companies. LangGraph is its evolution for complex multi-step agents. Understanding these is essential for any AI engineering role.",

      sections: [
        {
          type: "concept",
          title: "What is LangChain?",
          content: `LangChain is a framework that makes it easy to build applications with LLMs. Think of it as the React.js of AI — it provides reusable components so you don't have to build everything from scratch.

**Key LangChain components:**
- **Models**: Standardized interface for any LLM (Claude, GPT, Gemini)
- **Prompts**: Template system for dynamic prompts
- **Chains**: Link multiple steps together
- **Retrievers**: Pull relevant data from vector stores
- **Agents**: LLM + tools + ReAct loop
- **Memory**: Persist conversation history

**Why use it?**
Without LangChain: Write 200 lines of boilerplate for each LLM integration
With LangChain: 20 lines, swap models with one line change`
        },
        {
          type: "concept",
          title: "LangGraph — Agents with Complex Flows",
          content: `LangGraph extends LangChain for building **stateful, cyclical agent workflows**.

While a simple chain is A→B→C (linear), real agents need:
- Loops (retry if failed)
- Conditionals (if X then go to Y, else go to Z)
- Parallel branches (do A and B simultaneously)
- Human-in-the-loop (pause and ask for human approval)

LangGraph models this as a **graph** (nodes + edges):

\`\`\`python
from langgraph.graph import StateGraph, END

# Nodes are functions that do work
def research(state): ...       # Search the web
def write(state): ...          # Write the content
def review(state): ...         # QA check
def revise_or_end(state): ...  # Decision: good enough or revise?

# Build the graph
graph = StateGraph(AgentState)
graph.add_node("research", research)
graph.add_node("write", write)
graph.add_node("review", review)

# Define flow with conditional edges
graph.add_edge("research", "write")
graph.add_edge("write", "review")
graph.add_conditional_edges(
    "review",
    revise_or_end,  # This function decides the next node
    {"revise": "write", "good": END}
)
\`\`\`

This creates a self-improving loop: research → write → review → revise → write again if needed.`
        }
      ]
    },

    // ── TOPIC 9 ─────────────────────────────────────────
    {
      id: "vector-databases",
      title: "Vector Databases Deep Dive",
      icon: "🗄️",
      color: "#818cf8",
      difficulty: "Intermediate",
      estimatedMins: 25,
      hook: "Semantic search, recommendation engines, RAG systems — they all run on vector databases. Understanding how these work will make you a far better AI engineer.",
      sections: [
        {
          type: "concept",
          title: "How Semantic Search Works",
          content: `Traditional search: Find documents that contain the word "car"
Semantic search: Find documents about transportation (even if they say "automobile" or "vehicle")

**The magic is embeddings.** An embedding model converts text to a dense vector — a list of 1536 numbers where similar meanings cluster nearby in mathematical space.

"King" - "Man" + "Woman" = "Queen" (famous embedding math)

This is why vector search can find "heart attack" when you search for "chest pain" — they have similar embeddings even though they share no words.

**HNSW Index — How Vector DBs Search Fast**
With millions of vectors, comparing every one would be too slow. Vector DBs use Hierarchical Navigable Small World (HNSW) graphs — a structure that can find the nearest neighbors in O(log n) time, not O(n). It's essentially a skip list but for high-dimensional space.`
        }
      ]
    },

    // ── TOPIC 10 ─────────────────────────────────────────
    {
      id: "ai-production",
      title: "Deploying AI to Production",
      icon: "🏭",
      color: "#f43f5e",
      difficulty: "Advanced",
      estimatedMins: 35,
      hook: "Building an AI prototype in Jupyter Notebook is easy. Making it reliable, fast, affordable, and safe for real users is where 90% of teams struggle. Here's everything you need to know.",
      sections: [
        {
          type: "concept",
          title: "The Production AI Checklist",
          items: [
            { title: "Cost Management", desc: "Set max_tokens limits. Cache responses for repeated queries. Use smaller models for simple tasks (Flash vs Pro).", metric: "Target: < ₹1 per 1000 queries" },
            { title: "Latency Optimization", desc: "Stream responses so users see text appearing. Use async/parallel calls. Consider model size tradeoffs.", metric: "Target: First token < 1 second" },
            { title: "Evals (AI Testing)", desc: "Define test cases with expected outputs. Measure quality automatically. Track regression as you update prompts.", metric: "Run before every prompt change" },
            { title: "Guardrails", desc: "Filter harmful inputs. Validate outputs match expected format. Rate limit per user.", metric: "Block 100% of policy violations" },
            { title: "Observability", desc: "Log every LLM call with inputs, outputs, latency, cost. Use LangSmith or Langfuse.", metric: "Full traceability of every query" },
            { title: "Prompt Versioning", desc: "Store prompts in version control. Never change prompts without evaluation.", metric: "Every prompt change is tracked" },
          ]
        },
        {
          type: "code",
          title: "Production-Grade LLM Call with Retries, Caching, and Logging",
          code: {
            language: "python",
            label: "production_llm.py",
            content: `import anthropic
import hashlib
import json
import time
from functools import lru_cache
from tenacity import retry, stop_after_attempt, wait_exponential

client = anthropic.Anthropic()

# ─── SIMPLE RESPONSE CACHE ────────────────────────────────────
_cache = {}

def get_cache_key(prompt: str, model: str, temperature: float) -> str:
    content = f"{model}:{temperature}:{prompt}"
    return hashlib.sha256(content.encode()).hexdigest()

# ─── RETRY ON RATE LIMITS ─────────────────────────────────────
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=30),
    reraise=True
)
def call_llm(
    prompt: str,
    system: str = "",
    model: str = "claude-sonnet-4-5",
    temperature: float = 0.0,
    max_tokens: int = 1024,
    use_cache: bool = True
) -> dict:
    # Check cache first (saves cost on repeated queries)
    if use_cache:
        cache_key = get_cache_key(prompt, model, temperature)
        if cache_key in _cache:
            return {**_cache[cache_key], "cached": True}

    start_time = time.time()

    try:
        response = client.messages.create(
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
            system=system,
            messages=[{"role": "user", "content": prompt}]
        )
        
        latency_ms = (time.time() - start_time) * 1000
        
        result = {
            "text": response.content[0].text,
            "input_tokens": response.usage.input_tokens,
            "output_tokens": response.usage.output_tokens,
            "latency_ms": round(latency_ms),
            "model": model,
            "cached": False
        }
        
        # Log for observability
        print(f"[LLM] {model} | {latency_ms:.0f}ms | "
              f"in={response.usage.input_tokens} out={response.usage.output_tokens}")
        
        # Store in cache
        if use_cache:
            _cache[cache_key] = result
        
        return result
        
    except anthropic.RateLimitError:
        print("[LLM] Rate limit hit, retrying...")
        raise  # Tenacity will retry

# ─── USAGE ────────────────────────────────────────────────────
result = call_llm(
    prompt="Explain binary search in Java with code",
    system="You are a Java DSA expert. Be concise.",
    model="claude-sonnet-4-5",
    max_tokens=500
)
print(result["text"])
print(f"Cost-saving: {'Yes (cached)' if result['cached'] else 'No (API call)'}")`
          }
        }
      ]
    },

    // ── TOPICS 11-15 (summaries, full content in component) ──
    {
      id: "neural-networks",
      title: "Neural Networks Visualized",
      icon: "🔢",
      color: "#38bdf8",
      difficulty: "Beginner",
      estimatedMins: 30,
      hook: "The human brain has 86 billion neurons. An artificial neural network might have 175 billion parameters (GPT-3). Let's understand what these numbers actually mean.",
      sections: [
        {
          type: "concept",
          title: "A Single Neuron — The Building Block",
          content: `A biological neuron: receives signals from other neurons, if the combined signal is strong enough, it fires and sends a signal forward.

An artificial neuron: takes numbers as inputs, multiplies each by a learned weight, adds a bias, passes through an activation function → outputs a number.

\`\`\`
input_1 × weight_1 ┐
input_2 × weight_2 ├─ sum → activation_function → output
input_3 × weight_3 ┘
\`\`\`

**Activation functions** decide if the neuron "fires":
- **ReLU**: max(0, x) — Most common in deep learning
- **Sigmoid**: squashes output between 0 and 1 — Used for probabilities
- **Softmax**: converts outputs to probability distribution — Used for classification

A neural network is just millions of these neurons organized in layers, with the weights learned from training data.`
        }
      ]
    },
    {
      id: "fine-tuning",
      title: "Fine-Tuning vs RAG vs Prompt Engineering",
      icon: "⚙️",
      color: "#34d399",
      difficulty: "Advanced",
      estimatedMins: 25,
      hook: "Every AI engineer faces this decision: how should I customize an LLM for my use case? The wrong choice costs thousands of dollars and weeks of work.",
      sections: [
        {
          type: "concept",
          title: "Decision Framework",
          content: `**Use Prompt Engineering when:**
- Quick customization needed (hours, not days)
- Behavior change is about style/format/role
- Small budget
- The model already has the knowledge

**Use RAG when:**
- Need access to private, proprietary, or recent data
- Data changes frequently
- Need to cite sources
- Scale to large knowledge bases

**Use Fine-tuning when:**
- Need consistent style/tone the model doesn't naturally have
- Domain-specific vocabulary or patterns
- Many few-shot examples needed every call (expensive tokens)
- Have labeled training data (1000+ examples)
- Budget for training (~$100-$10,000 depending on size)

**The 80% Rule**: Start with prompting. If you hit a wall, add RAG. Fine-tune only when both fail.`
        }
      ]
    },
    {
      id: "ai-ethics-safety",
      title: "AI Ethics, Safety & Responsible Use",
      icon: "⚖️",
      color: "#f97316",
      difficulty: "Beginner",
      estimatedMins: 20,
      hook: "As AI gets more powerful, understanding its risks and limitations isn't optional — it's a core engineering responsibility. Every certification exam covers this.",
      sections: [
        {
          type: "concept",
          title: "What Every AI Engineer Must Know",
          content: `**Hallucination**: LLMs confidently state false information. Always verify factual claims. Use RAG to ground responses in real data.

**Bias**: Models reflect biases in training data. Can discriminate based on gender, race, geography. Always test with diverse inputs.

**Privacy**: Never send PII (personal info) to public APIs without consent. Use local models or enterprise APIs with data privacy agreements.

**Jailbreaking**: Users try to manipulate models into harmful outputs. Implement input filtering and output validation.

**Anthropic's Constitutional AI**: Claude is trained using "Constitutional AI" — a set of principles that guide it to be helpful, harmless, and honest. Understanding this helps you work with Claude effectively.

**The EU AI Act (2024)**: High-risk AI systems (hiring, healthcare, law enforcement) require human oversight, transparency, and risk assessment. Know this for certifications.`
        }
      ]
    },
    {
      id: "claude-architecture",
      title: "Claude Deep Dive — Architecture & Best Practices",
      icon: "🔮",
      color: "#c084fc",
      difficulty: "Intermediate",
      estimatedMins: 30,
      hook: "You're studying for the Claude Certified Architect certification. Let's go deep on what makes Claude unique, how it's different from GPT, and the specific features that matter for production systems.",
      sections: [
        {
          type: "concept",
          title: "What Makes Claude Different",
          content: `**Constitutional AI (CAI)**
Claude is trained using a set of principles called the "Constitution" that guides its values. Unlike RLHF alone (which relies entirely on human raters), CAI lets Claude evaluate its own responses against the constitution. This makes Claude more consistently safe.

**Opus vs Sonnet vs Haiku**
- Claude Opus: Most intelligent, best reasoning, most expensive
- Claude Sonnet: Best balance of intelligence and speed — recommended for most production use
- Claude Haiku: Fastest, cheapest — good for high-volume, simple tasks

**Claude's 200K Context Window**
The largest context window of any major model. You can send Claude:
- An entire codebase
- A full-length book
- Months of conversation history
Useful for: code review, document analysis, long-context summarization

**Prompt Caching (Cost Saving!)**
If you repeatedly send the same system prompt + context (like your company docs), Claude can cache it. You pay full price for the first call, then 90% less for subsequent calls with the same cached prefix.

\`\`\`python
# Enable prompt caching for repeated system prompts
response = client.messages.create(
    model="claude-sonnet-4-5",
    max_tokens=1024,
    system=[{
        "type": "text",
        "text": "You are an expert...[long system prompt]...",
        "cache_control": {"type": "ephemeral"}  # Cache this!
    }],
    messages=[{"role": "user", "content": user_question}]
)
\`\`\`

**Claude's Strengths vs GPT:**
| | Claude | GPT-4 |
|---|---|---|
| Coding | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Safety | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Context Length | 200K (best) | 128K |
| Document Analysis | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Creative Writing | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Speed (Sonnet) | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |`
        }
      ]
    },
    {
      id: "ai-tools-ecosystem",
      title: "The Complete AI Tools Ecosystem",
      icon: "🌐",
      color: "#fbbf24",
      difficulty: "Beginner",
      estimatedMins: 20,
      hook: "The AI landscape moves so fast it's hard to keep up. This is your map of the major players, tools, and how they fit together.",
      sections: [
        {
          type: "concept",
          title: "The AI Ecosystem Map",
          content: `**Foundation Models (The Brains):**
- OpenAI: GPT-4o, GPT-4 Turbo, o1-preview
- Anthropic: Claude 3.5 Sonnet, Opus, Haiku
- Google: Gemini 2.0 Pro, Flash, Ultra
- Meta: Llama 3 (open source, free to use!)
- Mistral: Mistral Large, Mixtral (open source)

**Frameworks (The Plumbing):**
- LangChain: Most popular, huge ecosystem
- LangGraph: Stateful agents, complex workflows
- Antigravity ADK: Google's enterprise agent framework
- AutoGen: Microsoft's multi-agent framework
- CrewAI: Role-based multi-agent teams

**Vector Databases (The Memory):**
- Pinecone: Managed, fast, expensive
- Chroma: Local development, free
- Weaviate: Self-hosted, powerful
- pgvector: PostgreSQL extension

**Deployment & Monitoring:**
- LangSmith: LangChain's observability platform
- Langfuse: Open-source LLM tracing
- Vertex AI: Google's ML deployment platform
- AWS Bedrock: Run LLMs on AWS infrastructure
- Azure OpenAI: GPT models in Azure cloud

**Orchestration:**
- Zapier: No-code AI workflows
- n8n: Self-hosted workflow automation
- Flowise: Visual agent builder`
        }
      ]
    }
  ]
};

export default aiUniverseData;
