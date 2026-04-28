import React from 'react';
import ContentCard from '../components/ContentCard';
import { useTemplateContent } from '../hooks/useTemplateContent';

function Blog() {
  const { mergedBlogIntro: blogIntro, mergedBlogPosts: blogPosts } =
    useTemplateContent();

  return (
    <div className="flex-grow flex flex-col gap-16 md:gap-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full mt-12 mb-24">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          {blogIntro.heading}
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          {blogIntro.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogPosts.map((post, idx) => (
          <ContentCard key={idx} {...post} animDelay={idx * 0.05} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
