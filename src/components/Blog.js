import React from 'react';
import styled from 'styled-components';

const BlogContainer = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #333;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 60px;
  color: #666;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
`;

const BlogCard = styled.article`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.1);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  position: relative;
`;

const BlogCategory = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #ff6b35;
  color: white;
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const BlogContent = styled.div`
  padding: 25px;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 0.85rem;
`;

const BlogDate = styled.span``;

const BlogReadTime = styled.span``;

const ViewAllButton = styled.button`
  display: block;
  margin: 50px auto 0;
  background: #2c5530;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: #1e3a22;
    transform: translateY(-2px);
  }
`;

const Blog = () => {
  const blogPosts = [
    {
      title: "10 Must-Visit Temples in Sri Lanka",
      excerpt: "Discover the most sacred and architecturally stunning Buddhist temples across the island, from the ancient Anuradhapura to the famous Temple of the Tooth in Kandy.",
      category: "Culture",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Best Time to Visit Sri Lanka: A Complete Guide",
      excerpt: "Plan your perfect Sri Lankan adventure with our comprehensive guide to weather patterns, monsoons, and the ideal times to visit different regions of the island.",
      category: "Travel Tips",
      date: "March 10, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Sri Lankan Cuisine: A Food Lover's Paradise",
      excerpt: "Explore the rich flavors of Sri Lankan cuisine, from fiery curries and fresh seafood to tropical fruits and traditional sweets that will tantalize your taste buds.",
      category: "Food & Culture",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Wildlife Safari Tips for Sri Lanka",
      excerpt: "Maximize your chances of spotting leopards, elephants, and exotic birds with our expert tips for wildlife safaris in Yala, Udawalawe, and other national parks.",
      category: "Wildlife",
      date: "February 28, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Ultimate Guide to Tea Country",
      excerpt: "Journey through the misty highlands of Nuwara Eliya and Ella, learn about tea production, and discover the most scenic spots in Sri Lanka's tea country.",
      category: "Nature",
      date: "February 20, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1544306094-e2c49e7c7b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Hidden Beaches of Southern Sri Lanka",
      excerpt: "Escape the crowds and discover pristine, secluded beaches along the southern coast. From secret coves to untouched stretches of sand, find your perfect beach paradise.",
      category: "Beaches",
      date: "February 15, 2024",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1580487625259-4bb1db1ff4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <BlogContainer id="blog">
      <Container>
        <SectionTitle>Travel Insights & Guides</SectionTitle>
        <SectionSubtitle>
          Get inspired with our latest travel guides, cultural insights, and insider tips for exploring Sri Lanka like a local.
        </SectionSubtitle>
        
        <BlogGrid>
          {blogPosts.map((post, index) => (
            <BlogCard key={index}>
              <BlogImage bg={post.image}>
                <BlogCategory>{post.category}</BlogCategory>
              </BlogImage>
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <BlogMeta>
                  <BlogDate>{post.date}</BlogDate>
                  <BlogReadTime>{post.readTime}</BlogReadTime>
                </BlogMeta>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
        
        <ViewAllButton>View All Articles</ViewAllButton>
      </Container>
    </BlogContainer>
  );
};

export default Blog; 