

import os
import torch
import faiss
import numpy as np
from transformers import CLIPProcessor, CLIPModel, BertTokenizer, BertModel
from PIL import Image
import requests

EMBEDDING_DIM = 512
MODEL_ID_CLIP = "openai/clip-vit-base-patch32"
MODEL_ID_BERT = "bert-base-uncased"

os.environ.setdefault('HF_HOME', './hf_cache')
os.environ.setdefault('TRANSFORMERS_CACHE', './hf_cache')


def get_clip_embeddings(text_query=None, image_url=None):
    model = CLIPModel.from_pretrained(MODEL_ID_CLIP, cache_dir=os.environ['HF_HOME'])
    processor = CLIPProcessor.from_pretrained(MODEL_ID_CLIP, cache_dir=os.environ['HF_HOME'])

    text_embedding = None
    image_embedding = None

    if text_query:
        inputs_text = processor(text=[text_query], return_tensors="pt", padding=True)
        text_embedding = model.get_text_features(**inputs_text).detach().numpy()

    if image_url:
        image = Image.open(requests.get(image_url, stream=True).raw)
        inputs_image = processor(images=image, return_tensors="pt")
        image_embedding = model.get_image_features(**inputs_image).detach().numpy()

    return text_embedding, image_embedding


def get_bert_embeddings(text_list):
    tokenizer = BertTokenizer.from_pretrained(MODEL_ID_BERT, cache_dir=os.environ['HF_HOME'])
    model = BertModel.from_pretrained(MODEL_ID_BERT, cache_dir=os.environ['HF_HOME'])

    inputs = tokenizer(text_list, return_tensors="pt", padding=True, truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state[:, 0, :].numpy()


def create_faiss_index(vectors):
    if vectors is None or not vectors.size:
        return None
    vectors = vectors.astype('float32')
    index = faiss.IndexFlatL2(vectors.shape[1])
    faiss.normalize_L2(vectors)
    index.add(vectors)
    return index


def search_index(index, query_vector, k=5):
    if index is None:
        return [], []
    query_vector = query_vector.astype('float32')
    faiss.normalize_L2(query_vector)
    return index.search(query_vector, k)


if __name__ == "__main__":
    import json
    with open("dataset/sample_documents.json") as f:
        documents = json.load(f)["documents"]

    doc_embeddings = get_bert_embeddings(documents)
    index = create_faiss_index(doc_embeddings)

    query_text = ["a story about a pet"]
    query_vector = get_bert_embeddings(query_text)
    D, I = search_index(index, query_vector, k=2)

    print(f"Search results for: '{query_text[0]}'")
    for i, doc_index in enumerate(I[0]):
        print(f"  Rank {i+1}: '{documents[doc_index]}' (Distance: {D[0][i]:.4f})")
