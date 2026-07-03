import torch
import faiss
import numpy as np
from transformers import CLIPProcessor, CLIPModel, BertTokenizer, BertModel
from PIL import Image
import requests
import os


EMBEDDING_DIM = 512
MODEL_ID_CLIP = "openai/clip-vit-base-patch32"
MODEL_ID_BERT = "bert-base-uncased"


os.environ['HF_HOME'] = './hf_cache'
os.environ['TRANSFORMERS_CACHE'] = './hf_cache'


def get_clip_embeddings(text_query=None, image_url=None):
   
    print("Loading CLIP model...")
    model = CLIPModel.from_pretrained(MODEL_ID_CLIP, cache_dir=os.environ['HF_HOME'])
    processor = CLIPProcessor.from_pretrained(MODEL_ID_CLIP, cache_dir=os.environ['HF_HOME'])
    
    text_embedding = None
    image_embedding = None

   
    if text_query:
        print(f"Processing Text: '{text_query}'")
        inputs_text = processor(text=[text_query], return_tensors="pt", padding=True)
        text_features = model.get_text_features(**inputs_text)
        text_embedding = text_features.detach().numpy()

   
    if image_url:
        print(f"Processing Image URL: {image_url}")
        try:
         
            image = Image.open(requests.get(image_url, stream=True).raw)
            inputs_image = processor(images=image, return_tensors="pt")
            image_features = model.get_image_features(**inputs_image)
            image_embedding = image_features.detach().numpy()
        except Exception as e:
            print(f"Error loading image: {e}")

    return text_embedding, image_embedding

def get_bert_embeddings(text_list):
    """Generates BERT embeddings for a list of text documents."""
    print("Loading BERT model...")
    tokenizer = BertTokenizer.from_pretrained(MODEL_ID_BERT, cache_dir=os.environ['HF_HOME'])
    model = BertModel.from_pretrained(MODEL_ID_BERT, cache_dir=os.environ['HF_HOME'])
    print("BERT model loaded.")
    
    inputs = tokenizer(text_list, return_tensors="pt", padding=True, truncation=True, max_length=128)
    with torch.no_grad():
        outputs = model(**inputs)
    
   
    cls_embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return cls_embeddings

def create_faiss_index(vectors):
    """Creates a FAISS index for efficient similarity search."""
    if vectors is None or not vectors.size:
        return None
    
   
    vectors = vectors.astype('float32')
    
    d = vectors.shape[1]  
    
   
    index = faiss.IndexFlatL2(d)
    
    
    faiss.normalize_L2(vectors)
    index.add(vectors)
    return index

def search_index(index, query_vector, k=5):
    """Searches the FAISS index for the k-nearest neighbors."""
    if index is None:
        print("Index is not initialized.")
        return [], []
        
  
    query_vector = query_vector.astype('float32')
    
    faiss.normalize_L2(query_vector) 
    distances, indices = index.search(query_vector, k)
    return distances, indices


if __name__ == "__main__":
    print("--- Model 1: Unified Representation & Search ---")
    
    
    print("\n[Part A: Multimodal Embedding Check]")
    
  
    user_text = "a photo of a dog"
    user_image_url = "http://images.cocodataset.org/val2017/000000039769.jpg" 
    

    text_emb, img_emb = get_clip_embeddings(text_query=user_text, image_url=user_image_url)
    
    if text_emb is not None and img_emb is not None:
      
        text_emb_norm = text_emb / np.linalg.norm(text_emb)
        img_emb_norm = img_emb / np.linalg.norm(img_emb)
        
        similarity = np.dot(text_emb_norm, img_emb_norm.T)
        print(f"\n[Result] Similarity Score (Text vs Image): {similarity[0][0]:.4f}")
    
    elif text_emb is not None:
        print(f"\n[Result] Generated Text Embedding: {text_emb.shape}")
        
    elif img_emb is not None:
        print(f"\n[Result] Generated Image Embedding: {img_emb.shape}")

   
    print("\n[Part B: Vector Database Search]")
    
  
    documents = [
        "This is a document about dogs.",
        "This article covers cats.",
        "Quantum physics is complex.",
        "A guide to training your puppy."
    ]
    
   
    doc_embeddings_bert = get_bert_embeddings(documents)
    print(f"Generated {len(documents)} BERT embeddings of shape {doc_embeddings_bert.shape}")

    index = create_faiss_index(doc_embeddings_bert)
    
    if index:
        print(f"FAISS index created with {index.ntotal} vectors.")
        
       
        query_text = ["a story about a pet"]
        query_vector = get_bert_embeddings(query_text)
        
      
        D, I = search_index(index, query_vector, k=2)
        
        print(f"\nSearch results for: '{query_text[0]}'")
        if len(I) > 0:
            for i, doc_index in enumerate(I[0]):
                print(f"  Rank {i+1}: '{documents[doc_index]}' (Distance: {D[0][i]:.4f})")
        else:
            print("No results found.")