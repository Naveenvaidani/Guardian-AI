
import os

os.environ.setdefault('HF_HOME', './hf_cache')
os.environ.setdefault('TRANSFORMERS_CACHE', './hf_cache')

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import PromptTemplate


def build_rag_pipeline(documents):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    texts = text_splitter.split_text(" ".join(documents))

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2",
        cache_folder=os.environ['HF_HOME'],
    )
    vectorstore = FAISS.from_texts(texts, embeddings)
    retriever = vectorstore.as_retriever()

    qa_model_name = "distilbert-base-cased-distilled-squad"
    tokenizer = AutoTokenizer.from_pretrained(qa_model_name, cache_dir=os.environ['HF_HOME'])
    model = AutoModelForQuestionAnswering.from_pretrained(qa_model_name, cache_dir=os.environ['HF_HOME'])
    qa_pipeline = pipeline("question-answering", model=model, tokenizer=tokenizer)
    llm = HuggingFacePipeline(pipeline=qa_pipeline)

    template = """Answer the question based only on the following context:
    {context}

    Question: {input}
    """
    prompt = PromptTemplate.from_template(template)
    document_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, document_chain)


def ask(rag_chain, question):
    response = rag_chain.invoke({"input": question})
    return response["answer"]


if __name__ == "__main__":
    import json
    with open("dataset/sample_reports.json") as f:
        reports = json.load(f)["reports"]

    rag_system = build_rag_pipeline(reports)

    for q in [
        "Why did moderation load increase?",
        "What happened after the October 1st policy update?",
    ]:
        try:
            print(f"Q: {q}\nA: {ask(rag_system, q)}\n")
        except Exception as e:
            print(f"Error answering '{q}': {e}")
