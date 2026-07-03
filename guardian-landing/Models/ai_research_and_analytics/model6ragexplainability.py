

import numpy as np
import os


os.environ['HF_HOME'] = './hf_cache'
os.environ['TRANSFORMERS_CACHE'] = './hf_cache'


try:
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings import HuggingFaceEmbeddings
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
    from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
    
    # --- NEW IMPORTS TO REPLACE RetrievalQA ---
    from langchain.chains import create_retrieval_chain
    from langchain.chains.combine_documents import create_stuff_documents_chain
    from langchain_core.prompts import PromptTemplate
    
except ImportError as e:
    print(f"A required package is still missing. This should not happen in the .venv.")
    print(f"Error: {e}")
    exit()


def build_rag_pipeline(documents):
    """Builds a RAG pipeline for Q&A over documents."""
    print("\n[Phase 1a: Building RAG Pipeline]")
    
   
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_text(" ".join(documents))
    print(f"Split {len(documents)} docs into {len(texts)} chunks.")

   
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(model_name=model_name, cache_folder=os.environ['HF_HOME'])
    
   
    print("Creating FAISS vector store...")
    vectorstore = FAISS.from_texts(texts, embeddings)
    
   
    retriever = vectorstore.as_retriever()
    

    qa_model_name = "distilbert-base-cased-distilled-squad"
    print(f"Loading Q&A model: {qa_model_name}")
    tokenizer = AutoTokenizer.from_pretrained(qa_model_name, cache_dir=os.environ['HF_HOME'])
    model = AutoModelForQuestionAnswering.from_pretrained(qa_model_name, cache_dir=os.environ['HF_HOME'])
    
    qa_pipeline = pipeline(
        "question-answering",
        model=model,
        tokenizer=tokenizer
    )
    llm = HuggingFacePipeline(pipeline=qa_pipeline)
    
    
    template = """Answer the question based only on the following context:
    {context}
    
    Question: {input}
    """
    prompt = PromptTemplate.from_template(template)

  
    document_chain = create_stuff_documents_chain(llm, prompt)
    

    rag_chain = create_retrieval_chain(retriever, document_chain)
    
   
    
    print("RAG pipeline built successfully.")
    return rag_chain


def explainability_concept():
    """
    This is a conceptual function.
    SHAP and LIME are not models themselves, but techniques to
    explain the predictions of *other* models (like Model 3 or 4).
    You would `pip install shap`
    """
    print("\n[Phase 2: Explainability (SHAP/LIME) Concept]")
    print("SHAP/LIME are used to explain *other* models.")
    print("Example: Explaining Model 3 (Isolation Forest)")
    print("You would use 'shap.summary_plot' or 'shap.force_plot'")
    print("to visualize which features caused the anomaly.")
    pass



if __name__ == "__main__":
    print("--- Model 6: Insight Generation & Explainability ---")
    

    reports = [
        "Q3 Report: Moderation load increased by 15% due to a spike in spam activity in the 'news' category. We recommend increasing resources.",
        "Ad Performance, Week 4: Click-through-rate (CTR) on video ads dropped by 5%. Investigation shows low engagement from users aged 18-25.",
        "Policy Update, Oct 1st: A new rule was implemented to detect coordinated inauthentic behavior. This led to a 30% increase in bot account suspensions."
    ]
    
    rag_system = build_rag_pipeline(reports)
    
    print("\n[Phase 1b: Querying the RAG system]")
    

    query1 = "Why did moderation load increase?"
    try:
      
        response1 = rag_system.invoke({"input": query1})
        print(f"Query: {query1}")
     
        print(f"Answer: {response1['answer']}")
    except Exception as e:
        print(f"Error querying RAG (this can happen with small demo models): {e}")

  
    query2 = "What happened after the October 1st policy update?"
    try:
        response2 = rag_system.invoke({"input": query2})
        print(f"\nQuery: {query2}")
        print(f"Answer: {response2['answer']}")
    except Exception as e:
        print(f"Error querying RAG: {e}")

  
    explainability_concept()
    