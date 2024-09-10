'use client';

import React from 'react';
import Tag from '@/components/tag';

const SearchedWords = ({
  tags,
  keywords,
  deleteWord,
}: {
  tags: string[];
  keywords: string[];
  deleteWord: (targetWord: string, isTag?: boolean) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {tags.map((tag, idx) => (
        <Tag
          key={idx}
          tag={tag}
          isTag
          removeTag={() => deleteWord(tag, true)}
        />
      ))}
      {keywords.map((keyword, idx) => (
        <Tag key={idx} tag={keyword} removeTag={() => deleteWord(keyword)} />
      ))}
    </div>
  );
};

export default SearchedWords;
