// Mock API Stubs for Guardian AI Assistant Dashboard

export const MOCK_TEMPLATES = {
  images: [
    {
      id: 'img_1',
      title: 'Modern Minimalist Product Showcase',
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      description: 'Sleek product shot on a clean gradient background, optimized for Instagram Feed.'
    },
    {
      id: 'img_2',
      title: 'Lifestyle Tech Integration',
      url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      description: 'Human-centric workspace setup emphasizing productivity and safety.'
    },
    {
      id: 'img_3',
      title: 'Neon Cyberpunk Ad Banner',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      description: 'High-contrast design targeting Gen-Z audience, optimized for Google Display Network.'
    }
  ],
  videos: [
    {
      id: 'vid_1',
      title: 'Dynamic SaaS Platform Walkthrough',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      url: '#',
      description: '15-second kinetic text animation highlighting security features, optimized for TikTok/Reels.'
    },
    {
      id: 'vid_2',
      title: 'Customer Testimonial Highlights',
      thumbnail: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop&q=80',
      url: '#',
      description: 'Montage of user quotes with professional captions and transition effects.'
    }
  ]
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateImage = async (prompt) => {
  await delay(1500);
  // Simple heuristic: choose an image based on prompt content, or default
  const lower = prompt.toLowerCase();
  let selected = MOCK_TEMPLATES.images[0];
  if (lower.includes('tech') || lower.includes('work') || lower.includes('office')) {
    selected = MOCK_TEMPLATES.images[1];
  } else if (lower.includes('cyber') || lower.includes('neon') || lower.includes('bright')) {
    selected = MOCK_TEMPLATES.images[2];
  }
  
  return {
    success: true,
    type: 'image',
    title: `AI Creative: ${prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}`,
    url: selected.url,
    description: selected.description,
    metrics: {
      predictedCTR: (3.2 + Math.random() * 2.5).toFixed(2),
      engagement: (12.4 + Math.random() * 8.0).toFixed(2),
      safetyScore: (92 + Math.random() * 8).toFixed(0),
    },
    compliance: {
      passed: !lower.includes('alcohol') && !lower.includes('crypto') && !lower.includes('hack'),
      issues: lower.includes('alcohol') 
        ? ['Age-restricted content detected (Alcohol policy). Requires verification checkbox.']
        : lower.includes('crypto')
        ? ['Financial products promotion warning. Verify region license.']
        : lower.includes('hack')
        ? ['Malicious activities keyword detection. High risk of rejection.']
        : []
    }
  };
};

export const createVideo = async (prompt, format = 'TikTok') => {
  await delay(2000);
  const selected = Math.random() > 0.5 ? MOCK_TEMPLATES.videos[0] : MOCK_TEMPLATES.videos[1];
  return {
    success: true,
    type: 'video',
    title: `AI Video Spot: ${prompt.substring(0, 30)}...`,
    thumbnail: selected.thumbnail,
    format: format,
    description: `Generated video optimized for ${format} ads matching prompt: "${prompt}"`,
    metrics: {
      predictedCTR: (4.1 + Math.random() * 3.0).toFixed(2),
      engagement: (18.2 + Math.random() * 10.0).toFixed(2),
      safetyScore: (95 + Math.random() * 5).toFixed(0),
    },
    compliance: {
      passed: true,
      issues: []
    }
  };
};

export const createCampaign = async (campaignData) => {
  await delay(1200);
  return {
    success: true,
    campaignId: 'camp_' + Math.random().toString(36).substring(2, 9),
    status: 'Active',
    spendLimit: campaignData.budget || '$500',
    platform: campaignData.platform || 'Meta Ads',
    audience: campaignData.audience || 'Lookalike Audience (2%)',
    message: 'Campaign executed successfully! Tracking pixel active.'
  };
};

export const boostPost = async (postId, budget = '$50') => {
  await delay(1000);
  return {
    success: true,
    boostId: 'bst_' + Math.random().toString(36).substring(2, 9),
    status: 'Running',
    reachIncrease: '+15,000 - 32,000 potential reach',
    message: `Post boosted with budget ${budget}. Live reporting initialized.`
  };
};
